import { useEffect, useRef, useContext } from "react"
import { CanvasIncreasedHeight, Canvas } from "./GradientCanvas.styled"
import { IGradientCanvas } from "./IGradientCanvas"
// @ts-expect-error
import Gradient from "./Gradient"

const GradientCanvas = ({ id, increasedHeight, height }: IGradientCanvas) => {
  let gradient: any

  // Needs window object
  useEffect(() => {
    gradient = new Gradient()
    gradient.initGradient(`#${id}`)
  }, [])

  const canvasProps = {
    style: {
      "--gradient-color-1": "#B31217",
      "--gradient-color-2": "#F7971E",
      "--gradient-color-3": "#56AB2F",
      "--gradient-color-4": "#0575E6",
      height: height || "100%"
    },
    id
  }

  let canvas = <Canvas {...canvasProps} />
  if (increasedHeight) {
    canvas = <CanvasIncreasedHeight {...canvasProps} />
  }

  return canvas
}

export default GradientCanvas
