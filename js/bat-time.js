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
    checkbattery(), checktime();
};