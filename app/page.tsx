import Navbar from "./components/navbar";
import ImageSlider from "./components/ImageSlider";
import Announcements from "./components/announcements";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar/>
      <ImageSlider />
      <Announcements/>
      {/* other content */}
      <Footer/>
    </main>
  );
}
