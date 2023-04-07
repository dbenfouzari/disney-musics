import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { libraryData, Movies } from "@/data";

export type MovieScreenProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MovieScreen({ title, musics }: MovieScreenProps) {
  return (
    <div>
      <h1>{title}</h1>

      <ul>
        {Object.entries(musics).map(([key, obj]) => (
          <li key={key}>
            <Link href={`/musics/${key}`}>
              <Image src={obj.image} alt={obj.title} width={150} height={100} />
              <p>{obj.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
    props: movieMusics,
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
