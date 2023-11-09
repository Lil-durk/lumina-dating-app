// Function to handle the image click event and toggle styles
function handleImageClick(element) {
  const img = element.querySelector('img');
  if (img.style.opacity === '0.5') {
    // If the image is already semi-transparent, revert the styles
    img.style.opacity = 1;
    element.style.backgroundColor = 'white';
  } else {
    // Otherwise, make the image semi-transparent and set the background color to yellow
    img.style.opacity = 0.5;
    element.style.backgroundColor = 'yellow';
  }
}
