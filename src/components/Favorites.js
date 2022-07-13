import React, { Component } from "react";
import VideoCard from "../presentational/VideoCard";

export default class Favorites extends Component {
  render() {
    return (
      <div className="playlist-container">
        <h1 className="playlist-header">My Playlist</h1>

        {this.props.videos.map((vid, i) => (
          <>
            <div className={`pl-grid-${i}`}>
              <VideoCard
                video={vid}
                key={i}
                removeClick={this.props.removeFromFavorites}
              />
            </div>
          </>
        ))}
      </div>
    );
  }
}
