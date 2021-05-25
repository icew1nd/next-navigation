import Image from "next/image";
import { useState, useEffect } from "react";

import Link from "next/link";

import styles from "../styles/Home.module.css";

const Header = ({ menu }) => {
  return (
    <div className={styles.header}>
      <div>Some cool logo</div>
      <div className={styles.splitter} />
      <div className={styles.linkWrapper}>
        {menu.map(link => (
          <Link href={link.link} passHref>
            <a className={styles.link}>{link.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Footer = ({ menu }) => {
  return (
    <footer className={styles.footer}>
      <div>Copyright © verycoolsite.com</div>
      <div className={styles.splitter} />
      <div className={styles.linkWrapper}>
        {menu.map(link => (
          <Link href={link.link} passHref>
            <a className={styles.link}>{link.name} </a>
          </Link>
        ))}
      </div>
    </footer>
  );
};

function Index({ navigation, content, headline }) {
  const [stateNavigation, setStateNavigation] = useState({
    headerNav: [],
    footerNav: []
  });
  useEffect(() => {
    if (navigation) {
      setStateNavigation(navigation);
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header menu={stateNavigation.headerNav} />
        <Content content={content} headline={headline} />
        <Footer menu={stateNavigation.footerNav} />
      </div>
    </div>
  );
}

const Content = ({ content, headline }) => {
  return (
    <div className={styles.content}>
      <div className={styles.catWrapper}>
        <Image src="/cats.png" layout="fill" />
      </div>
      <h1>{headline}</h1>
      <div>{content.content}</div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const page = context.params.index;

  let navigation = null;
  if (context.req.url && !context.req.url.startsWith("/_next/data")) {
    const res = await fetch(
      `https://60ac26145a4de40017ccb8ce.mockapi.io/navigation`
    );
    navigation = await res.json();
  }

  const contentRes = await fetch(
    `https://60ac26145a4de40017ccb8ce.mockapi.io/content?${page}`
  );
  const content = await contentRes.json();

  return {
    props: { navigation, content, headline: page }
  };
}

export default Index;
