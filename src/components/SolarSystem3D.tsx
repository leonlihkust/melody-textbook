import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { CelestialBody, CELESTIAL_BODIES } from '../data/spaceData';
import {
  Sparkles,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Compass,
  Volume2,
  X,
  ChevronRight,
  Orbit,
} from 'lucide-react';
import { playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { Language } from '../utils/i18n';

interface SolarSystem3DProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  selectedBody: CelestialBody;
  onSelectBody: (body: CelestialBody, enterDetails?: boolean) => void;
}

// Visual orbital distance scale for 3D stage (compact logarithmic-proportional for viewing)
const ORBIT_RADII: Record<string, number> = {
  sun: 0,
  mercury: 16,
  venus: 25,
  earth: 36,
  mars: 48,
  asteroids: 60,
  jupiter: 76,
  saturn: 96,
  uranus: 118,
  neptune: 140,
  pluto: 160,
  canadarm: 38,
  jwst: 42,
  comet: 110,
};

// Planet visual size scale in 3D scene
const BODY_RADII: Record<string, number> = {
  sun: 6.8,
  mercury: 1.2,
  venus: 2.1,
  earth: 2.3,
  mars: 1.6,
  asteroids: 1.4,
  jupiter: 4.6,
  saturn: 3.8,
  uranus: 2.8,
  neptune: 2.7,
  pluto: 1.1,
  canadarm: 1.3,
  jwst: 1.5,
  comet: 1.3,
};

// Orbital revolution speed factor
const ORBIT_SPEEDS: Record<string, number> = {
  mercury: 0.04,
  venus: 0.025,
  earth: 0.018,
  mars: 0.014,
  asteroids: 0.009,
  jupiter: 0.007,
  saturn: 0.005,
  uranus: 0.003,
  neptune: 0.002,
  pluto: 0.0015,
  canadarm: 0.035,
  jwst: 0.016,
  comet: 0.008,
};

