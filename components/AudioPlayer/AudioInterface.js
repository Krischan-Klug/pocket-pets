import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import playlist from "./playlist";

import playIcon from "/public/assets/icons/round_play_arrow_black.png";
import pauseIcon from "/public/assets/icons/round_pause_black.png";
import nextIcon from "/public/assets/icons/round_skip_next_black.png";
import previousIcon from "/public/assets/icons/round_skip_previous_black.png";
import musicIcon from "/public/assets/icons/round_audiotrack_black.png";
import volumeUpIcon from "/public/assets/icons/round_volume_up_black.png";
import volumeOffIcon from "/public/assets/icons/round_volume_off_black.png";
import scheduleIcon from "/public/assets/icons/round_schedule_black.png";
import Image from "next/image";

const ActivatingInterfaceButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 90;
`;

const AudioInterfaceWraper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 90px;
  width: 150px;
  z-index: 91;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AudioInterfaceContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: var(--background-color);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeInAnimation} 0.5s ease-in-out;
`;

const AudioInterfaceButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-color);
  }
`;

const AudioSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: lightgray;
  height: 8px;
  border-radius: 5px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--accent-color);
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--accent-color);
  }
`;

const ImagesliderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
`;

const MusicTitel = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  color: var(--text-color);
`;

export default function AudioInterface() {
  const [hovered, setHovered] = useState(false);
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
    audioRef.current.load();
    audioRef.current.volume = volume;
    if (isPlaying && userInteraction) {
      audioRef.current.play().catch((error) => console.error(error));
    }
  }, [currentTrackIndex]);

  function handlePlayPause() {
    if (!userInteraction) setUserInteraction(true);
    setIsPlaying(!isPlaying);
  }

  function handlePrevious() {
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return playlist.length - 1;
      }
    });
  }

  function handleNext() {
    setCurrentTrackIndex((prevIndex) => {
      if (prevIndex < playlist.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  }

  function handleSliderChange(event) {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleTimeSeek = (event) => {
    audioRef.current.currentTime = event.target.value;
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext} // Automatically play the next track when current one ends
      ></audio>
      <ActivatingInterfaceButton
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setHovered(true)}
      >
        <Image src={musicIcon} alt="MusicIcon" width={40} height={40}></Image>
      </ActivatingInterfaceButton>
      {hovered && (
        <AudioInterfaceWraper onMouseLeave={() => setHovered(false)}>
          <AudioInterfaceContainer>
            <ImagesliderWrapper>
              <Image
                src={volume === 0 ? volumeOffIcon : volumeUpIcon}
                alt={`volume ${volume === 0 ? `Off` : `Up`} Icon`}
                width={20}
                height={20}
              ></Image>
              <AudioSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleSliderChange}
              />
            </ImagesliderWrapper>
            <div>
              <AudioInterfaceButton onClick={handlePrevious}>
                <Image
                  src={previousIcon}
                  alt="Previous Icon"
                  width={30}
                  height={30}
                ></Image>
              </AudioInterfaceButton>
              <AudioInterfaceButton onClick={handlePlayPause}>
                <Image
                  src={isPlaying ? pauseIcon : playIcon}
                  alt={`${isPlaying ? "Pause" : "Play"} Icon`}
                  width={30}
                  height={30}
                ></Image>
              </AudioInterfaceButton>
              <AudioInterfaceButton onClick={handleNext}>
                <Image
                  src={nextIcon}
                  alt="Next Icon"
                  width={30}
                  height={30}
                ></Image>
              </AudioInterfaceButton>
            </div>
            <ImagesliderWrapper>
              <Image
                src={scheduleIcon}
                alt="schedule Icon"
                width={20}
                height={20}
              ></Image>
              <AudioSlider
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
            </ImagesliderWrapper>

            <MusicTitel>{playlist[currentTrackIndex].title}</MusicTitel>
          </AudioInterfaceContainer>
        </AudioInterfaceWraper>
      )}
    </>
  );
}
