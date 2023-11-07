var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://your-github-username.github.io/your-repositoryname/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
renderHTML(ourData);
};
ourRequest.send();
});
function renderHTML(data){
var htmlString = "this is a test";
cityContainer.insertAdjacentHTML('beforeend' , htmlString);
}