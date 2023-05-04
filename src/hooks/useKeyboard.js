import { useState,useEffect } from "react"
import {socket} from "../socketConnection"
const ACTIONS_KEYBOARD_MAP = {
  ArrowUp:"moveUp",
  ArrowDown:"moveDown",
}
export const useKeyboard = ()=>{
  const [actions,setActions] = useState({
    moveUp:false,
    moveDown:false,
    skill:false,    
  })
  useEffect(()=>{
    const handleKeyDown = event=>{
      const {code} = event;
      const action = ACTIONS_KEYBOARD_MAP[code]
      console.log(action)
      if(action) {
        setActions(prevActions=>({...prevActions,[action]:true}))
      }
    }
    const handleKeyUp = event=>{
      const {code} = event;
      const action =ACTIONS_KEYBOARD_MAP[code]
      if(action) {
        setActions(prevActions=>({...prevActions,[action]:false}))
      }

    }
    document.addEventListener("keydown",handleKeyDown)
    document.addEventListener("keyup",handleKeyUp)
    return()=>{
      document.removeEventListener("keydown",handleKeyDown)
      document.removeEventListener("keyup",handleKeyUp)
    }
  },[])
  return actions
}