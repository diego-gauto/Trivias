import { useEffect, useRef, useContext } from "react"
import { Canvas } from "./GradientCanvas.styled"
import { IGradientCanvas } from "./IGradientCanvas"
// @ts-expect-error
import Gradient from "./Gradient"

const GradientCanvas = ({ id, skewTop, skewBottom }: IGradientCanvas) => {
  let gradient : any

  // Needs window object
  useEffect(() => {
    gradient = new Gradient()
    gradient.initGradient(`#${id}`)
  }, [])

  return (
    <Canvas
      style={{
        // @ts-expect-error
        "--gradient-color-1": "#B31217",
        "--gradient-color-2": "#F7971E",
        "--gradient-color-3": "#56AB2F",
        "--gradient-color-4": "#0575E6"
      }}
      id={id}
      skewTop={skewTop}
      skewBottom={skewBottom}
    />
  )
}

export default GradientCanvas
