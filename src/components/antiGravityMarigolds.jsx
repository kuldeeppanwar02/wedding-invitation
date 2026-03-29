"use client";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AntiGravityMarigolds({ count = 100 }) {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions, rotations, and speeds for marigolds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5;
            const speed = 0.02 + Math.random() * 0.03;
            const rotationSpeed = (Math.random() - 0.5) * 0.05;
            temp.push({ x, y, z, speed, rotationSpeed });
        }
        return temp;
    }, [count]);

    const geometry = useMemo(() => new THREE.DodecahedronGeometry(0.15, 1), []);
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FF8C00', // Saffron / Orange
        emissive: '#FFB84D', // Slight glow
        emissiveIntensity: 0.2,
        roughness: 0.8,
        metalness: 0.1
    }), []);

    useFrame(() => {
        if (!meshRef.current) return;
        particles.forEach((particle, i) => {
            // Anti-gravity or falling effect
            particle.y -= particle.speed;
            
            // Loop particles back to top
            if (particle.y < -10) {
                particle.y = 10;
                particle.x = (Math.random() - 0.5) * 20;
            }

            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.rotation.x += particle.rotationSpeed;
            dummy.rotation.y += particle.rotationSpeed;
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[geometry, material, count]}>
            <ambientLight intensity={0.5} />
        </instancedMesh>
    );
}