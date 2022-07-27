import React, { useState, useRef } from "react";
import Library from "./components/Library";
// adding components
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data"
import Nav from "./components/Nav";



function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: percentage });
  }
  const playNexHandler = async () => {
    let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  }
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} audioRef={audioRef} currentSong={currentSong} songInfo={songInfo} setSongInfo={setSongInfo} songs={songs} />
      <Library libraryStatus={libraryStatus} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} />
      <audio onEnded={playNexHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
