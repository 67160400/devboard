import { useState, useEffect } from "react"; // นำเข้า useState (เก็บข้อมูล) และ useEffect (สั่งรันตอนเปิดหน้า)
import UserCard from "./UserCard"; // นำเข้าการ์ดแสดงข้อมูลสมาชิกที่เราเขียนไว้
import LoadingSpinner from "./LoadingSpinner"; // นำเข้าตัวหมุนรอโหลด

function UserList() {
  // สร้างคอมโพเนนต์สำหรับแสดงรายการสมาชิกทั้งหมด

  const [users, setUsers] = useState([]); // สร้างอาร์เรย์ว่างๆ ไว้รอเก็บรายชื่อสมาชิกที่ดึงมาจากอินเทอร์เน็ต
  const [loading, setLoading] = useState(true); // ตั้งค่าสถานะการโหลด เริ่มต้นให้เป็น true (กำลังโหลด)

  useEffect(() => {
    // ฟังก์ชันพิเศษที่จะรัน "ครั้งเดียว" ตอนหน้าเว็บเปิดขึ้นมา
    async function fetchUsers() {
      try {
        // 1. ไปดึงข้อมูลจาก URL ของสมาชิก (users)
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        // 2. แปลงข้อมูลที่ได้มาเป็นรูปแบบ JSON (อาร์เรย์ของวัตถุ)
        const data = await res.json();

        // 3. เอาข้อมูลที่ได้ไปเก็บไว้ในตัวแปร users
        setUsers(data);
      } catch {
        // ไม่แสดง error ในตัวอย่างนี้ (นักศึกษาลองเพิ่มเองได้)
        // ถ้าดึงข้อมูลพัง ในตัวอย่างนี้ไม่ได้ทำอะไร (แต่สามารถใส่ setError ได้เหมือนไฟล์ก่อนๆ)
      } finally {
        // ไม่ว่าจะสำเร็จหรือพัง ให้ปิดตัวหมุนรอโหลด (เลิกโหลด)
        setLoading(false);
      }
    }

    fetchUsers(); // สั่งให้ฟังก์ชันเริ่มทำงาน
  }, []); // ใส่ [] เพื่อบอกว่าให้ดึงข้อมูลแค่รอบเดียวพอตอนเปิดหน้า

  // ถ้าสถานะ loading ยังเป็น true ให้โชว์ตัวหมุนรอโหลดก่อน
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* หัวข้อหน้านี้ */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af", // เส้นขีดล่างสีน้ำเงินให้ดูสวยงาม
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>

      {/* --- ส่วนหัวใจหลัก: การนำข้อมูลมาแสดง --- */}
      {/* วนลูปข้อมูลใน users ทุกคน แล้วส่งชื่อและอีเมลไปให้ UserCard เป็นคนจัดการหน้าตา */}
      {users.map((user) => (
        <UserCard
          key={user.id} // ใส่ Key เพื่อให้ React จำลำดับได้แม่นยำ
          name={user.name} // ส่งชื่อไปให้ UserCard
          email={user.email} // ส่งอีเมลไปให้ UserCard
        />
      ))}
    </div>
  );
}

export default UserList; // ส่งออกไปใช้งาน (ปกติจะเรียกใช้ผ่าน Router ใน App.jsx)
