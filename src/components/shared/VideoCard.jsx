import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useRef } from "react";

function VideoCard({ url, thumbnailUrl }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: url,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      {isPlaying ? (
        <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      ) : (
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="w-full h-auto cursor-pointer"
          onClick={() => setIsPlaying(true)}
        />
      )}
    </>
  );
}

export default VideoCard;
