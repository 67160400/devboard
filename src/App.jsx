import { BrowserRouter, Routes, Route } from "react-router-dom"; // นำเข้าเครื่องมือจัดการเส้นทาง (Routing) ของเว็บไซต์
import { FavoritesProvider } from "./context/FavoritesContext"; // นำเข้าตัวแชร์ข้อมูล "ถูกใจ" ให้ทุกหน้าเข้าถึงได้
import Navbar from "./components/Navbar"; // นำเข้าแถบเมนูนำทางด้านบน
import HomePage from "./pages/HomePage"; // นำเข้าหน้าหลัก (แสดงโพสต์ทั้งหมด)
import PostDetailPage from "./pages/PostDetailPage"; // นำเข้าหน้าแสดงรายละเอียดโพสต์เดี่ยวๆ
import ProfilePage from "./pages/ProfilePage"; // นำเข้าหน้าสมาชิก
import FavoritesPage from "./pages/FavoritesPage"; // นำเข้าหน้าโพสต์ที่กดถูกใจไว้
import NotFoundPage from "./pages/NotFoundPage"; // นำเข้าหน้า 404 (ไม่พบหน้า)

function App() {
  return (
    // 1. ครอบด้วย FavoritesProvider เพื่อให้ทุกหน้าในแอปสามารถ "อ่าน" และ "แก้ไข" รายชื่อที่ถูกใจได้
    <FavoritesProvider>
      {/* 2. BrowserRouter: เปิดใช้งานระบบ URL ในเบราว์เซอร์เพื่อให้กดเปลี่ยนหน้าได้ */}
      <BrowserRouter>
        {/* 3. Navbar: วางไว้นอก Routes เพื่อให้แถบเมนูโชว์ค้างไว้ "ทุกหน้า" ไม่หายไปไหน */}
        <Navbar />

        {/* 4. Routes: กลุ่มของเส้นทางทั้งหมดในเว็บไซต์ */}
        <Routes>
          {/* หน้าแรก: พิมพ์แค่ชื่อเว็บเฉยๆ ( / ) ให้เปิด HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* หน้าอ่านโพสต์: มี :id เป็นตัวแปร (Dynamic Path) เพื่อบอกว่ากำลังอ่านโพสต์เบอร์อะไร */}
          <Route path="/posts/:id" element={<PostDetailPage />} />

          {/* หน้าสมาชิก: พิมพ์ /profile ให้เปิด ProfilePage */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* หน้าถูกใจ: พิมพ์ /favorites ให้เปิด FavoritesPage */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* หน้า 404: ถ้า URL ที่พิมพ์ไม่ตรงกับเส้นทางไหนเลย ให้เปิด NotFoundPage */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App; // ส่งออกคอมโพเนนต์หลักเพื่อไปแสดงผลในไฟล์ main.jsx
