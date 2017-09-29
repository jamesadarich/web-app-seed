import * as React from "react";
import { sliderKnobDrag } from "./slider-knob-drag";

export class SliderComponent extends React.Component<any, any> {    

    private _scale: any = {};
    private _knob: HTMLDivElement = null;

    public constructor(props: any) {
        super(props);

        this._scale.max = props.max || 100;
        this._scale.min = props.min || 0;
        this._scale.step = props.step;

        this.state = {
            knobPosition: 0,
            value: props.value || this._scale.min
        };
    }

    public componentDidMount() {
        this.setState({ 
            knobPosition: (this.state.value - this._scale.min) / (this._scale.max - this._scale.min) * this._scale.width + this._knob.clientWidth / 2,
        });
    }

    public render() {
        return  <div className="slider">
                    <div className="slider-scale" ref={(scale) => { 
                        if (scale) {
                            this._scale.width = scale.clientWidth;
                            this._scale.offsetLeft = scale.getBoundingClientRect().left;
                        }
                    }} />
                    <div className="slider-indicator" style={{ width: this.state.knobPosition }} />
                    <div className="slider-knob" ref={(knob) => this._knob = knob} style={{ left: this.state.knobPosition }} onTouchStart={() => sliderKnobDrag(this._knob, this._scale, (e) => this.setState(e))} onMouseDown={() => sliderKnobDrag(this._knob, this._scale, (e) => this.setState(e))} />
                    {this.state.value}
                </div>;
    }
} 
