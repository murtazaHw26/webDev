var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://github.com/murtazaHw26/webDev/blob/main/week8/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
console.log(ourData[0]);
};
ourRequest.send();