import { useEffect, useRef, useContext } from "react"
import { CanvasSkewBottom, CanvasSkewTop, Canvas } from "./GradientCanvas.styled"
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

  const canvasProps = {
    style: {
      "--gradient-color-1": "#B31217",
      "--gradient-color-2": "#F7971E",
      "--gradient-color-3": "#56AB2F",
      "--gradient-color-4": "#0575E6"
    },
    id
  }

  // @ts-expect-error
  let canvas = <Canvas {...canvasProps} />
  if (skewTop) {
    // @ts-expect-error
    canvas = <CanvasSkewTop {...canvasProps} />
  } else if (skewBottom) {
    // @ts-expect-error
    canvas = <CanvasSkewBottom {...canvasProps} />
  }

  return canvas
}

export default GradientCanvas
