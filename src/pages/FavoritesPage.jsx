import { useState, useEffect } from "react"; // นำเข้าตัวจัดการ State และ Effect
import { Link } from "react-router-dom"; // นำเข้า Link สำหรับกดกลับหน้าหลัก
import { useFavorites } from "../context/FavoritesContext"; // ดึงข้อมูลรายการ ID ที่ถูกใจจากส่วนกลาง

function FavoritesPage() {
  // ดึงรายการ ID ที่ถูกใจ (favorites) และฟังก์ชันสลับสถานะ (toggleFavorite) มาใช้งาน
  const { favorites, toggleFavorite } = useFavorites();

  // สร้าง State สำหรับเก็บข้อมูลรายละเอียดของโพสต์ (หัวข้อ, เนื้อหา) ที่ดึงมาจาก API
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ถ้าไม่มีการกดถูกใจเลยสักอัน ไม่ต้องไปเสียเวลาดึงข้อมูลจาก API ให้จบการทำงานตรงนี้
    if (favorites.length === 0) return;

    // ฟังก์ชันสำหรับดึงข้อมูลโพสต์ "เฉพาะตัวที่ถูกใจ"
    async function fetchFavoritePosts() {
      // ⭐ จุดสำคัญ: ใช้ Promise.all เพื่อไปดึงข้อมูลทุก ID พร้อมๆ กันในครั้งเดียว
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      setPosts(results); // เอาข้อมูลโพสต์ทั้งหมดที่ได้มาเก็บลง State
    }

    fetchFavoritePosts();
  }, [favorites]); // สั่งให้ดึงข้อมูลใหม่ทุกครั้งที่รายการ ID ถูกใจมีการเปลี่ยนแปลง

  // --- กรณีที่ยังไม่มีรายการถูกใจ ---
  if (favorites.length === 0) {
    return (
      <div
        style={{ maxWidth: "700px", margin: "2rem auto", textAlign: "center" }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  // --- กรณีที่มีรายการถูกใจแล้ว ---
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>

      {/* วนลูปข้อมูลโพสต์ที่ดึงมาจาก API มาแสดงผล */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>

          {/* ปุ่มสำหรับกดเอาออกจากรายการถูกใจ */}
          <button
            onClick={() => toggleFavorite(post.id)} // เมื่อกด จะเรียกใช้ฟังก์ชันจาก Context เพื่อลบ ID นี้ออก
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
