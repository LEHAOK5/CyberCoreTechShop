/* ==========================================================================
   1. HIỆU ỨNG HEADER & NAVIGATION (Từ file header_navigation_secondary.js)
   ========================================================================== */

// --- Hiệu ứng hiển thị thanh Header Secondary khi cuộn trang --- //
document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy tham chiếu đến DIV
    const headerSecondary = document.getElementById("header-secondary");

    // 2. Thiết lập điểm kích hoạt (trigger point)
    // 90vw (viewport width) cần được tính bằng pixel.
    const triggerPointInVw = 90;
    const triggerPointInPx = (window.innerWidth / 100) * triggerPointInVw;
    
    // Hàm xử lý sự kiện cuộn
    function handleScroll() {
        if (window.scrollY > triggerPointInPx) {
            // Đã cuộn qua 90vw: Hiển thị div
            headerSecondary.classList.add("header-secondary-show");
        } else {
            // Chưa cuộn tới 90vw: Ẩn div
            headerSecondary.classList.remove("header-secondary-show");
        }
    }

    // Gắn hàm xử lý vào sự kiện cuộn của cửa sổ
    window.addEventListener("scroll", handleScroll);

    // Xử lý cuộn ngay khi tải trang
    handleScroll();
});

// --- Hiệu ứng đóng/mở thanh Navigation Secondary (Menu phụ) --- //
document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy tham chiếu đến các phần tử
    const navigationSecondary = document.getElementById("navigation-secondary");
    const nutBam = document.querySelector(".header-secondary-main-content-bottom-button");
    const noiDung = document.getElementById("navigation-secondary");

    // 2. Thiết lập điểm kích hoạt để tự động ẩn khi cuộn lên trên
    const triggerPointInVw = 90;
    const triggerPointInPx = (window.innerWidth / 100) * triggerPointInVw;
    
    // Hàm xử lý sự kiện cuộn
    function handleScroll() {
        if (window.scrollY > triggerPointInPx) {
            // Giữ nguyên logic cũ (có thể để trống nếu không muốn hiện tự động)
        } else {
            // Chưa cuộn tới 90vw: Ẩn div và reset nút bấm
            navigationSecondary.classList.remove("navigation-secondary-show");
            nutBam.classList.remove("close");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // 3. Gắn sự kiện "click" vào nút 3 chấm
    nutBam.addEventListener("click", function() {
        // Toggle lớp hiển thị và lớp icon đóng
        noiDung.classList.toggle("navigation-secondary-show");
        nutBam.classList.toggle("close");
    });
});

// --- Hiệu ứng thêm vào giỏ hàng (Cập nhật số lượng) --- //
document.addEventListener("DOMContentLoaded", function() {
    // 1. CHỌN PHẦN TỬ ĐƠN
    const cartIcon = document.querySelector('.header-secondary-main-content-top-right-cart'); 
    const cartBadge = document.querySelector('.header-secondary-main-content-top-right-cart-number');

    // 2. CHỌN TẬP HỢP CÁC NÚT (Nút cộng ở Content 1)
    const addToCartButtons = document.querySelectorAll('.content-1-line-row-shopping');

    let cartCount = 0;

    // Hàm cập nhật số lượng và trạng thái hiển thị
    function updateCartDisplay() {
        if (cartBadge) { 
            cartBadge.textContent = cartCount;

            if (cartCount > 0) {
                cartBadge.classList.add('numbershow');
                if (cartIcon) {
                    cartIcon.classList.add('cartshow');
                }
            } else {
                cartBadge.classList.remove('numbershow');
                if (cartIcon) {
                    cartIcon.classList.remove('cartshow');
                }
            }
        }
    }

    // 3. VÒNG LẶP: Áp dụng sự kiện cho TẤT CẢ các nút "Thêm vào giỏ"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            updateCartDisplay();
        });
    });

    // Khởi tạo trạng thái ban đầu
    updateCartDisplay();
});


/* ==========================================================================
   2. XỬ LÝ CONTENT 1: TAB SALE & FREESHIP (Từ file content_1.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy tham chiếu đến các nút chuyển tab
    const btnAs = document.querySelectorAll(".content-1-line-row-extend-navigation-sale");
    const btnBs = document.querySelectorAll(".content-1-line-row-extend-navigation-freeship");
    
    // 2. Lấy tham chiếu đến các Div nội dung
    const divA = document.getElementById("content-1-sale");
    const divB = document.getElementById("content-1-freeship");
    
    // Tạo mảng chứa tất cả các Div nội dung
    const allContentDivs = [divA, divB];

    // Hàm chung để ẩn tất cả và chỉ hiện Div được chọn
    function showContent(divToShow) {
        allContentDivs.forEach(div => {
            div.classList.remove('show');
        });
        divToShow.classList.add('show');
    }

    // 3. Gắn sự kiện Click cho nút Sale
    btnAs.forEach(btnA => {
        btnA.addEventListener("click", function() {
            showContent(divA);
        });
    });

    // 4. Gắn sự kiện Click cho nút FreeShip
    btnBs.forEach(btnB => {
        btnB.addEventListener("click", function() {
            showContent(divB);
        });
    });
});