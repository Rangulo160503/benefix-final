import PropTypes from "prop-types";
import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    setTrack(songsData[id]);
    audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = () => {
    if (track.id > 0) {
      const newTrack = songsData[track.id - 1];
      setTrack(newTrack);
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = () => {
    if (track.id < songsData.length - 1) {
      const newTrack = songsData[track.id + 1];
      setTrack(newTrack);
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = (e) => {
    const percent = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  useEffect(() => {
    const updateTime = () => {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const percent = (current / duration) * 100;

      seekBar.current.style.width = `${Math.floor(percent)}%`;
      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };

    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = updateTime;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// ✅ Corrección ESLint: validación de props
PlayerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlayerContextProvider;
