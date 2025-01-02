const imageUpload = document.getElementById("imageUpload");
const downloadButton = document.getElementById("downloadImage");
const removeBackgroundButton = document.getElementById("removeBackground");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

const grayscaleSlider = document.getElementById("grayscale");
const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");
const resizeWidthInput = document.getElementById("resizeWidth");
const resizeHeightInput = document.getElementById("resizeHeight");
const bgColorInput = document.getElementById("bgColor");
const cropButton = document.getElementById("cropImage");

let img = new Image();
let isBackgroundRemoved = false;

// Event listener for image upload
imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Load image onto the canvas
img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  downloadButton.disabled = false;
  removeBackgroundButton.disabled = false;
};

// Apply filters to the canvas
function applyFilters() {
  const grayscale = grayscaleSlider.value;
  const brightness = brightnessSlider.value;
  const contrast = contrastSlider.value;
  const bgColor = bgColorInput.value;

  ctx.filter = `
    grayscale(${grayscale}%)
    brightness(${brightness}%)
    contrast(${contrast}%)
  `;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill with background color
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

// Event listeners for filters
grayscaleSlider.addEventListener("input", applyFilters);
brightnessSlider.addEventListener("input", applyFilters);
contrastSlider.addEventListener("input", applyFilters);
bgColorInput.addEventListener("input", applyFilters);

// Resize the image
function resizeImage() {
  const newWidth = parseInt(resizeWidthInput.value) || img.width;
  const newHeight = parseInt(resizeHeightInput.value) || img.height;
  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(img, 0, 0, newWidth, newHeight);
}

// Event listener for resizing
resizeWidthInput.addEventListener("input", resizeImage);
resizeHeightInput.addEventListener("input", resizeImage);

// Crop the image
function cropImage() {
  const width = img.width / 2;
  const height = img.height / 2;
  const x = img.width / 4;
  const y = img.height / 4;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
}

// Event listener for cropping
cropButton.addEventListener("click", cropImage);

// Remove the background (simple approach with a color key)
function removeBackground() {
  // Simple background removal (this is just an example, real BG removal requires more advanced techniques)
  isBackgroundRemoved = !isBackgroundRemoved;
  if (isBackgroundRemoved) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF"; // Assume white is the background to remove
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);
  }
}

// Event listener for background removal
removeBackgroundButton.addEventListener("click", removeBackground);

// Download the processed image
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "processed-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
