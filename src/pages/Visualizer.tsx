import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { algorithms } from '../data/algorithms'
import { useVisualizerStore } from '../store/visualizerStore'
import InfoPanel from '../components/InfoPanel'
import VisualizerCanvas from '../components/VisualizerCanvas'
import GraphCanvas from '../components/GraphCanvas'
import GridCanvas from '../components/GridCanvas'
import StringCanvas from '../components/StringCanvas'
import PlaybackControls from '../components/PlaybackControls'
import CommentaryPanel from '../components/CommentaryPanel'
import ComplexityGraph from '../components/ComplexityGraph'

type MobileTab = 'info' | 'commentary'

const ARRAY_CATEGORIES = new Set(['sorting', 'searching'])
const COMPLEXITY_GRAPH_CATEGORIES = new Set(['sorting', 'searching'])

function getComplexityType(id: string): 'n2' | 'nlogn' {
  return id === 'bubble-sort' || id === 'selection-sort' || id === 'insertion-sort'
    ? 'n2'
    : 'nlogn'
}

export default function Visualizer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    steps,
    currentStep,
    arraySize,
    stringInput,
    setAlgorithm,
    play,
  } = useVisualizerStore()
  const [mobileTab, setMobileTab] = useState<MobileTab>('info')

  const algorithm = algorithms.find((a) => a.id === id)

  useEffect(() => {
    if (!algorithm) {
      navigate('/')
      return
    }
    setAlgorithm(algorithm.id)
  }, [algorithm?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (steps.length > 0) {
      const timer = setTimeout(() => {
        play()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [algorithm?.id, steps.length > 0]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!algorithm) {
    return (
      <div className="flex items-center justify-center h-64 text-white/30 text-sm">
        algorithm not found. going back...
      </div>
    )
  }

  const showArraySize = ARRAY_CATEGORIES.has(algorithm.category)
  const showComplexityGraph = COMPLEXITY_GRAPH_CATEGORIES.has(algorithm.category)
  const complexityType = getComplexityType(algorithm.id)

  function renderCanvas() {
    switch (algorithm!.category) {
      case 'graph':
        return <GraphCanvas steps={steps} currentStep={currentStep} />
      case 'pathfinding':
        return <GridCanvas steps={steps} currentStep={currentStep} />
      case 'string-matching':
        return (
          <StringCanvas
            steps={steps}
            currentStep={currentStep}
            text={stringInput?.text ?? ''}
            pattern={stringInput?.pattern ?? ''}
          />
        )
      default:
        return (
          <VisualizerCanvas
            steps={steps}
            currentStep={currentStep}
            arraySize={arraySize}
          />
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page title */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-white text-lg font-bold">
          {algorithm.name}
          <span className="text-secondary text-sm font-normal ml-3 italic">
            "{algorithm.nickname}"
          </span>
        </h2>
        <span className="text-xs px-2 py-0.5 rounded border border-border text-white/30">
          {algorithm.category}
        </span>
      </div>

      {/* DESKTOP: Three-column layout */}
      <div className="hidden lg:grid lg:grid-cols-[25%_50%_25%] gap-4 items-start">
        {/* Left: Info panel */}
        <div className="flex flex-col gap-4">
          <InfoPanel algorithm={algorithm} />
        </div>

        {/* Center: Visualization */}
        <div className="flex flex-col gap-4">
          <div className="panel overflow-hidden">
            <div className="panel-header">
              <span className="text-primary/60">▐</span>
              <span>visualization</span>
              {showArraySize && (
                <span className="ml-auto text-white/20 text-xs">n={arraySize}</span>
              )}
            </div>
            <div className="p-3">
              {renderCanvas()}
            </div>
          </div>

          <div className="panel overflow-hidden">
            <div className="panel-header">
              <span className="text-accent/60">⏯</span>
              <span>controls</span>
            </div>
            <div className="p-4">
              <PlaybackControls />
            </div>
          </div>

          {showComplexityGraph && (
            <ComplexityGraph
              complexityType={complexityType}
              currentN={arraySize}
              maxN={50}
            />
          )}
        </div>

        {/* Right: Commentary */}
        <div className="flex flex-col gap-4">
          <CommentaryPanel algorithm={algorithm} steps={steps} />
        </div>
      </div>

      {/* MOBILE: Single column */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="panel overflow-hidden">
          <div className="panel-header">
            <span className="text-primary/60">▐</span>
            <span>visualization</span>
            {showArraySize && (
              <span className="ml-auto text-white/20 text-xs">n={arraySize}</span>
            )}
          </div>
          <div className="p-3">
            {renderCanvas()}
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="panel-header">
            <span className="text-accent/60">⏯</span>
            <span>controls</span>
          </div>
          <div className="p-4">
            <PlaybackControls />
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-surface rounded-lg border border-border">
          {(['info', 'commentary'] as MobileTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2 rounded text-xs font-mono transition-all duration-150 cursor-pointer ${
                mobileTab === tab
                  ? 'bg-surface-2 text-primary border border-primary/30'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mobileTab === 'info' && <InfoPanel algorithm={algorithm} />}
        {mobileTab === 'commentary' && (
          <>
            <CommentaryPanel algorithm={algorithm} steps={steps} />
            {showComplexityGraph && (
              <ComplexityGraph
                complexityType={complexityType}
                currentN={arraySize}
                maxN={50}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
