let slideIndex = 1;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Add this event listener to show the first slide when the page loads
window.addEventListener('load', function() {
  showSlides(slideIndex);
});