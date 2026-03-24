import { useState, useEffect } from "react"; // นำเข้า useState (เก็บค่า) และ useEffect (สั่งรันโค้ดอัตโนมัติเมื่อเปิดหน้าเว็บ)
import PostCard from "./PostCard"; // นำเข้าส่วนแสดงกล่องโพสต์แต่ละอัน
import PostCount from "./PostCount"; // นำเข้าตัวนับจำนวนโพสต์
import LoadingSpinner from "./LoadingSpinner"; // นำเข้าตัวหมุนๆ ตอนรอโหลดข้อมูล

function PostList({ favorites = [], onToggleFavorite }) {
  // รับ props favorites (รายการโพสต์ที่กดถูกใจ) และ onToggleFavorite (ฟังก์ชันสลับสถานะถูกใจ)

  const [search, setSearch] = useState(""); // ตัวแปรเก็บข้อความที่พิมพ์ในช่องค้นหา
  const [posts, setPosts] = useState([]); // ตัวแปรเก็บรายการโพสต์ทั้งหมดที่ดึงมาจาก API
  const [loading, setLoading] = useState(true); // ตัวแปรเช็คว่ากำลังโหลดอยู่หรือไม่ (เริ่มมาให้เป็น true คือโหลดอยู่)
  const [error, setError] = useState(null); // ตัวแปรเก็บข้อความเมื่อเกิดข้อผิดพลาด

  const [currentPage, setCurrentPage] = useState(1); // [Challenge] ตัวแปรเก็บเลขหน้าปัจจุบัน (เริ่มที่หน้า 1)
  const postsPerPage = 10; // [Challenge] กำหนดว่า 1 หน้าจะให้โชว์แค่ 10 โพสต์

  // ⭐ ฟังก์ชันสำหรับไปดึงข้อมูลจาก Server (API)
  async function fetchPosts() {
    try {
      setLoading(true); // เริ่มโหลดให้โชว์ตัวหมุนรอ
      setError(null); // ล้างค่าผิดพลาดเก่าทิ้งไปก่อน

      // ไปดึงข้อมูลจาก URL ที่กำหนด
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ"); // ถ้า Server ตอบกลับแบบพัง ให้โยนข้อผิดพลาดออกไป

      const data = await res.json(); // แปลงข้อมูลที่ได้มาให้เป็นรูปแบบที่ JavaScript อ่านออก (JSON)

      setPosts(data.slice(0, 20)); // เอาข้อมูลแค่ 20 อันแรกมาเก็บไว้ในตัวแปร posts
      setCurrentPage(1); // เมื่อโหลดใหม่ ให้กลับไปเริ่มที่หน้า 1 เสมอ
    } catch (err) {
      setError(err.message); // ถ้ามีอะไรพัง ให้เอาข้อความ error มาเก็บไว้โชว์ผู้ใช้
    } finally {
      setLoading(false); // ไม่ว่าจะสำเร็จหรือพัง ให้ปิดตัวหมุนรอ (เลิกโหลด)
    }
  }

  // สั่งให้รันฟังก์ชัน fetchPosts ทันทีที่เปิดหน้าเว็บขึ้นมาครั้งแรก
  useEffect(() => {
    fetchPosts();
  }, []); // [] หมายถึงให้รันแค่ "รอบเดียว" ตอนเปิดหน้า

  // สร้างรายการโพสต์ใหม่ที่ถูกกรองตามชื่อที่เราพิมพ์ในช่องค้นหา
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // ⭐⭐ [Challenge] ระบบแบ่งหน้า (Pagination)
  const totalPages = Math.ceil(filtered.length / postsPerPage); // คำนวณจำนวนหน้าทั้งหมด (จำนวนโพสต์หารด้วย 10)

  const startIndex = (currentPage - 1) * postsPerPage; // หาจุดเริ่มต้นของโพสต์ในหน้านั้นๆ (เช่น หน้า 2 เริ่มที่อันที่ 10)
  const currentPosts = filtered.slice(startIndex, startIndex + postsPerPage); // ตัดแบ่งโพสต์มาโชว์แค่ 10 อันตามหน้าปัจจุบัน

  if (loading) return <LoadingSpinner />; // ถ้ายังโหลดไม่เสร็จ ให้โชว์ตัวหมุนรอ แล้วหยุดโค้ดบรรทัดล่างไว้ก่อน

  if (error)
    // ถ้าดึงข้อมูลพัง ให้โชว์กรอบสีแดงแจ้งเตือน
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      {/* ส่วนหัวของรายการโพสต์ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
          }}
        >
          โพสต์ล่าสุด
        </h2>

        {/* ⭐ ปุ่มกดเพื่อดึงข้อมูลใหม่อีกครั้ง */}
        <button
          onClick={fetchPosts}
          style={{
            padding: "0.4rem 0.8rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#212224",
            color: "white",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      {/* เรียกใช้คอมโพเนนต์นับจำนวนโพสต์ทั้งหมด */}
      <PostCount count={posts.length} />

      {/* ช่องค้นหาโพสต์ */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search} // เชื่อมค่ากับตัวแปร search
        onChange={(e) => {
          setSearch(e.target.value); // อัปเดตคำค้นหาตามที่พิมพ์
          setCurrentPage(1); // พอเริ่มค้นหาใหม่ ให้ดีดกลับไปหน้า 1 ทันที
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />

      {/* ถ้าค้นหาแล้วไม่เจออะไรเลย ให้โชว์ข้อความบอก */}
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* วนลูปเอาโพสต์ที่ตัดแบ่งแล้ว (10 อัน) มาสร้างเป็น PostCard ทีละอัน */}
      {currentPosts.map((post) => (
        <PostCard
          key={post.id} // ใส่ key เพื่อให้ React จำได้ว่าอันไหนเป็นอันไหน
          post={post} // ส่งข้อมูลโพสต์เข้าไป
          isFavorite={favorites.includes(post.id)} // เช็คว่าโพสต์นี้อยู่ในรายการที่ชอบไหม
          onToggleFavorite={() => onToggleFavorite(post.id)} // ส่งฟังก์ชันกดหัวใจเข้าไป
        />
      ))}

      {/* ⭐⭐⭐ [Challenge] ส่วนปุ่มเปลี่ยนหน้า (จะโชว์ก็ต่อเมื่อมีมากกว่า 1 หน้า) */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {/* ปุ่มย้อนกลับ (กดไม่ได้ถ้าอยู่หน้า 1) */}
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            ← ก่อนหน้า
          </button>

          {/* แสดงเลขหน้าปัจจุบัน / ทั้งหมด */}
          <span>
            หน้า {currentPage} / {totalPages}
          </span>

          {/* ปุ่มไปข้างหน้า (กดไม่ได้ถ้าถึงหน้าสุดท้ายแล้ว) */}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
