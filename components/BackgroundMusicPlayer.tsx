'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

export default function BackgroundMusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const widgetRef = useRef<any>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    // The 3 SoundCloud tracks
    const tracks = [
        'https://soundcloud.com/patlax/dj-pat-lax-bald-kitty-dj-set',
        'https://soundcloud.com/patlax/culturfm-live-mix',
        'https://soundcloud.com/patlax/pheelz-concert-after-party'
    ];

    const trackNames = [
        'NO WAHALA HTX',
        'CULTUR.FM LIVE',
        'NBA All Star Weekend'
    ];

    useEffect(() => {
        // Load SoundCloud Widget API
        if (!(window as any).SC) {
            const script = document.createElement('script');
            script.src = 'https://w.soundcloud.com/player/api.js';
            script.async = true;
            document.body.appendChild(script);
        }

        // Play on first user interaction
        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                setIsPlaying(true);
                setShowPlayer(true);

                // Remove listeners after first interaction
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('scroll', handleFirstInteraction);
            }
        };

        // Listen for ANY user interaction
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('scroll', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
        };
    }, [hasInteracted]);

    useEffect(() => {
        if (hasInteracted && (window as any).SC) {
            const iframe = playerContainerRef.current?.querySelector('iframe');
            if (!iframe) return;

            const widget = (window as any).SC.Widget(iframe);
            widgetRef.current = widget;

            widget.bind((window as any).SC.Widget.Events.READY, () => {
                // Start at volume 0 and fade in
                widget.setVolume(0);
                widget.play();

                // Fade in gradually over 5 seconds
                let currentVol = 0;
                const targetVol = 50;
                const fadeInterval = setInterval(() => {
                    currentVol += 1;
                    widget.setVolume(currentVol);
                    if (currentVol >= targetVol) {
                        clearInterval(fadeInterval);
                        setVolume(targetVol);
                    }
                }, 100); // 5 seconds total (50 steps * 100ms)
            });

            // Auto-advance to next track when current finishes
            widget.bind((window as any).SC.Widget.Events.FINISH, () => {
                nextTrack();
            });
        }
    }, [hasInteracted, currentTrack]);

    useEffect(() => {
        if (widgetRef.current) {
            if (isPlaying) {
                widgetRef.current.play();
            } else {
                widgetRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (widgetRef.current) {
            widgetRef.current.setVolume(isMuted ? 0 : volume);
        }
    }, [isMuted, volume]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            // Volume restores to 'volume' state automatically via useEffect
        } else {
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        } else if (newVolume === 0 && !isMuted) {
            setIsMuted(true);
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    const previousTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    if (!hasInteracted) return null;

    return (
        <>
            {/* Hidden SoundCloud iframe */}
            <div ref={playerContainerRef} className="hidden">
                <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(tracks[currentTrack])}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
                />
            </div>

            {/* Visible mini player - BOTTOM LEFT */}
            {showPlayer && (
                <div
                    className="fixed bottom-6 left-6 z-40 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{ minWidth: '280px' }}
                >
                    {/* Now Playing */}
                    <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Now Playing</div>
                        <div className="text-sm font-semibold text-white truncate">
                            {trackNames[currentTrack]}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                            Track {currentTrack + 1} of {tracks.length}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Previous Track */}
                        <button
                            onClick={previousTrack}
                            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Previous track"
                        >
                            <SkipBack className="w-4 h-4 text-white" />
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-white" />
                            ) : (
                                <Play className="w-5 h-5 text-white ml-0.5" />
                            )}
                        </button>

                        {/* Next Track */}
                        <button
                            onClick={nextTrack}
                            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Next track"
                        >
                            <SkipForward className="w-4 h-4 text-white" />
                        </button>

                        {/* Volume Control Group */}
                        <div className="flex items-center gap-2 ml-auto group">
                            {/* Volume Icon */}
                            <button
                                onClick={toggleMute}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="w-4 h-4 text-white" />
                                ) : (
                                    <Volume2 className="w-4 h-4 text-white" />
                                )}
                            </button>

                            {/* Volume Slider */}
                            <div className="w-20 transition-all duration-300 ease-in-out">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Track Progress Dots */}
                    <div className="mt-3 flex gap-1.5 justify-center">
                        {tracks.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTrack(idx)}
                                className={`h-1.5 transition-all ${idx === currentTrack
                                    ? 'bg-orange-500 w-8'
                                    : 'bg-white/20 w-1.5 hover:bg-white/40'
                                    } rounded-full`}
                                aria-label={`Play track ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
