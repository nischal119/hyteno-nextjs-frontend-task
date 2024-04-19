import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import Products from "./products/page.jsx";
export default function Home() {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
}
