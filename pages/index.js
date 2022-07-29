import Head from "next/head";
import Header from "../components/Header";
import BankFunction from "../components/BankFunction";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bank</title>
        <meta name="description" content="My Bank (nextjs)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <BankFunction />
      <footer className="p-5 flex-col justify-end mr-4 mt-20">
        <p>Created by Ikone</p>
        <p>Do not interact with wallets that have real funds</p>
      </footer>
    </div>
  );
}
