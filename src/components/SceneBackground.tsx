import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

/**
 * A quiet three.js backdrop: a slowly drifting star field plus a single
 * rotating wireframe icosahedron, both in the accent/teal palette at low
 * opacity so they read as depth rather than decoration.
 */
export default function SceneBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Star field
    const STAR_COUNT = 260;
    const positions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x9fc4ff,
      size: 0.16,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Rotating wireframe icosahedron — a quiet nod to "systems" without shouting
    const icoGeometry = new THREE.IcosahedronGeometry(6.5, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb347,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(9, -3, -6);
    scene.add(ico);

    const teal = new THREE.IcosahedronGeometry(3.5, 0);
    const tealMaterial = new THREE.MeshBasicMaterial({
      color: 0x2fb6a8,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const tealMesh = new THREE.Mesh(teal, tealMaterial);
    tealMesh.position.set(-11, 6, -8);
    scene.add(tealMesh);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let frameId = 0;
    let visible = document.visibilityState === "visible";
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && !reducedMotion) tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (!visible || reducedMotion) return;
      stars.rotation.y += 0.00025;
      ico.rotation.x += 0.0012;
      ico.rotation.y += 0.0016;
      tealMesh.rotation.x -= 0.001;
      tealMesh.rotation.y += 0.0009;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    // Always render one static frame, even with reduced motion.
    renderer.render(scene, camera);
    if (!reducedMotion) tick();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      starGeometry.dispose();
      starMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      teal.dispose();
      tealMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
