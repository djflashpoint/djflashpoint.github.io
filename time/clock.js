function clock() {
    setInterval(function () {
        document.getElementById('time').innerText = document.title = new Date();
    }, 1000);
}