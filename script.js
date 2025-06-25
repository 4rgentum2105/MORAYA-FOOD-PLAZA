document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks for reaching out to Moraya Food Plaza! We'll contact you soon.");
  this.reset();
});

