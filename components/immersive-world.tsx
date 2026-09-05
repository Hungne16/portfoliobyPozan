'use client';

import { useEffect, useRef } from 'react';

export default function ImmersiveWorld() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void import('three').then((THREE) => {
      if (disposed || !host.current) return;
      const container = host.current;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch {
        return;
      }

      renderer.setClearColor(0x090a12, 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x090a12);
      scene.fog = new THREE.FogExp2(0x090a12, 0.045);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
      camera.position.set(0, 0, 15);

      const world = new THREE.Group();
      world.rotation.x = -0.12;
      scene.add(world);

      const materials: InstanceType<typeof THREE.Material>[] = [];
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const toon = (color: number, emissive = 0x000000) => {
        const material = new THREE.MeshToonMaterial({ color, emissive });
        materials.push(material);
        return material;
      };
      const geo = <T extends InstanceType<typeof THREE.BufferGeometry>>(
        g: T,
      ) => {
        geometries.push(g);
        return g;
      };

      scene.add(new THREE.HemisphereLight(0xdde5ff, 0x34182c, 2.4));
      const key = new THREE.DirectionalLight(0xffe8ce, 4.5);
      key.position.set(-7, 9, 11);
      scene.add(key);
      const rim = new THREE.PointLight(0x85bfff, 45, 30);
      rim.position.set(7, 1, 4);
      scene.add(rim);
      const pink = new THREE.PointLight(0xff477e, 35, 24);
      pink.position.set(-6, -4, 3);
      scene.add(pink);

      const moon = new THREE.Mesh(
        geo(new THREE.SphereGeometry(3.15, 64, 48)),
        toon(0xd8e5ff, 0x16213d),
      );
      world.add(moon);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xacc8ff,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      materials.push(haloMaterial);
      const halo = new THREE.Mesh(
        geo(new THREE.TorusGeometry(4.1, 0.035, 8, 160)),
        haloMaterial,
      );
      halo.rotation.x = 1.18;
      halo.rotation.y = 0.25;
      world.add(halo);
      const haloTwo = halo.clone();
      haloTwo.scale.setScalar(1.22);
      haloTwo.rotation.x = 0.8;
      haloTwo.rotation.z = 0.45;
      world.add(haloTwo);

      const island = new THREE.Group();
      island.position.set(0, -2.45, 2.2);
      island.rotation.z = -0.06;
      world.add(island);
      const top = new THREE.Mesh(
        geo(new THREE.CylinderGeometry(2.85, 2.55, 0.5, 9)),
        toon(0x314d49),
      );
      island.add(top);
      const underside = new THREE.Mesh(
        geo(new THREE.ConeGeometry(2.5, 3.4, 9)),
        toon(0x151b29),
      );
      underside.position.y = -1.85;
      underside.rotation.x = Math.PI;
      island.add(underside);

      const torii = new THREE.Group();
      torii.position.set(0, 0.55, 0.15);
      island.add(torii);
      const red = toon(0xff4f58, 0x260208);
      const dark = toon(0x171827);
      const addBox = (
        size: [number, number, number],
        pos: [number, number, number],
        material = red,
      ) => {
        const mesh = new THREE.Mesh(
          geo(new THREE.BoxGeometry(...size)),
          material,
        );
        mesh.position.set(...pos);
        torii.add(mesh);
        return mesh;
      };
      addBox([0.26, 2.7, 0.3], [-1.05, 0, 0]);
      addBox([0.26, 2.7, 0.3], [1.05, 0, 0]);
      addBox([2.9, 0.28, 0.38], [0, 1.22, 0]);
      const roof = addBox([3.35, 0.22, 0.48], [0, 1.58, 0], dark);
      roof.rotation.z = 0.015;

      const lanternMaterial = toon(0xffcb75, 0x6d2600);
      for (const x of [-1.8, 1.8]) {
        const lantern = new THREE.Mesh(
          geo(new THREE.SphereGeometry(0.22, 12, 8)),
          lanternMaterial,
        );
        lantern.position.set(x, 0.2, 0.45);
        island.add(lantern);
      }

      const satellites = new THREE.Group();
      world.add(satellites);
      const shapes = [
        [new THREE.IcosahedronGeometry(0.55, 0), 0xffcf73, [-5.2, 1.8, -0.8]],
        [new THREE.OctahedronGeometry(0.62, 0), 0xff6486, [4.8, 2.3, -1.5]],
        [
          new THREE.TorusKnotGeometry(0.42, 0.13, 48, 8),
          0x8de4df,
          [4.6, -2.9, 0],
        ],
      ] as const;
      shapes.forEach(([geometry, color, position]) => {
        const mesh = new THREE.Mesh(geo(geometry), toon(color));
        mesh.position.set(position[0], position[1], position[2]);
        satellites.add(mesh);
      });

      let seed = 19;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const starCount = window.innerWidth < 700 ? 420 : 900;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const radius = 12 + random() * 24;
        const angle = random() * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (random() - 0.5) * 26;
        positions[i * 3 + 2] = Math.sin(angle) * radius - 8;
      }
      const starGeometry = geo(new THREE.BufferGeometry());
      starGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
      const starMaterial = new THREE.PointsMaterial({
        color: 0xdce6ff,
        size: window.innerWidth < 700 ? 0.055 : 0.035,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });
      materials.push(starMaterial);
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      const petals = new THREE.Group();
      const petalMaterial = toon(0xff90ad);
      for (let i = 0; i < 28; i++) {
        const petal = new THREE.Mesh(
          geo(new THREE.SphereGeometry(0.07 + random() * 0.05, 6, 4)),
          petalMaterial,
        );
        petal.scale.set(1.9, 0.45, 0.8);
        petal.userData.phase = random() * Math.PI * 2;
        petal.position.set(
          (random() - 0.5) * 14,
          (random() - 0.5) * 9,
          (random() - 0.5) * 8,
        );
        petals.add(petal);
      }
      scene.add(petals);

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      let scrollProgress = 0;
      let raf = 0;
      let last = performance.now();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onPointer = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      const onScroll = () => {
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - innerHeight,
        );
        scrollProgress = scrollY / max;
      };
      const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / Math.max(1, height);
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(
          Math.min(devicePixelRatio, width < 700 ? 1 : 1.5),
        );
        renderer.setSize(width, height, false);
      };

      const render = (now: number) => {
        raf = requestAnimationFrame(render);
        if (document.hidden) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const p = reduced.matches ? 0 : scrollProgress;
        pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.4);
        pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.4);

        world.rotation.y = p * Math.PI * 2.2 + pointer.x * 0.09;
        world.rotation.z = Math.sin(p * Math.PI * 3) * 0.15;
        world.position.y = Math.sin(p * Math.PI * 2) * 0.75 - p * 0.9;
        world.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.25);
        camera.position.x =
          Math.sin(p * Math.PI * 2.4) * 2.5 + pointer.x * 0.45;
        camera.position.y =
          0.25 + Math.cos(p * Math.PI * 2) * 0.8 - pointer.y * 0.35;
        camera.position.z = 15 - Math.sin(p * Math.PI) * 3.1;
        camera.lookAt(0, -0.2 + p * -0.8, 0);
        halo.rotation.z += dt * 0.09;
        haloTwo.rotation.z -= dt * 0.055;
        satellites.children.forEach((object, i) => {
          object.rotation.x += dt * (0.25 + i * 0.08);
          object.rotation.y += dt * (0.38 + i * 0.1);
        });
        petals.children.forEach((petal, i) => {
          const phase = petal.userData.phase as number;
          petal.position.y -= dt * (0.3 + (i % 4) * 0.08);
          petal.position.x += Math.sin(now * 0.0008 + phase) * dt * 0.3;
          petal.rotation.z += dt * 0.7;
          if (petal.position.y < -6) petal.position.y = 6;
        });
        stars.rotation.y = now * 0.000012 + p * 0.5;
        const deep = new THREE.Color(0x090a12);
        const violet = new THREE.Color(0x180d22);
        scene.background = deep
          .clone()
          .lerp(violet, Math.sin(p * Math.PI) * 0.65);
        if (scene.fog) scene.fog.color.copy(scene.background);
        renderer.render(scene, camera);
        container.classList.add('is-ready');
      };

      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', resize);
      onScroll();
      resize();
      raf = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', resize);
        geometries.forEach((item) => item.dispose());
        materials.forEach((item) => item.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={host} className="immersive-world" aria-hidden="true">
      <div className="world-fallback">
        <span>夢</span>
      </div>
    </div>
  );
}
