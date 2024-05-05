function time() {
    var d = new Date();
    var a = d.getDay();
    var b = d.getMonth();
    var c = d.getFullYear();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    console.log =
    ("0" + a).substr(-2) + "/" + ("0" + b).substr(-2) + "/" + ("0" + c).substr(-2) + '\n' +
    ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}

setInterval(time, 1000);
