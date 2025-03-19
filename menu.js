function createMenu() { const menu = document.createElement('div'); menu.className = 'customization-menu';
// Username input const usernameInput = document.createElement('input'); usernameInput.placeholder = 'Enter username'; usernameInput.addEventListener('input', (e) => { // Filter out numbers e.target.value = e.target.value.replace(/[0-9]/g, ''); gameState.player.username = e.target.value; }); // Color picker const colorPicker = document.createElement('input'); colorPicker.type = 'color'; colorPicker.addEventListener('input', (e) => { gameState.player.color = new THREE.Color(e.target.value); updatePlayerModel(); });
// Random button const randomizeBtn = document.createElement('button'); randomizeBtn.textContent = 'Roll the dice!'; randomizeBtn.addEventListener('click', () => { const names = ['Wanderer', 'Explorer', 'Traveler', 'Visitor', 'Seeker']; const randomName = names[Math.floor(Math.random() * names.length)]; usernameInput.value = randomName; gameState.player.username = randomName;

const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
gameState.player.color = randomColor;    updatePlayerModel();
});

// Start game button const startBtn = document.createElement('button'); startBtn.textContent = 'Enter World'; startBtn.addEventListener('click', () => { gameState.inMenu = false; menu.style.display = 'none'; startGame(); });

// Append all elements menu.appendChild(usernameInput); menu.appendChild(colorPicker); menu.appendChild(randomizeBtn); menu.appendChild(startBtn);
document.body.appendChild(menu); }
