import React, { createContext, useState, useEffect, useRef } from 'react';

export const MusicContext = createContext();

const tracks = [
  'https://syppex2.github.io/mi-landing-page/musica.mp3',
  'https://syppex2.github.io/mi-landing-page/musica2.mp3',
  'https://syppex2.github.io/mi-landing-page/musica3.mp3',
  'https://syppex2.github.io/mi-landing-page/musica4.mp3',
];

export const MusicProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(localStorage.getItem('volume') || 0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(tracks[currentTrackIndex]));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleEnded = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[currentTrackIndex];
    console.log('Playing track:', audio.src); // Log para verificar la ruta del archivo
    if (isPlaying) {
      audio.play().catch(error => console.error('Error al reproducir audio:', error));
    }
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    localStorage.setItem('volume', volume);
  }, [volume]);

  const play = () => {
    audioRef.current.play().catch(error => console.error('Error al reproducir audio:', error));
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ volume, setVolume, play, pause, isPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};
