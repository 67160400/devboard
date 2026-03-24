import { useState, useEffect } from "react"; // นำเข้าตัวจัดการ State และ Effect
import { useParams, Link } from "react-router-dom"; // useParams ใช้ดึง ID จาก URL, Link ใช้สร้างปุ่มย้อนกลับ
import { useFavorites } from "../context/FavoritesContext"; // ดึงระบบถูกใจจากส่วนกลาง
import CommentList from "../components/CommentList"; // นำเข้าส่วนแสดงคอมเมนต์
import LoadingSpinner from "../components/LoadingSpinner"; // นำเข้าตัวหมุนรอโหลด

function PostDetailPage() {
  // ดึงค่า id ออกมาจาก URL (สมมติเข้าเว็บ /posts/5 ค่า id จะเท่ากับ "5")
  const { id } = useParams();

  // ดึงข้อมูลถูกใจและฟังก์ชันสลับสถานะมาจากคลังส่วนกลาง (Context)
  const { favorites, toggleFavorite } = useFavorites();

  // สร้าง State เก็บข้อมูลโพสต์ที่ดึงมา (เริ่มเป็น null เพราะยังไม่ได้ข้อมูล)
  const [post, setPost] = useState(null);
  // สร้าง State เช็คสถานะการโหลดข้อมูล (เริ่มเป็น true)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ฟังก์ชันไปดึงข้อมูลโพสต์ตัวเดียวตาม ID ที่ได้จาก URL
    async function fetchPost() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`, // ระบุ ID ต่อท้าย URL เพื่อขอข้อมูลโพสต์นั้น
      );
      const data = await res.json(); // แปลงเป็น JSON
      setPost(data); // เอาข้อมูลโพสต์เก็บเข้า State
      setLoading(false); // ปิดตัวหมุนโหลด
    }
    fetchPost();
  }, [id]); // สั่งให้รันใหม่ถ้า ID ใน URL เปลี่ยน (เช่น กดเปลี่ยนไปดูโพสต์ถัดไป)

  // ถ้ายังโหลดข้อมูลไม่เสร็จ ให้แสดงตัวหมุนรอ
  if (loading) return <LoadingSpinner />;

  // เช็คว่าโพสต์ที่กำลังดูอยู่นี้ เรากดถูกใจไว้หรือยัง
  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ปุ่มกดเพื่อย้อนกลับไปหน้าแรก */}
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        {/* แสดงหัวข้อโพสต์ */}
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>
        {/* แสดงเนื้อหาโพสต์ (ใส่ lineHeight เพื่อให้ตัวหนังสืออ่านง่ายขึ้น) */}
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        {/* ปุ่มกดถูกใจภายในหน้ารายละเอียด */}
        <button
          onClick={() => toggleFavorite(post.id)} // เมื่อกด ให้สลับสถานะถูกใจใน Context ส่วนกลาง
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            // ถ้าถูกใจแล้วให้สีแดง ถ้ายังให้สีเทา
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {/* เปลี่ยนข้อความตามสถานะถูกใจ */}
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* แสดงรายการความคิดเห็นของโพสต์นี้ทันที โดยส่ง ID ของโพสต์เข้าไป */}
      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage; // ส่งออกหน้าคอมโพเนนต์รายละเอียดโพสต์
