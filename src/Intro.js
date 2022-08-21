import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export function Intro({ start, set }) {
  useEffect(() => {
    setTimeout(() => set(true), 500);
  }, [set]);
  return useFrame((state) => {
    if (start) {
      state.camera.lookAt(0, 0, 0);
    }
  });
}
