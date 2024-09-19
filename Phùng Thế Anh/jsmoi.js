//   navbar function 
$(document).ready(function(){

    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(Window).scrollTop()  >  30){
            $('header').addClass('header-active');
        }else{
            $('header').removeClass('header-active');
        }
    });

    
});

window.addEventListener('load', function() {
    document.querySelector('.fade-in').classList.add('visible');
});



// Hiển thị popup khi nhấn vào nút Connect wallet
document.getElementById("connect-wallet-btn").addEventListener("click", function() {
    document.getElementById("wallet-popup").classList.remove("hidden");
});

// Đóng popup khi nhấn vào dấu X
document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("wallet-popup").classList.add("hidden");
});

document.getElementById("lucid-connect").addEventListener("click", async function() {
    try {
        // Khởi tạo và kết nối ví Lucid
        const lucid = await Lucid.new();
        await lucid.enable();

        // Lấy địa chỉ ví đã kết nối
        const address = await lucid.wallet.address();

        // Hiển thị thông tin ví đã kết nối
        document.getElementById("lucid-connect").innerHTML = `Connected: ${address}`;
        document.getElementById("lucid-connect").disabled = true; // Khóa nút sau khi kết nối
    } catch (error) {
        console.error("Failed to connect wallet", error);
        alert("Failed to connect wallet");
    }
});


