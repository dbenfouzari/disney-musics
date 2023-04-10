import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import classes from "./movie.module.css";
import { libraryData, Movies } from "@/data";
import { aspectRatio } from "@/utils/aspect-ratio";
import { cn } from "@/utils/cn";

export type MovieScreenProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MovieScreen({
  title,
  musics,
  image,
  slug,
}: MovieScreenProps) {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={cn(classes.page, classes.fill)}>
        <Image
          src={image}
          fill
          alt={title}
          className={classes.image_background}
        />

        <div className={classes.header}>
          <button className={classes.back_button} onClick={handleGoBack}>
            <FaArrowLeft />
          </button>
          <h1 className={classes.title}>{title}</h1>
        </div>

        <section className={classes.content}>
          <h2 className={classes.content_title}>Musiques</h2>

          <ul className={classes.music_list}>
            {Object.entries(musics).map(([key, obj]) => (
              <li key={key} className={classes.music_list_item}>
                <Link href={`/movies/${slug}/musics/${key}`}>
                  <Image
                    className={classes.music_list_item_image}
                    src={obj.image}
                    alt={obj.title}
                    width={250}
                    height={aspectRatio(250, 16 / 10)}
                  />
                  <p>{obj.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ "movie-slug": Movies }>
) {
  if (!context.params) {
    throw new Error("No param given");
  }

  const movieSlug = context.params["movie-slug"];
  const movieMusics = libraryData[movieSlug];

  return {
    props: {
      slug: context.params["movie-slug"],
      ...movieMusics,
    },
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.keys(libraryData).map((slug) => ({
      params: { "movie-slug": slug },
    })),
    fallback: false,
  };
};
