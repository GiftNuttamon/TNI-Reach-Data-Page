// นำเข้าโมดูล mysql สำหรับเชื่อมต่อกับฐานข้อมูล
const mysql = require("mysql");

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL โดยกำหนดค่าการเชื่อมต่อ
const connection = mysql.createConnection({
  host: "localhost",      // ที่อยู่เซิร์ฟเวอร์ฐานข้อมูล
  user: "root",          // ชื่อผู้ใช้ฐานข้อมูล
  password: "",          // รหัสผ่านฐานข้อมูล (ว่างเปล่าในกรณีนี้)
  database: "myweb",     // ชื่อฐานข้อมูลที่จะใช้งาน
  multipleStatements: true  // อนุญาตให้รันคำสั่ง SQL หลายคำสั่งพร้อมกัน
});

// ทำการเชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    // แสดงข้อผิดพลาดหากไม่สามารถเชื่อมต่อได้
    console.error('Error connecting to MySQL:', err);
    return;
  }
  // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
  console.log("MySQL Connected");
});

// ส่งออกการเชื่อมต่อเพื่อใช้งานในไฟล์อื่น
module.exports = connection;
