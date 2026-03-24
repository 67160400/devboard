function PostSkeleton() {
  // สร้างคอมโพเนนต์ชื่อ PostSkeleton (แปลว่า "โครงกระดูก" ของโพสต์)

  return (
    <div
      style={{
        border: "1px solid #e2e8f0", // ขอบสีเทาอ่อน
        borderRadius: "8px", // มุมโค้งมน 8px ให้เหมือน PostCard จริง
        padding: "1rem", // ระยะห่างข้างในกล่อง
        marginBottom: "1rem", // ระยะห่างระหว่างกล่อง (เวลาโชว์หลายอัน)
        background: "white", // พื้นหลังสีขาว
      }}
    >
      {/* --- ส่วนจำลองหัวข้อ (Title) --- */}
      <div
        style={{
          height: "20px", // ความสูงของแถบหัวใจ
          width: "60%", // ความกว้างแค่ 60% (ให้ดูเหมือนหัวข้อสั้นๆ)
          background: "#e2e8f0", // สีเทาอ่อน (แทนที่ตัวหนังสือ)
          borderRadius: "4px", // ขอบโค้งมนนิดหน่อย
          marginBottom: "0.75rem", // เว้นระยะห่างด้านล่าง
        }}
      ></div>

      {/* --- ส่วนจำลองเนื้อหาบรรทัดที่ 1 (Body Line 1) --- */}
      <div
        style={{
          height: "14px", // ความสูงของแถบเนื้อหา (จะเตี้ยกว่าหัวข้อ)
          width: "100%", // ยาวเต็มบรรทัด
          background: "#e2e8f0", // สีเทาอ่อน
          borderRadius: "4px",
          marginBottom: "0.5rem", // เว้นระยะห่างระหว่างบรรทัดเนื้อหา
        }}
      ></div>

      {/* --- ส่วนจำลองเนื้อหาบรรทัดที่ 2 (Body Line 2) --- */}
      <div
        style={{
          height: "14px", // ความสูงเท่ากับบรรทัดแรก
          width: "85%", // ยาวแค่ 85% (ให้ดูเหมือนจบบรรทัดสุดท้ายของย่อหน้า)
          background: "#e2e8f0", // สีเทาอ่อน
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
}

export default PostSkeleton; // ส่งออกไปใช้ในหน้า List ตอนที่สถานะ loading เป็น true
