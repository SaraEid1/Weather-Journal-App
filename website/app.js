/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//API Credentials
let baseURL= 'http://api.openweathermap.org/data/2.5/find?q=zip&units=metric';
const apiKey = '&appid='; //The API Key is saved in a named const variable

let button = document.getElementById('generate');
button.addEventListener ('click', actionFunction); //adding an event listner to the element (button) with the id: 'generate'

function actionFunction (e){
    const feelings = document.getElementById ('feelings').value;
    const zip= document.getElementById ('zip').value;
    
    if (zip == ''){
        alert(' No zip code provided');
        return false;
    }
    
    else if (!ZipValidation(zip)){
        alert('Zip code provided is not correct!');
        return false;
    }

    WeatherDataFunc(baseURL, zip, apiKey)

    .then (function (data){
        console.log (data);
        postData('/addData', {date: newDate, temp: data.list[0].main.temp, content: feelings})
        updateUI()

    })
};

const WeatherDataFunc = async (baseURL, zip, apiKey)=>{
    const res= await fetch(baseURL+ zip+ apiKey)
    try {

        const data = await res.json();
        console.log(data);
        console.log (baseURL);
        return data; //Data is returned from the external API

      }  catch(error) {
        console.log("error", error);
      }
    }

const postData = async (url ='', data={}) =>{ //client side function takes two arguments, the URL, and an object holding the data 
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        
    });
    try {
        const newData = await res.json();
        console.log (newData);
        return newData;
    } catch (error){
        console.log ('error', error); //catch the error if it occurs
    }
}

//function to dynamically update the UI from the server
const updateUI = async ()=> {
    const req = await fetch ('/all');
    try{
        const weatherData = await req.json();
        console.log (weatherData);
        //Setting the innerHTML properties dynamically according to the data returned by the route of the app
        document.getElementById ('date').innerHTML = "Date: " + weatherData.date;
        document.getElementById ('temp').innerHTML = "Temperature: " + weatherData.temp;
        document.getElementById ('content').innerHTML = "Feelings: " +weatherData.content;
    } catch (error){
        console.log ('error', error);
    }
}

function ZipValidation(elem){
    var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;
     return zipCode.test(elem);
}