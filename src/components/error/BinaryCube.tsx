import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const BinaryCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRefs = useRef<THREE.Group[]>([]);

  // Generate random binary numbers
  const binaryNumbers = useMemo(() => {
    return Array.from({ length: 8 }, () => 
      Math.random().toString(2).substring(2, 6)
    );
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }

    textRefs.current.forEach((group, index) => {
      if (group) {
        group.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
      }
    });
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#0f172a" 
          wireframe 
          wireframeLinewidth={2}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {binaryNumbers.map((binary, index) => (
        <group 
          key={index} 
          ref={(el) => el && (textRefs.current[index] = el)}
          position={[
            (index % 2) * 1.2 - 0.6,
            Math.floor(index / 2) * 1.2 - 0.6,
            (index % 3) * 1.2 - 0.6
          ]}
        >
          <Center>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.2}
              height={0.05}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {binary}
              <meshStandardMaterial 
                color="#3b82f6" 
                emissive="#3b82f6"
                emissiveIntensity={0.5}
              />
            </Text3D>
          </Center>
        </group>
      ))}
    </group>
  );
};

export default BinaryCube; 