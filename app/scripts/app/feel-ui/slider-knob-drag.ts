export function sliderKnobDrag(knob: HTMLDivElement, scale: any, handler: (event?: any) => any) {
    const knobEvents: Array<any> = [];
    const dragHandler = createDragHandler(knob, scale, handler);

    setupWindowEvent(knobEvents, "mousemove", (event: React.MouseEvent<HTMLDivElement>) => dragHandler(event.clientX));
    setupWindowEvent(knobEvents, "touchmove", (event: React.TouchEvent<HTMLDivElement>) => dragHandler(event.touches[0].clientX));
    setupWindowEvent(knobEvents, "mouseup", () => teardownAllWindowEvents(knobEvents));
    setupWindowEvent(knobEvents,"touchend", () => teardownAllWindowEvents(knobEvents));
}

function setupWindowEvent(knobEvents: Array<any>, name: string, handler: (event?: any) => any) {
    window.addEventListener(name, handler);

    knobEvents.push({
        name,
        handler
    });
}

function createDragHandler(knob: HTMLDivElement, scale: any, handler: (event?: any) => any) {
    return (screenX: number) => updatePosition(screenX, knob, scale, handler);
}

function teardownAllWindowEvents(knobEvents: Array<any>) {
    knobEvents.forEach(event => window.removeEventListener(event.name, event.handler));
}

function updatePosition(screenX: number, knob: HTMLDivElement, scale: any, handler: (event?: any) => any) {
    const scaleWidth = scale.width;
    const leftOffset = scale.offsetLeft;
    let valuePercentage = (screenX - leftOffset) / scaleWidth;

    if (valuePercentage > 1) {
        valuePercentage = 1;
    }

    if (valuePercentage < 0) {
        valuePercentage = 0;
    }

    let value = valuePercentage * (scale.max - scale.min) + scale.min;

    if (scale.step) {
        value = Math.round(value / scale.step) * scale.step;
    }

    const knobPosition = valuePercentage * scaleWidth + knob.clientWidth / 2;

    handler({
        knobPosition,
        value
    });
}
