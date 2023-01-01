import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";
import { useRef } from "react";

// LEGO
// https://github.com/nicmosc/brick-builder

export default function Experience() {
  const cube = useRef();

  const model = useGLTF("./hamburger.glb");
  console.log("model", model);
  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (e) => {
    console.log(e);
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);

    console.log("");
  };
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <primitive
        object={model.scene}
        scale={0.2}
        position-x={0}
        position-z={0}
        position-y={-1}
        onClick={(e) => {
          console.log("object", e.object); // single mesh
          console.log("event object", e.eventObject); // group
        }}
      />

      {/* Sphere */}
      <mesh position-x={-3} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
      </mesh>

      {/* Cube */}
      <mesh
        ref={cube}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        raycast={meshBounds}
        onClick={eventHandler}
        position-x={3}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>
    </>
  );
}
