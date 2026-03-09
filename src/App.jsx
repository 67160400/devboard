import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";

// ข้อมูลโพสต์เริ่มต้น (ของอาจารย์)
const INITIAL_POSTS = [
  {
    id: 1,
    title: "React คืออะไร?",
    body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้",
  },
  {
    id: 2,
    title: "ทำไมต้องใช้ Components?",
    body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้",
  },
  {
    id: 3,
    title: "JSX คืออะไร?",
    body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก",
  },
  {
    id: 4,
    title: "Props ทำงานอย่างไร?",
    body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน",
  },
];

// ข้อมูลสมาชิก (ใช้กับ UserCard)
const USERS = [
  { id: 1, name: "สมชาย ใจดี", email: "somchai@dev.com" },
  { id: 2, name: "สมหญิง รักเรียน", email: "somying@dev.com" },
  { id: 3, name: "วิชาญ โค้ดเก่ง", email: "wichan@dev.com" },
];

function App() {
  // state เก็บโพสต์ทั้งหมด
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // state เก็บ id ของโพสต์ที่กดถูกใจ
  const [favorites, setFavorites] = useState([]);

  // ฟังก์ชันกดถูกใจ / ยกเลิกถูกใจ
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  // เพิ่มโพสต์ใหม่ (จาก AddPostForm)
  function handleAddPost({ title, body }) {
    const newPost = {
      id: Date.now(), // ใช้เวลาเป็น id
      title,
      body,
    };

    // เพิ่มโพสต์ใหม่ไว้ด้านบน
    setPosts((prev) => [newPost, ...prev]);
  }

  return (
    <div>
      {/* Navbar แสดงจำนวนโพสต์ที่ถูกใจ */}
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย (โพสต์) */}
        <div>
          {/* ฟอร์มเพิ่มโพสต์ */}
          <AddPostForm onAddPost={handleAddPost} />

          {/* รายการโพสต์ */}
          <PostList
            posts={posts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา (สมาชิก) */}
        <div>
          <h2
            style={{
              color: "#2d3748",
              borderBottom: "2px solid #1e40af",
              paddingBottom: "0.5rem",
            }}
          >
            สมาชิก
          </h2>

          {/* แสดง UserCard ทีละคน */}
          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
