function UserCard({ name, email }) {
  // สร้างคอมโพเนนต์ที่รับ props เป็น name (ชื่อ) และ email (อีเมล)

  // --- ส่วน Logic: ดึงตัวอักษรแรกมาทำตัวย่อ (Avatar) ---
  const initials = name
    .split(" ") // 1. แยกชื่อกับนามสกุลออกจากกันด้วยช่องว่าง (ได้เป็นอาร์เรย์ เช่น ["John", "Doe"])
    .map((n) => n[0]) // 2. วนลูปเอาเฉพาะตัวอักษรตัวแรกของแต่ละคำ (เช่น ["J", "D"])
    .join(""); // 3. เอาตัวอักษรเหล่านั้นมาต่อกันเป็นข้อความเดียว (เช่น "JD")

  return (
    <div
      style={{
        display: "flex", // จัดวางแนวนอน (รูปอยู่ซ้าย ข้อความอยู่ขวา)
        alignItems: "center", // จัดให้อยู่กึ่งกลางแนวตั้งพร้อมกัน
        gap: "1rem", // เว้นระยะห่างระหว่างรูปกับข้อความ 1rem
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      {/* --- ส่วนรูปวงกลม (Avatar) --- */}
      <div
        style={{
          width: "40px", // กำหนดความกว้าง 40px
          height: "40px", // กำหนดความสูง 40px
          background: "#1e40af", // พื้นหลังสีน้ำเงินเข้ม
          color: "white", // ตัวอักษรสีขาว
          borderRadius: "50%", // ทำให้เป็นรูปวงกลมเป๊ะๆ
          display: "flex", // ใช้ Flex เพื่อจัดตัวหนังสือข้างใน
          alignItems: "center", // จัดตัวหนังสือให้อยู่กึ่งกลางแนวตั้ง
          justifyContent: "center", // จัดตัวหนังสือให้อยู่กึ่งกลางแนวนอน
          fontWeight: "bold", // ตัวหนา
          fontSize: "0.9rem",
        }}
      >
        {initials} {/* แสดงตัวอักษรย่อที่คำนวณไว้ด้านบน */}
      </div>

      {/* --- ส่วนข้อความชื่อและอีเมล --- */}
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        {/* แสดงชื่อเต็ม (ตัวหนา สีเข้ม) */}

        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
        {/* แสดงอีเมล (ตัวเล็ก สีเทา) */}
      </div>
    </div>
  );
}

export default UserCard; // ส่งออกไปใช้ในหน้า Profile หรือหน้า List รายชื่อสมาชิก
