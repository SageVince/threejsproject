function createDayNightSystem() {
  // Sun
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd00 });  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
  
  // Moon
  const moonGeometry = new THREE.SphereGeometry(4, 32, 32);
  const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);  
  // Ambient light (night)
  const ambientLight = new THREE.AmbientLight(0x333366, 0.2);
  scene.add(ambientLight);
  
  // Directional light (sun)
  const sunLight = new THREE.DirectionalLight(0xffffcc, 1);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  scene.add(sunLight);
  
  // Update function that rotates sun and moon, adjusts lighting
  return function updateDayNight(time) {
    const angle = time * Math.PI * 2;    
    // Position sun and moon
    sun.position.x = Math.cos(angle) * 200;
    sun.position.y = Math.sin(angle) * 200;
    moon.position.x = Math.cos(angle + Math.PI) * 200;
    moon.position.y = Math.sin(angle + Math.PI) * 200;
    
    // Update sunlight direction
    sunLight.position.copy(sun.position);
    
    // Adjust light intensity based on time of day
    if (time > 0.25 && time < 0.75) {
      // Day time
      const intensity = Math.min(1, 1 - Math.abs(time - 0.5) * 4);
      sunLight.intensity = intensity;      ambientLight.intensity = 0.2 + intensity * 0.3;
            // Sky color
      const skyColor = new THREE.Color(0x87ceeb).lerp(new THREE.Color(0x1a2b3c), Math.abs(time - 0.5) * 2);
      scene.background = skyColor;
    } else {
      // Night time
      sunLight.intensity = 0;
      ambientLight.intensity = 0.2;
      scene.background = new THREE.Color(0x0a0a20);
    }  };
}
