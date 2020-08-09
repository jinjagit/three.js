const ui = () => {
  function toggleOverlay(overlay) {
    if (window.getComputedStyle(overlay,null).getPropertyValue('display') == 'block') {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  }

  let overlay = document.getElementById('overlay');
  let overlayToggle = document.getElementById('overlay-toggle');

  overlay.style.display = "none";

  overlayToggle.addEventListener("click", function() {
    toggleOverlay(overlay);
  });
};

export { ui }