// Function to extract video ID from the URL
function extractVideoID(url) {
  try {
    const parsed = new URL(url);

    // Handle youtu.be links
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('?')[0];
    }

    // Handle standard YouTube links
    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v');
    }

    return null;
  } catch (e) {
    return null;
  }
}

// Function to display thumbnails based on video ID
function displayThumbnails(videoId) {
  const thumbnailsDiv = document.getElementById('thumbnails');
  const downloadButton = document.getElementById('downloadThumbnails');
  thumbnailsDiv.innerHTML = '';

  if (!videoId) {
    thumbnailsDiv.innerHTML = '<p>Invalid YouTube URL. Please try again.</p>';
    downloadButton.style.display = 'none'; // Hide download button if no valid URL
    return;
  }

  const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  let thumbnails = [];

  qualities.forEach(quality => {
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    img.alt = `${quality} thumbnail`;
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/480x360?text=No+Thumbnail';
    };
    thumbnailsDiv.appendChild(img);
    thumbnails.push(img.src); // Collect the image URLs
  });

  // Show the download button when thumbnails are loaded
  downloadButton.style.display = 'inline-block';

  // Store the thumbnails array in the window object for later use
  window.thumbnailsToDownload = thumbnails;
}

// Function to download all the thumbnails when the button is clicked
function downloadThumbnails() {
  const thumbnails = window.thumbnailsToDownload || [];

  thumbnails.forEach((src, index) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `thumbnail_${index + 1}.jpg`;
    link.click();
  });
}

// Event listener for "Get Thumbnails" button to fetch and display thumbnails
document.getElementById('getThumbnails').addEventListener('click', () => {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  displayThumbnails(videoId);
});

// Event listener for "Download Thumbnails" button to download images
document.getElementById('downloadThumbnails').addEventListener('click', () => {
  downloadThumbnails();
});
