import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { WorldCountry, WORLD_COUNTRIES } from '../data/worldData';
import { COUNTRY_LANDMARKS, CountryLandmark } from '../data/landmarkData';
import {
  Sparkles,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Compass,
  Building2,
  MapPin,
  Volume2,
  VolumeX,
  X,
  Eye,
  ChevronRight,
  Info,
} from 'lucide-react';
import { playClickSound, speakText, stopSpeaking } from '../utils/audio';

// Country geographic coordinates (lat, lon)
export const COUNTRY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  canada: { lat: 56.13, lon: -106.34 },
  china: { lat: 35.86, lon: 104.19 },
  japan: { lat: 36.20, lon: 138.25 },
  egypt: { lat: 26.82, lon: 30.80 },
  brazil: { lat: -14.23, lon: -51.92 },
  australia: { lat: -25.27, lon: 133.77 },
  france: { lat: 46.22, lon: 2.21 },
  italy: { lat: 41.87, lon: 12.56 },
  iceland: { lat: 64.96, lon: -19.02 },
  kenya: { lat: -0.02, lon: 37.90 },
  mexico: { lat: 23.63, lon: -102.55 },
  peru: { lat: -9.19, lon: -75.01 },
  india: { lat: 20.59, lon: 78.96 },
  'united-kingdom': { lat: 55.37, lon: -3.43 },
  'united-states': { lat: 37.09, lon: -95.71 },
  uk: { lat: 55.37, lon: -3.43 },
  usa: { lat: 37.09, lon: -95.71 },
  antarctica: { lat: -82.86, lon: 135.0 },
};

