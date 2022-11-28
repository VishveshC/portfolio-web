var drag_div = document.getElementById("drag_div");
var anitime = "5000";
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function drag(){
    let drag_div, hit_div;
    let win_rect;
    let dragging;
    let offset;
    DOMRect.prototype.hit = function (x, y) {
        return x >= this.left && x <= this.right &&
            y >= this.top && y <= this.bottom;
    } 
    function px(n) {
        return `${n}px`;
    }
    function init() {
        drag_div = document.getElementById("drag_div");
        hit_div = document.getElementById("hit_div"); 
        window.addEventListener("pointerdown", pointerDown);
        window.addEventListener("pointermove", pointerMove);
        window.addEventListener("pointerup", pointerUp);
        window.addEventListener("resize", resize);
        dragging = false;
        offset = {x: 0, y: 0}
        win_rect = document.body.getBoundingClientRect();
        let drag_rect = drag_div.getBoundingClientRect();
        let left = "15";
        let top = "40";
        drag_div.style.left = px(left);
        drag_div.style.top = px(top);
    }
    function resize(event) {
        win_rect = document.body.getBoundingClientRect();
    }
    function pointerDown (event) {
        let [x, y] = [event.clientX, event.clientY];
        let drag_rect = drag_div.getBoundingClientRect();
        hit_rect = hit_div.getBoundingClientRect();
        if (hit_rect.hit(x, y)) {
            dragging = true;
            offset.x = x - drag_rect.x;
            offset.y = y - drag_rect.y;
        }
    }   
    function pointerMove(event) {
        let [x, y] = [event.clientX, event.clientY];
        let drag_rect = drag_div.getBoundingClientRect();
        if (dragging) {
            let left = x - offset.x;
            let right = left + drag_rect.width;
            let top = y - offset.y;
            let bottom = top + drag_rect.height;
            // prevent dragging off screen left/right
            if (left < 0) {
                left = 0;
            } else if (right > win_rect.right) {
                left = win_rect.right - drag_rect.width;
            }
            // prevent dragging off screen top/bottom 
            if (top < 0) {
                top = 0;
            } else if (bottom > win_rect.bottom) {
                top = win_rect.bottom - drag_rect.height;
            }
            drag_div.style.left = px(left);
            drag_div.style.top = px(top);
        }
    }
    function pointerUp(event) {
        dragging = false;
    }
    init();
}
function checkbattery() {
    const percentage = document.querySelector('.percentage');
    const percent = document.querySelector('.percent');
    navigator.getBattery().then(function(battery){
    percentage.style.width = battery.level * 100+ '%';
    percent.innerHTML = battery.level * 100;
    })
}
function checktime(){
    const getCurrentTimeDate = () => {
        let currentTimeDate = new Date();
        var weekday = new Array(
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat")
        var month = new Array(
        "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
        var hours   =  currentTimeDate.getHours();
        var minutes =  currentTimeDate.getMinutes();
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        var AMPM = hours >= 12 ? 'PM' : 'AM';
        if(hours === 12){
            hours = 12;
        } else {
            hours = hours % 12;
        }
        var currentTime = `${hours}:${minutes} ${AMPM}`;
        var currentDay = weekday[currentTimeDate.getDay()];
        var currentDate  = currentTimeDate.getDate();
        var currentMonth = month[currentTimeDate.getMonth()];
        var fullDate = `${currentDate} ${currentMonth}`;
        document.getElementById("time").innerHTML = currentTime;
        document.getElementById("day").innerHTML = currentDay;
        document.getElementById("date").innerHTML = fullDate;
        setTimeout(getCurrentTimeDate, 30000);
    }
    getCurrentTimeDate();
}
function formatBytes(bytes,decimals=2){if(!+bytes)return"0 Bytes";const dm=decimals<0?0:decimals,i=Math.floor(Math.log(bytes)/Math.log(1024));return`${parseFloat((bytes/Math.pow(1024,i)).toFixed(dm))}`}

function winx() {
    drag_div.style.opacity = "0";
    setTimeout(() => {  drag_div.style.display = "none"; }, 200);
}
function winy() {
    if (drag_div.style.width === "50vw") {
        drag_div.style.width = "calc(99vw - 120px - 15px)";
        drag_div.style.height = "calc(99vh - 130px)";
    } else {
        drag_div.style.width = "50vw";
        drag_div.style.height = "50vh";
    }
}
function showconsole() {
    drag_div.style.display = "block";
    setTimeout(() => {  drag_div.style.opacity = "100"; }, 200);
}
function cpuutils(){
    const cpuc = document.getElementById('cpucircle'); 
    const ctext = document.getElementById('cputext');
    setInterval(function() {
        const rndInt = randomIntFromInterval(10, 80)
        let fillul = 100 - rndInt;
        let fill = rndInt + ' ' + fillul;
        cpuc.setAttribute('stroke-dasharray', fill);
        ctext.textContent = rndInt + "%" + " CPU";
    }, anitime);
}
function ramutils() {
    const ramfill = document.getElementById('ramfiller');
    const ramtext = document.getElementById('ramtext');
    setInterval(function() {
        let ram = window.performance.memory.usedJSHeapSize;
        let ramf = formatBytes(ram);
        let totalram = formatBytes(window.performance.memory.jsHeapSizeLimit);
        let ramfillint = (ramf / totalram) * 10; 
        ramfill.style.height = (ramfillint) + "%";
        ramtext.textContent = Math.round(ramfillint) + "%";
    }, anitime);
}
function temp() {
    const tempfill = document.getElementById('tempfillpercent');
    const temptext = document.getElementById('temptext');
    const url = 'https://api.geoapify.com/v1/ipinfo?&apiKey=08f08b20444642ab87cb93ad545b1c5f';
    var requestOptions = {
        method: 'GET',
    };
    fetch(url, requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let loc = data;
            let lat = loc.location.latitude;
            let lon = loc.location.longitude;
            const urz = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=538e50ebb84a3b53bf8cad238468e71b`;
            var requestOptions = {
                method: 'GET',
            };
            fetch(urz, requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((data2) => {
                    let gg = data2;
                    let tempf = Math.round(gg.main.temp);
                    setInterval(function() {
                        tempfill.style.height = tempf + randomIntFromInterval(-5,5) + "%";
                    }, anitime);
                    temptext.textContent = tempf + "°C";
                })
        })
        .catch(error => console.log('error', error));
}
function timespent() {
    const timetext = document.getElementById('timespent');
    const timebar = document.getElementById('timebar');
    setInterval(function() {
        TimeMe.initialize({
            currentPageName: "index.html", // current page
            idleTimeoutInSeconds: "-1" // seconds
        });
        TimeMe.getTimeOnCurrentPageInSeconds();
        let timeround = Math.round(TimeMe.getTimeOnCurrentPageInSeconds());
        if(timeround < 60) {
            let place1 = "0" + "m";
            let place2 = (timeround % 60)+ "s";
            timetext.textContent = place1 + " " + place2;
            window.localStorage.setItem("timespentbyuser", timeround);
        };
        if (timeround > 60) {
            let place1 = Math.floor(timeround / 60) + "m";
            let place2 = (timeround % 60) + "s";
            timetext.textContent = place1 + " " + place2;
            window.localStorage.setItem("timespentbyuser", timeround);
        } else {};
        timebar.style.height = Math.floor(timeround / 5) + "%";
    }, anitime);
}
function earlytimebar() {
    const eartimebar = document.getElementById('earlytimebar');
    let ttime = window.localStorage.getItem("timespentbyuser");
    if (ttime <= 0) {
        console.log("Error: local ttime is less than 0");
    } else {
        eartimebar.style.height = Math.floor(ttime / 5) + "%";
    }
}
function lite() {
    const box = document.getElementById('toggle-animations');
    if (box.checked === true) {
        window.localStorage.setItem("litemode", 0);
        document.body.style.setProperty("--toggle", "0");
    } else {
        window.localStorage.setItem("litemode", 1);
        document.body.style.setProperty("--toggle", "1");
    }
}
function litecheck() {
    let tog = window.localStorage.getItem("litemode");
    const boxo = document.getElementById('toggle-animations');
    if ( tog == 0) {
        document.body.style.setProperty("--toggle", "0");
        boxo.checked = true;
    } else {
        document.body.style.setProperty("--toggle", "1");
        boxo.checked = false;
    }
}
function playfun() {
    const panel = document.getElementById('musicname');
    const play = document.getElementById('playbut');
    const pause = document.getElementById('pausebut');
    const track = document.getElementById('track');
    if (play.style.display === "none") {
        pause.style.display = "none";
        play.style.display = "block";
        track.pause();
        panel.style.transform = "translateY(-22px)";
    } else {
        pause.style.display = "block";
        play.style.display = "none";
        track.play();
        panel.style.transform = "translateY(22px)";
    }
}
function music() {
    const paneltext = document.getElementById('musictext');
    const play = document.getElementById('playbut');
    const pause = document.getElementById('pausebut');
    const musicpanel = document.getElementById('music');
    const track = document.getElementById('track');
    pause.style.display = "none";
    play.style.display = "block";
    let playlist = new Array(
        "Nine Thou",
        "Tuyo",
        "Shootout",
        "Call Me",
        "Cipher",
        "Dream On",
        "Ladyfingers",
        "Fitzpleasure",
        "Do Ya Thing",
        "Hot",
        "Fired Up",
        "Fragile Melodies",
        "My Hood",
        "Aces",
        "West Coast Love"
    )
    let num = Math.floor(Math.random() * (playlist.length));
    let nameformat = playlist[num].toLowerCase().replace(/ /g, '_');
    let musicurl = `https://storage.googleapis.com/portfolio-696969.appspot.com/audio/${nameformat}.mp3`;
    let albumurl = `https://storage.googleapis.com/portfolio-696969.appspot.com/images/${nameformat}.png`;
    track.setAttribute("src", musicurl);
    track.volume = 0.1;
    musicpanel.style.backgroundImage = `url(${albumurl})`;
    paneltext.textContent = playlist[num];
}


window.onload = music(), litecheck(), cpuutils(), ramutils(), temp(), timespent(), earlytimebar(), checkbattery(), checktime(), drag();