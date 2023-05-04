import { usePlane } from "@react-three/cannon"

export function Ground() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI/2, 0, 0], position: [0, 0, 0] }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100,100]}/>
      <meshStandardMaterial attach="material" color="red"/>
    </mesh>
  )
}