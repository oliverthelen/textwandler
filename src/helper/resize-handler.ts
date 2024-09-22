export function setupResizeHandler() {
    // Functionality adapted from https://stackoverflow.com/a/73392263

    const resizable = function (resizer: HTMLElement) {
        const direction =
            resizer.getAttribute('data-direction') || 'horizontal';
        const prevSibling: HTMLElement =
            resizer.previousElementSibling as HTMLElement;
        const nextSibling: HTMLElement =
            resizer.nextElementSibling as HTMLElement;

        const resizerWidth = resizer.getBoundingClientRect().width;
        const resizerHeight = resizer.getBoundingClientRect().height;

        let mousePositionX = 0;
        let mousePositionY = 0;
        let prevSiblingHeight = 0;
        let prevSiblingWidth = 0;

        const mouseDownHandler = function (e: MouseEvent) {
            mousePositionX = e.clientX;
            mousePositionY = e.clientY;
            const rect = prevSibling.getBoundingClientRect();
            prevSiblingHeight = rect.height;
            prevSiblingWidth = rect.width;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e: MouseEvent) {
            // How far has the mouse moved?
            const dx = e.clientX - mousePositionX;
            const dy = e.clientY - mousePositionY;

            if (direction === 'vertical') {
                const parentHeight = (
                    resizer.parentNode as Element
                ).getBoundingClientRect().height;

                const h = prevSiblingHeight + dy;
                prevSibling.style.height = `${h - resizerHeight / 2}px`;
                nextSibling.style.height = `${parentHeight - h - resizerHeight / 2}px`;
            } else {
                const parentWidth = (
                    resizer.parentNode as Element
                ).getBoundingClientRect().width;

                const w = prevSiblingWidth + dx;
                prevSibling.style.width = `${w - resizerWidth / 2}px`;
                nextSibling.style.width = `${parentWidth - w - resizerWidth / 2}px`;
            }

            const cursor = 'row-resize';
            resizer.style.cursor = cursor;
            document.body.style.cursor = cursor;

            prevSibling.style.userSelect = 'none';
            prevSibling.style.pointerEvents = 'none';

            nextSibling.style.userSelect = 'none';
            nextSibling.style.pointerEvents = 'none';
        };

        const mouseUpHandler = function () {
            resizer.style.removeProperty('cursor');
            document.body.style.removeProperty('cursor');

            prevSibling.style.removeProperty('user-select');
            prevSibling.style.removeProperty('pointer-events');

            nextSibling.style.removeProperty('user-select');
            nextSibling.style.removeProperty('pointer-events');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        resizer.addEventListener('mousedown', mouseDownHandler);
    };

    const queryResizer = function () {
        document.querySelectorAll('.resizer').forEach(function (
            ele: HTMLElement
        ) {
            resizable(ele);
        });
    };

    if (document.readyState !== 'loading') {
        queryResizer();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            queryResizer();
        });
    }
}
