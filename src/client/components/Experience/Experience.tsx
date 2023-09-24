import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { extend, useThree } from "@react-three/fiber";
extend({ OrbitControls });

export function Experience() {
  const { camera, gl } = useThree();

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <color args={["ivory"]} attach="background" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}
