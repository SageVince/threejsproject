function createChatSystem() {  const chatContainer = document.createElement('div');
  chatContainer.className = 'chat-container';
  
  const chatMessages = document.createElement('div');
  chatMessages.className = 'chat-messages';
    const inputContainer = document.createElement('div');
  inputContainer.className = 'chat-input-container';
  
  const chatInput = document.createElement('input');
  chatInput.className = 'chat-input';
  chatInput.placeholder = 'Type a message...';
  
  const sendButton = document.createElement('button');
  sendButton.textContent = 'Send';
  sendButton.addEventListener('click', () => {
    if (chatInput.value.trim() !== '') {
      networkManager.sendMessage({
        username: gameState.player.username,
        message: chatInput.value.trim()
      });
      chatInput.value = '';
    }
  });  
  // Listen for Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();    }
  });
  
  inputContainer.appendChild(chatInput);
  inputContainer.appendChild(sendButton);
  
  chatContainer.appendChild(chatMessages);
  chatContainer.appendChild(inputContainer);
  
  document.body.appendChild(chatContainer);
  
  // Function to display new messages
  return function(message) {
    const messageElement = document.createElement('div');    messageElement.className = 'chat-message';
        const username = document.createElement('span');
    username.className = 'chat-username';
    username.textContent = message.username + ': ';    
    const text = document.createElement('span');
    text.textContent = message.message;
    
    messageElement.appendChild(username);
    messageElement.appendChild(text);
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
}
