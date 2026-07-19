import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// We build the laptop using raw geometric primitives to avoid loading external 3D models or font JSONs, keeping the bundle lean.
const LaptopGeometry = () => {
  const groupRef = useRef();
  const { pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });

  // Bind the laptop's rotation to mouse movement for a parallax effect.
  useFrame(() => {
    if (!groupRef.current) return;
    target.current.y = pointer.x * 0.25;
    target.current.x = -pointer.y * 0.15;
    
    const targetY = target.current.y - 0.25;
    const targetX = target.current.x + 0.15;
    
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
  });

  const chassisMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1B1B18', roughness: 0.6, metalness: 0.2 }), []);
  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0A0A09', roughness: 0.2, metalness: 0.8 }), []);
  const codeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2F4A3C', roughness: 0.4, metalness: 0.1 }), []);
  const keyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2A2A25', roughness: 0.7, metalness: 0.1 }), []);

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={groupRef}>
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.15, 2.2]} />
          <primitive object={chassisMat} attach="material" />
        </mesh>
        
        <mesh position={[0, -0.02, -0.2]} receiveShadow>
          <boxGeometry args={[2.8, 0.01, 1.0]} />
          <primitive object={keyMat} attach="material" />
        </mesh>

        <mesh position={[0, -0.02, 0.6]} receiveShadow>
          <boxGeometry args={[0.8, 0.01, 0.5]} />
          <primitive object={keyMat} attach="material" />
        </mesh>

        <group position={[0, -0.025, -1.05]} rotation={[-0.25, 0, 0]}>
          <mesh position={[0, 1.0, -0.05]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 2.0, 0.1]} />
            <primitive object={chassisMat} attach="material" />
          </mesh>
          
          <mesh position={[0, 1.0, 0.005]} receiveShadow>
            <boxGeometry args={[3.0, 1.75, 0.01]} />
            <primitive object={screenMat} attach="material" />
          </mesh>

          <mesh position={[-1.0, 1.5, 0.015]}>
            <boxGeometry args={[0.6, 0.04, 0.01]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
          <mesh position={[-0.7, 1.35, 0.015]}>
            <boxGeometry args={[1.2, 0.04, 0.01]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
          <mesh position={[-0.9, 1.2, 0.015]}>
            <boxGeometry args={[0.8, 0.04, 0.01]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
          <mesh position={[-0.8, 1.05, 0.015]}>
            <boxGeometry args={[1.0, 0.04, 0.01]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
          <mesh position={[-1.1, 0.9, 0.015]}>
            <boxGeometry args={[0.4, 0.04, 0.01]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
          
          <mesh position={[1.0, 0.6, 0.015]}>
            <boxGeometry args={[0.5, 0.4, 0.02]} />
            <primitive object={codeMat} attach="material" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const HeroScene = () => {
  return (
    // We use a transparent canvas background to blend seamlessly with the CSS body background.
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#F7F4EE']} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#F7F4EE" />
      <pointLight position={[0, -3, 4]} intensity={0.25} color="#E8E3D9" />

      <Suspense fallback={null}>
        <LaptopGeometry />
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={0.25}
          scale={10}
          blur={2.5}
          far={5}
          color="#1B1B18"
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
