// avatar.js

// Returns the default avatar if none is found in localStorage
function getAvatar() {
  const avatar = localStorage.getItem("userAvatar");
  return avatar || "data:images/noob.png";
}

// Renders avatar in a given <img> tag by ID
function renderAvatar(imgElementId) {
  const img = document.getElementById(imgElementId);
  if (img) {
    img.src = getAvatar();
  }
}

// Example: use this in your HTML
// <img id="avatar-img" />
// And call: renderAvatar("avatar-img");
