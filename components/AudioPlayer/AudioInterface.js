import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import playIcon from "/public/assets/icons/round_play_arrow_black.png";
import pauseIcon from "/public/assets/icons/round_pause_black.png";
import nextIcon from "/public/assets/icons/round_skip_next_black.png";
import previousIcon from "/public/assets/icons/round_skip_previous_black.png";
import musicIcon from "/public/assets/icons/round_audiotrack_black.png";
import Image from "next/image";

import useSound from "use-sound";

import sound1 from "public/assets/sounds/musicfox_the_small_farm.mp3";
import sound2 from "public/assets/sounds/musicfox_shopping_street.mp3";
import sound3 from "public/assets/sounds/musicfox_old_news.mp3";
import AudioPlayer from "./Audio2";

const soundTest = [sound1, sound2, sound3];

const sounds = {
  sound1: { title: "The Small Farm", file: sound1 },
  sound2: { title: "shopping Street", file: sound2 },
  sound3: { title: "Old News", file: sound3 },
};

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

const AudioVolumeSlider = styled.input`
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

const MusicTitel = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  color: var(--text-color);
`;

export default function AudioInterface() {
  const [hovered, setHovered] = useState(false);
  const [currentSound, setCurrentSound] = useState("sound1");
  const [playing, setPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(sounds[currentSound].title);
  const [volume, setVolume] = useState(0.05);
  //
  //

  const [play, { stop }] = useSound(soundTest, {
    interrupt: true,
    volume,
    onload: () => {
      //setPlaying(true);
      //handlePlayPause();
      //console.log("ONLOAD");
      //play();
    },
    //onend: () => handleNextAuto(),
    onPlayError: () => {
      console.error("Error occured!");
    },
  });

  function handlePlayPause() {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      play();
      setPlaying(true);
    }
  }

  function handlePrevious() {
    stop();
    setPlaying(false);
    const soundKeys = Object.keys(sounds);
    const currentIndex = soundKeys.indexOf(currentSound);
    const previousIndex =
      (currentIndex - 1 + soundKeys.length) % soundKeys.length;
    console.log("previousIndex: ", previousIndex);
    setCurrentSound(soundKeys[previousIndex]);
    setCurrentTitle(sounds[soundKeys[previousIndex]].title);
    // if (playing) {
    //  play();
    //}
  }

  function handleNext() {
    console.log("Handle Next");
    play({ id: 2 });

    /*stop();
    setPlaying(false);
    const soundKeys = Object.keys(sounds);
    const currentIndex = soundKeys.indexOf(currentSound);
    const nextIndex = (currentIndex + 1) % soundKeys.length;
    setCurrentSound(soundKeys[nextIndex]);
    setCurrentTitle(sounds[soundKeys[nextIndex]].title);
    if (playing) {
      play();
    }*/
  }
  function handleNextAuto() {
    //stop();
    const soundKeys = Object.keys(sounds);
    const currentIndex = soundKeys.indexOf(currentSound);
    const nextIndex = (currentIndex + 1) % soundKeys.length;
    setCurrentSound(soundKeys[nextIndex]);
    setCurrentTitle(sounds[soundKeys[nextIndex]].title);
    if (playing) {
      play();
    }
  }

  function handleSliderChange(event) {
    setVolume(event.target.value);
  }

  return (
    <>
      <ActivatingInterfaceButton
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setHovered(true)}
      >
        <Image src={musicIcon} alt="MusicIcon" width={40} height={40}></Image>
      </ActivatingInterfaceButton>
      {hovered && (
        <AudioInterfaceWraper onMouseLeave={() => setHovered(false)}>
          <AudioInterfaceContainer>
            <AudioVolumeSlider
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleSliderChange}
            />
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
                  src={playing ? pauseIcon : playIcon}
                  alt={`${playing ? "Pause" : "Play"} Icon`}
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
            <MusicTitel>{currentTitle}</MusicTitel>
          </AudioInterfaceContainer>
        </AudioInterfaceWraper>
      )}
    </>
  );
}
