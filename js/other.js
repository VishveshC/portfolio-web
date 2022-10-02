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
        let left = "25";
        let top = "50";
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
window.onload = function() {
    checkbattery(), checktime(), drag();
};