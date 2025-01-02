const imageUpload = document.getElementById("imageUpload");
const downloadButton = document.getElementById("downloadImage");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

const grayscaleSlider = document.getElementById("grayscale");
const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");

let img = new Image();

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
};

// Apply filters to the canvas
function applyFilters() {
  const grayscale = grayscaleSlider.value;
  const brightness = brightnessSlider.value;
  const contrast = contrastSlider.value;

  ctx.filter = `
    grayscale(${grayscale}%)
    brightness(${brightness}%)
    contrast(${contrast}%)
  `;
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

// Event listeners for filters
grayscaleSlider.addEventListener("input", applyFilters);
brightnessSlider.addEventListener("input", applyFilters);
contrastSlider.addEventListener("input", applyFilters);

// Download processed image
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "processed-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
