import React, { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { Html } from "@react-three/drei";

export function Model(props) {
  const { setCurrentBlock } = props;

  const { nodes, materials } = useGLTF("/Harbour.Space.glb");
  const spaceBarMesh = useRef();

  const [currentFloor, setCurrentFloor] = useState(-1);

  function toggleColor(floorNum) {
    if (floorNum === currentFloor) {
      setCurrentFloor(0);
    } else {
      setCurrentFloor(floorNum);
    }
  }
  // use texture
  const buildingTexture = useTexture("/Concrete.jpg");

  const BLOOM_COLOR = [4, 0.5, 3];

  return (
    <group {...props} dispose={null}>
      <group position={[11.82, -0.16, -2.13]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body002.geometry}
          material={materials["light_f.003"]}
          position={[0, 0.41, -1.51]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BackLights001.geometry}
          material={materials["Light.002"]}
          position={[0, 0.76, -1.58]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body004.geometry}
          material={materials["Material.010"]}
          position={[0, 0.86, 0.03]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BackRight.geometry}
          material={materials["rubber.003"]}
          position={[-0.52, 0.25, -0.99]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BackLeft.geometry}
          material={materials["rubber.003"]}
          position={[0.52, 0.25, -0.99]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontLights.geometry}
          material={materials["Light.002"]}
          position={[-0.01, 0.43, 1.53]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontLeft.geometry}
          material={materials["rubber.003"]}
          position={[0.52, 0.25, 1.11]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontRight.geometry}
          material={materials["rubber.003"]}
          position={[-0.52, 0.25, 1.12]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BackMiddleSeat.geometry}
          material={materials["gray.003"]}
          position={[0, 0.61, -0.26]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body001.geometry}
          material={materials["gray.003"]}
          position={[0, 0.56, 0.14]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FrontMiddleSeat.geometry}
          material={materials["gray.003"]}
          position={[0, 0.48, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mirror.geometry}
          material={materials["gray.003"]}
          position={[0, 0.95, 0.42]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
          material={materials["gray.003"]}
          position={[0, 0.7, 0.6]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stear.geometry}
          material={materials["gray.003"]}
          position={[0.27, 0.69, 0.52]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body003.geometry}
          material={materials["body.003"]}
          position={[0, 0.63, 0.26]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.body005.geometry}
          material={materials["glassgray.003"]}
          position={[0, 0.89, 0.52]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses2nd.geometry}
        material={materials["Material.010"]}
        position={[5, 3, 0.02]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses3rd.geometry}
        material={materials["Material.010"]}
        position={[7.98, 4.99, 0.02]}
      />

      {/* Floors with glasses */}
      <mesh
        ref={spaceBarMesh}
        castShadow
        receiveShadow
        geometry={nodes.SpaceBar.geometry}
        material={nodes.SpaceBar.material}
        position={[4, 0.98, -0.24]}
      >
        {/* <meshStandardMaterial attach="material" color={'purple'} /> */}
        <meshBasicMaterial
          attach="material"
          color={currentFloor === 1 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
          toneMapped={false}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(1);
              setCurrentBlock("spaceBar");
            }}
          >
            <b>Space.Bar</b>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses1st.geometry}
        material={materials["Material.010"]}
        position={[4, 1, 0.02]}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kitchen.geometry}
        material={nodes.kitchen.material}
        position={[4.12, 2.98, -0.31]}
      >
        <meshStandardMaterial
          attach="material"
          color={currentFloor === 2 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(2);
              setCurrentBlock("kitchen");
            }}
          >
            <b>Kitchen</b>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor3.geometry}
        material={nodes.Floor3.material}
        position={[4.36, 4.98, -0.39]}
      >
        <meshStandardMaterial attach="material" map={buildingTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor4.geometry}
        material={nodes.Floor4.material}
        position={[4.71, 7, -0.46]}
      >
        <meshStandardMaterial attach="material" map={buildingTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor5.geometry}
        material={nodes.Floor5.material}
        position={[5.16, 8.98, -0.53]}
      >
        <meshStandardMaterial attach="material" map={buildingTexture} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses4th.geometry}
        material={materials["Material.010"]}
        position={[10.97, 7, 0.02]}
      />

      {/* ===== Sixth Floor ===== */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.OpenSpace.geometry}
        material={nodes.OpenSpace.material}
        position={[7.28, 11.52, -1.15]}
        scale={[0.44, 1, 1]}
      >
        <meshStandardMaterial
          attach="material"
          color={currentFloor === 6.2 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(6.2);
              setCurrentBlock("openSpace");
            }}
          >
            <b>Open Space</b>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Onerangtime.geometry}
        material={nodes.Onerangtime.material}
        position={[0.94, 11.52, -1.15]}
        scale={[0.13, 1, 1]}
      >
        <meshStandardMaterial
          attach="material"
          color={currentFloor === 6.1 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(6.1);
              setCurrentBlock("oneRagTime");
            }}
          >
            <b>OneRagTime</b>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Classes.geometry}
        material={nodes.Classes.material}
        position={[20.25, 11.52, -1.15]}
        scale={[0.31, 1, 1]}
      >
        <meshStandardMaterial
          attach="material"
          color={currentFloor === 6.3 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(6.3);
              setCurrentBlock("classes");
            }}
          >
            <b>Classes</b>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TheOffice.geometry}
        material={nodes.TheOffice.material}
        position={[28.72, 11.52, -1.15]}
        scale={[0.12, 1, 1]}
      >
        <meshStandardMaterial
          attach="material"
          color={currentFloor === 6.4 ? BLOOM_COLOR : "white"}
          map={buildingTexture}
          toneMapped={false}
        />
        <Html>
          <div
            className="content"
            onClick={() => {
              toggleColor(6.4);
              setCurrentBlock("theOffice");
            }}
          >
            <b>The Office</b>
          </div>
        </Html>
      </mesh>

      {/* ===== Sixth Floor ===== */}

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses5th.geometry}
        material={materials["Material.010"]}
        position={[13.96, 9.03, 0.02]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Glasses6th.geometry}
        material={materials["Material.010"]}
        position={[15.96, 12.44, 0]}
      />

      <group>
        <meshStandardMaterial attach="material" map={buildingTexture} />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LargeConcrete2.geometry}
          material={nodes.LargeConcrete2.material}
          position={[27.57, 3.55, -2.06]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MidConcrete1.geometry}
          material={nodes.MidConcrete1.material}
          position={[20.72, 2.81, -2.08]}
          rotation={[Math.PI, 0, Math.PI]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallConcrete1.geometry}
          material={nodes.SmallConcrete1.material}
          position={[9.71, 1.02, -2.64]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SmallConcrete2.geometry}
          material={nodes.SmallConcrete2.material}
          position={[9.71, 1.02, -5.8]}
          rotation={[Math.PI, 0, Math.PI]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MidConcrete2.geometry}
          material={nodes.MidConcrete2.material}
          position={[20.72, 2.81, -5.56]}
          rotation={[Math.PI, 0, Math.PI]}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LargeConcrete1.geometry}
          material={nodes.LargeConcrete1.material}
          position={[27.57, 3.55, -5.21]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Harbour.Space.glb");
