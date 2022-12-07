/*Example API Call for Weather
https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
*/

/*
//Geocode Zip API Call
https://api.openweathermap.org/geo/1.0/zip?zip=71601&appid=69460dd362bf8c5d994887599f201a80

*/

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const zipURL = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
const apiKey = '&appid=69460dd362bf8c5d994887599f201a80&units=imperial';
let date = new Date();
let year = date.getFullYear();
let month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'][date.getMonth()];
let day = date.getDate();
let today = [day,month,year];
//setup dates


document.querySelector('.generate').addEventListener('click',performAction);

function performAction() {
        let feelings = document.querySelector('.feelings').value;
        let zip = document.querySelector('#zip').value;
        getCoordinates(zipURL,apiKey,zip)
        .then((coordinates)=>getTemperature(coordinates,weatherURL,apiKey))
        .then((temperature)=>postData('/addJournal',{'date': `${day} ${month} ${year}`,'temperature': temperature,'feelings': feelings}))
        .then(()=>updateUI()); //need to pass in the returned promise from previous call, otherwise would be invoked directly and cause sequence error.
    }




//find coordinates
    const getCoordinates = async (url,key,zip)=>{
        const res = await fetch(url+zip+key);
        let coordinates = [];
        try {
            const data = await res.json();
            coordinates.push(data.lat);
            coordinates.push(data.lon);
            return coordinates;
        } catch(error) {
            console.log('error',error);
        }

    };
//find temperature
    const getTemperature = async (coordinates,url,key)=>{
        const res = await fetch(url+'lat='+coordinates[0]+'&lon='+coordinates[1]+key);
        let temperature;
        try {
            const data = await res.json();
            temperature = data.main.temp;
            return temperature;
        } catch(error) {
            console.log('error',error);
        }
    };

//post data to server
    const postData = async (url = '', data = {})=>{
        const response = await fetch(url, {
            method:'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        try {
            const newData = await response.json();
            return newData;
        } catch(error) {
            console.log('error', error);
        }
    };

//update UI
    const updateUI = async () => {
        const response = await fetch(`/all`);
        try {
            const allData = await response.json();
        let newFeeling = document.createElement('div');
        let newFeelingBasic = document.createElement('div');
        let newFeelingContent = document.createElement('div');
        let newFeelingBasicHeading = document.createElement('h2');
        let newFeelingBasicContent = document.createElement('p');
        newFeeling.classList.add('newFeeling');
        newFeelingBasic.classList.add('feelingBasic');
        newFeelingContent.classList.add('feelingContent');
        newFeelingBasicContent.classList.add('feelingBasicContent');
        newFeelingBasicHeading.textContent = allData.date;
        newFeelingBasicContent.textContent = `${allData.temperature.toFixed(2)}°F, ${((allData.temperature - 32)*5/9).toFixed(2)}°C`;
        let newFeelingPara = document.createElement('p');
        newFeelingPara.textContent = allData.feelings;
        newFeelingContent.appendChild(newFeelingPara);
        newFeelingBasic.appendChild(newFeelingBasicHeading);
        newFeelingBasic.appendChild(newFeelingBasicContent);
        newFeeling.appendChild(newFeelingBasic);
        newFeeling.appendChild(newFeelingContent);
        document.querySelector('.main-output').prepend(newFeeling);

        } catch(error) {
            console.log('error', error);
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

//delete button
document.querySelector('.delete').addEventListener('click', ()=>{
    document.querySelector('.delete').previousSibling.remove();
})

//update today's date
window.addEventListener('load',()=>{
    document.querySelector('.todaydate').textContent =  `${day} ${month} ${year}`;
})