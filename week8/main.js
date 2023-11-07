var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://murtazahw26.github.io/webDev/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
console.log(ourData[0]);
};
ourRequest.send();