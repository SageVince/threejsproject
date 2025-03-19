function createWorld() {
  // Ground
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshStandardMaterial({     color: 0x3a7e4c,
    roughness: 0.8  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);  
  // Create four main buildings
  createBuilding('market', new THREE.Vector3(-50, 0, -50), 0xff9900);
  createBuilding('jobs', new THREE.Vector3(50, 0, -50), 0x0099ff);
  createBuilding('arcade', new THREE.Vector3(50, 0, 50), 0xff0099);
  createBuilding('the wall', new THREE.Vector3(-50, 0, 50), 0x99ff00);
    // Add surrounding mountains
  createMountains();  
  // Add day/night system
  createDayNightSystem();
  
  // Add NPCs
  addNPCs();}

function createBuilding(name, position, color) {
  // Building body
  const height = 30 + Math.random() * 10;
  const geometry = new THREE.BoxGeometry(20, height, 20);  const material = new THREE.MeshStandardMaterial({ 
    color: color,
    roughness: 0.7,
    metalness: 0.2  });
  
  const building = new THREE.Mesh(geometry, material);
  building.position.copy(position);
  building.position.y = height/2;
  building.castShadow = true;
  building.receiveShadow = true;
  building.name = name;  
  // Building label
  const textGeometry = new THREE.TextGeometry(name, {
    font: font, // Load font beforehand
    size: 3,
    height: 0.5  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  
  // Center text and position above building
  text.geometry.computeBoundingBox();
  const textWidth = text.geometry.boundingBox.max.x - text.geometry.boundingBox.min.x;  text.position.set(position.x - textWidth/2, height + 5, position.z);
  
  scene.add(building);
  scene.add(text);  
  // Add interaction zone
  const interactionZone = new THREE.Mesh(
    new THREE.SphereGeometry(25, 8, 8),
    new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true,       opacity: 0.0 
    })  );
  interactionZone.position.copy(position);  interactionZone.name = `${name}-interaction`;
  scene.add(interactionZone);
}
