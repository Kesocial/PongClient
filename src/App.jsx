import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground'
import { PerspectiveFirstPerson } from './components/PerspectiveFirstPerson'
import { Player } from './components/Player'
import {socket} from "./socketConnection"
import { useEffect, useState } from 'react'
import { useRef } from 'react'

const VEL = 15
const POS = [Math.random() * (45 - (-45)) + (-45), 1.5, 0]
const COLOR = Math.floor(Math.random() * 16777215).toString(16);
const SIZE = [1.5, 2, 5]
const TYPE = "Kinematic"

function App() {
  const [players, setPlayers] = useState([])
  const [clase, setClase] = useState("")
  const jugar = (socket) => {
    socket.emit("playerReady", {size:SIZE,color:COLOR,vel:VEL,pos:POS,type:TYPE})
    setClase("hide")
  }
  
  const updatePlayers = (players) => {
    let _players = Object.values(players)
    setPlayers(_players)
    console.log(players)
  }

  useEffect(() => {
    socket.on("updatePlayers", updatePlayers)
    return () => {
      socket.off("updatePlayers", updatePlayers)
    }
  }, [])

  return (
    <>
      <Canvas>
        <color attach="background" args={["#292933"]} />
        <ambientLight />
        <PerspectiveFirstPerson />
        <Stars />
        <Physics>
          <Ground />
          {players !== 0 && players.map((p) => (<Player players={players} key={p.id} size={p.size} id={p.id} color={p.color} vel={p.vel} pos={p.pos} type={p.type} />))}
        </Physics>
      </Canvas>
      <div className={`modal ${clase}`}>
        <button className="menu__button" onClick={() => jugar(socket)}>Play</button>
      </div>
    </>
  )
}

export default App
