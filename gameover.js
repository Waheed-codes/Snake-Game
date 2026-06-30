const playerName = sessionStorage.getItem("playerName") || "Player";
const finalScore = sessionStorage.getItem("finalScore") || 0;
const highScore = sessionStorage.getItem("highScore") || 0;
document.getElementById("player-name-display").textContent = "Player: " + playerName;
document.getElementById("final-score-display").textContent = "Final Score: " + finalScore;
document.getElementById("high-score-display").textContent = "High Score: " + highScore;
document.getElementById("play-again-btn").addEventListener("click", () => {
    window.location.href = "game.html";
});