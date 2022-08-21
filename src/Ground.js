import { useTexture } from "@react-three/drei";
import { MeshReflectorMaterial } from "@react-three/drei";

export function Ground() {
  const floor = useTexture("TexturesCom_Asphalt_Base11_header.jpg");
  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial map={floor} />
    </mesh>
  );
}
