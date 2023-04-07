import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { libraryData } from "@/data";

export type MusicListPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MusicListPage({ data }: MusicListPageProps) {
  return (
    <div>
      <h1>Liste des Disney</h1>

      <ul>
        {Object.entries(data).map(([key, obj]) => (
          <li key={key}>
            <Link href={`/movies/${key}`}>
              <Image src={obj.image} alt={obj.title} width={150} height={100} />
              <p>{obj.title}</p>
            </Link>
          </li>
        ))}
      </ul>
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
