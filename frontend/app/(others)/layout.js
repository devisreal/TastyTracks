import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";

export default function OthersLayout({ children }) {
  return (
    <>
      <Navbar instantFixed />
      {children}
      <Footer />
    </>
  );
}
