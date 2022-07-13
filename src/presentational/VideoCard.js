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
          <img
            src={this.props.video.snippet.thumbnails.default.url}
            alt="video thumbnail"
          />
        </div>
        <div className="title">
          <p>{this.props.video.snippet.title}</p>
        </div>
        <div className="modalComponent">
          {/* <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId="" onClose={() => this.setState({isOpen: false})} /> */}
          <YouTube videoId={this.props.video.id.videoId} opts={opts} onReady={this._onReady} />;
          <button className="play-btn" onClick={this.openModal}>
            Play Now
          </button>
        </div>
        <div className="conditional">
          {this.state.location === "favorites" ? (
            <button
              className="remove-btn"
              onClick={() => this.props.removeClick(this.props.video)}
            >
              Remove from Favorites
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={() => this.props.buttonClick(this.props.video)}
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
