import { Inter, Roboto, Monoton } from "next/font/google";
import "../resources/styles/styles.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ['300','400','500','700'], variable: "--font-roboto" });
const monoton = Monoton({ subsets: ["latin"], weight:['400'], variable: "--font-monoton" });

export const metadata = {
  title: "Waves",
  description: "An E-commerce web application for Guitars!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.variable} ${monoton.variable}`}>
        {children}
      </body>
    </html>
  );
}