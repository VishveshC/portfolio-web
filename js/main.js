function preloadFunc() {
    let ethericon = document.getElementById('eth');
    let wifiicon = document.getElementById('icons-wifi');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        alert("Using a mobile. Please use a PC to visit this website.");
        /*window.location.href = "mob.html";*/
        let ethericon = document.getElementById('eth');
        let wifiicon = document.getElementById('icons-wifi');
        ethericon.style.display = "none";
        wifiicon.style.display = "block";
    }
    else {
        let ethericon = document.getElementById('eth');
        let wifiicon = document.getElementById('icons-wifi');
        ethericon.style.display = "block";
        wifiicon.style.display = "none";
    }
}
window.onload = preloadFunc(); 