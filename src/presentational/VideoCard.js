import React, { Component } from "react";
import YouTube from "react-youtube";

export default class VideoCard extends Component {

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <div className="card" key={this.props.key}>
        <div className="image">
          <img src={this.props.video.thumbnail} alt="video thumbnail" />
        </div>
        <div className="title">
          <p>{this.props.video.title}</p>
        </div>
        <div className="modalComponent">
            <YouTube videoId={this.props.video.id} opts={opts} onReady={this._onReady} />
          <button className="play-btn">Play Now</button>
        </div>
        <div className="conditional">
          {/* {this.state.location === "favorites" ? (
            <button
              className="remove-btn"
              onClick={() => this.props.removeClick(this.props.video)}
            >
              Remove from Favorites
            </button>
          ) : ( */}
          <button
            className="add-btn"
            onClick={() => this.props.buttonClick(this.props.video)}
          >
            Add to Favorites
          </button>
          {/* )} */}
        </div>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
