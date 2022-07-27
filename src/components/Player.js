import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, setSongs, setIsPlaying, isPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong }) => {
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const trackSkipHandler = async (direction) => {
        let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentSongIndex + 1) % songs.length]);
            songUpdateHandler(songs[(currentSongIndex + 1) % songs.length])
        }
        if (direction === "skip-back") {
            if ((currentSongIndex - 1) % songs.length === -1) {
               await setCurrentSong(songs[songs.length - 1]);
               songUpdateHandler(songs[songs.length - 1])
               if(isPlaying) audioRef.current.play();

                return;
            }
            setCurrentSong(songs[(currentSongIndex - 1) % songs.length]);
            songUpdateHandler(songs[(currentSongIndex - 1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();
    }

    const trackAnime = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    const songUpdateHandler = (prevNext) => {
        const newSong = songs.map((song) => {
            if (song.id === prevNext.id) {
                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSong);
    }

    return (
        <div className="player">
            {/* Time controller */}
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }} className="track">
                    <input min={0} onChange={dragHandler} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                    <div style={trackAnime} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            {/* Play controller next, pause, prev */}
            <div className="play-control">
                <FontAwesomeIcon onClick={() => trackSkipHandler("skip-back")} className="skip-left" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => trackSkipHandler("skip-forward")} className="skip-right" size="2x" icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Player;