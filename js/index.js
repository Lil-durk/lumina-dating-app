let mediaStream = null;
const player = document.getElementById("player");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("capture");
const stopCameraButton = document.getElementById("stopCamera");

const constraints = {
  video: true,
};

captureButton.addEventListener("click", () => {
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
});

function openCameraPopup(popupId) {
  const popup = document.getElementById(popupId);
  const popupPlayer = document.getElementById("popup-player");
  const popupCapture = document.getElementById("popup-capture");
  const popupCanvas = document.getElementById("canvas");

  // Function to capture a photo and display it in the corresponding rectangle
  popupCapture.addEventListener("click", () => {
    popupCanvas
      .getContext("2d")
      .drawImage(popupPlayer, 0, 0, popupCanvas.width, popupCanvas.height);
    const cameraIcon = document.getElementById("cameraIcon");
    const addButton = document.getElementById("addButton");
    cameraIcon.style.display = "none";
    addButton.style.display = "none";
    canvas.removeAttribute("hidden");
    // Here, you should determine the target rectangle and replace the image accordingly
    // You can use the captured image like this:
    const capturedImage = new Image();
    capturedImage.src = popupCanvas.toDataURL("image/png");

    // Replace the corresponding rectangle's content with the captured image
    // Example: document.getElementById('rectangle1').appendChild(capturedImage);
  });

  // Function to close the popup
  function closePopup() {
    popup.style.display = "none";
  }

  // Attach event listener to the popup video element to stop the camera when the popup is closed
  popupPlayer.addEventListener("loadedmetadata", () => {
    popupPlayer.play();
  });

  // Attach event listener to the popup capture button to close the popup
  popupCapture.addEventListener("click", closePopup);

  // Display the popup
  popup.style.display = "block";

  // Open the camera in the popup
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      popupPlayer.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing the camera:", error);
      closePopup();
    });
}

// Function to stop the camera
function stopCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }
}

// Attach event listeners to the buttons
document.getElementById("openCamera").addEventListener("click", openCamera);
document.getElementById("stopCamera").addEventListener("click", stopCamera);

// Initially, hide the "Stop Camera" button
stopCameraButton.style.display = "none";

// Show the "Stop Camera" button when the camera is open
player.addEventListener("loadedmetadata", () => {
  stopCameraButton.style.display = "block";
});
