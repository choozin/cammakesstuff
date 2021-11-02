/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";

import styles from "./layout.module.css";

import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const bgImages = [
  "/images/milkyway.jpeg",
  "/images/sombrero.jpg",
  "/images/andromeda.jpg",
];

export default function Layout({ children, nav, pageStyle, logo, theme, header }) {
  let navigation;
  switch (nav) {
    case "navbar":
      navigation = <Navbar />;
      break;

    case "navball":
      navigation = "navball";
      break;

    case "none":
      navigation = "";
      break;
  }

  let page;
  switch (pageStyle) {
    case "thin":
      page = (
        <>
          <div
            style={{
              top: "0",
              width: "100vw",
              height: "100vh",
              position: "fixed",
              zIndex: -10,
            }}
          >
            <Image
              src={bgImages[0]}
              alt="Picture of the Milky Way"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className={styles.container}>
            {logo && <div
              style={{
                width: "100%",
                textAlign: "center",
                margin: "0 auto",
                paddingTop: "3rem",
              }}
            >
              <Image
                src="/images/cammakesstuff.png"
                alt="Cam Makes Stuff Logo"
                width="340px"
                height="340px"
              />
            </div> }
            <main className={styles.main}>{children}</main>
          </div>
        </>
      );
      break;

    case "full-width":
      page = <div className={styles.fullWidth}>{children}</div>;
      break;

    case "landingPage":
      page = (
        <div className={styles.landingPage}>
          <section className={styles.showcase}>
            <header>
              <button onClick={() => window.history.back}>
                <h2 className={styles.logo}>SPACE</h2>
              </button>
              <div className={styles.toggle}></div>
            </header>

            <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=W0LHTWG-UmQ"></iframe>
            <div className={styles.overlay}></div>

            <div className={styles.text}>
              <h2>Always Keep</h2>
              <h3>Reaching Higher</h3>
              <p>
                It's amazing what some discolouration along with a bold
                font can do. Look at this landing page. My God... it's
                gorgeous!
              </p>
              <p>
                <a onClick={() => window.history.back()}>Return To CamMakesStuff.com</a>
              </p>
            </div>

            <ul className={styles.social}>
              <li>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </section>

          <div className={styles.menu}>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Destinations</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>
        </div>
      );
      break;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      {navigation}
      {page}
      <Footer />
    </>
  );
}
