// This hook takes the boundaries of a scroll container in pixels. It then list-
// ens for scroll input, left/right arrow keys, and touch input, which change
// the scroll position. There is an onScroll callback which is called with the
// current internal scroll position. It is up to the caller to then scroll the
// page based on the returned scroll position.

import {useEffect} from "react";

import {derivative} from "../misc/util";

let scrollPos = 0;
let scrollTarget = 0;
let velocity = 0;
let keysPressed: {[key: string]: number} = {};
let scrollLoop: number;

export function useCustomScroll(
    bounds: () => [number, number],
    onScroll: (pos: number) => void,
    enabled = true
) {
    useEffect(() => {
        function handleWheel(evt: WheelEvent) {
            evt.preventDefault();

            if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) {
                scrollTarget += evt.deltaX * 0.8;
            } else {
                scrollTarget += evt.deltaY * 0.8;
            }

            if (scrollTarget < 0) scrollTarget = 0;
            if (scrollTarget > bounds()[1]) scrollTarget = bounds()[1];
        }

        function handleKeyDown(evt: KeyboardEvent) {
            if (["ArrowLeft", "ArrowRight"].includes(evt.code))
                evt.preventDefault();

            if (!(evt.code in keysPressed)) {
                keysPressed[evt.code] = Date.now();
            }
        }

        function handleKeyUp(evt: KeyboardEvent) {
            evt.preventDefault();
            delete keysPressed[evt.code];
        }

        // Touch scrolling
        let panningTouch: number | null = null;
        let prevTouchXPos: number | null = null;
        let lastThreeTouchXPos: number[] = [];
        function handleTouchStart(evt: TouchEvent) {
            evt.preventDefault();

            velocity = 0;

            if (panningTouch === null)
                panningTouch = evt.changedTouches[0].identifier;
        }

        function handleTouchMove(evt: TouchEvent) {
            evt.preventDefault();

            const touch = Array.from(evt.changedTouches).find(
                ({identifier}) => identifier === panningTouch
            );
            if (touch) {
                if (prevTouchXPos !== null) {
                    scrollTarget += prevTouchXPos - touch.screenX;
                    scrollPos = scrollTarget;
                }
                prevTouchXPos = touch.screenX;
                lastThreeTouchXPos.push(touch.screenX);
                lastThreeTouchXPos = lastThreeTouchXPos.slice(-3);
            }
        }

        function handleTouchEnd(evt: TouchEvent) {
            const touch = Array.from(evt.changedTouches).find(
                ({identifier}) => identifier === panningTouch
            );
            if (touch) {
                const velocities = derivative(lastThreeTouchXPos);
                if (velocities.length > 0)
                    velocity =
                        -velocities.reduce((prev, cur) => prev + cur) /
                        lastThreeTouchXPos.length;

                panningTouch = null;
                prevTouchXPos = null;
                lastThreeTouchXPos = [];
            }
        }

        let lastScrollTime = Date.now();
        function scroll() {
            const delta = Date.now() - lastScrollTime;

            if (enabled) {
                // Arrow key scrolling
                if (
                    "ArrowLeft" in keysPressed &&
                    !("ArrowRight" in keysPressed)
                ) {
                    velocity -=
                        ((Date.now() - keysPressed.ArrowLeft) / 2000) **
                        (1 / 3);
                } else if (
                    "ArrowRight" in keysPressed &&
                    !("ArrowLeft" in keysPressed)
                ) {
                    velocity +=
                        ((Date.now() - keysPressed.ArrowRight) / 2000) **
                        (1 / 3);
                }

                if (Math.abs(velocity) > 0.1) {
                    scrollPos += velocity * 0.05 * delta;

                    if (scrollPos < bounds()[0]) {
                        scrollPos = bounds()[0];
                        velocity = 0;
                    } else if (scrollPos > bounds()[1]) {
                        scrollPos = bounds()[1];
                        velocity = 0;
                    }
                    scrollTarget = scrollPos;

                    if (
                        !("ArrowLeft" in keysPressed) &&
                        !("ArrowRight" in keysPressed)
                    ) {
                        // Slow down scrolling
                        if (velocity > 0) {
                            velocity -= 0.06 * delta;
                            if (velocity < 0) velocity = 0;
                        } else {
                            velocity += 0.06 * delta;
                            if (velocity > 0) velocity = 0;
                        }
                    }
                }

                // Mouse wheel scrolling
                if (Math.abs(scrollTarget - scrollPos) > 1) {
                    scrollPos += ((scrollTarget - scrollPos) / 90) * delta;
                }
            }

            onScroll(scrollPos);

            lastScrollTime = Date.now();
            scrollLoop = requestAnimationFrame(scroll);
        }

        if (enabled) {
            addEventListener("wheel", handleWheel, {passive: false});
            addEventListener("keydown", handleKeyDown);
            addEventListener("keyup", handleKeyUp);
            addEventListener("touchstart", handleTouchStart, {passive: false});
            addEventListener("touchmove", handleTouchMove, {passive: false});
            addEventListener("touchend", handleTouchEnd);
        }
        scrollLoop = requestAnimationFrame(scroll);

        return () => {
            removeEventListener("wheel", handleWheel);
            removeEventListener("keydown", handleKeyDown);
            removeEventListener("keyup", handleKeyUp);
            removeEventListener("touchstart", handleTouchStart);
            removeEventListener("touchmove", handleTouchMove);
            removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(scrollLoop);
        };
    }, [enabled, onScroll]);
}
