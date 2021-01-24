import {useEffect} from 'react';

let scrollPos = 0;
let scrollTarget = 0;
let velocity = 0;
let keysPressed: {[key: string]: number} = {};
let scrollLoop: number;

export function useCustomScroll(
    bounds: () => [number, number],
    onScroll: (pos: number) => void
) {
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
        if (['ArrowLeft', 'ArrowRight'].includes(evt.code))
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

        // Arrow key scrolling
        if ('ArrowLeft' in keysPressed) {
            velocity -=
                ((Date.now() - keysPressed.ArrowLeft) / 2000) ** (1 / 3);
        } else if ('ArrowRight' in keysPressed) {
            velocity +=
                ((Date.now() - keysPressed.ArrowRight) / 2000) ** (1 / 3);
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
                !('ArrowLeft' in keysPressed) &&
                !('ArrowRight' in keysPressed)
            ) {
                // Slow down scrolling
                if (velocity > 0) {
                    velocity -= 0.05 * delta;
                    if (velocity < 0) velocity = 0;
                } else {
                    velocity += 0.05 * delta;
                    if (velocity > 0) velocity = 0;
                }
            }
        }

        // Mouse wheel scrolling
        if (Math.abs(scrollTarget - scrollPos) > 1) {
            scrollPos += ((scrollTarget - scrollPos) / 100) * delta;
        }
        onScroll(scrollPos);

        lastScrollTime = Date.now();
        scrollLoop = requestAnimationFrame(scroll);
    }

    useEffect(() => {
        addEventListener('wheel', handleWheel, {passive: false});
        addEventListener('keydown', handleKeyDown);
        addEventListener('keyup', handleKeyUp);
        scrollLoop = requestAnimationFrame(scroll);

        return () => {
            removeEventListener('wheel', handleWheel);
            removeEventListener('keydown', handleKeyDown);
            removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(scrollLoop);
        };
    }, []);
}
