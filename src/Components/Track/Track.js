import React from "react";
import './Track.css';


class Track extends React.Component {
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
    }
  
    renderAction() {
        if (isRemoval) {
            document.getElementsByClassName('Track-action').innerHTML = "-";
        } else {
            document.getElementsByClassName('Track-action').innerHTML.onClick(this.addTrack) = "+";

        }
    }

    addTrack() {
        this.props.track = this.props.onAdd;
    }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
           {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button className="Track-action">
            {this.renderAction}
        </button>
      </div>
    );
  }
};

export default Track;