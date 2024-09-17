function checkLeght() {
    var input = document.getElementById("inputField").value;
    var message = document.getElementById("message");

    if (input.length === 16) {
        message.textContent = "Bạn đã nhập đúng 16 ký tự!";
        message.className = "success";
    } else {
        message.textContent = "Vui lòng nhập đúng 16 ký tự.";
        message.className = "error";
    }
}
