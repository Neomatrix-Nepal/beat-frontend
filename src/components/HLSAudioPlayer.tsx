"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Hls from "hls.js";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioPlayerProps {
  title?: string;
  sub?: string;
  audioSrc: string; // .m3u8 playlist URL
}

const CustomAudioPlayer = ({ title, sub, audioSrc }: AudioPlayerProps) => {
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    const internalAudio = playerRef.current?.audio.current;
    if (!internalAudio) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        debug: process.env.NODE_ENV === "development" ? true : false,
        autoStartLoad: true,
      });
      hls.loadSource(audioSrc);
      hls.attachMedia(internalAudio);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest parsed");
        // internalAudio.play(); // Optional autoplay
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", event, data);
      });
    } else if (internalAudio.canPlayType("application/vnd.apple.mpegurl")) {
      internalAudio.src = audioSrc;
    } else {
      console.error("HLS is not supported in this browser.");
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [audioSrc]);

  return (
    <div>
      {title && (
        <div className="flex items-center w-full gap-3 ml-5">
          <div className="w-full">
            <h3 className="text-white text-[16px] leading-5">{title}</h3>
            <Link href="/producer">
              <p className="text-[12px] text-[#8C9092] mt-1">{sub}</p>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-3 -ml-5">
        <AudioPlayer
          className="custom-audio-player"
          ref={playerRef}
          autoPlay={false}
          showJumpControls={false}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          layout="horizontal-reverse"
          style={{
            background: "transparent",
            boxShadow: "none",
          }}
        />
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
