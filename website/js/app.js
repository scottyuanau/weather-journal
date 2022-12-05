/*Example API Call for Weather
https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
*/

/*
//Geocode Zip API Call
https://api.openweathermap.org/geo/1.0/zip?zip=71601&appid=69460dd362bf8c5d994887599f201a80

*/

let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
let zipURL = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
let apiKey = '&appid=69460dd362bf8c5d994887599f201a80&units=imperial';



document.querySelector('.generate').addEventListener('click',performAction);
let lat;
let lon; //needs to do something here, first time is returning undefined, second time is ok.

function performAction() {
        let feelings = document.querySelector('.feelings').value;
        let zip = document.querySelector('#zip').value;

        getCoordinates(zipURL,apiKey,zip)
        .then(getTemperature(lat, lon,weatherURL,apiKey));



}

//find coordinates
    const getCoordinates = async (url,key,zip)=>{
        const res = await fetch(url+zip+key);
        try {
            const data = await res.json();
            lat = data.lat;
            lon = data.lon;
            return data;
        } catch(error) {
            console.log('error',error);
        }

    };
//find temperature
    const getTemperature = async (lat,lon,url,key)=>{
        const res = await fetch(url+'lat='+lat+'&lon='+lon+key);
        try {
            const data = await res.json();
            console.log(data);
            return data;
        } catch(error) {
            console.log('error',error);
        }
    };





//placeholder effect
document.querySelector('.feelings').addEventListener('focus',()=>{
    document.querySelector('.feelings').classList.add('activeplace-holder-feeling');
});
document.querySelector('.feelings').addEventListener('blur',()=>{
    document.querySelector('.feelings').classList.remove('activeplace-holder-feeling');
});
document.querySelector('#zip').addEventListener('focus',()=>{
    document.querySelector('#zip').classList.add('activeplace-holder-zip');
});
document.querySelector('#zip').addEventListener('blur',()=>{
    document.querySelector('#zip').classList.remove('activeplace-holder-zip');
});