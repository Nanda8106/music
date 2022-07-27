import React from "react";

const LibrarySong= ({song,songs, setCurrentSong, audioRef, isPlaying, id, setSongs}) => {
    const songSelectedHandler = async () => {
        const selectedSong = songs.filter((state) => state.id === id);
        await setCurrentSong(selectedSong[0]);
        const newSong = songs.map((song) => {
            if(song.id === id){
                return {
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active:false,
                }
            }
        }
        )
        setSongs(newSong);
        if(isPlaying) audioRef.current.play();

        
    }

    
    return(
        <div onClick={songSelectedHandler} className={`library-song ${song.active ? "active" : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;