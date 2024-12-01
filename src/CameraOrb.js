import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";

const CameraOrb = forwardRef(
  (
    {
      position,
      rotation,
      number,
      scale = 1,
      color = "orange",
      opacity = 0.5,
      onStateChange,
    },
    ref
  ) => {
    const sphereRef = useRef();

    // Hold state for hovered and clicked events
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Expose the internal ref to the parent
    React.useImperativeHandle(ref, () => sphereRef.current);

    useEffect(() => {
      if (onStateChange) {
        onStateChange({ clicked, number });
      }
    }, [clicked, number, onStateChange]);

    const handlePointerOver = (event) => {
      event.stopPropagation();
      setHovered(true);
    };

    const handlePointerOut = () => {
      setHovered(false);
    };

    const handleClick = () => {
      setClicked(!clicked);
    };

    const materialProps = {
      transparent: true,
      opacity: clicked ? 0.8 : opacity,
      color: hovered || clicked ? "#2040c0" : color,
    };

    return (
      <group position={position} rotation={rotation} scale={scale}>
        <mesh
          ref={sphereRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {/* Sphere geometry */}
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial {...materialProps} />
          {/* HTML for number */}
          <Html distanceFactor={10} center>
            <div
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {number}
            </div>
          </Html>
        </mesh>
        <mesh position={[0, 0.65 + 0.125, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.65, 32]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, 0.7 + 0.625, 0]}>
          <coneGeometry args={[0.125, 0.5, 4, 1]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </group>
    );
  }
);

export default CameraOrb;