function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Procedural Canvas Texture for World Continents & Nautical Grids
function createEarthTexture(): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep Royal Mariner Ocean
  const oceanGradient = ctx.createLinearGradient(0, 0, 0, height);
  oceanGradient.addColorStop(0, '#0f2b5c');
  oceanGradient.addColorStop(0.5, '#1e3a8a');
  oceanGradient.addColorStop(1, '#0f2b5c');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, width, height);

  // Nautical Lat/Long Grid lines
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.18)';
  ctx.lineWidth = 1.5;

  // Parallels (Latitude)
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Meridians (Longitude)
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw Equator & Prime Meridian with bold golden dash
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw stylized continent landmass silhouettes
  ctx.fillStyle = '#10b981'; // Mariner Emerald Green
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2;

  // North America
  ctx.beginPath();
  ctx.ellipse(400, 280, 180, 110, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Greenland
  ctx.beginPath();
  ctx.ellipse(620, 160, 60, 45, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // South America
  ctx.beginPath();
  ctx.ellipse(550, 620, 110, 180, 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Europe
  ctx.beginPath();
  ctx.ellipse(1050, 260, 110, 80, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Africa
  ctx.beginPath();
  ctx.ellipse(1080, 520, 140, 190, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Asia
  ctx.beginPath();
  ctx.ellipse(1450, 310, 260, 150, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Australia
  ctx.beginPath();
  ctx.ellipse(1680, 700, 120, 90, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Antarctica
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(width / 2, height - 50, 800, 60, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural 3D Landmark Geometries Builder
function buildProceduralLandmark3D(landmark: CountryLandmark): THREE.Group {
  const group = new THREE.Group();
  const cid = landmark.countryId;

  // Base plinth ring to root the building into globe surface
  const plinthGeom = new THREE.CylinderGeometry(0.22, 0.25, 0.04, 16);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.8,
  });
  const plinth = new THREE.Mesh(plinthGeom, plinthMat);
  plinth.position.y = 0.02;
  (plinth as any).userData = { countryId: cid, isLandmark: true };
  group.add(plinth);

  switch (landmark.modelType) {
    case 'pyramid': {
      // Egypt: Giza Great Pyramid with gilded capstone
      const pyrGeom = new THREE.ConeGeometry(0.28, 0.35, 4);
      const pyrMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.7,
        metalness: 0.1,
      });
      const pyr = new THREE.Mesh(pyrGeom, pyrMat);
      pyr.position.y = 0.175 + 0.04;
      pyr.rotation.y = Math.PI / 4;
      (pyr as any).userData = { countryId: cid, isLandmark: true };
      group.add(pyr);

      // Gold apex capstone
      const capGeom = new THREE.ConeGeometry(0.08, 0.09, 4);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.2,
        metalness: 0.9,
      });
      const cap = new THREE.Mesh(capGeom, capMat);
      cap.position.y = 0.35 - 0.045 + 0.04;
      cap.rotation.y = Math.PI / 4;
      (cap as any).userData = { countryId: cid, isLandmark: true };
      group.add(cap);
      break;
    }

    case 'mayan_pyramid': {
      // Mexico: Chichen Itza tiered stepped pyramid
      const tiers = [
        { w: 0.32, h: 0.07 },
        { w: 0.25, h: 0.07 },
        { w: 0.18, h: 0.07 },
      ];
      let yOffset = 0.04;
      tiers.forEach(t => {
        const tierGeom = new THREE.BoxGeometry(t.w, t.h, t.w);
        const tierMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.6 });
        const tierMesh = new THREE.Mesh(tierGeom, tierMat);
        tierMesh.position.y = yOffset + t.h / 2;
        (tierMesh as any).userData = { countryId: cid, isLandmark: true };
        group.add(tierMesh);
        yOffset += t.h;
      });
      // Temple box on top
      const templeGeom = new THREE.BoxGeometry(0.1, 0.08, 0.1);
      const templeMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
      const temple = new THREE.Mesh(templeGeom, templeMat);
      temple.position.y = yOffset + 0.04;
      (temple as any).userData = { countryId: cid, isLandmark: true };
      group.add(temple);
      break;
    }

    case 'eiffel_tower': {
      // France: Paris Eiffel Tower
      // 4 arched base pillars
      const legGeom = new THREE.CylinderGeometry(0.03, 0.05, 0.18, 6);
      const ironMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
      const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      angles.forEach(ang => {
        const leg = new THREE.Mesh(legGeom, ironMat);
        leg.position.set(Math.cos(ang) * 0.08, 0.09 + 0.04, Math.sin(ang) * 0.08);
        (leg as any).userData = { countryId: cid, isLandmark: true };
        group.add(leg);
      });
      // Platform deck
      const platGeom = new THREE.BoxGeometry(0.18, 0.03, 0.18);
      const platMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5 });
      const plat = new THREE.Mesh(platGeom, platMat);
      plat.position.y = 0.18 + 0.04;
      (plat as any).userData = { countryId: cid, isLandmark: true };
      group.add(plat);
      // Tapered lattice spire
      const spireGeom = new THREE.CylinderGeometry(0.02, 0.08, 0.35, 4);
      const spire = new THREE.Mesh(spireGeom, ironMat);
      spire.position.y = 0.355 + 0.04;
      (spire as any).userData = { countryId: cid, isLandmark: true };
      group.add(spire);
      // Tip beacon light
      const tipGeom = new THREE.SphereGeometry(0.035, 8, 8);
      const tipMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const tip = new THREE.Mesh(tipGeom, tipMat);
      tip.position.y = 0.53 + 0.04;
      (tip as any).userData = { countryId: cid, isLandmark: true };
      group.add(tip);
      break;
    }

    case 'big_ben': {
      // UK: Big Ben / Elizabeth Clock Tower
      const towerGeom = new THREE.BoxGeometry(0.12, 0.38, 0.12);
      const towerMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
      const tower = new THREE.Mesh(towerGeom, towerMat);
      tower.position.y = 0.19 + 0.04;
      (tower as any).userData = { countryId: cid, isLandmark: true };
      group.add(tower);

      // White clock dials
      const clockGeom = new THREE.BoxGeometry(0.14, 0.08, 0.14);
      const clockMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      const clock = new THREE.Mesh(clockGeom, clockMat);
      clock.position.y = 0.34 + 0.04;
      (clock as any).userData = { countryId: cid, isLandmark: true };
      group.add(clock);

      // Gothic Spire roof
      const spireGeom = new THREE.ConeGeometry(0.09, 0.22, 4);
      const spireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 });
      const spire = new THREE.Mesh(spireGeom, spireMat);
      spire.position.y = 0.49 + 0.04;
      spire.rotation.y = Math.PI / 4;
      (spire as any).userData = { countryId: cid, isLandmark: true };
      group.add(spire);
      break;
    }

    case 'great_wall': {
      // China: Great Wall stone watchtower and ramparts
      const baseGeom = new THREE.BoxGeometry(0.24, 0.18, 0.18);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.8 });
      const base = new THREE.Mesh(baseGeom, stoneMat);
      base.position.y = 0.09 + 0.04;
      (base as any).userData = { countryId: cid, isLandmark: true };
      group.add(base);

      // Imperial tiled pavilion roof
      const roofGeom = new THREE.ConeGeometry(0.2, 0.1, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
      const roof = new THREE.Mesh(roofGeom, roofMat);
      roof.position.y = 0.23 + 0.04;
      roof.rotation.y = Math.PI / 4;
      (roof as any).userData = { countryId: cid, isLandmark: true };
      group.add(roof);

      // Flanking rampart walls
      const wallGeom = new THREE.BoxGeometry(0.38, 0.09, 0.06);
      const wall = new THREE.Mesh(wallGeom, stoneMat);
      wall.position.y = 0.045 + 0.04;
      wall.rotation.y = 0.3;
      (wall as any).userData = { countryId: cid, isLandmark: true };
      group.add(wall);
      break;
    }

    case 'torii_gate': {
      // Japan: Torii Gate & snowcap Fuji peak
      // Mt. Fuji cone behind
      const fujiGeom = new THREE.ConeGeometry(0.26, 0.28, 16);
      const fujiMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
      const fuji = new THREE.Mesh(fujiGeom, fujiMat);
      fuji.position.set(0, 0.14 + 0.04, -0.08);
      (fuji as any).userData = { countryId: cid, isLandmark: true };
      group.add(fuji);

      // Fuji snowcap
      const snowGeom = new THREE.ConeGeometry(0.12, 0.11, 16);
      const snowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const snow = new THREE.Mesh(snowGeom, snowMat);
      snow.position.set(0, 0.225 + 0.04, -0.08);
      (snow as any).userData = { countryId: cid, isLandmark: true };
      group.add(snow);

      // Vermilion Torii pillars
      const pillarGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
      const toriiMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
      const p1 = new THREE.Mesh(pillarGeom, toriiMat);
      p1.position.set(-0.08, 0.15 + 0.04, 0.08);
      const p2 = new THREE.Mesh(pillarGeom, toriiMat);
      p2.position.set(0.08, 0.15 + 0.04, 0.08);
      (p1 as any).userData = { countryId: cid, isLandmark: true };
      (p2 as any).userData = { countryId: cid, isLandmark: true };
      group.add(p1, p2);

      // Top curved beam
      const beamGeom = new THREE.BoxGeometry(0.26, 0.035, 0.04);
      const beam = new THREE.Mesh(beamGeom, toriiMat);
      beam.position.set(0, 0.3 + 0.04, 0.08);
      (beam as any).userData = { countryId: cid, isLandmark: true };
      group.add(beam);
      break;
    }

    case 'opera_house': {
      // Australia: Sydney Opera House sail shells
      const shellMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      // Interlocking shells
      const s1Geom = new THREE.ConeGeometry(0.14, 0.24, 3);
      const s1 = new THREE.Mesh(s1Geom, shellMat);
      s1.position.set(-0.06, 0.12 + 0.04, 0);
      s1.rotation.z = -0.3;
      s1.rotation.y = 0.2;
      const s2Geom = new THREE.ConeGeometry(0.12, 0.2, 3);
      const s2 = new THREE.Mesh(s2Geom, shellMat);
      s2.position.set(0.06, 0.1 + 0.04, 0.02);
      s2.rotation.z = 0.3;
      s2.rotation.y = -0.2;
      (s1 as any).userData = { countryId: cid, isLandmark: true };
      (s2 as any).userData = { countryId: cid, isLandmark: true };
      group.add(s1, s2);
      break;
    }

    case 'taj_mahal': {
      // India: Taj Mahal dome and 4 minarets
      const baseGeom = new THREE.BoxGeometry(0.22, 0.14, 0.22);
      const marbleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const base = new THREE.Mesh(baseGeom, marbleMat);
      base.position.y = 0.07 + 0.04;
      (base as any).userData = { countryId: cid, isLandmark: true };
      group.add(base);

      // Central onion dome
      const domeGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const dome = new THREE.Mesh(domeGeom, marbleMat);
      dome.scale.set(1, 1.3, 1);
      dome.position.y = 0.22 + 0.04;
      (dome as any).userData = { countryId: cid, isLandmark: true };
      group.add(dome);

      // 4 Corner Minarets
      const minaretGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.28, 8);
      const offsets = [
        [-0.12, -0.12],
        [0.12, -0.12],
        [-0.12, 0.12],
        [0.12, 0.12],
      ];
      offsets.forEach(([ox, oz]) => {
        const minaret = new THREE.Mesh(minaretGeom, marbleMat);
        minaret.position.set(ox, 0.14 + 0.04, oz);
        (minaret as any).userData = { countryId: cid, isLandmark: true };
        group.add(minaret);
      });
      break;
    }

    case 'christ_statue': {
      // Brazil: Christ the Redeemer
      const pedGeom = new THREE.CylinderGeometry(0.08, 0.12, 0.12, 8);
      const pedMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const ped = new THREE.Mesh(pedGeom, pedMat);
      ped.position.y = 0.06 + 0.04;
      (ped as any).userData = { countryId: cid, isLandmark: true };
      group.add(ped);

      // Statue body & outstretched arms
      const statueMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
      const bodyGeom = new THREE.BoxGeometry(0.06, 0.22, 0.05);
      const body = new THREE.Mesh(bodyGeom, statueMat);
      body.position.y = 0.22 + 0.04;
      const armsGeom = new THREE.BoxGeometry(0.32, 0.04, 0.04);
      const arms = new THREE.Mesh(armsGeom, statueMat);
      arms.position.y = 0.28 + 0.04;
      const headGeom = new THREE.SphereGeometry(0.035, 8, 8);
      const head = new THREE.Mesh(headGeom, statueMat);
      head.position.y = 0.35 + 0.04;
      (body as any).userData = { countryId: cid, isLandmark: true };
      (arms as any).userData = { countryId: cid, isLandmark: true };
      (head as any).userData = { countryId: cid, isLandmark: true };
      group.add(body, arms, head);
      break;
    }

    case 'leaning_tower': {
      // Italy: Leaning Tower of Pisa
      const towerGeom = new THREE.CylinderGeometry(0.08, 0.09, 0.38, 16);
      const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const tower = new THREE.Mesh(towerGeom, marbleMat);
      tower.position.y = 0.19 + 0.04;
      tower.rotation.z = 0.14; // Realistic architectural lean!
      (tower as any).userData = { countryId: cid, isLandmark: true };
      group.add(tower);
      break;
    }

    case 'cn_tower': {
      // Canada: CN Tower needle
      const mastGeom = new THREE.CylinderGeometry(0.02, 0.045, 0.48, 8);
      const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 });
      const mast = new THREE.Mesh(mastGeom, steelMat);
      mast.position.y = 0.24 + 0.04;
      (mast as any).userData = { countryId: cid, isLandmark: true };
      group.add(mast);

      // Observation deck disk
      const podGeom = new THREE.CylinderGeometry(0.09, 0.08, 0.06, 12);
      const podMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
      const pod = new THREE.Mesh(podGeom, podMat);
      pod.position.y = 0.35 + 0.04;
      (pod as any).userData = { countryId: cid, isLandmark: true };
      group.add(pod);

      // Top needle spire
      const needleGeom = new THREE.CylinderGeometry(0.005, 0.015, 0.18, 6);
      const needle = new THREE.Mesh(needleGeom, steelMat);
      needle.position.y = 0.54 + 0.04;
      (needle as any).userData = { countryId: cid, isLandmark: true };
      group.add(needle);
      break;
    }

    case 'volcano_geyser': {
      // Iceland: Volcanic cone & glowing hot geyser
      const volcGeom = new THREE.CylinderGeometry(0.09, 0.24, 0.18, 12);
      const lavaMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
      const volc = new THREE.Mesh(volcGeom, lavaMat);
      volc.position.y = 0.09 + 0.04;
      (volc as any).userData = { countryId: cid, isLandmark: true };
      group.add(volc);

      // Glowing blue geyser water column
      const geyGeom = new THREE.ConeGeometry(0.06, 0.26, 8);
      const geyMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
      const geyser = new THREE.Mesh(geyGeom, geyMat);
      geyser.position.y = 0.26 + 0.04;
      (geyser as any).userData = { countryId: cid, isLandmark: true };
      group.add(geyser);
      break;
    }

    case 'safari_outpost': {
      // Kenya: Acacia tree canopy & ranger outpost
      const trunkGeom = new THREE.CylinderGeometry(0.02, 0.03, 0.24, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);
      trunk.position.y = 0.12 + 0.04;
      (trunk as any).userData = { countryId: cid, isLandmark: true };
      group.add(trunk);

      // Flat umbrella foliage disk
      const leafGeom = new THREE.CylinderGeometry(0.2, 0.22, 0.04, 12);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
      const leaves = new THREE.Mesh(leafGeom, leafMat);
      leaves.position.y = 0.25 + 0.04;
      (leaves as any).userData = { countryId: cid, isLandmark: true };
      group.add(leaves);
      break;
    }

    case 'machu_picchu': {
      // Peru: Machu Picchu stone terraces
      const t1Geom = new THREE.BoxGeometry(0.3, 0.06, 0.22);
      const tMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
      const t1 = new THREE.Mesh(t1Geom, tMat);
      t1.position.y = 0.03 + 0.04;
      const t2Geom = new THREE.BoxGeometry(0.22, 0.06, 0.16);
      const t2 = new THREE.Mesh(t2Geom, tMat);
      t2.position.set(0.02, 0.08 + 0.04, -0.02);
      // Stone temple
      const templeGeom = new THREE.BoxGeometry(0.09, 0.08, 0.09);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const temple = new THREE.Mesh(templeGeom, stoneMat);
      temple.position.set(-0.04, 0.14 + 0.04, 0.02);
      (t1 as any).userData = { countryId: cid, isLandmark: true };
      (t2 as any).userData = { countryId: cid, isLandmark: true };
      (temple as any).userData = { countryId: cid, isLandmark: true };
      group.add(t1, t2, temple);
      break;
    }

    case 'liberty_statue': {
      // USA: Statue of Liberty
      const baseGeom = new THREE.BoxGeometry(0.14, 0.14, 0.14);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x78716c });
      const base = new THREE.Mesh(baseGeom, baseMat);
      base.position.y = 0.07 + 0.04;
      (base as any).userData = { countryId: cid, isLandmark: true };
      group.add(base);

      // Patinated green copper body
      const copMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.5 });
      const bodyGeom = new THREE.CylinderGeometry(0.04, 0.06, 0.26, 8);
      const body = new THREE.Mesh(bodyGeom, copMat);
      body.position.y = 0.26 + 0.04;
      (body as any).userData = { countryId: cid, isLandmark: true };
      group.add(body);

      // Radiant Golden torch arm
      const torchGeom = new THREE.ConeGeometry(0.025, 0.06, 6);
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const torch = new THREE.Mesh(torchGeom, flameMat);
      torch.position.set(0.06, 0.42 + 0.04, 0);
      (torch as any).userData = { countryId: cid, isLandmark: true };
      group.add(torch);
      break;
    }

    case 'polar_station': {
      // Antarctica: Stilted science station & astrophysics dome
      const podGeom = new THREE.BoxGeometry(0.24, 0.09, 0.14);
      const podMat = new THREE.MeshStandardMaterial({ color: 0xe11d48 });
      const pod = new THREE.Mesh(podGeom, podMat);
      pod.position.y = 0.12 + 0.04;
      (pod as any).userData = { countryId: cid, isLandmark: true };
      group.add(pod);

      // Geodesic telescope dome
      const domeGeom = new THREE.SphereGeometry(0.07, 12, 12);
      const domeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      const dome = new THREE.Mesh(domeGeom, domeMat);
      dome.position.set(0.06, 0.19 + 0.04, 0);
      (dome as any).userData = { countryId: cid, isLandmark: true };
      group.add(dome);
      break;
    }
  }

  return group;
}