// Procedural Canvas Texture for Planets
function createPlanetTexture(type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  if (type === 'sun') {
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.3, '#f59e0b');
    grad.addColorStop(0.7, '#ea580c');
    grad.addColorStop(1, '#fef08a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Solar flares/granules
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 25 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'mercury') {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 512, 256);
    // Craters
    ctx.fillStyle = '#475569';
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'venus') {
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, '#eab308');
    grad.addColorStop(0.5, '#fde047');
    grad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    // Swirling sulfuric cloud bands
    ctx.fillStyle = 'rgba(254, 249, 195, 0.35)';
    for (let y = 10; y < 256; y += 25) {
      ctx.fillRect(0, y, 512, 10);
    }
  } else if (type === 'earth') {
    // Ocean
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(0, 0, 512, 256);
    // Continents
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    // North America & South America
    ctx.ellipse(120, 90, 45, 60, 0, 0, Math.PI * 2);
    ctx.ellipse(160, 180, 35, 50, 0.3, 0, Math.PI * 2);
    // Eurasia & Africa
    ctx.ellipse(320, 85, 75, 45, -0.2, 0, Math.PI * 2);
    ctx.ellipse(300, 150, 45, 55, 0, 0, Math.PI * 2);
    // Australia
    ctx.ellipse(420, 180, 25, 20, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'mars') {
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, 512, 256);
    // Dark rust plains
    ctx.fillStyle = '#991b1b';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 40 + 10, Math.random() * 20 + 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar ice caps
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 18);
    ctx.fillRect(0, 238, 512, 18);
  } else if (type === 'jupiter') {
    // Gas bands
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#b45309');
    grad.addColorStop(0.2, '#fef3c7');
    grad.addColorStop(0.35, '#d97706');
    grad.addColorStop(0.5, '#78350f');
    grad.addColorStop(0.65, '#fef3c7');
    grad.addColorStop(0.8, '#b45309');
    grad.addColorStop(1, '#92400e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    // Great Red Spot
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(320, 160, 32, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (type === 'saturn') {
    // Golden banded atmosphere
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#d97706');
    grad.addColorStop(0.25, '#fef08a');
    grad.addColorStop(0.5, '#eab308');
    grad.addColorStop(0.75, '#fde047');
    grad.addColorStop(1, '#b45309');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === 'uranus') {
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = 'rgba(165, 243, 252, 0.25)';
    for (let y = 0; y < 256; y += 20) {
      ctx.fillRect(0, y, 512, 8);
    }
  } else if (type === 'neptune') {
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(0, 0, 512, 256);
    // Dark Great Spot & cyan storm whisps
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.ellipse(180, 120, 28, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(147, 197, 253, 0.35)';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 60 + 20, 3);
    }
  } else {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 512, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Saturn Rings Texture
function createSaturnRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(217, 119, 6, 0)');
  grad.addColorStop(0.15, 'rgba(254, 240, 138, 0.85)');
  grad.addColorStop(0.35, 'rgba(234, 179, 8, 0.9)');
  grad.addColorStop(0.48, 'rgba(0, 0, 0, 0.1)'); // Cassini division gap!
  grad.addColorStop(0.55, 'rgba(253, 224, 71, 0.8)');
  grad.addColorStop(0.85, 'rgba(202, 138, 4, 0.6)');
  grad.addColorStop(1, 'rgba(217, 119, 6, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural High-Contrast 3D Billboard Sprite for the Highlighted Celestial Body
function createPlanetBillboard(body: CelestialBody, lang: Language): THREE.Sprite {
  const name = lang === 'fr' ? body.nameFr : lang === 'zh' ? body.nameZh : body.nameEn;
  const dist = body.distanceFromSun;

  const fontFace = 'bold 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const rulerCanvas = document.createElement('canvas');
  const rulerCtx = rulerCanvas.getContext('2d')!;
  rulerCtx.font = fontFace;
  const nameWidth = rulerCtx.measureText(name).width;
  rulerCtx.font = 'bold 16px system-ui, sans-serif';
  const distWidth = rulerCtx.measureText(dist).width;

  const contentWidth = Math.max(nameWidth, distWidth);
  const canvasWidth = Math.max(220, Math.ceil(contentWidth + 100));
  const canvasHeight = 80;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  const pillX = 4;
  const pillY = 4;
  const pillW = canvasWidth - 8;
  const pillH = canvasHeight - 8;
  const pillRadius = 20;

  // Background capsule pill with border matching body's accent color
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.strokeStyle = body.accentColor || '#fbbf24';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillRadius);
  ctx.fill();
  ctx.stroke();

  // White circular plate for the icon
  const iconDiameter = 52;
  const iconCenterX = 16 + iconDiameter / 2;
  const centerY = canvasHeight / 2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(iconCenterX, centerY, iconDiameter / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = body.color || '#f59e0b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Emoji icon
  ctx.font = '30px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(body.icon, iconCenterX, centerY + 2);

  // Planet Name
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillText(name, iconCenterX + iconDiameter / 2 + 12, centerY - 2);

  // Distance / Orbital Tag
  ctx.fillStyle = body.accentColor || '#fbbf24';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(`📍 ${dist}`, iconCenterX + iconDiameter / 2 + 12, centerY + 20);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(canvasWidth / 22, canvasHeight / 22, 1);
  sprite.name = 'billboardSprite';
  return sprite;
}

// Procedural Targeting Reticle with Concentric Rings, Crosshairs & Laser Beacon
function createSelectionReticle(color: string = '#fbbf24'): THREE.Group {
  const group = new THREE.Group();
  group.name = 'selectionReticle';

  // 1. Inner pulsing targeting ring on orbital plane
  const innerGeo = new THREE.RingGeometry(2.0, 2.4, 48);
  const innerMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });
  const innerRing = new THREE.Mesh(innerGeo, innerMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.name = 'innerRing';
  group.add(innerRing);

  // 2. Outer counter-rotating bracket ring
  const outerGeo = new THREE.RingGeometry(3.0, 3.3, 48);
  const outerMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
  });
  const outerRing = new THREE.Mesh(outerGeo, outerMat);
  outerRing.rotation.x = Math.PI / 2;
  outerRing.name = 'outerRing';
  group.add(outerRing);

  // 3. Four navigational crosshairs
  const tickGeo = new THREE.BufferGeometry();
  const tickPositions = new Float32Array([
    // North tick
    0, 0, -2.4, 0, 0, -3.5,
    // South tick
    0, 0, 2.4, 0, 0, 3.5,
    // East tick
    2.4, 0, 0, 3.5, 0, 0,
    // West tick
    -2.4, 0, 0, -3.5, 0, 0,
  ]);
  tickGeo.setAttribute('position', new THREE.BufferAttribute(tickPositions, 3));
  const tickMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.95,
  });
  const tickLines = new THREE.LineSegments(tickGeo, tickMat);
  tickLines.name = 'tickLines';
  group.add(tickLines);

  // 4. Vertical beacon light column (laser beacon pointing down to planet)
  const beamGeo = new THREE.CylinderGeometry(0.12, 0.7, 7, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.y = 3.5;
  beam.name = 'beam';
  group.add(beam);

  return group;
}

export const SolarSystem3D: React.FC<SolarSystem3DProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  selectedBody,
  onSelectBody,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hoveredBody, setHoveredBody] = useState<CelestialBody | null>(null);
  const [activeSpotlight, setActiveSpotlight] = useState<CelestialBody | null>(null);
  const [zoomLevel, setZoomLevel] = useState(70);
  const [isOverviewMode, setIsOverviewMode] = useState(false);

  // Mutable refs to prevent stale closure in the Three.js animate loop
  const selectedBodyRef = useRef(selectedBody);
  selectedBodyRef.current = selectedBody;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const isOverviewModeRef = useRef(isOverviewMode);
  isOverviewModeRef.current = isOverviewMode;

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const orbitAnglesRef = useRef<Map<string, number>>(new Map());
  const orbitLinesRef = useRef<Map<string, { line: THREE.Line; baseColor: number; baseOpacity: number }>>(new Map());
  const selectionReticleRef = useRef<THREE.Group | null>(null);
  const currentBillboardRef = useRef<THREE.Sprite | null>(null);

  // Camera 3D center lookAt tracking targets: targets the selected planet in real-time!
  const cameraTargetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraCurrentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Ideal framing distance for each celestial body
  const getIdealDistance = (body: CelestialBody): number => {
    if (body.id === 'sun') return 55;
    if (body.id === 'jupiter') return 24;
    if (body.id === 'saturn') return 28;
    if (body.id === 'uranus' || body.id === 'neptune') return 20;
    if (body.id === 'earth') return 16;
    if (body.id === 'asteroids') return 26;
    return 14;
  };

  // Mouse drag & touch orbit controls
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0.4, phi: 0.85 }); // spherical coords
  const targetCameraThetaRef = useRef<number | null>(null);
  const targetCameraPhiRef = useRef<number | null>(null);
  const targetCameraDistanceRef = useRef(getIdealDistance(selectedBody));
  const currentCameraDistanceRef = useRef(getIdealDistance(selectedBody));

  // Focus Planet Camera Handler
  const handleFocusPlanet = (body: CelestialBody) => {
    if (soundEnabled) playClickSound();
    setIsOverviewMode(false);
    isOverviewModeRef.current = false;
    onSelectBody(body, false);
    setActiveSpotlight(body);

    const dist = getIdealDistance(body);
    targetCameraDistanceRef.current = dist;
    targetCameraPhiRef.current = 0.82;
    setZoomLevel(Math.round(dist));

    // Immediately snap camera target towards the newly selected planet's current position
    const group = planetMeshesRef.current.get(body.id);
    if (group) {
      cameraTargetLookAtRef.current.copy(group.position);
    }
  };

  const handleOverview = () => {
    if (soundEnabled) playClickSound();
    setIsOverviewMode(true);
    isOverviewModeRef.current = true;
    cameraTargetLookAtRef.current.set(0, 0, 0);
    targetCameraDistanceRef.current = 140;
    targetCameraPhiRef.current = 0.95;
    setZoomLevel(140);
  };

  // Update 3D Highlight Reticle, Billboard & Orbit Glow when selectedBody or lang changes
  useEffect(() => {
    selectedBodyRef.current = selectedBody;
    if (!selectionReticleRef.current || !sceneRef.current) return;

    // Immediately move selection reticle to the target planet's position
    const group = planetMeshesRef.current.get(selectedBody.id);
    if (group) {
      selectionReticleRef.current.position.copy(group.position);
      if (!isOverviewModeRef.current) {
        cameraTargetLookAtRef.current.copy(group.position);
      }
    }

    // 1. Rebuild floating 3D billboard sprite with localized text & icon
    if (currentBillboardRef.current) {
      selectionReticleRef.current.remove(currentBillboardRef.current);
      if (currentBillboardRef.current.material.map) {
        currentBillboardRef.current.material.map.dispose();
      }
      currentBillboardRef.current.material.dispose();
    }

    const newBillboard = createPlanetBillboard(selectedBody, lang);
    const bodyR = BODY_RADII[selectedBody.id] || 2;
    newBillboard.position.set(0, bodyR * 1.5 + 4.5, 0);
    selectionReticleRef.current.add(newBillboard);
    currentBillboardRef.current = newBillboard;

    // 2. Update reticle materials color & scale
    const bodyColor = new THREE.Color(selectedBody.accentColor || '#fbbf24');
    const innerRing = selectionReticleRef.current.getObjectByName('innerRing') as THREE.Mesh;
    if (innerRing && innerRing.material instanceof THREE.MeshBasicMaterial) {
      innerRing.material.color.copy(bodyColor);
    }
    const outerRing = selectionReticleRef.current.getObjectByName('outerRing') as THREE.Mesh;
    if (outerRing && outerRing.material instanceof THREE.MeshBasicMaterial) {
      outerRing.material.color.copy(bodyColor);
    }
    const beam = selectionReticleRef.current.getObjectByName('beam') as THREE.Mesh;
    if (beam && beam.material instanceof THREE.MeshBasicMaterial) {
      beam.material.color.copy(bodyColor);
      beam.scale.set(bodyR / 1.5, bodyR / 1.5, bodyR / 1.5);
      beam.position.y = (bodyR / 1.5) * 3.5;
    }
    const tickLines = selectionReticleRef.current.getObjectByName('tickLines') as THREE.LineSegments;
    if (tickLines && tickLines.material instanceof THREE.LineBasicMaterial) {
      tickLines.material.color.copy(bodyColor);
    }

    // 3. Highlight the selected planet's orbit line, dim other orbits
    orbitLinesRef.current.forEach((info, bodyId) => {
      const mat = info.line.material as THREE.LineBasicMaterial;
      if (bodyId === selectedBody.id) {
        mat.color.set(0xfbbf24); // Radiant Gold
        mat.opacity = 0.95;
      } else {
        mat.color.set(info.baseColor);
        mat.opacity = info.baseOpacity;
      }
    });

    // 4. Center camera distance on the newly selected planet
    if (!isOverviewModeRef.current) {
      const dist = getIdealDistance(selectedBody);
      targetCameraDistanceRef.current = dist;
      targetCameraPhiRef.current = 0.82;
      setZoomLevel(Math.round(dist));
    }
  }, [selectedBody, lang]);

  // Initialize Scene, Renderer, Lights, Starfield, Sun, Planets & Orbits
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712'); // Deep cosmic void
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Cosmic Starfield (1,800 twinkling stars)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 300 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      // Star color variation (warm white, cool blue, golden)
      const colorType = Math.random();
      if (colorType > 0.8) {
        starColors[i * 3] = 0.95; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 0.6; // Gold
      } else if (colorType > 0.5) {
        starColors[i * 3] = 0.7; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 1.0; // Cool Cyan
      } else {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 1.0; starColors[i * 3 + 2] = 1.0; // Crisp White
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0.85 });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 5. Lighting
    // Ambient faint light so unlit sides of planets are subtly visible
    const ambientLight = new THREE.AmbientLight(0x334155, 0.45);
    scene.add(ambientLight);

    // Central Sun point light illuminating all planets
    const sunLight = new THREE.PointLight(0xfff7ed, 3.2, 500, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 6. Central Sun
    const sunGeo = new THREE.SphereGeometry(BODY_RADII.sun, 32, 32);
    const sunTex = createPlanetTexture('sun');
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.name = 'sun';

    // Sun outer corona glow aura
    const coronaGeo = new THREE.SphereGeometry(BODY_RADII.sun * 1.25, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunMesh.add(coronaMesh);

    const sunGroup = new THREE.Group();
    sunGroup.add(sunMesh);
    scene.add(sunGroup);
    planetMeshesRef.current.set('sun', sunGroup);

    // 7. Celestial Bodies & Orbits
    const saturnRingTex = createSaturnRingTexture();

    CELESTIAL_BODIES.forEach((body, idx) => {
      if (body.id === 'sun') return;

      const orbitRadius = ORBIT_RADII[body.id] || 30;
      const bodyRadius = BODY_RADII[body.id] || 1.8;

      // Orbit Path Line Ring
      const orbitCurve = new THREE.EllipseCurve(0, 0, orbitRadius, orbitRadius, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(96);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const baseColor = body.id === 'earth' ? 0x60a5fa : 0x475569;
      const baseOpacity = body.id === 'earth' ? 0.6 : 0.35;
      const orbitMat = new THREE.LineBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: baseOpacity,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);
      orbitLinesRef.current.set(body.id, { line: orbitLine, baseColor, baseOpacity });

      // Planet Group container
      const bodyGroup = new THREE.Group();
      bodyGroup.name = body.id;

      // Geometry & Material
      const planetGeo = new THREE.SphereGeometry(bodyRadius, 32, 32);
      const planetTex = createPlanetTexture(body.id);
      const planetMat = new THREE.MeshStandardMaterial({
        map: planetTex,
        roughness: 0.7,
        metalness: 0.1,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.name = body.id;
      bodyGroup.add(planetMesh);

      // Earth's Cloud Atmosphere & Moon
      if (body.id === 'earth') {
        const cloudGeo = new THREE.SphereGeometry(bodyRadius * 1.03, 24, 24);
        const cloudMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.35,
          roughness: 0.9,
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        bodyGroup.add(cloudMesh);

        // Orbiting Moon
        const moonGeo = new THREE.SphereGeometry(bodyRadius * 0.28, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(bodyRadius * 2.2, 0.4, 0);
        bodyGroup.add(moonMesh);
      }

      // Saturn Rings!
      if (body.id === 'saturn') {
        const ringGeo = new THREE.RingGeometry(bodyRadius * 1.35, bodyRadius * 2.7, 48);
        // Tilt ring texture mapping along planar projection
        const ringMat = new THREE.MeshBasicMaterial({
          map: saturnRingTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.35; // Tilted realistic inclination!
        bodyGroup.add(ringMesh);
      }

      // Uranus faint ring
      if (body.id === 'uranus') {
        const ringGeo = new THREE.RingGeometry(bodyRadius * 1.25, bodyRadius * 1.8, 36);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xa5f3fc,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.3,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.y = Math.PI / 2; // Vertical sideways ring!
        bodyGroup.add(ringMesh);
      }

      // Space Missions: Canadarm & JWST custom styling
      if (body.id === 'canadarm') {
        // Solar panels & robot body
        const panelGeo = new THREE.BoxGeometry(bodyRadius * 2.4, 0.1, bodyRadius * 0.8);
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.8, roughness: 0.2 });
        const panelMesh = new THREE.Mesh(panelGeo, panelMat);
        bodyGroup.add(panelMesh);
      }

      if (body.id === 'jwst') {
        // Gold hexagonal sunshield
        const shieldGeo = new THREE.BoxGeometry(bodyRadius * 2.2, 0.1, bodyRadius * 1.6);
        const shieldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
        const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        bodyGroup.add(shieldMesh);
      }

      // Initial angle staggered along orbit
      const initialAngle = (idx / CELESTIAL_BODIES.length) * Math.PI * 2;
      orbitAnglesRef.current.set(body.id, initialAngle);

      bodyGroup.position.set(
        Math.cos(initialAngle) * orbitRadius,
        0,
        Math.sin(initialAngle) * orbitRadius
      );

      scene.add(bodyGroup);
      planetMeshesRef.current.set(body.id, bodyGroup);
    });

    // 8. Asteroid Belt Particle Ring
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidCount = 900;
    const asteroidPositions = new Float32Array(asteroidCount * 3);

    for (let i = 0; i < asteroidCount; i++) {
      const r = 56 + Math.random() * 8; // Between 56 and 64 radius
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;

      asteroidPositions[i * 3] = Math.cos(theta) * r;
      asteroidPositions[i * 3 + 1] = y;
      asteroidPositions[i * 3 + 2] = Math.sin(theta) * r;
    }
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    const asteroidMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 1.2,
      transparent: true,
      opacity: 0.75,
    });
    const asteroidRing = new THREE.Points(asteroidGeo, asteroidMat);
    scene.add(asteroidRing);

    // 9. Selection Reticle & 3D Planetary Billboard
    const reticleGroup = createSelectionReticle(selectedBody?.accentColor || '#fbbf24');
    scene.add(reticleGroup);
    selectionReticleRef.current = reticleGroup;

    const initialBillboard = createPlanetBillboard(selectedBody, lang);
    const initR = BODY_RADII[selectedBody.id] || 2;
    initialBillboard.position.set(0, initR * 1.5 + 4.5, 0);
    reticleGroup.add(initialBillboard);
    currentBillboardRef.current = initialBillboard;

    // 10. Animation Game Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera distance interpolation
      currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.08;

      // Smooth camera rotation fly-to handling
      if (!isDraggingRef.current) {
        if (targetCameraThetaRef.current !== null) {
          const dTheta = targetCameraThetaRef.current - cameraRotationRef.current.theta;
          const normalizedDTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
          cameraRotationRef.current.theta += normalizedDTheta * 0.08;
          if (Math.abs(normalizedDTheta) < 0.008) {
            targetCameraThetaRef.current = null;
          }
        } else if (autoRotateRef.current) {
          cameraRotationRef.current.theta += delta * 0.08;
        }

        if (targetCameraPhiRef.current !== null) {
          cameraRotationRef.current.phi += (targetCameraPhiRef.current - cameraRotationRef.current.phi) * 0.08;
          if (Math.abs(targetCameraPhiRef.current - cameraRotationRef.current.phi) < 0.008) {
            targetCameraPhiRef.current = null;
          }
        }
      }

      // 1. Revolve planets along their orbits & spin on their axes
      CELESTIAL_BODIES.forEach(body => {
        const group = planetMeshesRef.current.get(body.id);
        if (!group) return;

        // Spin planet on its axis
        group.rotation.y += delta * 0.8;

        // Revolve around Sun
        if (body.id !== 'sun') {
          const orbitRadius = ORBIT_RADII[body.id] || 30;
          const speed = ORBIT_SPEEDS[body.id] || 0.01;
          const currentAngle = (orbitAnglesRef.current.get(body.id) || 0) + delta * speed * 2;
          orbitAnglesRef.current.set(body.id, currentAngle);

          group.position.x = Math.cos(currentAngle) * orbitRadius;
          group.position.z = Math.sin(currentAngle) * orbitRadius;
        }
      });

      // Slowly rotate asteroid ring
      asteroidRing.rotation.y += delta * 0.015;

      // Sun pulsing glow
      const sun = planetMeshesRef.current.get('sun');
      if (sun) {
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
        sun.scale.set(pulse, pulse, pulse);
      }

      // 2. Live Celestial Target Tracking
      const currentSelected = selectedBodyRef.current;
      const selectedGroup = currentSelected ? planetMeshesRef.current.get(currentSelected.id) : null;

      // Update camera target lookAt
      if (isOverviewModeRef.current) {
        cameraTargetLookAtRef.current.set(0, 0, 0);
      } else if (selectedGroup) {
        cameraTargetLookAtRef.current.copy(selectedGroup.position);
      } else {
        cameraTargetLookAtRef.current.set(0, 0, 0);
      }

      // Smooth lerp of camera lookAt center
      cameraCurrentLookAtRef.current.lerp(cameraTargetLookAtRef.current, 0.08);

      // 3. Camera position calculation from spherical coords around current lookAt center
      const theta = cameraRotationRef.current.theta;
      const phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, cameraRotationRef.current.phi));
      const dist = currentCameraDistanceRef.current;

      camera.position.x = cameraCurrentLookAtRef.current.x + dist * Math.sin(phi) * Math.sin(theta);
      camera.position.y = cameraCurrentLookAtRef.current.y + dist * Math.cos(phi);
      camera.position.z = cameraCurrentLookAtRef.current.z + dist * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(cameraCurrentLookAtRef.current);

      // 4. Update Selection Reticle position and animation for currently selected celestial body
      if (currentSelected && selectionReticleRef.current) {
        if (selectedGroup) {
          selectionReticleRef.current.visible = true;
          selectionReticleRef.current.position.copy(selectedGroup.position);

          const time = clock.getElapsedTime();
          const baseRadius = BODY_RADII[currentSelected.id] || 2;
          const pulse = 1 + Math.sin(time * 3.5) * 0.1;

          // Scale reticle relative to planet size
          const rScale = (baseRadius / 1.8) * pulse;
          const innerRing = selectionReticleRef.current.getObjectByName('innerRing') as THREE.Mesh;
          const outerRing = selectionReticleRef.current.getObjectByName('outerRing') as THREE.Mesh;
          const tickLines = selectionReticleRef.current.getObjectByName('tickLines') as THREE.LineSegments;
          if (innerRing) {
            innerRing.scale.set(rScale, rScale, rScale);
            innerRing.rotation.z += delta * 1.2;
          }
          if (outerRing) {
            outerRing.scale.set(rScale * 1.25, rScale * 1.25, rScale * 1.25);
            outerRing.rotation.z -= delta * 0.8;
          }
          if (tickLines) {
            tickLines.scale.set(rScale * 1.4, rScale * 1.4, rScale * 1.4);
            tickLines.rotation.z += delta * 0.5;
          }

          if (currentBillboardRef.current) {
            currentBillboardRef.current.position.y = baseRadius * 1.5 + 4.5;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  // Raycasting for planet clicks & mouse hover
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    targetCameraThetaRef.current = null;
    targetCameraPhiRef.current = null;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      cameraRotationRef.current.theta -= dx * 0.007;
      cameraRotationRef.current.phi -= dy * 0.007;
      return;
    }

    // Raycast hover detection
    const container = mountRef.current;
    if (!container || !cameraRef.current || !sceneRef.current) return;

    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

    const hitObjects: THREE.Object3D[] = [];
    planetMeshesRef.current.forEach(group => {
      group.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          hitObjects.push(child);
        }
      });
    });

    const intersects = raycaster.intersectObjects(hitObjects, false);
    if (intersects.length > 0) {
      let targetName = intersects[0].object.name;
      if (!targetName && intersects[0].object.parent) {
        targetName = intersects[0].object.parent.name;
      }
      const matched = CELESTIAL_BODIES.find(b => b.id === targetName);
      if (matched) {
        setHoveredBody(matched);
      }
    } else {
      setHoveredBody(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = Math.abs(e.clientX - prevMouseRef.current.x) > 3 || Math.abs(e.clientY - prevMouseRef.current.y) > 3;
    isDraggingRef.current = false;

    if (!wasDragging) {
      // Raycast click
      const container = mountRef.current;
      if (!container || !cameraRef.current || !sceneRef.current) return;

      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const hitObjects: THREE.Object3D[] = [];
      planetMeshesRef.current.forEach(group => {
        group.traverse(child => {
          if ((child as THREE.Mesh).isMesh) {
            hitObjects.push(child);
          }
        });
      });

      const intersects = raycaster.intersectObjects(hitObjects, false);
      if (intersects.length > 0) {
        let targetName = intersects[0].object.name;
        if (!targetName && intersects[0].object.parent) {
          targetName = intersects[0].object.parent.name;
        }
        const matched = CELESTIAL_BODIES.find(b => b.id === targetName);
        if (matched) {
          handleFocusPlanet(matched);
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    targetCameraDistanceRef.current = Math.max(35, Math.min(220, targetCameraDistanceRef.current + e.deltaY * 0.08));
    setZoomLevel(Math.round(targetCameraDistanceRef.current));
  };

  const handleZoom = (delta: number) => {
    if (soundEnabled) playClickSound();
    targetCameraDistanceRef.current = Math.max(35, Math.min(220, targetCameraDistanceRef.current + delta * 20));
    setZoomLevel(Math.round(targetCameraDistanceRef.current));
  };

  // Localized title & text helpers
  const getName = (body: CelestialBody) => {
    return lang === 'fr' ? body.nameFr : lang === 'zh' ? body.nameZh : body.nameEn;
  };

  const getTagline = (body: CelestialBody) => {
    return lang === 'fr' ? body.taglineFr : lang === 'zh' ? body.taglineZh : body.taglineEn;
  };

  const getFunFact = (body: CelestialBody) => {
    return lang === 'fr' ? body.funFactFr : lang === 'zh' ? body.funFactZh : body.funFactEn;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-3 border-slate-900 comic-box shadow-2xl bg-black select-none">
      {/* Three.js Canvas Mount */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-[460px] md:h-[560px] cursor-grab active:cursor-grabbing"
      />

      {/* Comic Header Overlay & Mode Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-white shadow-comic flex items-center gap-1.5">
          <Orbit size={15} className="animate-spin-slow text-amber-300" />
          <span>
            {lang === 'fr'
              ? 'Planétaire 3D du Système Solaire'
              : lang === 'zh'
              ? '3D 太阳系轨道行星仪'
              : '3D Solar System Orrery'}
          </span>
        </div>

        {/* Selected Planet 3D Target Badge */}
        {selectedBody && (
          <button
            onClick={() => handleFocusPlanet(selectedBody)}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 px-3 py-1.5 rounded-xl font-comic text-xs font-extrabold shadow-comic transition-all cursor-pointer"
            title="Click to center camera on selected planet in 3D"
          >
            <span>🎯</span>
            <span>
              {lang === 'fr'
                ? `Ciblé 3D : ${getName(selectedBody)}`
                : lang === 'zh'
                ? `3D 锁定高亮：${getName(selectedBody)}`
                : `3D Highlighted: ${getName(selectedBody)}`}
            </span>
          </button>
        )}

        {/* Overview Mode Toggle Button */}
        <button
          onClick={isOverviewMode ? () => handleFocusPlanet(selectedBody) : handleOverview}
          className={`flex items-center gap-1.5 border-2 border-slate-900 px-3 py-1.5 rounded-xl font-comic text-xs font-bold shadow-comic transition-all cursor-pointer ${
            isOverviewMode
              ? 'bg-purple-600 text-white hover:bg-purple-500 ring-2 ring-purple-300'
              : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800'
          }`}
          title="Toggle Full Solar System Overview"
        >
          <span>{isOverviewMode ? '🎯' : '🌌'}</span>
          <span>
            {lang === 'fr'
              ? isOverviewMode
                ? 'Centrer Planète'
                : 'Vue Globale'
              : lang === 'zh'
              ? isOverviewMode
                ? '聚焦星球'
                : '全景俯瞰'
              : isOverviewMode
              ? 'Focus Planet'
              : 'Overview'}
          </span>
        </button>
      </div>

      {/* Floating Bottom Quick-Jump Planetary Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 px-2 bg-slate-950/85 backdrop-blur-md border-2 border-slate-800 rounded-2xl max-w-full pointer-events-auto scrollbar-none">
          {CELESTIAL_BODIES.map(b => {
            const isSelected = selectedBody.id === b.id;
            const isUnlocked = unlockedBadges.includes(b.id);

            return (
              <button
                key={b.id}
                onClick={() => handleFocusPlanet(b)}
                className={`px-2.5 py-1 rounded-xl text-xs font-comic font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 scale-105 shadow-comic ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-950'
                    : isUnlocked
                    ? 'bg-purple-950/80 text-purple-300 hover:bg-purple-800/80 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
                title={getName(b)}
              >
                <span>{b.icon}</span>
                <span>{getName(b)}</span>
                {isSelected && (
                  <span className="text-[10px] bg-slate-950 text-amber-300 px-1 py-0.5 rounded font-sans font-bold">
                    3D 🎯
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Orbit Controls buttons */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(r => !r)}
            className={`p-2 rounded-xl border-2 border-slate-900 font-comic text-xs font-bold shadow-comic transition-all cursor-pointer ${
              autoRotate ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-slate-300'
            }`}
            title={autoRotate ? 'Pause Orbit Rotation' : 'Resume Orbit Rotation'}
          >
            <RotateCw size={15} className={autoRotate ? 'animate-spin-slow' : ''} />
          </button>
          <button
            onClick={() => handleZoom(-1)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white font-comic text-xs font-bold shadow-comic cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => handleZoom(1)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white font-comic text-xs font-bold shadow-comic cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
        </div>
      </div>

      {/* Hover Tooltip Pill */}
      {hoveredBody && !activeSpotlight && (
        <div className="absolute top-4 right-4 z-20 pointer-events-none animate-in fade-in zoom-in duration-150">
          <div className="px-3.5 py-2 rounded-2xl bg-amber-300 border-2 border-slate-900 font-comic text-xs font-extrabold text-slate-950 shadow-comic flex items-center gap-2">
            <span className="text-base">{hoveredBody.icon}</span>
            <span>{getName(hoveredBody)}</span>
            <span className="text-[10px] text-amber-950 font-bold bg-amber-400/80 px-1.5 py-0.5 rounded-md">
              {hoveredBody.distanceFromSun}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-blue-600 text-white font-sans font-bold">
              {lang === 'fr' ? 'Cliquer pour examiner' : lang === 'zh' ? '点击探索' : 'Click to Inspect'}
            </span>
          </div>
        </div>
      )}

      {/* Spotlight Drawer / Inspection Card */}
      {activeSpotlight && (
        <div className="absolute top-4 right-4 z-30 max-w-sm sm:w-80 bg-white/95 backdrop-blur-md border-3 border-slate-900 rounded-2xl p-4 shadow-comic animate-in fade-in slide-in-from-right-4 duration-200 text-slate-900">
          <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b-2 border-amber-200">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl p-1 bg-amber-100 rounded-xl border border-amber-300 shrink-0">
                {activeSpotlight.icon}
              </span>
              <div>
                <h3 className="font-comic text-base font-extrabold text-slate-900 leading-tight">
                  {getName(activeSpotlight)}
                </h3>
                <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <span>📍 {activeSpotlight.distanceFromSun}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveSpotlight(null);
              }}
              className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Metrics: Diameter & Orbit Period */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="px-2 py-0.5 rounded-lg bg-blue-100 border border-blue-300 font-comic text-[10px] font-bold text-blue-900">
              📏 Ø {activeSpotlight.diameterKm.toLocaleString()} km
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-amber-100 border border-amber-300 font-comic text-[10px] font-bold text-amber-900">
              🌡️ {activeSpotlight.temperature}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-100 border border-purple-300 font-comic text-[10px] font-bold text-purple-900">
              🔄 {activeSpotlight.orbitalPeriod}
            </span>
          </div>

          {/* Tagline & Fun Fact */}
          <div className="text-xs font-bold text-blue-700 font-comic mb-1">
            {getTagline(activeSpotlight)}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed mb-3">
            {getFunFact(activeSpotlight)}
          </p>

          {/* Actions: Speak & Visit Trivia */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                const text = `${getName(activeSpotlight)}. ${getTagline(activeSpotlight)}. ${getFunFact(activeSpotlight)}`;
                speakText(text, lang);
              }}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="Read Aloud"
            >
              <Volume2 size={14} className="text-blue-600" />
              <span>{lang === 'fr' ? 'Écouter' : lang === 'zh' ? '朗读' : 'Read'}</span>
            </button>
            <button
              onClick={() => handleFocusPlanet(activeSpotlight)}
              className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-950 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="Center camera on this planet in 3D"
            >
              <span>🎯</span>
              <span>{lang === 'fr' ? 'Centrer 3D' : lang === 'zh' ? '聚焦居中' : 'Focus 3D'}</span>
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                onSelectBody(activeSpotlight);
                setActiveSpotlight(null);
              }}
              className="flex-1 py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white border-2 border-slate-900 rounded-xl font-comic text-xs font-bold flex items-center justify-center gap-1 shadow-comic transition-all cursor-pointer"
            >
              <span>{lang === 'fr' ? 'Découvrir' : lang === 'zh' ? '深入答题' : 'Trivia'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
