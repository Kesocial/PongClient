import { useSphere } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useKeyboard } from "../hooks/useKeyboard"
import {socket} from "../socketConnection"

export function Player({pos,size,type,color,players}) {
  const [ref, api] = useSphere(() => ({type,mass:1,position: pos}))
  const actions = useKeyboard()
  useEffect(() => {
    socket.emit("commandUpdate",actions)
    api.position.set(...pos)
    console.log(pos)
  }, [actions,players])

  // useFrame(() => {
   
  //     if(playerRef.current.pos[2] >= -45){
  //     }else{
  //       api.velocity.set(0,0,0)
  //     }
  //     if(playerRef.current.pos[2]<=45){
  //       api.velocity.set(0,0,(actions.moveDown ? vel : 0) - (actions.moveUp ? vel : 0))
  //     }else{
  //       api.velocity.set(0,0,0)
  //       api.position.set(playerRef.current.pos[0],playerRef.current.pos[1],45)
  //     }
  // })
  return (
    <mesh ref={ref}>
      <boxGeometry args={size}  />
      <meshStandardMaterial color={"#"+color}/>
    </mesh>
  )
}

