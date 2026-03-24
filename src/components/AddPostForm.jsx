import { useState } from "react"; // นำเข้าตัวช่วยสร้างตัวแปร (State) เพื่อให้ React จำค่าที่พิมพ์ได้

function AddPostForm({ onAddPost }) {
  // สร้างคอมโพเนนต์ฟอร์ม โดยรับฟังก์ชัน onAddPost มาจากไฟล์หลัก (App.jsx) เพื่อส่งข้อมูลกลับไป

  const [title, setTitle] = useState(""); // สร้างตัวแปร title เก็บหัวข้อโพสต์ (เริ่มจากว่างเปล่า)
  const [body, setBody] = useState(""); // สร้างตัวแปร body เก็บเนื้อหาโพสต์ (เริ่มจากว่างเปล่า)

  const MAX_TITLE = 100; // [Challenge] กำหนดตัวเลขสูงสุดที่ยอมให้พิมพ์หัวข้อคือ 100 ตัวอักษร
  const remaining = MAX_TITLE - title.length; // [Challenge] คำนวณที่ว่างที่เหลือ (เอา 100 ลบจำนวนที่พิมพ์ไปแล้ว)

  function handleSubmit(e) {
    e.preventDefault(); // สั่งเบรกไม่ให้หน้าเว็บ Refresh (พฤติกรรมปกติของฟอร์ม) เพื่อให้เราจัดการข้อมูลเองได้

    if (!title.trim() || !body.trim()) return; // เช็คว่าถ้าช่องหัวข้อหรือเนื้อหาว่าง (หรือมีแต่ช่องว่าง) ให้หยุด ไม่ส่งข้อมูล

    onAddPost({ title, body }); // ส่ง "ก้อนข้อมูล" {หัวข้อ, เนื้อหา} กลับไปให้ App.jsx ผ่านฟังก์ชันที่รับมา

    setTitle(""); // พอกดโพสต์เสร็จ ให้ล้างตัวหนังสือในช่องหัวข้อทิ้ง
    setBody(""); // พอกดโพสต์เสร็จ ให้ล้างตัวหนังสือในช่องเนื้อหาทิ้ง
  }

  return (
    <form
      onSubmit={handleSubmit} // เมื่อผู้ใช้กดปุ่มส่งฟอร์ม ให้ไปรันฟังก์ชัน handleSubmit ด้านบน
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

      {/* --- ช่องพิมพ์หัวข้อโพสต์ --- */}
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title} // เชื่อมช่องพิมพ์เข้ากับตัวแปร title (เพื่อให้ React คุมค่าในช่องนี้)
        maxLength={MAX_TITLE} // [Challenge] ล็อคหน้าบ้านเลยว่าห้ามพิมพ์เกิน 100 ตัวอักษร
        onChange={(e) => setTitle(e.target.value)} // ทุกครั้งที่ขยับนิ้วพิมพ์ ให้เอาค่าใหม่ไปเก็บในตัวแปร title
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

      {/* --- [Challenge] ตัวนับจำนวนตัวอักษร --- */}
      <div
        style={{
          textAlign: "right",
          fontSize: "0.8rem",
          // ถ้าเหลือที่ว่างน้อยกว่า 10 ตัว ให้เปลี่ยนเป็น "สีแดง" เตือนผู้ใช้ ถ้ายังเหลือเยอะให้เป็น "สีเทา"
          color: remaining < 10 ? "red" : "#718096",
          marginBottom: "0.5rem",
        }}
      >
        {title.length}/{MAX_TITLE} {/* แสดงผลแบบ: จำนวนที่พิมพ์ไปแล้ว / 100 */}
      </div>

      {/* --- ช่องพิมพ์เนื้อหาโพสต์ --- */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body} // เชื่อมช่องพิมพ์เข้ากับตัวแปร body
        onChange={(e) => setBody(e.target.value)} // ทุกครั้งที่พิมพ์ ให้เอาค่าใหม่ไปเก็บในตัวแปร body
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

      {/* --- ปุ่มกดส่ง --- */}
      <button
        type="submit" // ระบุว่าเป็นปุ่มสำหรับส่งข้อมูลในฟอร์ม
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

export default AddPostForm; // ส่งคอมโพเนนต์นี้ออกไป เพื่อให้ไฟล์อื่นเรียกใช้งานได้
