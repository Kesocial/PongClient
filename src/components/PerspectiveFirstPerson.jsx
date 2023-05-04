import { OrbitControls, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector3 } from "three";
export function PerspectiveFirstPerson(){
  const {camera,gl} = useThree()
  useEffect(()=>{
    camera.position.copy(new Vector3(0,70,0))
    camera.rotateX(4.36332)

  },[])
  return(<OrbitControls  args={[camera,gl.domElement]}/>)
}
// lock={()=>{}}