import * as THREE from "three";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import lerp from "@14islands/lerp";
import {
  MeshReflectorMaterial,
  Text,
  useTexture,
  PerspectiveCamera,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import Overlay from "./Overlay";
import { Model } from "./Harbour.space";
import { DialogModal } from "./DialogModal";

function VideoText({ clicked, ...props }) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/H.STour.mp4",
      crossOrigin: "Anonymous",
      loop: true,
    })
  );
  video.muted = true;
  useEffect(() => {
    if (clicked) video.play();
  }, [video, clicked]);
  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      H.S.
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}
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

function Camera({ block }) {
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

function Ground() {
  const floor = useTexture("TexturesCom_Asphalt_Base11_header.jpg");
  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial map={floor} />
    </mesh>
  );
}

function Intro({ start, set }) {
  useEffect(() => {
    setTimeout(() => set(true), 500);
  }, [set]);
  return useFrame((state) => {
    if (start) {
      state.camera.lookAt(0, 0, 0);
    }
  });
}

export default function App() {
  const [currentBlock, setCurrentBlock] = useState("default");

  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const store = { clicked, setClicked, ready, setReady };
  return (
    <>
      <DialogModal block={currentBlock} setBlock={setCurrentBlock} />

      <Canvas gl={{ alpha: false }}>
        <color attach="background" args={["#111111"]} />
        <fog color="#111111" attach="fog" near={5} far={8.6} />
        <Camera block={currentBlock} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VideoText {...store} position={[0, 1.3, -2]} />
            <Model
              setCurrentBlock={setCurrentBlock}
              start={ready && clicked}
              position={[-2, 0, 0.6]}
              scale={[0.1, 0.1, 0.1]}
            />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          <Intro start={ready && clicked} set={setReady} />
          <OrbitControls />
        </Suspense>
        <Environment path={"/"} files={"moonless_golf_2k.hdr"} />
      </Canvas>
      <Overlay {...store} />
    </>
  );
}
