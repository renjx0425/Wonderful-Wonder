const scenes = {
  1: {
    title: "Scene 1 - Lunchroom",
    perspectives: {
      august: "As August steps into the bustling lunchroom, his heart pounds in his chest. The overwhelming noise of clanging trays and overlapping conversations feels like a tidal wave crashing over him. He grips his lunch bag tightly, his knuckles whitening. Every gaze that flickers his way feels like a spotlight, highlighting his differences. He scans the room for a friendly face but sees only curious stares and whispered exchanges behind cupped hands. The thought of sitting alone fills him with dread, but approaching someone feels equally daunting. He takes a deep breath, hoping for courage, and wonders if today will be the day he finally makes a friend.",
      via: "From her seat across the lunchroom, Via watches her brother hover near the entrance. She notices the slight tremble in his hands and the way his eyes dart around the room. Her protective instincts flare up, and she feels an urge to rush over and stand by his side. But she hesitates, knowing that August wants to be treated like everyone else. She wrestles with conflicting emotions—pride in his bravery and fear for his vulnerability. She silently wills someone to reach out to him, her own lunch forgotten as she watches the scene unfold.",
      jack: "Jack spots August lingering by the doorway, looking like a deer caught in headlights. He remembers the time they were science partners and how easy it was to talk to him. Jack glances at his usual table where his friends are goofing off, then back at August. A pang of guilt twists in his stomach. He knows what the right thing to do is. 'Hey, guys, I'll catch up with you later,' he says to his friends, who raise their eyebrows in surprise. He strides over to August, offering a casual smile. 'Mind if I sit with you?' he asks, hoping to make this first step a little easier for both of them.",
      summer: "Summer notices August the moment he enters the lunchroom. She sees the uncertainty in his eyes and feels a tug at her heart. Without overthinking, she waves energetically, catching his attention. 'August! Over here!' she calls out. The relief that washes over his face makes her smile widen. As he approaches, she moves her tray to make space. 'I was just about to start on this mystery casserole. Want to join me in figuring out what it is?' she jokes lightly. She believes that everyone deserves a friend, and she's happy to be that person for him.",
      julian: "Julian leans back in his chair, casually tossing a grape into his mouth as he notices August standing alone. A sly grin spreads across his face. 'Check it out,' he whispers to his entourage, nodding in August's direction. 'Looks like someone forgot to tell him it's not Halloween yet.' His friends snicker, and Julian feels a surge of satisfaction. Making others laugh is his specialty, even if it means someone else gets hurt. To him, it's all in good fun—a harmless joke that keeps him at the center of attention."
    },
    reflection: "How do you think August feels when someone finally sits with him?"
  },
  2: {
    title: "Scene 2 - Classroom",
    perspectives: {
      august: "August feels nervous in the classroom...",
      via: "Via is concerned about August’s first day...",
      jack: "Jack tries to include August in the conversation...",
      summer: "Summer encourages others to include August...",
      julian: "Julian avoids interacting with August."
    },
    reflection: "What could you do to help someone feel included?"
  },
  3: {
    title: "Scene 3 - Playground",
    perspectives: {
      august: "August tries to fit in while others are playing...",
      via: "Via watches August from a distance, worried about him...",
      jack: "Jack invites August to join the game to make him feel welcome...",
      summer: "Summer makes sure August isn’t left out...",
      julian: "Julian avoids August and whispers about him to others."
    },
    reflection: "Why is it important to make others feel welcome in a new environment?"
  }
};

// Display selected scene and character perspective
function showScene(sceneNumber) {
  const character = document.getElementById('character-select').value;
  const scene = scenes[sceneNumber];

  if (scene && scene.perspectives[character]) {
      // Update scene title and description
      document.getElementById('scene-title').textContent = scene.title;
      document.getElementById('scene-description').textContent = scene.perspectives[character];
      document.getElementById('reflection-question').textContent = scene.reflection;
      loadReflection(scene.title);

      // Show specific image if it's Scene 1 and August
      const sceneImage = document.getElementById('scene-image');
      if (sceneNumber === 1 && character === 'august') {
          sceneImage.src = "images/auggie_lunchroom.gif";
          sceneImage.style.display = "block";
      } else {
          sceneImage.style.display = "none"; // Hide image for other scenes or characters
      }
  }
}

// Character image paths
const characterImages = {
august: "images/auggie_icon.png",
via: "images/via_icon.png",
jack: "images/jack_icon.png",
summer: "images/summer_icon.png",
julian: "images/julian_icon.png"
};

// Update character icon
function updateCharacterImage() {
const character = document.getElementById('character-select').value;
const iconPath = characterImages[character];
document.getElementById('character-icon').src = iconPath;
}

// Initialize with the first character's image
document.addEventListener("DOMContentLoaded", () => {
updateCharacterImage();
});

