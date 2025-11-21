import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SENSORY_CONFIGS, NAV_ITEMS, MANIFESTO_TEXT } from '../constants';
import { AtmosphereMode } from '../types';

interface BubbleSystemProps {
  mode: AtmosphereMode;
}

const BubbleSystem: React.FC<BubbleSystemProps> = ({ mode }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
        {/* Central Manifesto Bubble */}
        <CentralBubble mode={mode} />
        
        {/* Orbiting Categories */}
        <SolarSystem mode={mode} />
    </group>
  );
};

const CentralBubble: React.FC<{ mode: AtmosphereMode }> = ({ mode }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { mouse, viewport } = useThree();
    
    const config = SENSORY_CONFIGS[mode];
    
    useFrame((state) => {
        if (meshRef.current) {
            // Mouse influence
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            
            // Look gently at mouse
            meshRef.current.lookAt(x, y, 5);
            
            // Pulse scale
            const breath = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            const targetScale = hovered ? 2.2 : 2.0;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale + breath, targetScale + breath, targetScale + breath), 0.05);
        }
    });

    return (
        <group>
             <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh 
                    ref={meshRef} 
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color={config.color}
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={config.metalness}
                        roughness={config.roughness}
                        distort={hovered ? config.distort * 1.5 : config.distort}
                        speed={hovered ? config.speed * 2 : config.speed}
                        transparent
                        opacity={0.6}
                        transmission={0.5}
                    />
                </mesh>
            </Float>
            
            {/* Floating Manifesto Text - Front Layer */}
            <group position={[0, 0, 2.2]}>
                 <Text
                    color="black"
                    fontSize={0.12}
                    maxWidth={2}
                    lineHeight={1.4}
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={0.8}
                 >
                    {MANIFESTO_TEXT}
                 </Text>
            </group>
        </group>
    );
};

const SolarSystem: React.FC<{ mode: AtmosphereMode }> = ({ mode }) => {
    const groupRef = useRef<THREE.Group>(null);
    const config = SENSORY_CONFIGS[mode];

    useFrame((state) => {
        if (groupRef.current) {
            // Rotate entire system slowly
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {NAV_ITEMS.map((item, i) => (
                <OrbitingBubble 
                    key={i} 
                    item={item} 
                    config={config}
                    index={i}
                />
            ))}
        </group>
    );
};

const OrbitingBubble: React.FC<{ 
    item: typeof NAV_ITEMS[0]; 
    config: typeof SENSORY_CONFIGS['SILENCE']; 
    index: number 
}> = ({ item, config, index }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const containerRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        
        if (containerRef.current) {
            // Orbital mechanics
            const angle = t * item.orbitSpeed + (index * (Math.PI * 2) / NAV_ITEMS.length);
            const x = Math.cos(angle) * item.orbitRadius;
            const z = Math.sin(angle) * item.orbitRadius;
            
            containerRef.current.position.set(x, item.yOffset + Math.sin(t + index) * 0.5, z);
            
            // Billboard effect for the container so text always faces front relative to the container
            // Actually we want the bubble to stay 3D but text to face cam.
        }
    });

    return (
        <group ref={containerRef}>
            <mesh 
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[item.scale, 32, 32]} />
                <MeshDistortMaterial
                    color={config.color}
                    speed={config.speed}
                    distort={hovered ? 0.8 : 0.3}
                    roughness={0.2}
                    metalness={0.5}
                    transparent
                    opacity={0.8}
                    transmission={0.2}
                />
            </mesh>
            
            {/* Label */}
            <group position={[0, item.scale + 0.2, 0]}>
                 <BillboardText label={item.label} sub={item.description} hovered={hovered} />
            </group>
        </group>
    );
};

const BillboardText: React.FC<{ label: string; sub?: string; hovered: boolean }> = ({ label, sub, hovered }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ camera }) => {
        if(ref.current) {
            ref.current.lookAt(camera.position);
        }
    })

    return (
        <group ref={ref}>
            <Text
                color="black"
                fontSize={0.3}
                anchorX="center"
                anchorY="bottom"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
                {label}
            </Text>
            <Text
                position={[0, -0.15, 0]}
                color="black"
                fontSize={0.12}
                anchorX="center"
                anchorY="top"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                fillOpacity={hovered ? 0.6 : 0}
            >
                {sub}
            </Text>
        </group>
    )
}

export default BubbleSystem;