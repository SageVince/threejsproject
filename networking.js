class NetworkManager { constructor() { // Connect to server using WebSocket or Socket.io this.socket = io.connect('your-server-url');

// Set up event listeners
this.socket.on('connect', this.onConnect.bind(this));
this.socket.on('playerJoined', this.onPlayerJoined.bind(this));
this.socket.on('playerLeft', this.onPlayerLeft.bind(this));
this.socket.on('playerMoved', this.onPlayerMoved.bind(this));
this.socket.on('chatMessage', this.onChatMessage.bind(this));
}

// Send player information to server registerPlayer(playerData) { // Encrypt sensitive data const encryptedData = this.encryptData(playerData); this.socket.emit('registerPlayer', encryptedData); } // Send position updates updatePosition(position, rotation) { this.socket.emit('updatePosition', { position: [position.x, position.y, position.z], rotation: [rotation.x, rotation.y, rotation.z] }); }

// Send chat message sendMessage(message) { const encryptedMessage = this.encryptData(message); this.socket.emit('chatMessage', encryptedMessage); }

// Simple encryption (for demonstration - use proper encryption in production) encryptData(data) { // This is a placeholder - use a real encryption library return btoa(JSON.stringify(data)); }

// Event handlers for incoming network messages onPlayerJoined(data) { const playerData = JSON.parse(atob(data)); // decrypt createOtherPlayer(playerData); }
onPlayerLeft(playerId) { removeOtherPlayer(playerId); }

onPlayerMoved(data) { updateOtherPlayerPosition(data); }

onChatMessage(data) { const decrypted = JSON.parse(atob(data)); displayChatMessage(decrypted); } }

