const slidePanel = document.getElementById("slidePanel");
const iframe = document.getElementById("faculty-iframe");
const sidenav = document.getElementById("mySidenav");
const overlay = document.getElementById("overlay");

let scrollY = 0; // เก็บตำแหน่ง Scroll ปัจจุบัน

// ===== เปิด Sidebar =====
function openNav() {
  // เก็บตำแหน่ง Scroll ปัจจุบัน
  scrollY = window.scrollY;

  // ล็อกตำแหน่งของ body ไว้ไม่ให้หน้าเลื่อน
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  // เปิด Sidebar และ Overlay
  sidenav.style.width = "20%";
  overlay.style.display = "block";
}

// ===== ปิด Sidebar + Slide Panel =====
function closeNav() {
  // คืนค่า body กลับปกติ โดยไม่กระโดดหน้า
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  // กลับไปตำแหน่ง Scroll เดิมทันที
  window.scrollTo({
    top: scrollY,
    behavior: "instant" // ✅ ไม่มี animation เลื่อน
  });

  // ปิด Sidebar และ Slide Panel
  sidenav.style.width = "0";
  slidePanel.style.width = "0";
  iframe.src = "";
  overlay.style.display = "none";
}

// ===== จัดการ Dropdown คณะ =====
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
dropdownBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    this.classList.toggle("active");
    const dropdownContent = this.nextElementSibling;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

// ===== เมื่อคลิกเลือกสาขา → แสดงเว็บใน Slide Panel =====
const majorLinks = document.querySelectorAll(".dropdown-container a");
majorLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.dataset.url;

    // ตั้งค่า URL ให้ iframe
    iframe.src = url;

    // Slide Panel เปิดคงที่ 65% ของจอ
    slidePanel.style.width = "65%";
  });
});
