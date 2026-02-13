const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let noMoving = false;   
let noInterval;         

// ❌ REMOVED:
// yesBtn.disabled = true;
// yesBtn.style.pointerEvents = "none";

let yesSize = 1;
let yesGrowing = false;

function startYesGrowing() {
    if (!yesGrowing) {
        yesGrowing = true;

        setInterval(() => {
            yesSize += 0.1;
            yesBtn.style.transform = `scale(${yesSize})`;
        }, 1000);
    }
}


// Desktop: mouse near NO
document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 150) {
        startYesGrowing();
        if (!noMoving) {
            noMoving = true;
            moveNoButton();
            noInterval = setInterval(moveNoButton, 400);
            setTimeout(() => {
                clearInterval(noInterval);
                noInterval = setInterval(moveNoButton, 400);
            }, 3000);
        }
    }
});

// Mobile: touch near NO
document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = noBtn.getBoundingClientRect();

    const safeMargin = 20; // extra buffer in pixels
    const insideX = touch.clientX > rect.left - safeMargin && touch.clientX < rect.right + safeMargin;
    const insideY = touch.clientY > rect.top - safeMargin && touch.clientY < rect.bottom + safeMargin;

    if (insideX && insideY) {
        // Only now trigger YES growth
        startYesGrowing();

        if (!noMoving) {
            noMoving = true;
            moveNoButton();
            noInterval = setInterval(moveNoButton, 400);
            setTimeout(() => {
                clearInterval(noInterval);
                noInterval = setInterval(moveNoButton, 400);
            }, 3000);
        }
    }
});





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
   container.remove();

   // 🔹 PREMIUM BACKGROUND SETUP
   // Remove old background first
   document.body.style.backgroundImage = "";
   document.body.style.backgroundColor = "";

 

  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
const bgImage = document.createElement("img");
bgImage.src = isMobile ? "us1.jpg" : "us.jpg";
bgImage.style.position = "fixed";
bgImage.style.top = "0";
bgImage.style.left = "0";
bgImage.style.width = "100%";
bgImage.style.height = "100%";
bgImage.style.objectFit = "cover";
bgImage.style.zIndex = "0"; // <-- change from -2
document.body.insertBefore(bgImage, document.body.firstChild);

document.body.appendChild(bgImage);


   // Optional soft dark overlay
   const overlay = document.createElement("div");
   overlay.style.position = "fixed";
   overlay.style.inset = "0";
   overlay.style.background = "rgba(0,0,0,0.25)";
   overlay.style.zIndex = "-1";

   document.body.appendChild(overlay);

   

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
    "Happy Valentine’s Day, my love ❤️",
    "No matter the miles between us, you’re always in my heart. You truly mean the world to me.",
    "Long distance isn’t easy, but loving you is the easiest and best thing in my life.",
    "I can’t wait to see you in 2 days, hold you close, and remind you how much you mean to me.",
    "Thank you for being my everything. I love you more than words can say ❤️✨",
    "Forever yours."
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
    // ✅ Add the "yes.gif" after clicking YES
const yesGif = document.createElement("img");
yesGif.src = "final.png"; // make sure this file exists
yesGif.style.width = "250px"; // adjust size
yesGif.style.borderRadius = "25px";
yesGif.style.position = "absolute";
yesGif.style.top = "25%"; // position below messages
yesGif.style.left = "20%";
yesGif.style.transform = "translateX(-50%)";
document.body.appendChild(yesGif);
// ✅ Second GIF (right below first one)
const yayGif = document.createElement("img");
yayGif.src = "snoopi.png"; 
yayGif.style.width = "250px";
yayGif.style.borderRadius = "25px";
yayGif.style.position = "absolute";
yayGif.style.top = "45%";   // moved lower than first GIF
yayGif.style.left = "20%";  // SAME as first GIF
yayGif.style.transform = "translateX(-50%)";
document.body.appendChild(yayGif);




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





