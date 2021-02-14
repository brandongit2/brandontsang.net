// This hook takes the boundaries of a scroll container in pixels. It then list-
// ens for scroll input, left/right arrow keys, and touch input, which change
// the scroll position. There is an onScroll callback which is called with the
// current internal scroll position. It is up to the caller to then scroll the
// page based on the returned scroll position.

import {useEffect} from "react";

import {derivative} from "../misc/util";

let scrollPos = 0;
let prevScrollPos = 0;
let scrollTarget = 0;
let velocity = 0;
let keysPressed: {[key: string]: number} = {};
let scrollLoop: number;

export function useCustomScroll(
    onScroll: (delta: number) => void,
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

            onScroll(scrollPos - prevScrollPos);

            prevScrollPos = scrollPos;
            lastScrollTime = Date.now();
            scrollLoop = requestAnimationFrame(scroll);
        }

        if (enabled) {
            addEventListener("wheel", handleWheel, {passive: false});
            addEventListener("keydown", handleKeyDown);
            addEventListener("keyup", handleKeyUp);
        }
        scrollLoop = requestAnimationFrame(scroll);

        return () => {
            removeEventListener("wheel", handleWheel);
            removeEventListener("keydown", handleKeyDown);
            removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(scrollLoop);
        };
    }, [enabled, onScroll]);
}
