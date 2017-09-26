import * as React from "react";

export class SliderComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this._max = props.max || 100;
        this._min = props.min || 0;

        this.state = {
            dragging: false,
            knobPosition: 0,
            value: props.value || this._min
        };
    }

    private _max: number;
    private _min: number;

    private _stopDragging() {
        this.setState({ dragging: false });

        this._teardownAllWindowEvents();
        console.log("stop");
    }

    private _startDragging() {
        this.setState({ dragging: true });
        console.log("start");

        this._setupWindowEvent("mousemove", this._mouseDrag.bind(this));
        this._setupWindowEvent("touchmove", this._touchDrag.bind(this));
        this._setupWindowEvent("mouseup", () => this._stopDragging());
        this._setupWindowEvent("touchend", () => this._stopDragging());
    }

    private _events: Array<{ name: string, handler: (event?: any) => any }> = [];

    private _setupWindowEvent(name: string, handler: (event?: any) => any) {
        window.addEventListener(name, handler);

        this._events.push({
            name,
            handler
        });
    }

    private _teardownAllWindowEvents() {
        this._events.forEach(event => window.removeEventListener(event.name, event.handler));
        this._events = [];
    }

    private _touchDrag(event: React.TouchEvent<HTMLDivElement>) {
        this._updatePosition(event.touches[0].clientX);
    }

    private _mouseDrag(event: React.MouseEvent<HTMLDivElement>) {
        this._updatePosition(event.clientX);
    }

    public componentDidMount() {
        this.setState({ 
            knobPosition: (this.state.value - this._min) / (this._max - this._min) * this._scale.clientWidth + this._knob.clientWidth / 2,
        });
    }

    private _updatePosition(screenX: number) {
        if (this.state.dragging) {
            const scaleWidth = this._scale.clientWidth;
            const leftOffset = this._scale.getBoundingClientRect().left;
            let valuePercentage = (screenX - leftOffset) / scaleWidth;

            if (valuePercentage > 1) {
                valuePercentage = 1;
            }

            if (valuePercentage < 0) {
                valuePercentage = 0;
            }

            let value = valuePercentage * (this._max - this._min) + this._min;

            if (this.props.step) {
                value = Math.round(value / this.props.step) * this.props.step;
            }

            this.setState({ 
                knobPosition: valuePercentage * scaleWidth + this._knob.clientWidth / 2,
                value: value
            });
        }
    }

    private _scale: HTMLDivElement = null;
    private _knob: HTMLDivElement = null;

    public render() {
        return  <div className="slider">
                    <div className="slider-scale" ref={(scale) => this._scale = scale} />
                    <div className="slider-indicator" style={{ width: this.state.knobPosition }} />
                    <div className="slider-knob" ref={(knob) => this._knob = knob} style={{ left: this.state.knobPosition }} onTouchStart={() => this._startDragging()} onMouseDown={() => this._startDragging()} />
                    {this.state.value}
                </div>;
    }
} 
