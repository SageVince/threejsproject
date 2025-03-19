// Main application structure
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SocketConnection } from './networking.js';

// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);// Initialize game state
let gameState = {
  inMenu: true,
  player: {    username: "Explorer",
    color: 0x6495ED,
    position: new THREE.Vector3(0, 1, 0)
  },
  time: 0, // 0-1 for day/night cycle
  otherPlayers: {}};
