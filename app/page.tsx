"use client";

import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import DataSelector from "@/components/DataSelector/DataSelector";
import Footer from "@/components/Footer/Footer";

export default function Home() {

  return (
    <div className={styles.container}>
      <Header />
      <DataSelector />
      <Footer />
    </div>
  );
}