// Save reflection response to LocalStorage
function saveReflection() {
const sceneNumber = document.getElementById('scene-title').textContent;
const response = document.getElementById('reflection-response').value;
localStorage.setItem(`reflection_${sceneNumber}`, response);

const saveConfirmation = document.getElementById('save-confirmation');
saveConfirmation.style.display = "inline";
setTimeout(() => {
  saveConfirmation.style.display = "none";
}, 2000);
}

// Load reflection response from LocalStorage
function loadReflection(sceneNumber) {
const savedResponse = localStorage.getItem(`reflection_${sceneNumber}`);
document.getElementById('reflection-response').value = savedResponse || "";
}

// Draw Your Own Auggie - Canvas Drawing Functionality
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentColor = document.getElementById('color-picker').value;

// Update color when color picker changes
document.getElementById('color-picker').addEventListener('input', function() {
  currentColor = this.value;
});

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', function(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw line when mouse moves
canvas.addEventListener('mousemove', function(e) {
  if (drawing) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

// Stop drawing when mouse is released
canvas.addEventListener('mouseup', function() {
  drawing = false;
  ctx.closePath();
});

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Badge Tracking Variables
let perspectivesViewed = new Set();
let reflectionCompleted = false;
let drawingCompleted = false;

// Award badges with animation and tooltip update
function awardBadge(badgeId) {
  const badge = document.getElementById(badgeId);
  badge.style.opacity = "1";
  badge.setAttribute("data-achieved", "true");
  badge.classList.add("achieved-badge-animation"); // Add animation class
  localStorage.setItem(badgeId, "true");

  // Show notification or celebrate
  celebrateAchievement(badgeId);
}

// Tooltip display for badge descriptions
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    const description = badge.getAttribute('data-achievement');
    document.getElementById('badge-description').textContent = description;
  });
  badge.addEventListener('mouseleave', () => {
    document.getElementById('badge-description').textContent = "Hover over a badge to see its requirements.";
  });
});

// Celebration for unlocking an achievement
function celebrateAchievement(badgeId) {
  const badge = document.getElementById(badgeId);
  badge.classList.add("celebrate");
  setTimeout(() => badge.classList.remove("celebrate"), 1500);
}

// Check if the Perspective Explorer badge should be awarded
function checkPerspectiveExplorer(sceneNumber, character) {
  perspectivesViewed.add(`${sceneNumber}-${character}`);
  const totalCharacters = Object.keys(scenes[sceneNumber].perspectives).length;
  if (perspectivesViewed.size === totalCharacters) {
    awardBadge("perspective-explorer-badge");
  }
}

// Check if the Reflection Master badge should be awarded
function checkReflectionMaster() {
  reflectionCompleted = true;
  awardBadge("reflection-master-badge");
}

// Check if the Creative Artist badge should be awarded
function checkCreativeArtist() {
  if (!drawingCompleted) {
    drawingCompleted = true;
    awardBadge("creative-artist-badge");
  }
}

// Load awarded badges from LocalStorage on page load
function loadAwardedBadges() {
  if (localStorage.getItem("perspective-explorer-badge")) {
    awardBadge("perspective-explorer-badge");
  }
  if (localStorage.getItem("reflection-master-badge")) {
    awardBadge("reflection-master-badge");
  }
  if (localStorage.getItem("creative-artist-badge")) {
    awardBadge("creative-artist-badge");
  }
}

// Initialize with the first character's image and load awarded badges
document.addEventListener("DOMContentLoaded", () => {
  updateCharacterImage();
  loadAwardedBadges();
});

// Update showScene function to track perspectives viewed
function showScene(sceneNumber) {
  const character = document.getElementById('character-select').value;
  const scene = scenes[sceneNumber];

  if (scene && scene.perspectives[character]) {
    document.getElementById('scene-title').textContent = scene.title;
    document.getElementById('scene-description').textContent = scene.perspectives[character];
    document.getElementById('reflection-question').textContent = scene.reflection;
    loadReflection(scene.title);

    const sceneImage = document.getElementById('scene-image');
    if (sceneNumber === 1 && character === 'august') {
      sceneImage.src = "images/auggie_lunchroom.gif";
      sceneImage.style.display = "block";
    } else {
      sceneImage.style.display = "none";
    }

    // Check if all perspectives have been viewed in the scene
    checkPerspectiveExplorer(sceneNumber, character);
  }
}

// Update saveReflection to award Reflection Master badge
function saveReflection() {
  const sceneNumber = document.getElementById('scene-title').textContent;
  const response = document.getElementById('reflection-response').value;
  localStorage.setItem(`reflection_${sceneNumber}`, response);

  const saveConfirmation = document.getElementById('save-confirmation');
  saveConfirmation.style.display = "inline";
  setTimeout(() => {
    saveConfirmation.style.display = "none";
  }, 2000);

  // Award Reflection Master badge if the reflection is completed
  checkReflectionMaster();
}

// Update canvas drawing events to award Creative Artist badge
canvas.addEventListener('mousedown', function() {
  drawing = true;
  checkCreativeArtist(); // Award badge when starting to draw
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});
