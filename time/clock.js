function clock() {
    setInterval(function () {
        document.getElementById('time').innerText = document.title = new Date();
    }, 1000);
}
function clog() {
    setInterval(function () {
        console.log(new Date());
    }, 60000);
}