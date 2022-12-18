import React, { useEffect, useState } from "react";
import qala from "../assets/qala.mp3";
import useSound from "use-sound";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(qala);

  const [currTime, setCurrTime] = useState({ min: "", sec: "" });
  const [seconds, setSeconds] = useState();

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  //duration provided in milliseconds. we have converted into min and sec
 useEffect(()=>{
  const sec = duration/1000;
  const min = Math.floor(sec/60);
  const secRemain = Math.floor(sec%60);

  const time={
    min:min,
    sec:secRemain
  }
 },[])
  useEffect(() => {
    //we are running the function every sec to change the current position of he audio
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); //setting the second state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);

        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound]);
  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img className="musicCover" src="https://picsum.photos/200/200" />
      <div>
        <h3 className="title">Rubaiyyan</h3>
        <p className="subTitle">Qula</p>
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>time</p>
        </div>
        <input
        type={"range"}
        min="0"
        max={duration/1000}
        default="0"
        value={seconds}
        className="timelines"
        onChange={(e)=>{
          sound.seek([e.target.value])
        }}/>
      </div>
    </div>
  );
};
