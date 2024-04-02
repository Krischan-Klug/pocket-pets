import { useState, useRef, useEffect } from "react";
import playlist from "./playlist";

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const [userInteraction, setUserInteraction] = useState(false);
  const [volume, setVolume] = useState(0.1);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = playlist[currentTrackIndex].url;
    audioRef.current.load(); // Laden der Audiodatei
    audioRef.current.volume = volume; // Setzen der Anfangslautstärke
    if (isPlaying && userInteraction) {
      audioRef.current.play().catch((error) => console.error(error)); // Versuch das Audio abzuspielen und Fehler behandeln
    }
  }, [currentTrackIndex]);

  const togglePlayPause = () => {
    if (!userInteraction) setUserInteraction(true);
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex < playlist.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return playlist.length - 1;
      }
    });
  };

  return (
    <div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext} // Automatically play the next track when current one ends
      ></audio>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        type="range"
        min="0"
        max={
          audioRef.current && !isNaN(audioRef.current.duration)
            ? audioRef.current.duration
            : 0
        }
        value={currentTime}
        onChange={handleTimeSeek}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="0.1"
        onChange={handleVolumeChange}
      />
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>
    </div>
  );
};

export default AudioPlayer;
