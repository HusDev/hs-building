import * as THREE from "three";
import { useState, useEffect } from "react";
import { Text } from "@react-three/drei";

export function VideoText({ clicked, ...props }) {
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
