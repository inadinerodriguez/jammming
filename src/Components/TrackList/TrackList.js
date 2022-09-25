import React from "react";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track track={this.props.searchResults.map()} />
      </div>
    );
  }
};

export default TrackList;
