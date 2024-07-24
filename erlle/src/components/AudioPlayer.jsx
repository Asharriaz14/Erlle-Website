import { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import audioFile from "../assets/King Shit-Shubh.mp3";
import playIcon from '../assets/play.png';
import pauseIcon from '../assets/pause.png';
import PropTypes from "prop-types";


const AudioPlayer = ({ songData }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#2E2E2E",
      progressColor: "#D7D7D7",
      cursorColor: "transparent",
      barWidth: 5,
      barGap: 6,
      barRadius: 10,
      responsive: true,
      height: 80,
      normalize: true,
      backend: "WebAudio",
    });

    wavesurfer.current.load(audioFile);

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("error", (error) => {
      console.error("WaveSurfer error:", error);
    });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioFile]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const formatTime = (time) => {
    return new Date(time * 1000).toISOString().substr(14, 5);
  };

  return (
    <div className="py-2 px-4 max-w-screen-2xl mx-auto md:px-20 lg:mx-28 xl:mx-52 2xl:m-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-3">
        <p className="text-2xl font-bold text-[#D7D7D7] md:text-lg mb-2 ">Music Preview</p>
        <div className="flex flex-col md:flex-col justify-between items-center">
          <p className="text-[#A0A0A0] text-md mb-2">Total Tracks: {songData ? songData.allow_listen : "Loading"}</p>
          <p className="text-[#A0A0A0] text-md mb-2">Purchase for full listening experience</p>
        </div>
      </div>
      <div className="flex py-2 px-4 max-w-screen-2xl mx-auto">
        <div>
          <div onClick={handlePlayPause} className="bg-[#d7d7d7] my-2 p-4 rounded-full cursor-pointer">
            <img src={playing ? pauseIcon : playIcon} width={40} height={40} alt="Play/Pause" />
          </div>
        </div>
        <div className="w-full ml-3">
          <div ref={waveformRef} style={{ width: "100%" }} id="waveform" />
          <div className="flex flex-row md:flex-row justify-between items-center gap-10 mt-3 text-[#D7D7D7] rounded-[4px] py-[8px] px-[15px] text-[.8rem]">
            <span className="col-1 text-white">{formatTime(currentTime)}</span>
            <span className="col-1 text-white">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
AudioPlayer.propTypes = {
  songData: PropTypes.shape({
    allow_listen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};
export default AudioPlayer;
