const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let noMoving = false;
let noInterval;

// Function to move NO button randomly
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

    document.body.style.backgroundImage = "url('us.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    const finalMessage = document.createElement("h1");
finalMessage.innerText = "Thank you for saying yes budi. Forever & Always 💖";
finalMessage.style.color = "Red";
finalMessage.style.fontSize = "50px";
finalMessage.style.textShadow = "2px 2px 10px black";
finalMessage.style.position = "absolute";
finalMessage.style.top = "20px";       // distance from top of the page
finalMessage.style.left = "50%";       // center horizontally
finalMessage.style.transform = "translateX(-50%)"; // only center horizontally


    document.body.appendChild(finalMessage);

    // 🔥 Create audio dynamically and play
    const audio = new Audio("song.mp3"); // this ensures path is correct
    audio.volume = 0.8; // optional
    audio.play().catch(error => {
        console.log("Audio blocked:", error);
        // Fallback: click anywhere to play
        alert("Click anywhere to play the song!");
        document.body.addEventListener("click", () => audio.play(), { once: true });
    });
});

// Move NO button when mouse is near
document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 150) {
        if (!noMoving) {
            noMoving = true;
            moveNoButton();
            noInterval = setInterval(moveNoButton, 500);
            setTimeout(() => {
                clearInterval(noInterval);
                noInterval = setInterval(moveNoButton, 500);
            }, 3000);
        }
    }
});
