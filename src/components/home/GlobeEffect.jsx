"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleGlobe = () => {
  const pointsRef = useRef();
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseVec = useMemo(() => new THREE.Vector2(), []);
  const hitSphere = useMemo(() => {
    const geo = new THREE.SphereGeometry(2.2, 16, 16);
    const mat = new THREE.MeshBasicMaterial();
    return new THREE.Mesh(geo, mat);
  }, []);
  const hoveredRef = useRef(false);

  // Generate particles on a sphere
  const count = 20000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const radius = 1.75;
    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#002bba') },
    uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
    uHoverIntensity: { value: 0 },
  }), []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const { clock } = state;
    uniforms.uTime.value = clock.elapsedTime;

    // Manual raycast: check if mouse is over the globe sphere
    mouseVec.set(mouse.current.x, mouse.current.y);
    raycaster.setFromCamera(mouseVec, state.camera);
    const intersects = raycaster.intersectObject(hitSphere);
    hoveredRef.current = intersects.length > 0;

    // Smoothly lerp hover intensity uniform (0 → 1)
    const targetIntensity = hoveredRef.current ? 1 : 0;
    uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(uniforms.uHoverIntensity.value, targetIntensity, 0.08);

    if (pointsRef.current && groupRef.current) {
      // Speed multiplier: idle=0.15, hovered=0.6
      const speed = THREE.MathUtils.lerp(0.15, 0.6, uniforms.uHoverIntensity.value);
      targetRotation.current.y += delta * speed;

      // Mouse influence: 0 when not hovering globe, 1 when hovering
      const mouseFactor = uniforms.uHoverIntensity.value;
      targetRotation.current.x = mouse.current.y * 0.5 * mouseFactor;
      const finalTargetY = targetRotation.current.y + mouse.current.x * 0.8 * mouseFactor;

      // Smooth lerp for x and y rotation — apply to group so invisible sphere rotates too
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, finalTargetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={`
          uniform float uTime;
          uniform float uPixelRatio;
          uniform float uHoverIntensity;
          varying vec3 vPos;
          
          // 3D Simplex noise
          vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
          float snoise(vec3 v){
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            i = mod(i, 289.0 );
            vec4 p = permute( permute( permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

            vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                          dot(p2,x2), dot(p3,x3) ) );
          }

          void main() {
            vec3 pos = position;
            
            // Calculate wobble noise – 30% increase on hover
            float noiseFreq = 1.0;
            float noiseAmp = mix(0.4, 0.52, uHoverIntensity);
            float timeSpeed = mix(1.0, 1.3, uHoverIntensity);
            vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2 * timeSpeed, pos.y * noiseFreq + uTime * 0.3 * timeSpeed, pos.z * noiseFreq);
            float noise = snoise(noisePos) * noiseAmp;
            
            // Displace along the normal (which is just normalize(pos) for a sphere at origin)
            vec3 dir = normalize(pos);
            pos += dir * noise;
            
            vPos = pos;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Adjust point size based on distance and device pixel ratio for crispness
            gl_PointSize = 3.5 * uPixelRatio * (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
          fragmentShader={`
          uniform vec3 uColor;
          varying vec3 vPos;
          
          void main() {
            // Circle shape for points
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            // Soft edge
            float alpha = smoothstep(0.5, 0.1, dist);
            
            // Depth-based opacity for 3D feel without losing the solid color
            float depthAlpha = clamp((vPos.z + 2.0) / 4.0, 0.4, 1.0);
            
            gl_FragColor = vec4(uColor, alpha * depthAlpha);
          }
        `}
        />
      </points>
    </group>
  );
};

export default function GlobeEffect() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleGlobe />
      </Canvas>
    </div>
  );
}
