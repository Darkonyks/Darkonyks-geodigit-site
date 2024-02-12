document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".show-overlay-button");
    var overlays = document.querySelectorAll(".image-overlay");
  
    buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        var overlayClass = this.getAttribute("data-overlay");
        var overlay = document.querySelector("." + overlayClass);
  
        // Hide all overlays
        overlays.forEach(function(overlay) {
          overlay.classList.remove("show");
        });
  
        // Show the clicked overlay
        overlay.classList.add("show");
      });
    });
  
    overlays.forEach(function(overlay) {
      overlay.addEventListener("click", function() {
        // Prevent hover behavior while the overlay is shown
        overlay.classList.remove("show");
      });
    });
    
  });