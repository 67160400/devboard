import { useState } from "react"; // นำเข้า useState เพื่อใช้เปิด-ปิด การแสดงคอมเมนต์
import { Link } from "react-router-dom"; // นำเข้า Link เพื่อใช้กดที่ชื่อโพสต์แล้วลิงก์ไปยังหน้าดูรายละเอียด
import { useFavorites } from "../context/FavoritesContext"; // ดึงระบบ "ถูกใจ" มาจากส่วนกลาง
import CommentList from "./CommentList"; // นำเข้าคอมโพเนนต์รายการคอมเมนต์มาเตรียมใช้งาน

function PostCard({ post }) {
  // รับ props ชื่อ post ซึ่งบรรจุข้อมูล {id, title, body} ของโพสต์นั้นๆ

  const { favorites, toggleFavorite } = useFavorites();
  // ดึงรายการ favorites และฟังก์ชัน toggleFavorite (สลับสถานะถูกใจ) มาจาก Context ส่วนกลาง

  const isFavorite = favorites.includes(post.id);
  // เช็คว่า ID ของโพสต์นี้ อยู่ในรายการ favorites หรือเปล่า (ถ้ามีจะได้ค่า true)

  const [showComments, setShowComments] = useState(false);
  // สร้าง State ชื่อ showComments เอาไว้เช็คว่าตอนนี้ควรโชว์คอมเมนต์ไหม (เริ่มแรกให้เป็น false คือซ่อนไว้)

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* --- ส่วนหัวข้อโพสต์ --- */}
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${post.id}`} // เมื่อกดชื่อโพสต์ จะลิงก์ไปหน้ารายละเอียดตาม id เช่น /posts/1
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title} {/* แสดงหัวข้อโพสต์ */}
        </Link>
      </h3>

      {/* --- ส่วนเนื้อหาโพสต์ --- */}
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body} {/* แสดงเนื้อความของโพสต์ */}
      </p>

      {/* --- ส่วนปุ่มกดต่างๆ --- */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มกดหัวใจ (Toggle Favorite) */}
        <button
          onClick={() => toggleFavorite(post.id)} // เมื่อกด ให้ส่ง id โพสต์นี้ไปสลับสถานะถูกใจที่ Context
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            // ถ้าถูกใจแล้ว (isFavorite เป็น true) ให้เป็นสีแดง ถ้าไม่ถูกใจให้เป็นสีเทา
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {isFavorite ? "❤️" : "🤍"} {/* เปลี่ยนรูปหัวใจตามสถานะ */}
        </button>

        {/* ปุ่มเปิด/ปิด คอมเมนต์ (Toggle Comments) */}
        <button
          onClick={() => setShowComments((prev) => !prev)} // เมื่อกด ให้สลับค่า showComments จากจริงเป็นเท็จ (หรือเท็จเป็นจริง)
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {/* เปลี่ยนข้อความปุ่มตามสถานะ showComments */}
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {/* --- ส่วนแสดงรายการคอมเมนต์ (Conditional Rendering) --- */}
      {/* ถ้า showComments เป็น true ถึงจะยอมวาดคอมโพเนนต์ CommentList ออกมา */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard; // ส่งออกคอมโพเนนต์ไปแสดงใน PostList
