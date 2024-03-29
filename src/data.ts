type Music = {
  title: string;
  image: string;
  video: string;
};

type Musics = Record<string, Music>;

type Movie = {
  title: string;
  image: string;
  musics: Musics;
};

type Data = Record<string, Movie>;

export const libraryData: Data = {
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
  aladdin: {
    title: "Aladdin",
    image: "/images/aladdin.jpeg",
    musics: {
      "prince-ali": {
        title: "Prince Ali",
        image: "/images/prince-ali.jpeg",
        video: "/videos/prince-ali.mp4",
      },
      "ce-reve-bleu": {
        title: "Ce rêve bleu",
        image: "/images/ce-reve-bleu.jpeg",
        video: "/videos/ce-reve-bleu.mp4",
      },
      "ton-meilleur-ami": {
        title: "Ton meilleur ami",
        image: "/images/ton-meilleur-ami.jpeg",
        video: "/videos/ton-meilleur-ami.mp4",
      },
    },
  },
  "livre-de-la-jungle": {
    title: "Le Livre de la Jungle",
    image: "/images/livre-de-la-jungle.webp",
    musics: {
      "bare-necessities": {
        title: "Il en faut peu pour être heureux",
        image: "/images/bare-necessities.jpeg",
        video: "/videos/bare-necessities.mp4",
      },
    },
  },
  pocahontas: {
    title: "Pocahontas",
    image: "/images/pocahontas.webp",
    musics: {
      "air-vent": {
        title: "L'air du vent",
        image: "/images/air-vent.jpeg",
        video: "/videos/air-vent.mp4",
      },
      "des-sauvages": {
        title: "Des sauvages",
        image: "/images/des-sauvages.jpeg",
        video: "/videos/des-sauvages.mp4",
      },
    },
  },
};

export type LibraryData = typeof libraryData;
export type Movies = keyof LibraryData;
export type MusicsObj<Movie extends Movies = Movies> =
  LibraryData[Movie]["musics"];
export type MusicKeys = keyof MusicsObj;
