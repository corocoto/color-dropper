import { forwardRef, memo, MutableRefObject, useEffect, useRef } from 'react'

// Type definition
import { CanvasProps } from './Canvas.types'

// HOCs
import { withImage } from './hocs'

// Libs
import classNames from 'classnames'

// Styles
import styles from './Canvas.module.css'

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, canvasRef) => {
  const { image, className, ...rest } = props

  // Refs
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null)

  // Effects
  useEffect(() => {
    ctx.current = (canvasRef as MutableRefObject<HTMLCanvasElement>).current.getContext('2d')
  }, [canvasRef])

  useEffect(() => {
    if (image && ctx.current) {
      ctx.current.drawImage(image, 0, 0)
    }
  }, [image])

  return (
    <canvas
      ref={canvasRef}
      className={classNames(className, styles.canvas)}
      width={image?.naturalWidth}
      height={image?.naturalHeight}
      {...rest}
    />
  )
})

Canvas.displayName = 'Canvas'

export default memo(Canvas)
export const ImageCanvas = withImage(Canvas)
