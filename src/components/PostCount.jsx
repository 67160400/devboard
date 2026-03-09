// Component แสดงจำนวนโพสต์ทั้งหมด
function PostCount({ count }) {
  // รับ props ชื่อ count
  return (
    <p style={{ color: "#4a5568", marginBottom: "1rem" }}>
      โพสต์ทั้งหมด: {count} รายการ {/* แสดงจำนวนโพสต์ */}
    </p>
  );
}

export default PostCount; // export เพื่อให้ component อื่นใช้ได้