// Procedural Sprite Label for Floating Landmark Billboard
function createLandmarkBillboard(landmark: CountryLandmark, lang: 'en' | 'fr' | 'zh'): THREE.Sprite {
  const displayTitle = lang === 'zh'
    ? (landmark.shortNameZh || landmark.nameZh.split('与')[0].split('(')[0].trim())
    : (landmark.shortNameEn || landmark.nameEn.split('&')[0].split('(')[0].trim());

  // Use a measurement canvas to calculate width dynamically so text is NEVER cut off
  const fontFace = 'bold 22px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const rulerCanvas = document.createElement('canvas');
  const rulerCtx = rulerCanvas.getContext('2d')!;
  rulerCtx.font = fontFace;
  const measuredWidth = rulerCtx.measureText(displayTitle).width;

  // Sizing metrics
  const badgeDiameter = 48;
  const leftPad = 12;
  const badgeCenterX = leftPad + badgeDiameter / 2; // 36
  const textStartX = badgeCenterX + badgeDiameter / 2 + 12; // 72
  const rightPad = 22;
  const canvasWidth = Math.max(220, Math.ceil(textStartX + measuredWidth + rightPad));
  const canvasHeight = 74;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;

  const pillX = 3;
  const pillY = 3;
  const pillW = canvasWidth - 6;
  const pillH = canvasHeight - 6;
  const pillRadius = pillH / 2;

  // Background capsule pill
  ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
  ctx.strokeStyle = landmark.color || '#f59e0b';
  ctx.lineWidth = 3.5;

  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillRadius);
  ctx.fill();
  ctx.stroke();

  // Circular badge backing: Crisp solid white enamel plate so the icon pops vibrantly
  const centerY = canvasHeight / 2;
  const badgeRadius = badgeDiameter / 2;

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(badgeCenterX, centerY, badgeRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = landmark.color || '#f59e0b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw emoji icon centered with crisp 28px size and full solid opacity
  ctx.fillStyle = '#0f172a';
  ctx.font = '28px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(landmark.icon, badgeCenterX, centerY + 1);

  // Draw landmark name in full without any clipping
  ctx.fillStyle = '#ffffff';
  ctx.font = fontFace;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayTitle, textStartX, centerY);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    depthTest: false,
    transparent: true,
  });
  const sprite = new THREE.Sprite(material);

  // 3D scale: preserve the exact aspect ratio of the canvas so nothing is stretched or distorted
  const baseHeight = 0.38;
  const aspect = canvasWidth / canvasHeight;
  sprite.scale.set(baseHeight * aspect, baseHeight, 1);
  (sprite as any).userData = { countryId: landmark.countryId, isLandmark: true };
  return sprite;
}

