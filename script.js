const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let noMoving = false;   // Flag to start movement
let noInterval;         // Store interval ID

// Function to move NO button randomly but keep it inside viewport
function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.position = "absolute";
}

// YES button click action
yesBtn.addEventListener("click", () => {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    // Change background
    document.body.style.backgroundImage = "url('us.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

   // 🔥 Create audio dynamically and play in loop
const audio = new Audio("song.mp3"); // ensures path is correct
audio.volume = 0.8; // optional
audio.loop = true;  // ← makes it loop forever
audio.play().catch(error => {
    console.log("Audio blocked:", error);
    // Fallback: click anywhere to play
    alert("Click anywhere to play the song!");
    document.body.addEventListener("click", () => audio.play(), { once: true });
});


    // Main final message
    const finalMessage = document.createElement("h1");
    finalMessage.innerText = "I knew you would say yes baby.Forever & Always 💖";
    finalMessage.style.color = "Red";
    finalMessage.style.fontSize = "50px";
    finalMessage.style.textShadow = "2px 2px 10px black";
    finalMessage.style.position = "absolute";
    finalMessage.style.top = "20%";
    finalMessage.style.left = "50%";
    finalMessage.style.transform = "translate(-50%, -50%)";
    finalMessage.style.textAlign = "center";
    document.body.appendChild(finalMessage);

    // Container for the paragraph message
    const msgContainer = document.createElement("div");
    msgContainer.style.color = "White";
    msgContainer.style.fontSize = "24px";
    msgContainer.style.textShadow = "1px 1px 5px black";
    msgContainer.style.position = "absolute";
    msgContainer.style.top = "45%";
    msgContainer.style.left = "50%";
    msgContainer.style.transform = "translate(-50%, -50%)";
    msgContainer.style.textAlign = "center";
    msgContainer.style.maxWidth = "700px";
    document.body.appendChild(msgContainer);

    // The long message broken into lines
    const messages = [
        "Happy Valentine’s Day, my love! 💖",
        "Thank you for the beautiful 10 and a half months we’ve shared.",
        "Every moment, every laugh, every late-night call with you has been so special.",
        "You mean the world to me, and even though distance keeps us apart, my heart is always with you.",
        "I love you more than words can express, and I’m so grateful for you every single day."
    ];


    // Function to display message line by line, word by word
    let lineIndex = 0;

    function showNextLine() {
        if (lineIndex >= messages.length) return;

        const p = document.createElement("p");
        msgContainer.appendChild(p);

        const words = messages[lineIndex].split(" ");
        let wordIndex = 0;

        function addWord() {
            if (wordIndex < words.length) {
                p.innerText += (wordIndex === 0 ? "" : " ") + words[wordIndex];
                wordIndex++;
                setTimeout(addWord, 300); // 300ms per word
            } else {
                lineIndex++;
                setTimeout(showNextLine, 500); // wait 0.5s before next line
            }
        }

        addWord();
    }

    showNextLine(); // start showing the message
});

// Start movement when mouse is close to NO button for the first time
document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Distance from mouse to center of NO button
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 150) { // Mouse is near
        if (!noMoving) {
            noMoving = true;

            // Move immediately once
            moveNoButton();

            // Start fast movement every 500ms
            noInterval = setInterval(moveNoButton, 400);

            // Ensure movement lasts at least 3 seconds
            setTimeout(() => {
                clearInterval(noInterval); // Stop after 3 seconds
                // Optional: start slower movement after 3 seconds
                noInterval = setInterval(moveNoButton, 400);
            }, 3000);
        }
    }
});
