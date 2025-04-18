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
  thumbnailsDiv.innerHTML = '';

  if (!videoId) {
    thumbnailsDiv.innerHTML = '<p>Invalid YouTube URL. Please try again.</p>';
    return;
  }

  const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  qualities.forEach(quality => {
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    img.alt = `${quality} thumbnail`;
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/480x360?text=No+Thumbnail';
    };
    thumbnailsDiv.appendChild(img);
  });
}

// Event listener for button click to fetch and display thumbnails
document.getElementById('getThumbnails').addEventListener('click', () => {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  displayThumbnails(videoId);
});
