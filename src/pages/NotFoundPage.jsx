// Challenge 1 (w4) — หน้า 404
// หน้านี้จะใช้แสดงเมื่อ user เข้า URL ที่ไม่มีอยู่จริง เช่น /abc

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      {/* หัวข้อ 404 */}
      <h1 style={{ fontSize: "3rem", color: "#e53e3e" }}>404</h1>

      {/* ข้อความแจ้ง */}
      <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>

      {/* ปุ่มกลับหน้าหลัก */}
      <Link
        to="/"
        style={{
          color: "#1e40af",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
