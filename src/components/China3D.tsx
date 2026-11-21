import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChinaCity, CHINA_CITIES } from '../data/chinaData';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Compass,
  Volume2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { Language } from '../utils/i18n';

interface China3DProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  selectedCity: ChinaCity;
  onSelectCity: (city: ChinaCity, enterDetails?: boolean) => void;
}

// Procedural Billboard Sprite for Selected City
function createCityBillboard(city: ChinaCity, lang: Language): THREE.Sprite {
  const name = lang === 'fr' ? city.nameFr : lang === 'zh' ? city.nameZh : city.nameEn;
  const prov = lang === 'fr' ? city.provinceFr : lang === 'zh' ? city.provinceZh : city.provinceEn;

  const canvas = document.createElement('canvas');
  canvas.width = 380;
  canvas.height = 130;
  const ctx = canvas.getContext('2d')!;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  // Background comic badge
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = city.accentColor || '#f59e0b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(8, 8, 364, 114, 20);
  ctx.fill();
  ctx.stroke();

  // Reset shadow for crisp text
  ctx.shadowColor = 'transparent';

  // Left Icon circle
  ctx.fillStyle = city.accentColor || '#f59e0b';
  ctx.beginPath();
  ctx.arc(60, 65, 36, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '36px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(city.icon, 60, 67);

  // City Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(name, 115, 52);

  // Province
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 16px system-ui, sans-serif';
  ctx.fillText(prov, 115, 88);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.8, 1.3, 1);
  return sprite;
}

// Procedural 3D Miniature Landmark Model Generator
function createLandmarkMesh(cityId: string, color: string): THREE.Group {
  const group = new THREE.Group();
  const hexColor = new THREE.Color(color);

  if (cityId === 'beijing') {
    // Summer Palace Tower of Buddhist Incense (佛香阁) & Pavilion
    const baseGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.5, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);

    // Tier 1 Octagonal Pavilion
    const tier1Geo = new THREE.CylinderGeometry(0.7, 0.8, 0.6, 8);
    const tier1Mat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 });
    const tier1 = new THREE.Mesh(tier1Geo, tier1Mat);
    tier1.position.y = 0.55;
    group.add(tier1);

    // Eaves 1
    const eaves1Geo = new THREE.ConeGeometry(1.05, 0.3, 8);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.7 });
    const eaves1 = new THREE.Mesh(eaves1Geo, goldMat);
    eaves1.position.y = 0.95;
    group.add(eaves1);

    // Tier 2
    const tier2Geo = new THREE.CylinderGeometry(0.45, 0.55, 0.5, 8);
    const tier2 = new THREE.Mesh(tier2Geo, tier1Mat);
    tier2.position.y = 1.35;
    group.add(tier2);

    // Golden Finial Crown
    const crownGeo = new THREE.ConeGeometry(0.75, 0.35, 8);
    const crown = new THREE.Mesh(crownGeo, goldMat);
    crown.position.y = 1.7;
    group.add(crown);
  } else if (cityId === 'hangzhou') {
    // West Lake Three Pools Pagoda & Curved Bridge (三潭印月与断桥)
    const baseRingGeo = new THREE.TorusGeometry(0.8, 0.1, 8, 24);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.8 });
    const waterRing = new THREE.Mesh(baseRingGeo, waterMat);
    waterRing.rotation.x = Math.PI / 2;
    group.add(waterRing);

    // Triple stone pagodas in triangle
    const coords = [
      { x: 0, z: -0.4 },
      { x: -0.4, z: 0.3 },
      { x: 0.4, z: 0.3 },
    ];
    coords.forEach(pt => {
      const stemGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.8, 8);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });
      const stem = new THREE.Mesh(stemGeo, stoneMat);
      stem.position.set(pt.x, 0.4, pt.z);

      const sphereGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const sphereMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.5 });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 0.45;
      stem.add(sphere);

      const capGeo = new THREE.ConeGeometry(0.25, 0.2, 8);
      const cap = new THREE.Mesh(capGeo, stoneMat);
      cap.position.y = 0.65;
      stem.add(cap);

      group.add(stem);
    });
  } else if (cityId === 'shanghai') {
    // Oriental Pearl Tower (东方明珠)
    const basePillarsGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 6);
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const leg = new THREE.Mesh(basePillarsGeo, silverMat);
      leg.position.set(Math.cos(angle) * 0.4, 0.6, Math.sin(angle) * 0.4);
      group.add(leg);
    }

    // Lower Big Sphere
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0xec4899, metalness: 0.6, roughness: 0.2 });
    const lowerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), sphereMat);
    lowerSphere.position.y = 1.2;
    group.add(lowerSphere);

    // Middle Column
    const midColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 8), silverMat);
    midColumn.position.y = 1.7;
    group.add(midColumn);

    // Upper Sphere
    const upperSphere = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), sphereMat);
    upperSphere.position.y = 2.2;
    group.add(upperSphere);

    // Spire
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.08, 1.0, 6), silverMat);
    spire.position.y = 2.8;
    group.add(spire);
  } else if (cityId === 'guilin') {
    // Karst Mountain Pinnacle Peak (喀斯特锥形山峰)
    const peakGeo = new THREE.ConeGeometry(0.85, 2.0, 7);
    const peakMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9 });
    const peak = new THREE.Mesh(peakGeo, peakMat);
    peak.position.y = 1.0;
    group.add(peak);

    const subPeakGeo = new THREE.ConeGeometry(0.55, 1.4, 6);
    const subPeak = new THREE.Mesh(subPeakGeo, peakMat);
    subPeak.position.set(0.6, 0.7, 0.3);
    group.add(subPeak);
  } else if (cityId === 'lhasa') {
    // Potala Palace Terraced Fortress (布达拉宫)
    const whiteBaseGeo = new THREE.BoxGeometry(1.6, 0.8, 1.2);
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const whiteBase = new THREE.Mesh(whiteBaseGeo, whiteMat);
    whiteBase.position.y = 0.4;
    group.add(whiteBase);

    // Central Red Palace
    const redGeo = new THREE.BoxGeometry(0.9, 0.9, 1.0);
    const redMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.7 });
    const redPalace = new THREE.Mesh(redGeo, redMat);
    redPalace.position.y = 1.1;
    group.add(redPalace);

    // Golden Roofs
    const roofGeo = new THREE.ConeGeometry(0.4, 0.25, 4);
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
    const roof = new THREE.Mesh(roofGeo, goldMat);
    roof.position.y = 1.65;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
  } else {
    // Generic Grand Heritage Pavilion
    const colGeo = new THREE.CylinderGeometry(0.6, 0.75, 0.7, 8);
    const mat = new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.6 });
    const body = new THREE.Mesh(colGeo, mat);
    body.position.y = 0.35;
    group.add(body);

    const roofGeo = new THREE.ConeGeometry(0.95, 0.55, 8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.95;
    group.add(roof);
  }

  return group;
}

