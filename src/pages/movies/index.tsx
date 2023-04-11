import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import classes from "./movies.module.css";
import { libraryData } from "@/data";
import { aspectRatio } from "@/utils/aspect-ratio";
import { cn } from "@/utils/cn";

export type MusicListPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MusicListPage({ data }: MusicListPageProps) {
  return (
    <div className={cn(classes.page, classes.fill)}>
      <Image
        src="/images/disney.jpg"
        alt="Disney background image"
        fill
        className={classes.image_background}
      />

      <div className={classes.header}>
        <h1 className={classes.title}>Liste des Disney</h1>
      </div>

      <section className={classes.content}>
        <ul className={classes.movie_list}>
          {Object.entries(data).map(([key, obj]) => (
            <li key={key} className={classes.movie_list_item}>
              <Link href={`/movies/${key}`}>
                <Image
                  src={obj.image}
                  alt={obj.title}
                  width={250}
                  height={aspectRatio(250, 16 / 10)}
                  className={classes.movie_list_item_image}
                />
                <p>{obj.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: libraryData,
    },
  };
}
