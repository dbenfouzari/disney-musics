import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPathsResult } from "next/types";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { FaArrowLeft } from "react-icons/fa";
import classes from "./music.module.css";
import { VideoControls } from "@/components/video-controls";
import { libraryData, Movies, MusicKeys } from "@/data";
import { useFullscreenStatus } from "@/hooks/use-fullscreen-status";
import { usePlayer } from "@/hooks/use-player";
import { cn } from "@/utils/cn";

export default function MovieMusicPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const headerRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fullTitle = `${props.movie.title} | ${props.music.title}`;

  const [videoVisible, setVideoVisible] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const [
    videoRef,
    { isPlaying, onPlayPress, onStopPress, duration, currentTime, onPeek },
  ] = usePlayer<HTMLVideoElement>();

  const [, toggleFullscreen] = useFullscreenStatus(videoRef);

  const handleGoBack = useCallback(
    function handleGoBack() {
      router.back();
    },
    [router]
  );

  const toggleVideo = useCallback(() => {
    setVideoVisible((prev) => !prev);
  }, []);

  const handleOverallPress = useCallback(function handleOverallPress(
    event: MouseEvent<HTMLElement>
  ) {
    const target = event.target as HTMLElement;

    if (
      !headerRef.current?.contains(target) &&
      !controlsRef.current?.contains(target)
    ) {
      setControlsVisible((prev) => !prev);
    }
  },
  []);

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " ") {
        setControlsVisible(isPlaying);
        await onPlayPress();
      }
    },
    [isPlaying, onPlayPress]
  );

  return (
    <div
      tabIndex={0}
      onClick={handleOverallPress}
      onKeyDown={handleKeyDown}
      className={cn(
        classes.page,
        !controlsVisible && classes.page__controls_hidden
      )}
    >
      <nav ref={headerRef} className={cn(classes.header, classes.overlay)}>
        <button className={classes.header_back_button} onClick={handleGoBack}>
          <FaArrowLeft />
        </button>

        <h1 className={classes.title}>
          {props.movie.title} | {props.music.title}
        </h1>
      </nav>

      <video
        ref={videoRef}
        src={props.music.video}
        playsInline
        muted
        autoPlay
        className={classes.video}
      />

      <Image
        src={props.music.image}
        alt={fullTitle}
        fill
        className={cn(classes.image, videoVisible && classes.image__hidden)}
        priority
      />

      <VideoControls
        ref={controlsRef}
        isPlaying={isPlaying}
        className={cn(classes.overlay, classes.video_controls)}
        videoHidden={!videoVisible}
        onResumePress={onPlayPress}
        onCameraTogglePress={toggleVideo}
        onStopPress={onStopPress}
        duration={duration}
        currentTime={currentTime}
        onPeek={onPeek}
        onToggleFullscreenPress={toggleFullscreen}
      />
    </div>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{
    "movie-slug": Movies;
    "music-slug": MusicKeys;
  }>
) {
  if (!context.params) throw new Error("what");

  return {
    props: {
      movie: libraryData[context.params["movie-slug"]],
      music:
        libraryData[context.params["movie-slug"]].musics[
          context.params["music-slug"]
        ],
    },
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: GetStaticPathsResult["paths"] = [];

  Object.entries(libraryData).forEach(([movieKey, movieObj]) => {
    Object.keys(movieObj.musics).forEach((musicKey) => {
      paths.push({
        params: {
          "movie-slug": movieKey,
          "music-slug": musicKey,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};
