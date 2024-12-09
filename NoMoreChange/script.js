document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color-picker');

    let drawing = false;
    let currentColor = colorPicker.value;

    colorPicker.addEventListener('input', function () {
        currentColor = this.value;
    });

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseleave', function () {
        drawing = false;
    });

    // Define clearCanvas globally
    window.clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
});


function onDragStart(event, emoji) {
    draggedEmoji = emoji;
}

function allowDrop(event) {
    event.preventDefault();
}

function onDrop(event, paragraphId) {
    const tagContainer = document.getElementById(`tags-${paragraphId}`);
    if (draggedEmoji) {
        const tag = document.createElement('span');
        tag.innerText = draggedEmoji;
        tagContainer.appendChild(tag);
        draggedEmoji = null;
    }
}

let userChoice = null; // Track user's choice: 'hesitate' or 'approach'

function selectScenario(choice) {
    console.log(`Scenario chosen: ${choice}`); // Debugging output

    // Reset button highlights
    document.getElementById('choice-hesitate').classList.remove('bg-blue-200');
    document.getElementById('choice-approach').classList.remove('bg-blue-200');

    // Highlight the chosen button
    if (choice === 'hesitate') {
        document.getElementById('choice-hesitate').classList.add('bg-blue-200');
        loadHesitateScenario();
    } else if (choice === 'approach') {
        document.getElementById('choice-approach').classList.add('bg-blue-200');
        loadApproachScenario();
    }
}

function loadHesitateScenario() {
    console.log('Loading "Hesitate and Wait" scenario');
    for (let i = 4; i <= 8; i++) {
        document.getElementById(`p${i}-auggie`).style.display = 'block';
        document.getElementById(`p${i}-summer`).style.display = 'block';
    }
    document.getElementById('p9-auggie').style.display = 'none';
    document.getElementById('p9-summer').style.display = 'none';
}

function loadApproachScenario() {
    console.log('Loading "Walk Directly and Say Hi" scenario');
    for (let i = 4; i <= 8; i++) {
        document.getElementById(`p${i}-auggie`).style.display = 'none';
        document.getElementById(`p${i}-summer`).style.display = 'none';
    }
    document.getElementById('p9-auggie').style.display = 'block';
    document.getElementById('p9-summer').style.display = 'block';
}

// Load the default "Hesitate and Wait" scenario on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded. Setting default scenario to "Hesitate and Wait".');
    loadHesitateScenario();
});

