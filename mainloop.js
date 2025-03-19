function animate() {
  requestAnimationFrame(animate);
  
  if (!gameState.inMenu) {
    // Update time (day/night cycle)
    gameState.time = (gameState.time + 0.0001) % 1;
    updateDayNight(gameState.time);
    
    // Update player movement
    updatePlayerMovement();
    
    // Check interactions
    checkInteractions();
    
    // Send network updates
    if (networkManager) {
      networkManager.updatePosition(playerObject.position, playerObject.rotation);
    }
  }  
  renderer.render(scene, camera);
}```
