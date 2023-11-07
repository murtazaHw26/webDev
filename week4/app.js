const apiKey = 'f97058624caba8fd0ac18bf5d95331ec';

var inputText = document.getElementById('cityInput');
var btn = document.getElementById('btn')
var info = document.getElementById('weather-info')

btn.addEventListener('click', function(){
    var ourRequest = new XMLHttpRequest();
    var text = inputText.value
    var formattedText = text.charAt(0).toUpperCase() + text.slice(1).trim();

    if (text == ''){
        alert('Please enter a city name')
    }else {
        ourRequest.open(`GET`, `http://api.openweathermap.org/data/2.5/forecast?q=${formattedText}&appid=` + apiKey);
        ourRequest.onload = function(){
            if (ourRequest.status >= 200 && ourRequest.status < 400) {
                var ourData = JSON.parse(ourRequest.responseText);
                console.log(ourData)
                var description = ourData['list'][0]['weather'][0]['description']
                var temperature = parseFloat((ourData['list'][0]['main']['temp'] - 273.15).toFixed(2))
                var wind = ourData['list'][0]['wind']['speed']
                renderHTML(formattedText, description, temperature, wind); 
            } else {
                if(ourRequest.status == 404) {
                    alert("This city does not exist..")
                } else {
                console.error('Error fetching data:', ourRequest.status);
            }
                
            }
        }
        ourRequest.onerror = function() {
            console.error('Network error occurred');
        }
        ourRequest.send();
    }
})
function renderHTML(city, description, temperature, wind){
    var htmlString = "";
    htmlString += "<p>" + "The weather in " + city + ' is ' + description + ".</p>";
    htmlString += "<p>" + "The temperature is " + temperature + '°C' + " with a wind speed of " + wind + "m/s." + "</p>";
    htmlString += "<hr>";
    info.insertAdjacentHTML('beforeend' , htmlString);
    }