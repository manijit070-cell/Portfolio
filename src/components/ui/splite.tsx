import { lazy, Suspense, useState } from 'react'

// Eagerly prefetch the spline chunk so it is ready when component mounts
if (typeof window !== 'undefined' && window.innerWidth >= 768) {
  import('@splinetool/react-spline')
}

const Spline = lazy(() => import('@splinetool/react-spline'))

type SplineSceneProps = {
  scene: string
  className?: string
  onLoad?: (splineApp: unknown) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 via-transparent to-transparent backdrop-blur-[2px] transition-opacity duration-500">
          <div className="relative flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute h-6 w-6 rounded-full bg-primary/25 blur-md animate-pulse" />
          </div>
          <span className="text-[11px] font-mono text-muted-foreground/80 tracking-wider uppercase animate-pulse">
            Loading 3D Robot…
          </span>
        </div>
      )}

      <Suspense fallback={null}>
        <div
          className={`h-full w-full transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Spline
            scene={scene}
            className={className}
            onLoad={(splineApp) => {
              setIsLoaded(true)
              onLoad?.(splineApp)
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}
