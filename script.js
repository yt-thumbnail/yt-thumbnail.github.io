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

// Function to display thumbnails and create individual download buttons
function displayThumbnails(videoId) {
  const thumbnailsDiv = document.getElementById('thumbnails');
  thumbnailsDiv.innerHTML = ''; // Clear any existing thumbnails

  if (!videoId) {
    thumbnailsDiv.innerHTML = '<p>Invalid YouTube URL. Please try again.</p>';
    return;
  }

  const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  
  // Loop through each thumbnail quality and display them
  qualities.forEach((quality, index) => {
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    img.alt = `${quality} thumbnail`;

    img.onerror = () => {
      img.src = 'https://via.placeholder.com/480x360?text=No+Thumbnail';
    };

    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download';

    // Event listener for the download button of each thumbnail
    downloadButton.addEventListener('click', () => {
      downloadThumbnail(img.src, `thumbnail_${index + 1}.jpg`);
    });

    // Append image and button to the thumbnails div
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.appendChild(img);
    thumbnailContainer.appendChild(downloadButton);
    thumbnailsDiv.appendChild(thumbnailContainer);
  });
}

// Function to download a single thumbnail
function downloadThumbnail(src, fileName) {
  fetch(src)
    .then(response => response.blob()) // Fetch the image as a Blob
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName; // Use the provided file name for download
      link.click(); // Simulate click to trigger download
      URL.revokeObjectURL(blobUrl); // Revoke the Object URL after download
    })
    .catch(error => {
      console.error('Download failed for thumbnail:', error);
    });
}

// Event listener for "Get Thumbnails" button to fetch and display thumbnails
document.getElementById('getThumbnails').addEventListener('click', () => {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  displayThumbnails(videoId);
});
