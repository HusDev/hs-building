import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Overlay from "./Overlay";
import { Model } from "./Harbour.space";
import { DialogModal } from "./DialogModal";
import { VideoText } from "./VideoText";
import { Camera } from "./Camera";
import { Ground } from "./Ground";
import { Intro } from "./Intro";

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
