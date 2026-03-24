import { useState, useEffect } from "react"; // นำเข้าตัวจัดการ State (เก็บค่า) และ Effect (สั่งรันโค้ดเมื่อค่าเปลี่ยน)
import LoadingSpinner from "./LoadingSpinner"; // นำเข้าตัวหมุนรอโหลด (แม้ในโค้ดด้านล่างจะใช้ <p> แทน แต่ import ไว้เผื่อใช้)

function CommentList({ postId }) {
  // สร้างคอมโพเนนต์ โดยรับ props ชื่อ postId เพื่อให้รู้ว่าต้องไปดึงคอมเมนต์ของโพสต์เบอร์อะไร

  const [comments, setComments] = useState([]); // ตัวแปรเก็บรายการความคิดเห็น (เริ่มจากอาร์เรย์ว่าง)
  const [loading, setLoading] = useState(true); // ตัวแปรเช็คว่ากำลังโหลดคอมเมนต์อยู่ไหม (เริ่มที่ true)
  const [error, setError] = useState(null); // ตัวแปรเก็บข้อความแสดงความผิดพลาด (ถ้ามี)

  useEffect(() => {
    // สร้างฟังก์ชันภายในเพื่อไปดึงข้อมูลคอมเมนต์จาก API
    async function fetchComments() {
      try {
        setLoading(true); // เริ่มต้นดึงข้อมูล ให้สถานะกำลังโหลดเป็น true
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`, // ดึงคอมเมนต์ตามเลข id ของโพสต์นั้นๆ
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ"); // ถ้าเชื่อมต่อล้มเหลว ให้โยน Error ออกไป

        const data = await res.json(); // แปลงข้อมูลที่ได้เป็น JSON
        setComments(data); // เอาข้อมูลคอมเมนต์ที่ได้ไปเก็บในตัวแปร comments
      } catch (err) {
        setError(err.message); // ถ้ามีปัญหา ให้เก็บข้อความ error ไว้
      } finally {
        setLoading(false); // ไม่ว่าจะสำเร็จหรือพัง ให้ปิดสถานะการโหลด
      }
    }

    fetchComments(); // สั่งให้ฟังก์ชัน fetchComments ทำงาน
  }, [postId]); // [จุดสำคัญ] สั่งให้ useEffect รันใหม่ "ทุกครั้งที่ postId เปลี่ยน" (ถ้าเปลี่ยนโพสต์ดู คอมเมนต์ก็ต้องเปลี่ยนตาม)

  // ถ้ายังโหลดไม่เสร็จ ให้แสดงข้อความบอกผู้ใช้
  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;

  // ถ้าเกิดข้อผิดพลาด ให้แสดงข้อความตัวอักษรสีแดง
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      {/* แสดงหัวข้อและจำนวนความคิดเห็นทั้งหมด */}
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>

      {/* วนลูป (map) เอาข้อมูลคอมเมนต์แต่ละอันออกมาวาดบนหน้าจอ */}
      {comments.map((comment) => (
        <div
          key={comment.id} // ใส่ key ให้ React (ใช้ id ของคอมเมนต์)
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          {/* แสดงชื่อคนคอมเมนต์ (ตัวหนา) */}
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>
          {/* แสดงเนื้อหาความคิดเห็น */}
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList; // ส่งคอมโพเนนต์ออกไปใช้งาน
