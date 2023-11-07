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
            var ourData = JSON.parse(ourRequest.responseText)
            console.log(ourData['city'])
        }
        ourRequest.send();
    }
})
