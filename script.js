function getVideoId(url) {
  const regex = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getThumbnail() {
  const url = document.getElementById("videoUrl").value;
  const videoId = getVideoId(url);
  const thumbnailsDiv = document.getElementById("thumbnails");
  thumbnailsDiv.innerHTML = "";

  if (!videoId) {
    thumbnailsDiv.innerHTML = "<p>Invalid YouTube URL.</p>";
    return;
  }

  const resolutions = ["default", "hqdefault", "mqdefault", "sddefault", "maxresdefault"];
  resolutions.forEach(res => {
    const imgUrl = `https://img.youtube.com/vi/${videoId}/${res}.jpg`;
    thumbnailsDiv.innerHTML += `
      <div>
        <h3>${res}.jpg</h3>
        <a href="${imgUrl}" target="_blank" download>
          <img src="${imgUrl}" alt="${res} thumbnail" />
        </a>
      </div>
    `;
  });
}
