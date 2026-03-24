import { Link } from "react-router-dom"; // นำเข้า Link เพื่อใช้เปลี่ยนหน้าเว็บโดยที่ไม่ต้องโหลดหน้าใหม่ทั้งหมด (SPA)
import { useFavorites } from "../context/FavoritesContext"; // นำเข้าตัวช่วยดึงข้อมูล "โพสต์ที่ถูกใจ" จากส่วนกลางของแอป

function Navbar() {
  // ดึงค่า favorites (รายการ id ของโพสต์ที่ถูกใจ) ออกมาจากคลังข้อมูลส่วนกลาง (Context)
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        background: "#1e40af", // กำหนดพื้นหลังแถบเมนูเป็นสีน้ำเงิน
        color: "white", // กำหนดสีตัวอักษรเป็นสีขาว
        padding: "1rem 2rem", // เว้นระยะห่างขอบ บน-ล่าง 1 ส่วน, ซ้าย-ขวา 2 ส่วน
        display: "flex", // ใช้ Flexbox จัดวางองค์ประกอบ
        justifyContent: "space-between", // แยกโลโก้ไว้ซ้ายสุด และเมนูไว้ขวาสุด
        alignItems: "center", // จัดให้ของทุกอย่างอยู่กึ่งกลางในแนวตั้ง
      }}
    >
      {/* ส่วนโลโก้ชื่อเว็บ (กดแล้วจะเด้งไปหน้าแรก "/") */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* เมนูหน้าหลัก */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>

        {/* เมนูหน้าสมาชิก */}
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>

        {/* เมนูหน้าถูกใจ (มีการเปลี่ยนสีพื้นหลังตามเงื่อนไข) */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            // ถ้ามีรายการถูกใจมากกว่า 0 ให้พื้นหลังเป็นสีแดง (#e53e3e) ถ้าไม่มีให้โปร่งใส
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem", // เว้นระยะในปุ่ม
            borderRadius: "20px", // ทำปุ่มให้โค้งมนเหมือนแคปซูล
            fontSize: "0.9rem",
          }}
        >
          {/* แสดงไอคอนหัวใจ และถ้ามีถูกใจให้แสดงเลขจำนวนด้วย เช่น ❤️ ถูกใจ (3) */}
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar; // ส่งออกแถบเมนูไปวางไว้ด้านบนสุดของแอป (มักอยู่ใน App.jsx)
