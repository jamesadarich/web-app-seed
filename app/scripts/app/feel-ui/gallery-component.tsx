import * as React from "react";
import { ContentContainerComponent } from "./content-container-component";

export class GalleryComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this.state = {
            focussedImageUrl: props.imageUrls[0]
        };
    }

    public render() {
        const { props } = this;
        return  <div className="gallery">
                    <div className="focussed-image">
                        <img src={this.state.focussedImageUrl} />
                    </div>
                    <div className="thumbnail-list">
                        {props.imageUrls.map((imageUrl: string, index: number) => <div className="thumbnail" key={index} onClick={() => this.setState({ focussedImageUrl: imageUrl })}><img src={imageUrl} /></div>)}
                    </div>
                </div>;
    }
} 
