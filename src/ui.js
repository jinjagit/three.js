import { testCube } from './testCube'

const ui = () => {
  function toggleOverlay(overlay) {
    if (window.getComputedStyle(overlay,null).getPropertyValue('display') == 'block') {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  }

  function toggleWireframe(wireframeText) {
    let wire = testCube.toggleWire();
    if (wire == true) {
      wireframeValue.innerHTML = "true";
      wireframeValue.style.color = "#99ff33";
    } else {
      wireframeValue.innerHTML = "false";
      wireframeValue.style.color = "red";
    }
  }

  let overlay = document.getElementById('overlay');
  let overlayToggle = document.getElementById('overlay-toggle');
  let wireframeText = document.getElementById('wireframe-text');
  let wireframeValue = document.getElementById('wireframe-value');

  overlay.style.display = "none";
  wireframeValue.style.color = "red";

  overlayToggle.addEventListener("click", function() {
    toggleOverlay(overlay);
  });

  wireframeText.addEventListener("click", function() {
    toggleWireframe(wireframeText);
  });
};

export { ui }