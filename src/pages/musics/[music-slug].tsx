import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { GetStaticPathsResult } from "next/types";
import { useCallback, useState } from "react";
import classes from "./music.module.css";
import { libraryData, MusicKeys } from "@/data";
import { useControls } from "@/hooks/use-controls";
import { usePlayer } from "@/hooks/use-player";
import { splitSecondsIntoUnits, unitsToString } from "@/utils/duration-format";

type MusicScreenProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Music({ video, image, title }: MusicScreenProps) {
  const [videoHidden, setVideoHidden] = useState(true);

  const [
    videoRef,
    { currentTime, duration, onPlayPress, onStopPress, buttonContent, onPeek },
  ] = usePlayer<HTMLVideoElement>();

  const [containerRef, { controlsVisible, controlsRef }] = useControls();

  const handleToggleVideoPress = useCallback(() => {
    setVideoHidden((prev) => !prev);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div ref={containerRef} className={classes.container}>
        <video ref={videoRef} src={video} className={classes.video} />
        <Image
          src={image}
          alt="The Lion King"
          fill
          style={{ display: videoHidden ? "block" : "none" }}
          className={classes.image}
        />

        <div className={classes.controls_target}></div>

        <div
          ref={controlsRef}
          className={[
            classes.controls,
            controlsVisible && classes.controls__visible,
          ].join(" ")}
        >
          <div className={classes.timeline} onClick={onPeek}>
            <span
              className={classes.timeline_current}
              style={{ width: (currentTime / duration) * 100 + "%" }}
            ></span>
          </div>

          <div className={classes.controls_inner}>
            <span>
              {unitsToString(splitSecondsIntoUnits(currentTime))} /{" "}
              {unitsToString(splitSecondsIntoUnits(duration))}
            </span>

            <button className={classes.button} onClick={onStopPress}>
              &#x23F9;
            </button>
            <button className={classes.button} onClick={onPlayPress}>
              {buttonContent}
            </button>
            <button className={classes.button} onClick={handleToggleVideoPress}>
              &#x1F3A5;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{
    "music-slug": MusicKeys;
  }>
) {
  if (!context.params) {
    throw new Error("No param given");
  }

  const allMusicObjects = Object.values(libraryData).map(
    (obj) => obj.musics
  )[0];
  const matchingMusicObject = allMusicObjects[context.params!["music-slug"]];

  if (!matchingMusicObject) {
    throw new Error("Could not find music with this slug.");
  }

  return {
    props: matchingMusicObject,
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.values(libraryData).reduce((acc, data) => {
      Object.keys(data.musics).forEach((musicSlug) => {
        acc.push({
          params: { "music-slug": musicSlug },
        });
      });
      return acc;
    }, [] as GetStaticPathsResult["paths"]),
    fallback: false,
  };
};
