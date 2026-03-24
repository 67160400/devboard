import { createContext, useContext, useState } from "react"; // นำเข้าเครื่องมือสร้างคลังข้อมูล (Context) และตัวเก็บค่า (State)

// 1. สร้าง Context Object — เหมือนการสร้าง "ตะกร้าส่วนกลาง" ขึ้นมาหนึ่งใบเพื่อเตรียมใส่ข้อมูล
const FavoritesContext = createContext();

// 2. Provider Component — ตัว "ผู้ให้บริการ" ข้อมูล (ต้องเอาไปครอบ App ทั้งหมดใน Main.jsx หรือ App.jsx)
export function FavoritesProvider({ children }) {
  // children คือคอมโพเนนต์ลูกทั้งหมดที่ถูกครอบอยู่ จะสามารถเข้าถึงข้อมูลในนี้ได้

  const [favorites, setFavorites] = useState([]); // สร้าง State เก็บรายชื่อ ID ของโพสต์ที่ถูกใจ (เป็นอาร์เรย์ว่างในตอนแรก)

  // ฟังก์ชันสลับสถานะถูกใจ (Toggle) — ถ้ามีอยู่แล้วให้เอาออก ถ้ายังไม่มีให้เพิ่มเข้าไป
  function toggleFavorite(postId) {
    setFavorites(
      (prev) =>
        // เช็คว่าในรายการเดิม (prev) มี ID นี้อยู่หรือยัง?
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ถ้า "มีแล้ว" -> ให้กรองออก (ลบจากรายการ)
          : [...prev, postId], // ถ้า "ยังไม่มี" -> ให้เพิ่ม ID ใหม่ต่อท้ายรายการเดิม
    );
  }

  return (
    // ส่งข้อมูล (favorites) และฟังก์ชัน (toggleFavorite) ออกไปให้คอมโพเนนต์อื่นใช้งานผ่าน value
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children} {/* อนุญาตให้คอมโพเนนต์ลูกๆ ทุกตัวแสดงผลตามปกติ */}
    </FavoritesContext.Provider>
  );
}

// 3. Custom Hook — สร้างทางลัดเพื่อให้คอมโพเนนต์อื่นเรียกใช้ข้อมูลได้ง่ายๆ (ไม่ต้องเขียน useContext เองทุกครั้ง)
export function useFavorites() {
  return useContext(FavoritesContext); // ดึงข้อมูลจากตะกร้า FavoritesContext ออกมาส่งต่อ
}

export default FavoritesContext; // ส่งออกตัว Context หลัก