export const China3D: React.FC<China3DProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  selectedCity,
  onSelectCity,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const quickBarRef = useRef<HTMLDivElement | null>(null);

  const [autoRotate, setAutoRotate] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<ChinaCity | null>(null);
  const [activeSpotlight, setActiveSpotlight] = useState<ChinaCity | null>(null);
  const [isOverviewMode, setIsOverviewMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(24);

  const selectedCityRef = useRef(selectedCity);
  selectedCityRef.current = selectedCity;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const isOverviewModeRef = useRef(isOverviewMode);
  isOverviewModeRef.current = isOverviewMode;

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cityPinsRef = useRef<Map<string, THREE.Group>>(new Map());
  const landmarkMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const selectionReticleRef = useRef<THREE.Group | null>(null);
  const currentBillboardRef = useRef<THREE.Sprite | null>(null);

  // Camera lookAt tracking targets
  const cameraTargetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(selectedCity.coordinates.x, 0, selectedCity.coordinates.z));
  const cameraCurrentLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(selectedCity.coordinates.x, 0, selectedCity.coordinates.z));

  // Controls
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0.05, phi: 0.72 });
  const targetCameraThetaRef = useRef<number | null>(null);
  const targetCameraPhiRef = useRef<number | null>(null);
  const targetCameraDistanceRef = useRef(16);
  const currentCameraDistanceRef = useRef(16);

  // Focus City Handler
  const handleFocusCity = (city: ChinaCity) => {
    if (soundEnabled) playClickSound();
    setIsOverviewMode(false);
    isOverviewModeRef.current = false;
    onSelectCity(city, false);
    setActiveSpotlight(city);

    targetCameraDistanceRef.current = 13;
    targetCameraPhiRef.current = 0.68;
    setZoomLevel(13);

    cameraTargetLookAtRef.current.set(city.coordinates.x, 0, city.coordinates.z);
  };

  const handleOverview = () => {
    if (soundEnabled) playClickSound();
    setIsOverviewMode(true);
    isOverviewModeRef.current = true;
    cameraTargetLookAtRef.current.set(2, 0, 1);
    targetCameraDistanceRef.current = 28;
    targetCameraPhiRef.current = 0.85;
    setZoomLevel(28);
  };

  // Scroll active city into view
  useEffect(() => {
    const el = document.getElementById(`china-btn-${selectedCity.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedCity.id]);

  // Update selection reticle and billboard when selectedCity or lang changes
  useEffect(() => {
    selectedCityRef.current = selectedCity;
    if (!selectionReticleRef.current || !sceneRef.current) return;

    // Reposition reticle to selected city coordinates
    selectionReticleRef.current.position.set(selectedCity.coordinates.x, 0, selectedCity.coordinates.z);

    if (!isOverviewModeRef.current) {
      cameraTargetLookAtRef.current.set(selectedCity.coordinates.x, 0, selectedCity.coordinates.z);
      targetCameraDistanceRef.current = 13;
    }

    // Rebuild Billboard
    if (currentBillboardRef.current) {
      selectionReticleRef.current.remove(currentBillboardRef.current);
      if (currentBillboardRef.current.material.map) {
        currentBillboardRef.current.material.map.dispose();
      }
      currentBillboardRef.current.material.dispose();
    }

    const newBillboard = createCityBillboard(selectedCity, lang);
    newBillboard.position.set(0, 3.2, 0);
    selectionReticleRef.current.add(newBillboard);
    currentBillboardRef.current = newBillboard;

    // Update landmark models visibility: show 3D landmark model only for selected city
    landmarkMeshesRef.current.forEach((mesh, id) => {
      mesh.visible = id === selectedCity.id;
    });
  }, [selectedCity, lang]);

  // Three.js Mount Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a1128'); // Deep ancient midnight blue
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 500);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xfef08a, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    sunLight.position.set(15, 30, 20);
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    blueRimLight.position.set(-20, 15, -20);
    scene.add(blueRimLight);

    // 5. Stylized 3D China Map Base Terrain
    const baseGroup = new THREE.Group();

    // Ancient Golden Parchment Map Platter
    const platterGeo = new THREE.CylinderGeometry(15.5, 16.0, 0.6, 48);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2,
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.set(1.5, -0.3, 1.0);
    baseGroup.add(platter);

    // Golden Rim Ring
    const rimGeo = new THREE.TorusGeometry(15.6, 0.12, 12, 64);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const rim = new THREE.Mesh(rimGeo, goldRimMat);
    rim.position.set(1.5, 0.05, 1.0);
    rim.rotation.x = Math.PI / 2;
    baseGroup.add(rim);

    // China Landmass Surface Layer (Emerald Jade relief)
    const landGeo = new THREE.CylinderGeometry(13.8, 14.2, 0.15, 36);
    const landMat = new THREE.MeshStandardMaterial({
      color: 0x0f2e24, // Deep imperial jade green
      roughness: 0.75,
      metalness: 0.1,
    });
    const land = new THREE.Mesh(landGeo, landMat);
    land.position.set(1.5, 0.08, 1.0);
    baseGroup.add(land);

    // Qinghai-Tibet Plateau Elevated Step (West China)
    const plateauGeo = new THREE.BoxGeometry(6.5, 0.5, 5.5);
    const plateauMat = new THREE.MeshStandardMaterial({ color: 0x144234, roughness: 0.9 });
    const plateau = new THREE.Mesh(plateauGeo, plateauMat);
    plateau.position.set(-4.5, 0.3, 1.5);
    baseGroup.add(plateau);

    // Yangtze River (长江) & Yellow River (黄河) Glowing Water Ribbon
    const yellowRiverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0.12, -2.5),
      new THREE.Vector3(-2, 0.12, -3.5),
      new THREE.Vector3(1, 0.12, -3.8),
      new THREE.Vector3(2.5, 0.12, -1.8),
      new THREE.Vector3(5, 0.12, -1.5),
      new THREE.Vector3(7.5, 0.12, -2.5),
    ]);
    const yrPoints = yellowRiverCurve.getPoints(40);
    const yrGeo = new THREE.BufferGeometry().setFromPoints(yrPoints);
    const yrMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2, transparent: true, opacity: 0.8 });
    const yrLine = new THREE.Line(yrGeo, yrMat);
    baseGroup.add(yrLine);

    const yangtzeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 0.12, 1.5),
      new THREE.Vector3(-1.5, 0.12, 2.0),
      new THREE.Vector3(2.5, 0.12, 1.2),
      new THREE.Vector3(5.5, 0.12, 2.2),
      new THREE.Vector3(9.5, 0.12, 1.8),
    ]);
    const yangtzePoints = yangtzeCurve.getPoints(40);
    const yangtzeGeo = new THREE.BufferGeometry().setFromPoints(yangtzePoints);
    const yangtzeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2, transparent: true, opacity: 0.85 });
    const yangtzeLine = new THREE.Line(yangtzeGeo, yangtzeMat);
    baseGroup.add(yangtzeLine);

    scene.add(baseGroup);

    // 6. City Landmark Beacon Pins & 3D Miniatures
    CHINA_CITIES.forEach(city => {
      const pinGroup = new THREE.Group();
      pinGroup.name = city.id;
      pinGroup.position.set(city.coordinates.x, 0.15, city.coordinates.z);

      // Base Pillar Ring
      const ringGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.1, 16);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(city.accentColor),
        metalness: 0.5,
        roughness: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.name = city.id;
      pinGroup.add(ringMesh);

      // Vertical Laser Beacon
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.25, 3.0, 12, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(city.accentColor),
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 1.5;
      pinGroup.add(beam);

      // Floating City Icon Orb
      const orbGeo = new THREE.SphereGeometry(0.25, 12, 12);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(city.accentColor),
        emissiveIntensity: 0.4,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.y = 3.0;
      orb.name = city.id;
      pinGroup.add(orb);

      // 3D Procedural Landmark Miniature
      const landmarkMesh = createLandmarkMesh(city.id, city.accentColor);
      landmarkMesh.position.set(city.coordinates.x, 0.2, city.coordinates.z);
      landmarkMesh.visible = city.id === selectedCity.id;
      landmarkMeshesRef.current.set(city.id, landmarkMesh);
      scene.add(landmarkMesh);

      scene.add(pinGroup);
      cityPinsRef.current.set(city.id, pinGroup);
    });

    // 7. Dynamic 3D Selection Reticle Group
    const reticleGroup = new THREE.Group();
    reticleGroup.position.set(selectedCity.coordinates.x, 0, selectedCity.coordinates.z);

    // Inner Pulsing Ring
    const innerRingGeo = new THREE.RingGeometry(0.9, 1.05, 32);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.22;
    innerRing.name = 'innerRing';
    reticleGroup.add(innerRing);

    // Outer Rotating Dashed Ring
    const outerRingGeo = new THREE.RingGeometry(1.2, 1.35, 32);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = 0.22;
    outerRing.name = 'outerRing';
    reticleGroup.add(outerRing);

    // Initial Billboard Sprite
    const initBillboard = createCityBillboard(selectedCity, lang);
    initBillboard.position.set(0, 3.2, 0);
    reticleGroup.add(initBillboard);
    currentBillboardRef.current = initBillboard;

    scene.add(reticleGroup);
    selectionReticleRef.current = reticleGroup;

    // 8. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera distance interpolation
      currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.08;

      // Smooth camera rotation
      if (!isDraggingRef.current) {
        if (targetCameraThetaRef.current !== null) {
          const dTheta = targetCameraThetaRef.current - cameraRotationRef.current.theta;
          const normalized = Math.atan2(Math.sin(dTheta), Math.cos(dTheta));
          cameraRotationRef.current.theta += normalized * 0.08;
          if (Math.abs(normalized) < 0.008) targetCameraThetaRef.current = null;
        } else if (autoRotateRef.current) {
          cameraRotationRef.current.theta += delta * 0.15;
        }

        if (targetCameraPhiRef.current !== null) {
          cameraRotationRef.current.phi += (targetCameraPhiRef.current - cameraRotationRef.current.phi) * 0.08;
          if (Math.abs(targetCameraPhiRef.current - cameraRotationRef.current.phi) < 0.008) {
            targetCameraPhiRef.current = null;
          }
        }
      }

      // Smooth lookAt target translation
      cameraCurrentLookAtRef.current.lerp(cameraTargetLookAtRef.current, 0.08);

      // Camera position from spherical coords around cameraCurrentLookAt
      const theta = cameraRotationRef.current.theta;
      const phi = Math.max(0.25, Math.min(Math.PI / 2 - 0.08, cameraRotationRef.current.phi));
      const dist = currentCameraDistanceRef.current;

      camera.position.x = cameraCurrentLookAtRef.current.x + dist * Math.sin(phi) * Math.sin(theta);
      camera.position.y = cameraCurrentLookAtRef.current.y + dist * Math.cos(phi);
      camera.position.z = cameraCurrentLookAtRef.current.z + dist * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(cameraCurrentLookAtRef.current);

      // Reticle animation
      if (selectionReticleRef.current) {
        const time = clock.getElapsedTime();
        const pulse = 1 + Math.sin(time * 3.5) * 0.12;

        const iRing = selectionReticleRef.current.getObjectByName('innerRing') as THREE.Mesh;
        if (iRing) {
          iRing.scale.set(pulse, pulse, pulse);
        }

        const oRing = selectionReticleRef.current.getObjectByName('outerRing') as THREE.Mesh;
        if (oRing) {
          oRing.rotation.z += delta * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
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

  // Raycasting for city pin clicks
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
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

    // Hover detection
    const container = mountRef.current;
    if (!container || !cameraRef.current || !sceneRef.current) return;

    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

    const hitObjects: THREE.Object3D[] = [];
    cityPinsRef.current.forEach(group => {
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
      const matched = CHINA_CITIES.find(c => c.id === targetName);
      if (matched) {
        setHoveredCity(matched);
      }
    } else {
      setHoveredCity(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = Math.abs(e.clientX - prevMouseRef.current.x) > 4 || Math.abs(e.clientY - prevMouseRef.current.y) > 4;
    isDraggingRef.current = false;

    if (!wasDragging) {
      const container = mountRef.current;
      if (!container || !cameraRef.current || !sceneRef.current) return;

      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const hitObjects: THREE.Object3D[] = [];
      cityPinsRef.current.forEach(group => {
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
        const matched = CHINA_CITIES.find(c => c.id === targetName);
        if (matched) {
          handleFocusCity(matched);
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    targetCameraDistanceRef.current = Math.max(9, Math.min(38, targetCameraDistanceRef.current + e.deltaY * 0.04));
    setZoomLevel(Math.round(targetCameraDistanceRef.current));
  };

  const handleZoom = (delta: number) => {
    if (soundEnabled) playClickSound();
    targetCameraDistanceRef.current = Math.max(9, Math.min(38, targetCameraDistanceRef.current + delta * 5));
    setZoomLevel(Math.round(targetCameraDistanceRef.current));
  };

  const getName = (c: ChinaCity) => (lang === 'fr' ? c.nameFr : lang === 'zh' ? c.nameZh : c.nameEn);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-3 border-slate-900 bg-slate-950 shadow-comic select-none">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-[460px] md:h-[560px] cursor-grab active:cursor-grabbing"
      />

      {/* Top Overlay Banner & Focus Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-white shadow-comic flex items-center gap-1.5">
          <Compass size={15} className="text-amber-200 animate-spin-slow" />
          <span>
            {lang === 'fr'
              ? 'Carte 3D de Chine & Monuments'
              : lang === 'zh'
              ? '3D 华夏地图与名城胜景'
              : '3D China Cultural Map'}
          </span>
        </div>

        {/* Selected City Target Badge */}
        {selectedCity && (
          <button
            onClick={() => handleFocusCity(selectedCity)}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 px-3 py-1.5 rounded-xl font-comic text-xs font-extrabold shadow-comic transition-all cursor-pointer"
            title="Focus camera on selected city in 3D"
          >
            <span>🎯</span>
            <span>
              {lang === 'fr'
                ? `Ciblé : ${getName(selectedCity)}`
                : lang === 'zh'
                ? `3D 锁定：${getName(selectedCity)}`
                : `Targeted: ${getName(selectedCity)}`}
            </span>
          </button>
        )}

        {/* Overview Mode Toggle */}
        <button
          onClick={isOverviewMode ? () => handleFocusCity(selectedCity) : handleOverview}
          className={`flex items-center gap-1.5 border-2 border-slate-900 px-3 py-1.5 rounded-xl font-comic text-xs font-bold shadow-comic transition-all cursor-pointer ${
            isOverviewMode
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 ring-2 ring-amber-300'
              : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800'
          }`}
          title="Toggle Full China Overview"
        >
          <span>{isOverviewMode ? '🎯' : '🗺️'}</span>
          <span>
            {lang === 'fr'
              ? isOverviewMode
                ? 'Centrer la Ville'
                : 'Vue d\'Ensemble'
              : lang === 'zh'
              ? isOverviewMode
                ? '聚焦名城'
                : '华夏全景'
              : isOverviewMode
              ? 'Focus City'
              : 'Full China View'}
          </span>
        </button>
      </div>

      {/* Floating Bottom Quick-Jump Planetary Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md border-2 border-slate-800 rounded-2xl p-1 pointer-events-auto max-w-[calc(100%-150px)]">
          <button
            onClick={() => quickBarRef.current?.scrollBy({ left: -140, behavior: 'smooth' })}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Scroll Left"
          >
            <ChevronLeft size={14} />
          </button>
          <div
            ref={quickBarRef}
            className="flex items-center gap-1.5 overflow-x-auto py-0.5 px-1 scrollbar-none"
          >
            {CHINA_CITIES.map(c => {
              const isSelected = selectedCity.id === c.id;
              const isUnlocked = unlockedBadges.includes(c.id);

              return (
                <button
                  key={c.id}
                  id={`china-btn-${c.id}`}
                  onClick={() => handleFocusCity(c)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-comic font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 scale-105 shadow-comic ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-950'
                      : isUnlocked
                      ? 'bg-red-950/80 text-red-300 hover:bg-red-800/80 border border-red-500/40'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                  title={getName(c)}
                >
                  <span>{c.icon}</span>
                  <span>{getName(c)}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-slate-950 text-amber-300 px-1 py-0.5 rounded font-sans font-bold">
                      3D 🎯
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => quickBarRef.current?.scrollBy({ left: 140, behavior: 'smooth' })}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title="Scroll Right"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Orbit Controls buttons */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(r => !r)}
            className={`p-2 rounded-xl border-2 border-slate-900 font-comic text-xs font-bold shadow-comic transition-all cursor-pointer ${
              autoRotate ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-slate-300'
            }`}
            title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
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

      {/* Hover Tooltip */}
      {hoveredCity && (
        <div className="absolute top-16 right-4 z-20 bg-slate-900/90 text-white border-2 border-amber-400 p-2.5 rounded-xl text-xs font-comic shadow-comic pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <span>{hoveredCity.icon}</span>
            <span>{getName(hoveredCity)}</span>
          </div>
          <div className="text-[10px] text-slate-300 mt-0.5">
            {lang === 'fr' ? hoveredCity.landmarkFr : lang === 'zh' ? hoveredCity.landmarkZh : hoveredCity.landmarkEn}
          </div>
        </div>
      )}

      {/* Active City Spotlight Card Popup */}
      {activeSpotlight && (
        <div className="absolute top-16 left-4 z-20 max-w-sm bg-white/95 backdrop-blur-md text-slate-900 border-2 border-slate-900 p-3.5 rounded-2xl shadow-comic animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeSpotlight.icon}</span>
              <div>
                <h4 className="font-comic font-bold text-sm text-slate-900 leading-tight">
                  {getName(activeSpotlight)}
                </h4>
                <p className="text-[10px] text-red-700 font-semibold">
                  {lang === 'fr' ? activeSpotlight.provinceFr : lang === 'zh' ? activeSpotlight.provinceZh : activeSpotlight.provinceEn}
                </p>
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

          <div className="text-xs text-slate-700 font-medium mb-2 leading-relaxed">
            {lang === 'fr' ? activeSpotlight.taglineFr : lang === 'zh' ? activeSpotlight.taglineZh : activeSpotlight.taglineEn}
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                speakText(
                  lang === 'fr' ? activeSpotlight.funFactFr : lang === 'zh' ? activeSpotlight.funFactZh : activeSpotlight.funFactEn,
                  lang
                );
              }}
              className="flex items-center gap-1 text-[11px] font-bold text-red-700 hover:text-red-600 cursor-pointer"
            >
              <Volume2 size={13} />
              <span>{lang === 'fr' ? 'Écouter' : lang === 'zh' ? '朗读' : 'Listen'}</span>
            </button>

            <button
              onClick={() => onSelectCity(activeSpotlight, true)}
              className="comic-btn px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg font-comic text-[11px] font-bold shadow-sm transition-all cursor-pointer"
            >
              {lang === 'fr' ? 'Explorer ➔' : lang === 'zh' ? '开启文化答题 ➔' : 'Explore Details ➔'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
