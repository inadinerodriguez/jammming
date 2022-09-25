import React from "react";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track track={this.props.searchResults.map()} onAdd={this.props.onAdd} />
      </div>
    );
  }
};

export default TrackList;
