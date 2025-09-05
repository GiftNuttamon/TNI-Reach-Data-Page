// เปิด Sidebar
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

// ปิด Sidebar
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// จัดการ Dropdown คณะ
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
dropdownBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    this.classList.toggle("active");
    const dropdownContent = this.nextElementSibling;
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

// เปิด Popup iframe เมื่อเลือกสาขา
const majorLinks = document.querySelectorAll(".dropdown-container a");
majorLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.dataset.url;
    const iframePopup = document.getElementById("iframePopup");
    const iframe = document.getElementById("faculty-iframe");
    const overlay = document.getElementById("overlay");

    iframe.src = url;
    iframePopup.style.display = "flex";

    // ใช้ Overlay เฉพาะมือถือและแท็บเล็ต
    if (window.innerWidth < 1024) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  });
});

// ปิด Popup iframe
document.getElementById("closeIframePopup").addEventListener("click", function() {
  document.getElementById("iframePopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

// ปิด Popup เมื่อกด Overlay (มือถือ/แท็บเล็ต)
document.getElementById("overlay").addEventListener("click", function() {
  document.getElementById("iframePopup").style.display = "none";
  this.style.display = "none";
});
