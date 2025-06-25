document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thanks for contacting Moraya Food Plaza! We'll get back to you soon.");
  this.reset();
});
