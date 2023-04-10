import { Meta } from "next/dist/lib/metadata/generate/meta";
import { Html, Head, Main, NextScript } from "next/document";

const appTitle = "Disney Musics";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Meta name="application-name" content={appTitle} />
        <Meta name="apple-mobile-web-app-capable" content="yes" />
        <Meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Meta name="apple-mobile-web-app-title" content={appTitle} />
        <Meta name="description" content="Read Disney musics everywhere" />
        <Meta name="format-detection" content="telephone=no" />
        <Meta name="mobile-web-app-capable" content="yes" />
        <Meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <Meta name="msapplication-TileColor" content="#FFFFFF" />
        <Meta name="msapplication-tap-highlight" content="no" />
        <Meta name="theme-color" content="#FFFFFF" />

        <link rel="apple-touch-icon" href="/images/disney-icon.png" />
        <link rel="icon" href="/images/disney-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/images/disney-icon.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