interface Globe3DProps {
  lang: 'en' | 'fr' | 'zh';
  soundEnabled: boolean;
  unlockedBadges: string[];
  selectedCountry: WorldCountry;
  onSelectCountry: (country: WorldCountry) => void;
}

export const Globe3D: React.FC<Globe3DProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  selectedCountry,
  onSelectCountry,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<WorldCountry | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(10);
  const [displayMode, setDisplayMode] = useState<'landmarks' | 'beacons'>('landmarks');
  const [activeSpotlightLandmark, setActiveSpotlightLandmark] = useState<CountryLandmark | null>(null);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pinsRef = useRef<Map<string, THREE.Group>>(new Map());
  const landmarksRef = useRef<Map<string, THREE.Group>>(new Map());
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.15, y: -0.8 });
  const currentRotationRef = useRef({ x: 0.15, y: -0.8 });

  // Rotate globe smoothly to target country when selected
  useEffect(() => {
    if (!selectedCountry) return;
    const coords = COUNTRY_COORDINATES[selectedCountry.id];
    if (coords) {
      const targetY = -((coords.lon + 180) * (Math.PI / 180)) + Math.PI / 2;
      const targetX = coords.lat * (Math.PI / 180) * 0.45;
      targetRotationRef.current = { x: targetX, y: targetY };
    }
  }, [selectedCountry]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = zoomLevel;
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.0);
    sunLight.position.set(12, 10, 15);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.0);
    rimLight.position.set(-15, -8, -10);
    scene.add(rimLight);

    // 5. Stars Background Particle System
    const starsCount = 450;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 80 - 20;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.25,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Earth Sphere
    const globeRadius = 3.6;
    const earthGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthTexture = createEarthTexture();
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.55,
      metalness: 0.15,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // Atmospheric Glow Ring
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.04, 48, 48);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // Outer Celestial Orbit Ring
    const ringGeometry = new THREE.RingGeometry(globeRadius * 1.35, globeRadius * 1.37, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const orbitRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitRing.rotation.x = Math.PI / 2.3;
    globeGroup.add(orbitRing);

    // 7. Add 3D Country Markers & Landmarks
    pinsRef.current.clear();
    landmarksRef.current.clear();

    WORLD_COUNTRIES.forEach(country => {
      const coords = COUNTRY_COORDINATES[country.id];
      if (!coords) return;

      const pos = latLongToVector3(coords.lat, coords.lon, globeRadius);
      const normal = pos.clone().normalize();
      const isUnlocked = unlockedBadges.includes(country.id);
      const isSelected = selectedCountry?.id === country.id;

      // --- A. Procedural 3D Landmark Model Group ---
      const landmarkData = COUNTRY_LANDMARKS[country.id];
      if (landmarkData) {
        const landmarkGroup = new THREE.Group();
        landmarkGroup.position.copy(pos);
        landmarkGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

        // Procedural 3D Model
        const model3D = buildProceduralLandmark3D(landmarkData);
        landmarkGroup.add(model3D);

        // Billboard sprite floating above the landmark
        const billboard = createLandmarkBillboard(landmarkData, lang);
        billboard.position.set(0, 0.72, 0);
        landmarkGroup.add(billboard);

        // Ground halo aura
        const haloGeom = new THREE.RingGeometry(0.24, 0.38, 16);
        haloGeom.rotateX(-Math.PI / 2);
        const haloMat = new THREE.MeshBasicMaterial({
          color: isSelected ? 0xf59e0b : new THREE.Color(landmarkData.color),
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
        });
        const haloRing = new THREE.Mesh(haloGeom, haloMat);
        landmarkGroup.add(haloRing);

        landmarkGroup.visible = displayMode === 'landmarks';
        globeGroup.add(landmarkGroup);
        landmarksRef.current.set(country.id, landmarkGroup);
      }

      // --- B. Classic Nav Beacon Pin Group ---
      const pinGroup = new THREE.Group();
      pinGroup.position.copy(pos);
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      // Pin stem
      const stemGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
      stemGeom.translate(0, 0.22, 0);
      const stemMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xf59e0b : isUnlocked ? 0x10b981 : 0x3b82f6,
        roughness: 0.3,
        metalness: 0.7,
      });
      const stem = new THREE.Mesh(stemGeom, stemMat);
      pinGroup.add(stem);

      // Pin head sphere
      const headGeom = new THREE.SphereGeometry(0.16, 16, 16);
      headGeom.translate(0, 0.48, 0);
      const headMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xfef08a : isUnlocked ? 0x34d399 : 0x60a5fa,
        emissive: isSelected ? 0xf59e0b : 0x0f172a,
        emissiveIntensity: isSelected ? 0.6 : 0.1,
        roughness: 0.2,
      });
      const head = new THREE.Mesh(headGeom, headMat);
      (head as any).userData = { countryId: country.id };
      pinGroup.add(head);

      // Ground beacon ripple ring
      const beaconGeom = new THREE.RingGeometry(0.12, 0.22, 16);
      beaconGeom.rotateX(-Math.PI / 2);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0xf59e0b : 0x60a5fa,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const beaconRing = new THREE.Mesh(beaconGeom, beaconMat);
      pinGroup.add(beaconRing);

      pinGroup.visible = displayMode === 'beacons';
      globeGroup.add(pinGroup);
      pinsRef.current.set(country.id, pinGroup);
    });

    // 8. Event Handlers for Drag & Raycast Interaction
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      setAutoRotate(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Handle drag rotation
      if (isDraggingRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;

        targetRotationRef.current.y += deltaX * 0.007;
        targetRotationRef.current.x = Math.max(
          -Math.PI / 2.5,
          Math.min(Math.PI / 2.5, targetRotationRef.current.x + deltaY * 0.007)
        );

        previousMousePositionRef.current = { x: clientX, y: clientY };
      }

      // Handle hover raycasting (only for mouse)
      if (!('touches' in e) && container) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const clickableMeshes: THREE.Object3D[] = [];

        // Check active mode meshes
        if (displayMode === 'landmarks') {
          landmarksRef.current.forEach(group => {
            group.traverse(child => {
              if ((child as any).userData?.countryId) {
                clickableMeshes.push(child);
              }
            });
          });
        } else {
          pinsRef.current.forEach(group => {
            group.children.forEach(c => {
              if (c.type === 'Mesh' && (c as any).userData?.countryId) {
                clickableMeshes.push(c);
              }
            });
          });
        }

        const intersects = raycasterRef.current.intersectObjects(clickableMeshes, true);
        if (intersects.length > 0) {
          const hitCountryId = (intersects[0].object as any).userData?.countryId;
          const country = WORLD_COUNTRIES.find(c => c.id === hitCountryId);
          if (country) setHoveredCountry(country);
          container.style.cursor = 'pointer';
        } else {
          setHoveredCountry(null);
          container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
        }
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }

      if (container && !('touches' in e)) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const clickableMeshes: THREE.Object3D[] = [];

        if (displayMode === 'landmarks') {
          landmarksRef.current.forEach(group => {
            group.traverse(child => {
              if ((child as any).userData?.countryId) {
                clickableMeshes.push(child);
              }
            });
          });
        } else {
          pinsRef.current.forEach(group => {
            group.children.forEach(c => {
              if (c.type === 'Mesh' && (c as any).userData?.countryId) {
                clickableMeshes.push(c);
              }
            });
          });
        }

        const intersects = raycasterRef.current.intersectObjects(clickableMeshes, true);
        if (intersects.length > 0) {
          const hitCountryId = (intersects[0].object as any).userData?.countryId;
          const country = WORLD_COUNTRIES.find(c => c.id === hitCountryId);
          if (country) {
            if (soundEnabled) playClickSound();
            onSelectCountry(country);
            const landmark = COUNTRY_LANDMARKS[country.id];
            if (landmark) {
              setActiveSpotlightLandmark(landmark);
            }
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += delta * 0.15;
      }

      // Inertial damping lerp for smooth tactile feel
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = currentRotationRef.current.x;
        globeGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Gentle starfield drift
      starField.rotation.y += delta * 0.015;

      // Pulse pin / landmark ground rings
      const time = clock.getElapsedTime();
      if (displayMode === 'beacons') {
        pinsRef.current.forEach((group, id) => {
          const beacon = group.children[2] as THREE.Mesh;
          if (beacon) {
            const scale = 1 + Math.sin(time * 3 + id.charCodeAt(0)) * 0.25;
            beacon.scale.set(scale, scale, scale);
          }
        });
      } else {
        landmarksRef.current.forEach((group, id) => {
          const halo = group.children[2] as THREE.Mesh;
          if (halo) {
            const scale = 1 + Math.sin(time * 2.5 + id.charCodeAt(0)) * 0.2;
            halo.scale.set(scale, scale, scale);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources strictly
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [unlockedBadges, displayMode, lang]);

  // Handle Zoom change
  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZ = Math.max(7, Math.min(14, cameraRef.current.position.z + delta));
    cameraRef.current.position.z = newZ;
    setZoomLevel(newZ);
  };

  // Sync visibility when displayMode changes without destroying entire canvas
  useEffect(() => {
    landmarksRef.current.forEach(group => {
      group.visible = displayMode === 'landmarks';
    });
    pinsRef.current.forEach(group => {
      group.visible = displayMode === 'beacons';
    });
  }, [displayMode]);

  return (
    <div className="relative w-full rounded-3xl bg-slate-950 border-3 border-slate-900 comic-box overflow-hidden select-none">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-[460px] md:h-[560px] cursor-grab active:cursor-grabbing bg-radial from-slate-900 via-slate-950 to-black"
      />

      {/* Comic Header Overlay & Display Mode Switcher */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 bg-blue-600 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-white shadow-comic flex items-center gap-1.5">
          <Compass size={14} className="animate-spin-slow text-amber-300" />
          <span>{lang === 'fr' ? 'Globe Marin 3D Interactif' : lang === 'zh' ? '3D 互动航海地球仪' : '3D Interactive Mariner Globe'}</span>
        </div>

        {/* Landmarks vs Beacons Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 border-2 border-slate-800 rounded-xl shadow-comic">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setDisplayMode('landmarks');
            }}
            className={`px-2.5 py-1 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 ${
              displayMode === 'landmarks'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 size={13} />
            <span>{lang === 'fr' ? '🏛️ Monuments' : lang === 'zh' ? '🏛️ 标志性建筑' : '🏛️ Landmarks'}</span>
          </button>
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setDisplayMode('beacons');
            }}
            className={`px-2.5 py-1 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 ${
              displayMode === 'beacons'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin size={13} />
            <span>{lang === 'fr' ? '📍 Balises' : lang === 'zh' ? '📍 航海信标' : '📍 Pins'}</span>
          </button>
        </div>
      </div>

      {/* Floating Quick-Jump Landmark / Country Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 px-2 bg-slate-900/85 backdrop-blur-md border-2 border-slate-800 rounded-2xl max-w-full pointer-events-auto scrollbar-none">
          {WORLD_COUNTRIES.map(c => {
            const isSelected = selectedCountry?.id === c.id;
            const isUnlocked = unlockedBadges.includes(c.id);
            const landmark = COUNTRY_LANDMARKS[c.id];

            return (
              <button
                key={c.id}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  onSelectCountry(c);
                  if (landmark) setActiveSpotlightLandmark(landmark);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-comic font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 scale-105 shadow-comic'
                    : isUnlocked
                    ? 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800/80 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={lang === 'zh' ? `${c.nameZh} · ${landmark?.nameZh || ''}` : `${c.nameEn} · ${landmark?.nameEn || ''}`}
              >
                <span>{landmark?.icon || c.flag}</span>
                <span className="hidden md:inline">
                  {lang === 'zh'
                    ? landmark ? (landmark.shortNameZh || landmark.nameZh.split('与')[0].split('(')[0]) : c.nameZh
                    : landmark ? (landmark.shortNameEn || landmark.nameEn.split('&')[0]) : c.nameEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Orbit Controls buttons */}
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(r => !r)}
            className={`p-2 rounded-xl border-2 border-slate-900 font-comic text-xs font-bold shadow-comic transition-all ${
              autoRotate ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-slate-300'
            }`}
            title={autoRotate ? 'Pause Auto-Spin' : 'Auto-Spin Globe'}
          >
            <RotateCw size={15} className={autoRotate ? 'animate-spin-slow' : ''} />
          </button>
          <button
            onClick={() => handleZoom(-1.5)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-900 text-white font-comic text-xs font-bold shadow-comic"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={() => handleZoom(1.5)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-900 text-white font-comic text-xs font-bold shadow-comic"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
        </div>
      </div>

      {/* Hovered Country / Landmark Tooltip Pill */}
      {hoveredCountry && !activeSpotlightLandmark && (
        <div className="absolute top-4 right-4 z-20 pointer-events-none animate-in fade-in zoom-in duration-200">
          <div className="px-3.5 py-2 rounded-2xl bg-amber-300 border-2 border-slate-900 font-comic text-xs font-extrabold text-slate-950 shadow-comic flex items-center gap-2">
            <span className="text-base">{hoveredCountry.flag}</span>
            <span>{lang === 'zh' ? hoveredCountry.nameZh : hoveredCountry.nameEn}</span>
            {COUNTRY_LANDMARKS[hoveredCountry.id] && (
              <span className="text-[11px] text-amber-900 font-bold">
                · {COUNTRY_LANDMARKS[hoveredCountry.id].icon}{' '}
                {lang === 'zh'
                  ? (COUNTRY_LANDMARKS[hoveredCountry.id].shortNameZh || COUNTRY_LANDMARKS[hoveredCountry.id].nameZh.split('与')[0].split('(')[0])
                  : (COUNTRY_LANDMARKS[hoveredCountry.id].shortNameEn || COUNTRY_LANDMARKS[hoveredCountry.id].nameEn.split('&')[0])}
              </span>
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-blue-600 text-white font-sans font-bold">
              {lang === 'fr' ? 'Cliquer pour visiter' : lang === 'zh' ? '点击探索' : 'Click to Visit'}
            </span>
          </div>
        </div>
      )}

      {/* Landmark Spotlight Detail Drawer / Card */}
      {activeSpotlightLandmark && (
        <div className="absolute top-4 right-4 z-30 max-w-sm sm:w-80 bg-white/95 backdrop-blur-md border-3 border-slate-900 rounded-2xl p-4 shadow-comic animate-in fade-in slide-in-from-right-4 duration-200 text-slate-900">
          <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b-2 border-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-3xl drop-shadow-sm">{activeSpotlightLandmark.icon}</span>
              <div>
                <h3 className="font-comic text-base font-extrabold text-slate-900 leading-tight">
                  {lang === 'zh' ? activeSpotlightLandmark.nameZh : activeSpotlightLandmark.nameEn}
                </h3>
                <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <span>📍 {lang === 'zh' ? activeSpotlightLandmark.cityZh : activeSpotlightLandmark.cityEn}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveSpotlightLandmark(null);
              }}
              className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scale & Built Tag */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="px-2 py-0.5 rounded-lg bg-amber-100 border border-amber-400 font-comic text-[10px] font-bold text-amber-900">
              📏 {activeSpotlightLandmark.heightOrScale}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-blue-100 border border-blue-300 font-comic text-[10px] font-bold text-blue-900">
              ⏳ {activeSpotlightLandmark.yearBuilt}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-700 leading-relaxed mb-3">
            {lang === 'zh' ? activeSpotlightLandmark.descZh : activeSpotlightLandmark.descEn}
          </p>

          {/* Architectural Secret ("建筑探秘") Box */}
          <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-amber-300 mb-3">
            <div className="flex items-center gap-1 font-comic text-xs font-bold text-amber-900 mb-1">
              <Sparkles size={12} className="text-amber-600" />
              <span>{lang === 'fr' ? '🌟 Secret d\'architecture' : lang === 'zh' ? '🌟 建筑力学与历史探秘' : '🌟 Architectural Secret'}</span>
            </div>
            <p className="text-[11px] text-amber-950/90 leading-normal">
              {lang === 'zh'
                ? activeSpotlightLandmark.architecturalFactZh
                : activeSpotlightLandmark.architecturalFactEn}
            </p>
          </div>

          {/* Actions: Speak & Visit Country */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                const text =
                  lang === 'zh'
                    ? `${activeSpotlightLandmark.nameZh}。位于${activeSpotlightLandmark.cityZh}。${activeSpotlightLandmark.descZh}。${activeSpotlightLandmark.architecturalFactZh}`
                    : `${activeSpotlightLandmark.nameEn} in ${activeSpotlightLandmark.cityEn}. ${activeSpotlightLandmark.descEn} ${activeSpotlightLandmark.architecturalFactEn}`;
                speakText(text, lang);
              }}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm transition-all"
              title="Read Aloud"
            >
              <Volume2 size={14} className="text-blue-600" />
              <span>{lang === 'fr' ? 'Écouter' : lang === 'zh' ? '朗读' : 'Read'}</span>
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                const country = WORLD_COUNTRIES.find(c => c.id === activeSpotlightLandmark.countryId);
                if (country) onSelectCountry(country);
                setActiveSpotlightLandmark(null);
              }}
              className="flex-1 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-950 flex items-center justify-center gap-1 shadow-comic transition-all"
            >
              <span>{lang === 'fr' ? 'Explorer le pays' : lang === 'zh' ? '前往探索本国' : 'Explore Country'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
