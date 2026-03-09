import { useState } from "react";

function AddPostForm({ onAddPost }) {
  // รับ props ฟังก์ชันจาก App.jsx

  const [title, setTitle] = useState(""); // state เก็บหัวข้อโพสต์
  const [body, setBody] = useState(""); // state เก็บเนื้อหาโพสต์

  const MAX_TITLE = 100; // (Challenge) จำกัดหัวข้อไม่เกิน 100 ตัวอักษร
  const remaining = MAX_TITLE - title.length; // คำนวณจำนวนตัวอักษรที่เหลือ

  function handleSubmit(e) {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรชเมื่อกด submit

    if (!title.trim() || !body.trim()) return; // ถ้าฟอร์มว่างไม่ให้ส่ง

    onAddPost({ title, body }); // ส่งข้อมูลโพสต์ไป App.jsx

    setTitle(""); // เคลียร์ form ช่องหัวข้อ
    setBody(""); // เคลียร์ form ช่องเนื้อหา
  }

  return (
    <form
      onSubmit={handleSubmit} // เมื่อกดโพสต์ให้เรียก handleSubmit
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      {/* ช่องพิมพ์หัวข้อโพสต์ */}
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title} // เชื่อมกับ state
        maxLength={MAX_TITLE} // (Challenge) จำกัดตัวอักษร
        onChange={(e) => setTitle(e.target.value)} // อัปเดต state เมื่อพิมพ์
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.25rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* (Challenge) ตัวนับจำนวนตัวอักษร */}
      <div
        style={{
          textAlign: "right",
          fontSize: "0.8rem",
          color: remaining < 10 ? "red" : "#718096", // เหลือน้อยกว่า 10 เปลี่ยนเป็นแดง
          marginBottom: "0.5rem",
        }}
      >
        {title.length}/{MAX_TITLE}
      </div>

      {/* ช่องพิมพ์เนื้อหาโพสต์ */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body} // เชื่อมกับ state
        onChange={(e) => setBody(e.target.value)} // อัปเดต state
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {/* ปุ่มโพสต์ */}
      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm; // export component
