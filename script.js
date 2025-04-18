document.getElementById('fetchBtn').addEventListener('click', () => {
  const url = document.getElementById('youtubeUrl').value.trim();
  const errorDiv = document.getElementById('error');
  const thumbnailsDiv = document.getElementById('thumbnails');
  thumbnailsDiv.innerHTML = '';
  errorDiv.textContent = '';

  const videoId = extractVideoID(url);

  if (!videoId) {
    errorDiv.textContent = 'Please enter a valid YouTube video URL.';
    return;
  }

  const thumbnailQualities = [
    { label: 'Default', url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
    { label: 'Medium', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    { label: 'High', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { label: 'Standard', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
    { label: 'Max Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
  ];

  thumbnailQualities.forEach(thumb => {
    const container = document.createElement('div');
    container.classList.add('thumb-container');

    const img = document.createElement('img');
    img.src = thumb.url;
    img.alt = `${thumb.label} thumbnail`;

    const label = document.createElement('p');
    label.textContent = thumb.label;

    const link = document.createElement('a');
    link.href = thumb.url;
    link.download = `${videoId}-${thumb.label}.jpg`;
    link.textContent = 'Download';
    link.classList.add('download-btn');
    link.target = '_blank';

    container.appendChild(img);
    container.appendChild(label);
    container.appendChild(link);

    thumbnailsDiv.appendChild(container);
  });
});

function extractVideoID(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    } else if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v');
    }
    return null;
  } catch (e) {
    return null;
  }
}
