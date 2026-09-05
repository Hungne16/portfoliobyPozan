'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { BufferGeometry } from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingWorld() {
  const host = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!nearby) return;
    let disposed = false;
    let teardown: (() => void) | undefined;
    void import('three')
      .then((THREE) => {
        if (disposed || !host.current) return;
        const container = host.current;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'low-power',
          });
        } catch {
          return;
        } // Static portfolio remains complete without WebGL.
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.z = 12;
        scene.add(new THREE.AmbientLight(0xffffff, 2));
        const sun = new THREE.DirectionalLight(0xfff5e8, 3);
        sun.position.set(-3, 5, 8);
        scene.add(sun);
        const geometries = new Set<BufferGeometry>();
        const materials = new Set<InstanceType<typeof THREE.Material>>();
        const ink = new THREE.MeshBasicMaterial({
          color: 0x20241f,
          side: THREE.BackSide,
        });
        materials.add(ink);
        const model = (geometry: BufferGeometry, color: number) => {
          geometries.add(geometry);
          const material = new THREE.MeshToonMaterial({ color });
          materials.add(material);
          const group = new THREE.Group();
          group.add(new THREE.Mesh(geometry, material));
          const outline = new THREE.Mesh(geometry, ink);
          outline.scale.setScalar(1.045);
          group.add(outline);
          scene.add(group);
          return group;
        };
        const shape = new THREE.Shape();
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5 + Math.PI / 2;
          const radius = i % 2 ? 0.35 : 0.8;
          if (i === 0)
            shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        shape.closePath();
        const starGeometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.22,
          bevelEnabled: true,
          bevelSize: 0.07,
          bevelThickness: 0.06,
          bevelSegments: 2,
          steps: 1,
        });
        starGeometry.center();
        const star = model(starGeometry, 0xef654c);
        const ring = model(
          new THREE.TorusGeometry(0.52, 0.15, 8, 40),
          0x83b9d3,
        );
        // Folded paper plane: four triangular faces, modeled locally without remote assets.
        const planeGeometry = new THREE.BufferGeometry();
        planeGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            [
              0, 0.95, 0, -0.8, -0.5, 0, 0, -0.25, 0.18, 0, 0.95, 0, 0, -0.25,
              0.18, 0.8, -0.5, 0, 0, 0.95, 0, 0, -0.65, -0.18, -0.8, -0.5, 0, 0,
              0.95, 0, 0.8, -0.5, 0, 0, -0.65, -0.18,
            ],
            3,
          ),
        );
        planeGeometry.computeVertexNormals();
        const plane = model(planeGeometry, 0xf3d27b);
        const models = [star, ring, plane];
        const cameraModel = new THREE.Group();
        scene.add(cameraModel);
        const part = (
          geometry: BufferGeometry,
          color: number,
          x = 0,
          y = 0,
          z = 0,
        ) => {
          const mesh = model(geometry, color);
          cameraModel.add(mesh);
          mesh.position.set(x, y, z);
          return mesh;
        };
        part(new THREE.BoxGeometry(2.45, 1.5, 0.75), 0xf6eed8);
        part(new THREE.BoxGeometry(2.5, 0.65, 0.8), 0xdf5746, 0, -0.17, 0);
        part(new THREE.BoxGeometry(0.65, 0.32, 0.6), 0x26352e, -0.45, 0.87, 0);
        part(
          new THREE.BoxGeometry(0.45, 0.23, 0.07),
          0xaad6dc,
          -0.45,
          0.88,
          0.35,
        );
        const barrel = part(
          new THREE.CylinderGeometry(0.62, 0.62, 0.5, 32),
          0x293931,
          0.2,
          0,
          0.57,
        );
        barrel.rotation.x = Math.PI / 2;
        part(
          new THREE.TorusGeometry(0.47, 0.065, 8, 40),
          0xf3d27b,
          0.2,
          0,
          0.85,
        );
        const lens = part(
          new THREE.CylinderGeometry(0.41, 0.41, 0.055, 32),
          0x457d91,
          0.2,
          0,
          0.85,
        );
        lens.rotation.x = Math.PI / 2;
        part(new THREE.SphereGeometry(0.1, 12, 8), 0xd0f0f0, 0.07, 0.15, 0.9);
        part(
          new THREE.CylinderGeometry(0.16, 0.16, 0.16, 16),
          0xdf5746,
          0.85,
          0.83,
          0,
        );
        part(
          new THREE.BoxGeometry(0.38, 0.22, 0.04),
          0xf6d77d,
          -0.88,
          0.37,
          0.41,
        );
        const scroll = { progress: 0 };
        let frame = 0;
        let available = true;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const render = () => {
          frame = 0;
          if (disposed || !available || document.hidden) return;
          const p = reduced.matches ? 0 : scroll.progress;
          const edge =
            Math.tan(THREE.MathUtils.degToRad(17.5)) * 12 * camera.aspect;
          const scale = 0.38;
          cameraModel.scale.setScalar(Math.min(1.45, edge / 1.8));
          cameraModel.rotation.set(
            0.15 + p * 0.18,
            -0.5 + p * 1.0,
            -0.08 + p * 0.16,
          );
          cameraModel.position.y = Math.sin(p * Math.PI) * 0.35;
          star.position.set(edge * 0.7, 1.65 - p * 0.9, 0);
          ring.position.set(-edge * 0.7, -1.3 + p * 0.8, -0.5);
          plane.position.set(edge * 0.65, -1.8 + p * 0.5, -1);
          models.forEach((object, i) => {
            object.scale.setScalar(scale * (i === 2 ? 0.9 : 1));
            object.rotation.set(
              0.2 + p * (i + 1),
              0.35 + p * Math.PI * (i % 2 ? -2 : 2),
              (i - 1) * 0.35 + p * 1.8,
            );
          });
          renderer.render(scene, camera);
          container.classList.add('scene-ready');
        };
        const requestRender = () => {
          if (!frame && !disposed && available && !document.hidden)
            frame = requestAnimationFrame(render);
        };
        const resize = () => {
          width = container.clientWidth;
          height = container.clientHeight;
          camera.aspect = width / Math.max(1, height);
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, width < 700 ? 1 : 1.5),
          );
          renderer.setSize(width, height);
          requestRender();
        };
        const ctx = gsap.context(() => {
          gsap.to(scroll, {
            progress: 1,
            ease: 'none',
            onUpdate: requestRender,
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              onRefresh: requestRender,
            },
          });
        }, container);
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        const lost = (event: Event) => {
          event.preventDefault();
          available = false;
          container.style.visibility = 'hidden';
        };
        const restored = () => {
          available = true;
          container.style.visibility = '';
          resize();
        };
        renderer.domElement.addEventListener('webglcontextlost', lost);
        renderer.domElement.addEventListener('webglcontextrestored', restored);
        document.addEventListener('visibilitychange', requestRender);
        reduced.addEventListener('change', requestRender);
        resize();
        teardown = () => {
          ctx.revert();
          cancelAnimationFrame(frame);
          observer.disconnect();
          document.removeEventListener('visibilitychange', requestRender);
          reduced.removeEventListener('change', requestRender);
          renderer.domElement.removeEventListener('webglcontextlost', lost);
          renderer.domElement.removeEventListener(
            'webglcontextrestored',
            restored,
          );
          geometries.forEach((geometry) => geometry.dispose());
          materials.forEach((material) => material.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* Optional 3D must not prevent access to the portfolio. */
      });
    return () => {
      disposed = true;
      teardown?.();
    };
  }, [nearby]);
  return (
    <figure className="studio-scene">
      <div className="studio-caption">
        <span>STUDIO OBJECT / 01</span>
        <span>観察する</span>
      </div>
      <div ref={host} className="floating-world" aria-hidden="true">
        <div className="scene-fallback">
          SORA
          <br />
          <span>A different point of view.</span>
        </div>
      </div>
      <figcaption>Nhìn điều quen thuộc, bằng một góc nhìn mới.</figcaption>
    </figure>
  );
}
