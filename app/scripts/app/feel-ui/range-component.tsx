import * as React from "react";
import { sliderKnobDrag } from "./slider-knob-drag";

export class RangeComponent extends React.Component<any, any> {
    
    private _scale: any = {};
    private _minKnob: HTMLDivElement = null;
    private _maxKnob: HTMLDivElement = null;

    public constructor(props: any) {
        super(props);

        this._scale.max = props.max || 100;
        this._scale.min = props.min || 0;
        this._scale.step = props.step;

        this.state = {
            rangeMinPosition: 0,
            rangeMaxPosition: 0,
            rangeMin: props.rangeMin || this._scale.min,
            rangeMax: props.rangeMax || this._scale.max
        };
    }

    public componentDidMount() {
        this.setState({ 
            rangeMinPosition: (this.state.rangeMin - this._scale.min) / (this._scale.max - this._scale.min) * this._scale.width + this._minKnob.clientWidth / 2,
            rangeMaxPosition: (this.state.rangeMax - this._scale.min) / (this._scale.max - this._scale.min) * this._scale.width + this._maxKnob.clientWidth / 2,
        });
    }

    private _updateMinKnob(event:any) {
        if (event.value < this.state.rangeMax) {
            this.setState({
                rangeMin: event.value,
                rangeMinPosition: event.knobPosition
            });
        }
    }
    
    private _updateMaxKnob(event:any) {
        if (event.value > this.state.rangeMin) {
            this.setState({
                rangeMax: event.value,
                rangeMaxPosition: event.knobPosition
            });
        }
    }

    public render() {
        return  <div className="slider">
                    <div className="slider-scale" ref={(scale) => { 
                        if (scale) {
                            this._scale.width = scale.clientWidth;
                            this._scale.offsetLeft = scale.getBoundingClientRect().left;
                        }
                    }} />
                    <div className="slider-indicator" style={{ left:  this.state.rangeMinPosition, width: this.state.rangeMaxPosition - this.state.rangeMinPosition }} />
                    <div className="range-min slider-knob" ref={(knob) => this._minKnob = knob} style={{ left: this.state.rangeMinPosition }} onTouchStart={() => sliderKnobDrag(this._minKnob, this._scale, (e) => this._updateMinKnob(e))} onMouseDown={() => sliderKnobDrag(this._minKnob, this._scale, (e) => this._updateMinKnob(e))} />
                    <div className="range-max slider-knob" ref={(knob) => this._maxKnob = knob} style={{ left: this.state.rangeMaxPosition }} onTouchStart={() => sliderKnobDrag(this._maxKnob, this._scale, (e) => this._updateMaxKnob(e))} onMouseDown={() => sliderKnobDrag(this._maxKnob, this._scale, (e) => this._updateMaxKnob(e))} />
                    {this.state.rangeMin} - {this.state.rangeMax}
                </div>;
    }
}
