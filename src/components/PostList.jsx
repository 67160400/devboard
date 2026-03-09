import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount"; // (Challenge) component แสดงจำนวนโพสต์

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState(""); // state เก็บค่าที่พิมพ์ค้นหา

  // กรองโพสต์ตามคำค้นหา
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* หัวข้อ */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* (Challenge) แสดงจำนวนโพสต์ */}
      <PostCount count={posts.length} />

      {/* ช่องค้นหาโพสต์ */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search} // เชื่อมกับ state
        onChange={(e) => setSearch(e.target.value)} // อัปเดตค่าค้นหา
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id} // key สำคัญสำหรับ React list
          title={post.title}
          body={post.body}
          // เช็คว่าโพสต์นี้ถูกใจหรือยัง
          isFavorite={favorites.includes(post.id)}
          // กดปุ่มถูกใจ
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
