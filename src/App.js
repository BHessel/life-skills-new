import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Login from "./components/Login";
import VideoContainer from "./components/VideoContainer";
import Favorites from "./components/Favorites";

//AIzaSyBs4r7n9CX3pz634lgccEbXaHABOrYqBac
//AIzaSyAfwqIYBrLrdr6WsciqZSWtTHeukaHApf8
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=taxes%7Chome%20improvement&key=[YOUR_API_KEY]'
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyAfwqIYBrLrdr6WsciqZSWtTHeukaHApf8
const key = "AIzaSyBs4r7n9CX3pz634lgccEbXaHABOrYqBac";
const maxResults = 50;
const finalUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=taxes%7Chome%20improvement&key=${key}`;

class App extends Component {
  state = {
    videos: [],
    currentPage: 1,
    search: "",
    favorites: [],
  };

  componentDidMount() {
    fetch(finalUrl)
      .then((response) => response.json())
      .then((YTVids) => {
        const videos = YTVids.items.map((vidObj) => vidObj);
        this.setState({ videos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToFavorites = (video) => {
    if (!this.state.favorites.includes(video)) {
      this.setState({ favorites: [...this.state.favorites, video] });
    }
  };

  removeFromFavorites = (video) => {
    let favorites = this.state.favorites.filter(
      (vid) => vid.id.videoId !== video.id.videoId
    );
    this.setState({ favorites });
  };

  render() {
    const searchVids = this.state.videos.filter((vid) =>
      vid.snippet.title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div className="App">
        <TopNavBar />
        <Routes>
          //route exact path to login Component
          <Route path="/login" element={<Login />} />
          //route path to favorites
          <Route
            path="/favorites"
            element={
              <Favorites
                removeFromFavorites={this.removeFromFavorites}
                videos={this.state.favorites.slice(
                  (this.state.currentPage - 1) * 9,
                  (this.state.currentPage - 1) * 9 + 9
                )}
              />
            }
          />
          //route path to VideoContainer
          <Route
            path="/"
            element={
              <VideoContainer
                videos={searchVids.slice(
                  (this.state.currentPage - 1) * 9,
                  (this.state.currentPage - 1) * 9 + 9
                )}
                addToFavorites={this.addToFavorites}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
