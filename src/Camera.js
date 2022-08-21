import lerp from "@14islands/lerp";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * TODO: Get dynamic value
 * I should get these values dynamically from the position of the mesh
 * using control-camera lib to get the position of each mesh.
 */
const blockPositions = {
  spaceBar: [-0.9, -3, 2],
  kitchen: [-0.7, -3.2, 1.2],
  oneRagTime: [0.5, -3, 1.2],
  openSpace: [1, -2, 1.8],
  classes: [1.4, 1.4, 1.8],
  theOffice: [0, 3.4, 0.5],
  default: [1, -1, 4],
};

export function Camera({ block }) {
  let blockPosition = blockPositions[block];
  console.log(blockPosition);

  const cam = useRef();
  useFrame(({ mouse }, delta) => {
    cam.current.position.y = lerp(
      cam.current.position.y + mouse.y * 0.001,
      blockPosition[0],
      0.01,
      delta
    );
    cam.current.position.x = lerp(
      cam.current.position.x + mouse.x * 0.001,
      blockPosition[1],
      0.01,
      delta
    );
    cam.current.position.z = lerp(
      cam.current.position.z,
      blockPosition[2],
      0.01,
      delta
    );
    cam.current.lookAt(0, 0, 0);
    cam.current.updateProjectionMatrix();
  });
  return (
    <PerspectiveCamera
      ref={cam}
      makeDefault
      position={[0, 14, 6]}
      fov={45}
      near={1}
      far={40}
      onUpdate={(s) => {
        s.lookAt(0, 0, 0);
        s.updateProjectionMatrix();
      }}
    />
  );
}
