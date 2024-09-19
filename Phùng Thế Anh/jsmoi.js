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



// Hiển thị popup và lớp phủ khi nhấn vào nút "Connect wallet"
document.getElementById("connect-wallet-btn").addEventListener("click", function() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("wallet-popup").classList.remove("hidden");
});

// Đóng popup và lớp phủ khi nhấn vào dấu "X"
document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("wallet-popup").classList.add("hidden");
});




// Kết nối ví Lucid và đóng popup
document.getElementById("lucid-connect").addEventListener("click", async function() {
    try {
        const lucid = await Lucid.new();
        await lucid.enable();
        const address = await lucid.wallet.address();
        document.getElementById("lucid-connect").innerHTML = `Connected: ${address}`;
        document.getElementById("wallet-popup").classList.add("hidden");
        document.getElementById("overlay").classList.add("hidden"); // Ẩn lớp phủ khi kết nối thành công
    } catch (error) {
        console.error("Failed to connect wallet", error);
        alert("Failed to connect wallet");
    }
});



