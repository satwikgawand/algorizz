import { useVisualizerStore } from '../store/visualizerStore'

export default function PlaybackControls() {
  const {
    steps,
    currentStep,
    isPlaying,
    speed,
    arraySize,
    play,
    pause,
    stepForward,
    stepBack,
    restart,
    setSpeed,
    setArraySize,
    randomize,
  } = useVisualizerStore()

  const totalSteps = steps.length
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0
  const sliderFill = ((arraySize - 5) / (50 - 5)) * 100

  const speedOptions = [
    { label: 'slow', value: 800 },
    { label: 'med', value: 400 },
    { label: 'fast', value: 100 },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-white/30 text-xs shrink-0">
          step{' '}
          <span className="text-white/70">{currentStep + 1}</span>{' '}
          <span className="text-white/20">of</span>{' '}
          <span className="text-white/70">{totalSteps}</span>
        </span>
        <div className="flex-1 h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%`, boxShadow: '0 0 6px #00ff41' }}
          />
        </div>
        <span className="text-white/30 text-xs shrink-0">{Math.round(progress)}%</span>
      </div>

      {/* Playback buttons */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={restart}
          className="btn-ghost text-base px-3 py-2"
          title="Restart"
        >
          ↺
        </button>
        <button
          onClick={stepBack}
          disabled={currentStep === 0}
          className="btn-ghost text-base px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step Back"
        >
          ←
        </button>
        <button
          onClick={isPlaying ? pause : play}
          disabled={currentStep >= totalSteps - 1 && !isPlaying}
          className={`px-6 py-2 rounded border text-sm font-mono transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isPlaying
              ? 'bg-accent/10 border-accent text-accent hover:bg-accent/20'
              : 'bg-primary/10 border-primary text-primary hover:bg-primary/20'
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸ pause' : '▶ play'}
        </button>
        <button
          onClick={stepForward}
          disabled={currentStep >= totalSteps - 1}
          className="btn-ghost text-base px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step Forward"
        >
          →
        </button>
        <button
          onClick={randomize}
          className="btn-ghost text-xs px-3 py-2"
          title="Randomize Array"
        >
          ⚄ new
        </button>
      </div>

      {/* Controls row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Array size */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white/30 text-xs">array size</span>
            <span className="text-white/60 text-xs">{arraySize}</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-full"
            style={{
              background: `linear-gradient(to right, #00ff41 ${sliderFill}%, #333333 ${sliderFill}%)`,
            }}
          />
          <div className="flex justify-between text-white/20 text-xs">
            <span>5</span>
            <span>50</span>
          </div>
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-1.5">
          <span className="text-white/30 text-xs">speed</span>
          <div className="flex gap-1">
            {speedOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={`flex-1 py-1.5 rounded text-xs font-mono border cursor-pointer transition-all duration-150 ${
                  speed === opt.value
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-transparent border-border text-white/30 hover:border-white/30 hover:text-white/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
