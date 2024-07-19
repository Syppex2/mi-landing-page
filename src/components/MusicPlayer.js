import React, { useContext } from 'react';
import { MusicContext } from '../MusicContext';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const { volume, setVolume, play, pause, isPlaying } = useContext(MusicContext);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="music-player">
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? 'Pausar' : 'Reproducir'}
      </button>
      <label>
        Volumen:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>
    </div>
  );
};

export default MusicPlayer;
