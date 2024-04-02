import Image from "next/image";
import styles from "./page.module.css";
// import Dashboard from "./dashboard/page"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1 className="roboto">Hello</h1>
          <h1 className="monoton">Hello</h1>
          <h1>Hello</h1>
      </div>
    </main>
  );
}
