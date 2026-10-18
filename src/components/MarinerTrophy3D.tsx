import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Trophy, RotateCw } from 'lucide-react';

interface MarinerTrophy3DProps {
  title?: string;
  subtitle?: string;
  starsCount?: number;
  interactive?: boolean;
}

export const MarinerTrophy3D: React.FC<MarinerTrophy3DProps> = ({
  title = 'Mariner Champion Trophy',
  subtitle = 'Millen Woods Mariners Grade 4 Math Master',
  starsCount = 5,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const trophyGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0.4, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm Key Light (Gold shine)
    const keyLight = new THREE.DirectionalLight(0xffd700, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cool Rim Light (Blue oceanic accent)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // 5. Procedural Trophy Mesh Hierarchy
    const trophyGroup = new THREE.Group();
    scene.add(trophyGroup);
    trophyGroupRef.current = trophyGroup;

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.85,
    });

    const polishedWoodMaterial = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.4,
      metalness: 0.2,
    });

    const gemMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });

    // Pedestal Base (Marble/Gold step)
    const baseGeom1 = new THREE.CylinderGeometry(1.2, 1.35, 0.25, 32);
    const base1 = new THREE.Mesh(baseGeom1, polishedWoodMaterial);
    base1.position.y = -1.2;
    trophyGroup.add(base1);

    const baseGeom2 = new THREE.CylinderGeometry(0.9, 1.1, 0.2, 32);
    const base2 = new THREE.Mesh(baseGeom2, goldMaterial);
    base2.position.y = -0.98;
    trophyGroup.add(base2);

    // Trophy Stem Pillar
    const stemGeom = new THREE.CylinderGeometry(0.2, 0.35, 0.9, 24);
    const stem = new THREE.Mesh(stemGeom, goldMaterial);
    stem.position.y = -0.45;
    trophyGroup.add(stem);

    // Helm Outer Ring
    const helmRadius = 1.35;
    const ringGeom = new THREE.TorusGeometry(helmRadius, 0.11, 24, 48);
    const helmRing = new THREE.Mesh(ringGeom, goldMaterial);
    helmRing.position.y = 0.65;
    trophyGroup.add(helmRing);

    // Central Hub
    const hubGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 32);
    hubGeom.rotateX(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeom, goldMaterial);
    hub.position.y = 0.65;
    trophyGroup.add(hub);

    // Central Gem in Hub
    const gemGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const gem = new THREE.Mesh(gemGeom, gemMaterial);
    gem.position.set(0, 0.65, 0.12);
    trophyGroup.add(gem);

    // 8 Spokes radiating from center
    const spokeCount = 8;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      const spokeGeom = new THREE.CylinderGeometry(0.06, 0.07, helmRadius * 0.95, 16);
      const spoke = new THREE.Mesh(spokeGeom, polishedWoodMaterial);
      spoke.position.set(
        Math.cos(angle) * (helmRadius * 0.45),
        0.65 + Math.sin(angle) * (helmRadius * 0.45),
        0
      );
      spoke.rotation.z = angle + Math.PI / 2;
      trophyGroup.add(spoke);

      // Helm handles protruding outside ring
      const handleGeom = new THREE.CylinderGeometry(0.08, 0.05, 0.5, 16);
      const handle = new THREE.Mesh(handleGeom, polishedWoodMaterial);
      handle.position.set(
        Math.cos(angle) * (helmRadius + 0.25),
        0.65 + Math.sin(angle) * (helmRadius + 0.25),
        0
      );
      handle.rotation.z = angle + Math.PI / 2;
      trophyGroup.add(handle);

      // Golden knob on tip of handle
      const knobGeom = new THREE.SphereGeometry(0.08, 12, 12);
      const knob = new THREE.Mesh(knobGeom, goldMaterial);
      knob.position.set(
        Math.cos(angle) * (helmRadius + 0.5),
        0.65 + Math.sin(angle) * (helmRadius + 0.5),
        0
      );
      trophyGroup.add(knob);
    }

    // 6. Orbiting Golden Stars Particles
    const starCount = 60;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      starPos[i] = Math.cos(theta) * r;
      starPos[i + 1] = 0.65 + (Math.random() - 0.5) * 1.5;
      starPos[i + 2] = Math.sin(theta) * r;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
    });
    const starParticles = new THREE.Points(starGeom, starMat);
    trophyGroup.add(starParticles);

    // 7. Interactive Pointer Tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle floating bob
      trophyGroup.position.y = Math.sin(elapsed * 2) * 0.08;

      if (isRotating) {
        trophyGroup.rotation.y += delta * 0.8;
      }

      // Pointer tilt interaction
      if (interactive) {
        trophyGroup.rotation.x = mouseRef.current.y * 0.25;
        trophyGroup.rotation.z = -mouseRef.current.x * 0.25;
      }

      // Rotate particle cloud opposite direction
      starParticles.rotation.y -= delta * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && camera && renderer) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);

      // Comprehensive Resource Cleanup
      goldMaterial.dispose();
      polishedWoodMaterial.dispose();
      gemMaterial.dispose();
      baseGeom1.dispose();
      baseGeom2.dispose();
      stemGeom.dispose();
      ringGeom.dispose();
      hubGeom.dispose();
      gemGeom.dispose();
      starGeom.dispose();
      starMat.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [interactive, isRotating]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-64 h-64 md:w-72 md:h-72 cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsRotating(r => !r)}
        title="Click to toggle 3D trophy spin"
      />

      {/* Floating 3D Badge Indicator */}
      <div className="mt-1 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(r => !r)}
          className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-slate-900 font-comic text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm transition-all"
        >
          <RotateCw size={12} className={isRotating ? 'animate-spin-slow' : ''} />
          <span>{isRotating ? 'Spinning 3D Helm' : 'Paused 3D'}</span>
        </button>
      </div>
    </div>
  );
};
