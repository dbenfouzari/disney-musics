export const libraryData = {
  "lion-king": {
    title: "Le Roi Lion",
    image: "/images/lion-king.jpeg",
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
      "can-you-feel-the-love-tonight": {
        title: "L'Amour brille sous les étoiles",
        image: "/images/can-you-feel-the-love-tonight.webp",
        video: "/videos/can-you-feel-the-love-tonight.mp4",
      },
      "be-prepared": {
        title: "Soyez prêtes",
        image: "/images/be-prepared.webp",
        video: "/videos/be-prepared.mp4",
      },
      "je-voudrais-etre-roi": {
        title: "Je voudrais déjà être roi",
        image: "/images/je-voudrais-etre-roi.jpg",
        video: "/videos/je-voudrais-etre-roi.mp4",
      },
    },
  },
  vaiana: {
    title: "Vaiana",
    image: "/images/vaiana.webp",
    musics: {
      "pour-les-hommes": {
        title: "Pour les hommes",
        image: "/images/pour-les-hommes.jpeg",
        video: "/videos/pour-les-hommes.mp4",
      },
      "notre-terre": {
        title: "Notre terre",
        image: "/images/notre-terre.jpeg",
        video: "/videos/notre-terre.mp4",
      },
      "bleu-lumiere": {
        title: "Bleu lumière",
        image: "/images/bleu-lumiere.jpeg",
        video: "/videos/bleu-lumiere.mp4",
      },
      explorateur: {
        title: "L'explorateur",
        image: "/images/explorateur.webp",
        video: "/videos/explorateur.mp4",
      },
      "bling-bling": {
        title: "Bling bling",
        image: "/images/bling-bling.jpeg",
        video: "/videos/bling-bling.mp4",
      },
      "je-suis-vaiana": {
        title: "Je suis Vaiana",
        image: "/images/je-suis-vaiana.jpeg",
        video: "/videos/je-suis-vaiana.mp4",
      },
    },
  },
};

export type LibraryData = typeof libraryData;
export type Movies = keyof LibraryData;
export type MusicsObj<Movie extends Movies = Movies> =
  LibraryData[Movie]["musics"];
export type MusicKeys = keyof MusicsObj;
