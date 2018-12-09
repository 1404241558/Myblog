var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = 'rgba(37 ,198 , 252, 1)';
ctx.lineWidth = 8;
// ctx.shadowBlur = 1;
ctx.shadowColor = 'rgba(37 ,198 , 252, 1)';

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}
var draw = function(x, y, r, start, end, type) {
    var unit = Math.PI / 180;
    ctx.beginPath();
    ctx.arc(x, y, r, start * unit, end * unit);
    ctx.closePath();
    ctx[type]();
}
function renderTime() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);

    //Background
    gradient = ctx.createRadialGradient(125, 125, 2.5, 125, 125, 20)
    gradient.addColorStop(0, "#cfd9df");
    gradient.addColorStop(1, "#e2ebf0");
    ctx.fillStyle = gradient;
    // ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    // ctx.fillRect(0, 0,250, 250);
	draw(128,128,125,0,360,'fill')
    //Hours
    ctx.beginPath();
    ctx.arc(125, 125, 100, degToRad(270), degToRad((hrs * 30) - 90));
    ctx.stroke();
    //Minutes
    ctx.beginPath();
    ctx.arc(125, 125, 85, degToRad(270), degToRad((smoothmin * 6) - 90));
    ctx.stroke();
    //Seconds
    ctx.beginPath();
    ctx.arc(125, 125, 70, degToRad(270), degToRad((smoothsec * 6) - 90));
    ctx.stroke();
    //Date
    ctx.font = "13px Helvetica";
    ctx.fillStyle = 'rgba(37 ,198 , 252, 1)'
    ctx.fillText(today, 75, 125);
    //Time
    ctx.font = "13px Helvetica Bold";
    ctx.fillStyle = 'rgba(37 ,198 , 252, 1))';
    ctx.fillText(time + ":" + mil, 75, 140);

}
setInterval(renderTime, 40);

