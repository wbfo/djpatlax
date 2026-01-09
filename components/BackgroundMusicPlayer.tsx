'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, ChevronRight, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SCWidget {
    play: () => void;
    pause: () => void;
    setVolume: (volume: number) => void;
    bind: (event: string, callback: () => void) => void;
}

interface WindowWithSC extends Window {
    SC: {
        Widget: {
            (iframe: HTMLIFrameElement): SCWidget;
            Events: {
                READY: string;
                FINISH: string;
            };
        };
    };
}

export default function BackgroundMusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const widgetRef = useRef<SCWidget | null>(null);
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

    const nextTrack = useCallback(() => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
    }, [tracks.length]);

    const previousTrack = useCallback(() => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    }, [tracks.length]);

    useEffect(() => {
        // Load SoundCloud Widget API
        const win = window as unknown as WindowWithSC;
        if (!win.SC) {
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
        const win = window as unknown as WindowWithSC;
        if (hasInteracted && win.SC) {
            const iframe = playerContainerRef.current?.querySelector('iframe');
            if (!iframe) return;

            const widget = win.SC.Widget(iframe);
            widgetRef.current = widget;

            widget.bind(win.SC.Widget.Events.READY, () => {
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
                        // Auto-collapse after fade-in
                        setTimeout(() => setIsCollapsed(true), 1000);
                    }
                }, 100); // 5 seconds total (50 steps * 100ms)
            });

            // Auto-advance to next track when current finishes
            widget.bind(win.SC.Widget.Events.FINISH, () => {
                nextTrack();
            });
        }
    }, [hasInteracted, currentTrack, nextTrack]);

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

            {/* Visible Player Widget */}
            <AnimatePresence mode="wait">
                {showPlayer && (
                    <motion.div
                        key={isCollapsed ? 'collapsed' : 'expanded'}
                        initial={{ opacity: 0, scale: 0.9, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-6 left-6 z-40"
                    >
                        {isCollapsed ? (
                            /* Collapsed View */
                            <button
                                onClick={() => setIsCollapsed(false)}
                                className="group relative flex items-center justify-center w-12 h-12 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                                aria-label="Expand player"
                            >
                                <Music className={`w-5 h-5 text-orange-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-black animate-ping opacity-75" />

                                {/* Tooltip on hover */}
                                <div className="absolute left-full ml-3 px-3 py-1 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    <div className="text-[10px] text-gray-500">Now Playing</div>
                                    <div className="text-xs font-medium text-white">{trackNames[currentTrack]}</div>
                                </div>
                            </button>
                        ) : (
                            /* Expanded View */
                            <div
                                className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                                style={{ minWidth: '280px' }}
                            >
                                {/* Header with Collapse Toggle */}
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-0.5">Now Playing</div>
                                        <div className="text-sm font-semibold text-white truncate max-w-[180px]">
                                            {trackNames[currentTrack]}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsCollapsed(true)}
                                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                        aria-label="Collapse player"
                                    >
                                        <ChevronRight className="w-5 h-5 rotate-180" />
                                    </button>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={previousTrack}
                                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                        aria-label="Previous track"
                                    >
                                        <SkipBack className="w-4 h-4 text-white" />
                                    </button>

                                    <button
                                        onClick={togglePlay}
                                        className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors shadow-lg shadow-orange-500/20"
                                        aria-label={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 text-white" />
                                        ) : (
                                            <Play className="w-5 h-5 text-white ml-0.5" />
                                        )}
                                    </button>

                                    <button
                                        onClick={nextTrack}
                                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                        aria-label="Next track"
                                    >
                                        <SkipForward className="w-4 h-4 text-white" />
                                    </button>

                                    <div className="flex items-center gap-2 ml-auto group/vol">
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

                                        <div className="w-20 transition-all duration-300">
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
                                <div className="mt-4 flex gap-1.5 justify-center">
                                    {tracks.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentTrack(idx)}
                                            className={`h-1.5 transition-all duration-300 ${idx === currentTrack
                                                ? 'bg-orange-500 w-8'
                                                : 'bg-white/20 w-1.5 hover:bg-white/40'
                                                } rounded-full`}
                                            aria-label={`Play track ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
