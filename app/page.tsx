"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [user, setUser] = useState("");

  const getInitialData = () => {
    fetch("/api/hello/")
      .then(async (res) => {
        const data = await res.json();
        console.log("Response: ", data);
        setUser(data?.message ?? "Anonymous");
      })
      .catch((err) => {
        console.log("Exception: ", err);
      });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  if (!user) return <div className={styles.page}>Loading...</div>;

  return <div className={styles.page}>{`Hello ${user}!`}</div>;
}
