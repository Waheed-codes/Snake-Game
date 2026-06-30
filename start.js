document.getElementById("start-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("player-name");
    const playerName = nameInput.value.trim();

    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }

    sessionStorage.setItem("playerName", playerName);
    window.location.href = "game.html";
});