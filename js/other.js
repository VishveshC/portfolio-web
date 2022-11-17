function drag(){
    let drag_div, hit_div;
    let win_rect; // window client area
    let dragging;
    let offset;
    let colors = {
        up: "rgb(255, 254, 165)",
        down: "rgb(165, 255, 180)",
        bg: "rgb(255, 165, 165)"
    }
    // add hit-test functionality to DOMRect
    DOMRect.prototype.hit = function (x, y) {
        return x >= this.left && x <= this.right &&
            y >= this.top && y <= this.bottom;
    } 
    // yum
    function px(n) {
        return `${n}px`;
    }
    function init() {
        // HTML elements
        drag_div = document.getElementById("drag_div");
        hit_div = document.getElementById("hit_div"); 
        // listeners
        window.addEventListener("pointerdown", pointerDown);
        window.addEventListener("pointermove", pointerMove);
        window.addEventListener("pointerup", pointerUp);
        window.addEventListener("resize", resize);
        // init data
        dragging = false;
        offset = {x: 0, y: 0}
        win_rect = document.body.getBoundingClientRect();
        // position div to center
        let drag_rect = drag_div.getBoundingClientRect();
        let left = "15";
        let top = "40";
        drag_div.style.left = px(left);
        drag_div.style.top = px(top);
    }

    function resize(event) {
        // keep track of changed client area dimensions 
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
    let percentage = document.querySelector(' .percentage');
    let percent = document.querySelector('.percent');
    navigator.getBattery().then(function(battery){
    percentage.style.width = battery.level * 100+ '%';
    percent.innerHTML = battery.level * 100;
    })
}
function checktime(){
    const getCurrentTimeDate = () => {
        let currentTimeDate = new Date();
    
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
    
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
    
        var hours   =  currentTimeDate.getHours();
    
        var minutes =  currentTimeDate.getMinutes();
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var AMPM = hours >= 12 ? 'PM' : 'AM';

        if(hours === 12){
            hours=12;
        }else{
            hours = hours%12;
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
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}`
}
function terminaltext(){
    // function([string1, string2],target id,[color1,color2])    
    consoleText(['Hello!', 'This is Vishvesh C.'], 'text',['black','black']);

    function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {
    
        if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
        }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
        }, 1000)
        } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
        }
    }, 120)
    window.setInterval(function() {
        if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false;
    
        } else {
        con.className = 'console-underscore'
    
        visible = true;
        }
    }, 400)
    }
}
function winx() {
    let drag_div = document.getElementById("drag_div");
    drag_div.style.opacity = "0";
    setTimeout(() => {  drag_div.style.display = "none"; }, 200);
    
}
function winy() {
    let drag_div = document.getElementById("drag_div");
    if (drag_div.style.width === "50vw") {
        drag_div.style.width = "calc(99vw - 120px - 15px)";
        drag_div.style.height = "calc(99vh - 130px)";

    } else {
        drag_div.style.width = "50vw";
        drag_div.style.height = "50vh";

    }
}
function showconsole() {
    let drag_div = document.getElementById("drag_div");
    drag_div.style.display = "block";
    setTimeout(() => {  drag_div.style.opacity = "100"; }, 200);
}
function cpuutils(){
    let cpuc = document.getElementById('cpucircle'); 
    let ctext = document.getElementById('cputext');
    const interval = setInterval(function() {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(10, 80)
        let fillul = 100 - rndInt;
        let fill = rndInt + ' ' + fillul;
        cpuc.setAttribute('stroke-dasharray', fill);
        ctext.textContent = rndInt + "%" + " CPU";
    }, 5000);
}
function ramutils() {
    let ramfill = document.getElementById('ramfiller');
    let ramtext = document.getElementById('ramtext');
    const interval = setInterval(function() {
        let ram = window.performance.memory.usedJSHeapSize;
        let ramf = formatBytes(ram);

        let totalram = formatBytes(window.performance.memory.jsHeapSizeLimit);
        let ramfillint = (ramf / totalram) * 10; 
        ramfill.style.height = (ramfillint) + "%";
        ramtext.textContent = Math.round(ramfillint) + "%";
    }, 5000);
}

function temp() {
    let tempfill = document.getElementById('tempfillpercent');
    let temptext = document.getElementById('temptext');
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
                    const interval = setInterval(function() {
                        function randomIntFromInterval(min, max) { // min and max included 
                            return Math.floor(Math.random() * (max - min + 1) + min)
                        }
                        tempfill.style.height = tempf + randomIntFromInterval(-5,5) + "%";
                    }, 5000);
                    temptext.textContent = tempf + "°C";
                })
        })
        .catch(error => console.log('error', error));
}
function timespent() {
    let timetext = document.getElementById('timespent');
    let timebar = document.getElementById('timebar');
    const interval = setInterval(function() {
        TimeMe.initialize({
            currentPageName: "index.html", // current page
            idleTimeoutInSeconds: 999999999 // seconds
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
        } else {
        }
        timebar.style.height = Math.floor(timeround / 5) + "%";
    }, 5000);
}
function earlytimebar() {
    let eartimebar = document.getElementById('earlytimebar');
    let ttime = window.localStorage.getItem("timespentbyuser");
    if (ttime <= 0) {
        console.log("Error: local ttime is less than 0");
    } else {
        eartimebar.style.height = Math.floor(ttime / 5) + "%";
    }
}
function lite() {
    let box = document.getElementById('toggle-animations');
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
    let boxo = document.getElementById('toggle-animations');
    if ( tog == 0) {
        document.body.style.setProperty("--toggle", "0");
        boxo.checked = true;
    } else {
        document.body.style.setProperty("--toggle", "1");
        boxo.checked = false;
    }
}
window.onload = litecheck(), cpuutils(), ramutils(), temp(), timespent(), earlytimebar(), checkbattery(), checktime(), drag(), terminaltext();