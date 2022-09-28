function preloadFunc() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    alert("OI using mob");
    window.location.href = "mob.html";
    }
}
window.onpaint = preloadFunc(); 

function nightmodetoggle() {
    document.getElementById('id1').style.color = 'red'
}