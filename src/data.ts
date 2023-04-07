export const libraryData = {
  "lion-king": {
    title: "Le Roi Lion",
    image: "/images/lion-king.png",
    musics: {
      "hakuna-matata": {
        title: "Hakuna Matata",
        image: "/images/hakuna-matata.webp",
        video: "/videos/hakuna-matata.mp4",
      },
      "histoire-de-la-vie": {
        title: "L'histoire de la vie",
        image: "/images/circle-of-life.webp",
        video: "/videos/histoire-de-la-vie.mp4",
      },
    },
  },
};

export type LibraryData = typeof libraryData;
export type Movies = keyof LibraryData;
export type MusicsObj<Movie extends Movies = Movies> =
  LibraryData[Movie]["musics"];
export type MusicKeys = keyof MusicsObj;
