import React, { Component } from "react";
import VideoCard from "../presentational/VideoCard";

export default class VideoContainer extends Component {
  render() {
    console.log(this.props.videos);
    return (
      <div className="video-container">
        <h2 className="video-header">Ready to Learn Some Life Skills?</h2>
        <p className="video-subheader">
          Your Best Bet for Everything You Didn't Learn in School
        </p>
        {this.props.videos.map((vid, i) => (
          <>
            <div className={`video-grid-${i}`}>
              <VideoCard
                video={vid}
                key={i}
                buttonClick={this.props.buttonClick}
              />
            </div>
          </>
        ))}

        {/* <div>
          {this.props.videos.forEach((vid) => {
            <div className={vid.id}>
              <VideoCard video={vid} key={vid.id} addToFavorites={this.props.addToFavorites} />
            </div>;
          })}
        </div> */}
      </div>
    );
  }
}
