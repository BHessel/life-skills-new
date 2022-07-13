import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Login from "./components/Login";
import VideoContainer from "./components/VideoContainer";
import Favorites from "./components/Favorites";
import logo from './images/logo1.png';
import Pagination from "react-js-pagination";
import "./App.css";



//AIzaSyBs4r7n9CX3pz634lgccEbXaHABOrYqBac
//AIzaSyBs4r7n9CX3pz634lgccEbXaHABOrYqBac
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=taxes%7Chome%20improvement&key=[YOUR_API_KEY]'
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyAfwqIYBrLrdr6WsciqZSWtTHeukaHApf8
// const key = "AIzaSyAfwqIYBrLrdr6WsciqZSWtTHeukaHApf8";
// const maxResults = 50;
// const finalUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=taxes%7Chome%20improvement&key=${key}`;

class App extends Component {
  state = {
    videos: [],
    currentPage: 1,
    search: "",
    favorites: [],
    videosPerPage: 9,
  };


  componentDidMount() {
    fetch('https://netflix-movie-matcher.herokuapp.com/videos')
    .then((response) => response.json())
      .then((YTVids) => {
        console.log(YTVids);
        const videos = YTVids.items.map((vidObj) => vidObj);
        this.setState({ videos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  customSearch = (e) => {
    this.setState({ search: e.target.value });
  };

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
        <TopNavBar 
          logo={logo}
          customSearch={this.customSearch}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
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
          <Route
            exact path="/"
            element={
              <VideoContainer
                videos={searchVids.slice(
                  (this.state.currentPage - 1) * 9,
                  (this.state.currentPage - 1) * 9 + 9
                )}
                // videos={this.state.videos}
                addToFavorites={this.addToFavorites}
              />
            }
          />
        </Routes>
        <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={9}
          totalItemsCount={searchVids.length}
          pageRangeDisplayed={5}
          onChange={(page) => this.setState({ currentPage: page })}
          theme="dark"
          className="pagination"
         
        />

      </div>
    );
  }
}

export default App;
