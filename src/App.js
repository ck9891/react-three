import React, {useState, useRef} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend, useFrame } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three'
import './App.css'; 

extend({ OrbitControls });

function Cube(props) {

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;

  })

  const { size, x } =  useSpring({
    size: isBig ? [2,2,2] : [1, 1, 1],
    x: isBig ? 2 : 0 
  })

  const color = isHovered ? "pink" : "salmon"

  // const size = isBig ? 2 : 1;
  return (
    <a.mesh 
      {...props} 
      ref={ref}
      scale={size}
      position-x={x} 
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  )
}

function Scene() {

  const {
    camera,
    gl: {
      domElement
    }
  } = useThree();

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.2} position={[ -1, 5, 4]} />
      <Cube rotation={[10, 10,10]} position={[0,0,0]} />
      <Cube rotation={[5,5,5]} position={[2,2,0]} />

      <orbitControls args={[camera, domElement]} />
    </>
  )
}

// Args = [width, height, depth]

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
