const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

let target = "Pune";

form.addEventListener("submit", searchForLocation);

async function fetchResult(targetLocation) {
        let url = `https://api.weatherapi.com/v1/current.json?key=0b91130b5b2749a9b8f65244262001&q=${targetLocation}&aqi=no`;

        const res = await fetch(url);
        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetail(temp, locationName, time, condition);

}

function updateDetail(temp, locationName, time, condition) {

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDate = getDayName(new Date(splitDate).getDay());


    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateTimeField.innerText = `${splitDate} ${currentDate} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    fetchResult(target);
}

function getDayName(number){
    switch (number){
            case 0:
            return "Sunday";
            
            case 1:
            return "Monday";
            
            case 2:
            return "Tuesday";
            
            case 3:
            return "Wednesday";
            
            case 4:
            return "Thursday";
            
            case 5:
            return "Friday";
            
            case 6:
            return "Saturday";
    }
}

fetchResult(target);