import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Sparkles, Database, ArrowUpRight } from 'lucide-react'

// Bento Tile Definition (Images + Final 3D Aura Mesh Card)
interface BentoTile {
  id: string
  type: 'image' | 'aura'
  mediaUrl?: string
  fallbackGradient?: string
}

const BENTO_TILES: BentoTile[] = [
  {
    id: 'hero-gif',
    type: 'image',
    mediaUrl: 'https://i.pinimg.com/originals/90/2f/f9/902ff9ab4c67d29a47b53394a462e2b4.gif',
    fallbackGradient: 'from-pink-600 via-purple-600 to-indigo-900'
  },
  {
    id: 'req-image-1',
    type: 'image',
    mediaUrl: 'https://i.pinimg.com/control1/1200x/84/cb/f0/84cbf09f7a3846595b6c928725d60393.jpg',
    fallbackGradient: 'from-amber-500 via-orange-600 to-red-950'
  },
  {
    id: 'req-image-2',
    type: 'image',
    mediaUrl: 'https://i.pinimg.com/control1/1200x/75/d3/84/75d3840481964ccce02c9ab0d6ef7a80.jpg',
    fallbackGradient: 'from-red-500 via-rose-600 to-slate-950'
  },
  {
    id: 'req-image-3',
    type: 'image',
    mediaUrl: 'https://i.pinimg.com/1200x/57/0b/8b/570b8b5637a6db20a3ce8593147d8847.jpg',
    fallbackGradient: 'from-emerald-500 via-teal-700 to-slate-950'
  },
  {
    id: 'req-image-4',
    type: 'image',
    mediaUrl: 'https://i.pinimg.com/control1/1200x/62/68/2f/62682fd6187df169053197fb2970b7a2.jpg',
    fallbackGradient: 'from-purple-600 via-indigo-700 to-slate-950'
  },
  {
    id: 'last-box-aura-data',
    type: 'aura'
  }
]

// Dynamic Morphing Configurations (Both Horizontal & Vertical Tall Shape Changes)
const MORPH_PRESETS = [
  // Preset 0: Hero GIF Wide + Bottom Aura Wide
  {
    'hero-gif': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-1': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-2': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-3': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-4': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'last-box-aura-data': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' }
  },
  // Preset 1: Vertical Tall Morph - Hero GIF Tall (2 rows) + Image 4 Wide (2 cols)
  {
    'hero-gif': { colSpan: 'col-span-1', rowSpan: 'row-span-2', height: 'h-[404px]' }, // VERTICAL TALL!
    'req-image-1': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-2': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-3': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-4': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' }, // BOTTOM WIDE!
    'last-box-aura-data': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' }
  },
  // Preset 2: Vertical Tall Morph - Image 1 Tall (2 rows) + Bottom Aura Wide
  {
    'hero-gif': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-1': { colSpan: 'col-span-1', rowSpan: 'row-span-2', height: 'h-[404px]' }, // VERTICAL TALL!
    'req-image-2': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-3': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-4': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'last-box-aura-data': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' }
  },
  // Preset 3: Bottom Left Wide + Middle Wide
  {
    'hero-gif': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-1': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-2': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-3': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-4': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' }, // BOTTOM WIDE!
    'last-box-aura-data': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' }
  },
  // Preset 4: Vertical Tall Morph - Image 3 Tall + Bottom Aura Wide
  {
    'hero-gif': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-1': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-2': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'req-image-3': { colSpan: 'col-span-1', rowSpan: 'row-span-2', height: 'h-[404px]' }, // VERTICAL TALL!
    'req-image-4': { colSpan: 'col-span-1', rowSpan: 'row-span-1', height: 'h-48' },
    'last-box-aura-data': { colSpan: 'col-span-2', rowSpan: 'row-span-1', height: 'h-48' }
  }
]

const RightContent = () => {
  const [presetIndex, setPresetIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Fast & dynamic layout morphing every 1.8s
  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setPresetIndex((prev) => (prev + 1) % MORPH_PRESETS.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const nextPreset = () => {
    setPresetIndex((prev) => (prev + 1) % MORPH_PRESETS.length)
  }

  const activePreset = MORPH_PRESETS[presetIndex]

  return (
    <div className="w-full lg:w-1/2 min-h-full bg-black text-white p-4 sm:p-8 py-8 flex flex-col justify-between relative overflow-hidden selection:bg-purple-500 selection:text-white gap-6">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between px-2 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            GitHub Bento Grid System
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-300 ${
              isAutoPlay
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800/80 text-slate-400 border-slate-700'
            }`}
          >
            {isAutoPlay ? 'Auto Morphing ON' : 'Paused'}
          </button>

          <button
            onClick={nextPreset}
            className="p-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-cyan-400 transition hover:rotate-180 duration-500"
            title="Morph Grid"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic Morphing Bento Grid */}
      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        className="grid grid-cols-3 gap-5 relative z-10 my-auto"
      >
        {BENTO_TILES.map((tile) => {
          const config = (activePreset as any)[tile.id] || { colSpan: 'col-span-1', height: 'h-48' }

          return (
            <motion.div
              key={tile.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                layout: {
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1]
                },
                opacity: { duration: 0.3 }
              }}
              whileHover={{ scale: 1.025, y: -3 }}
              onClick={nextPreset}
              className={`${config.colSpan} ${config.rowSpan || ''} ${config.height} relative rounded-[32px] overflow-hidden cursor-pointer group border border-white/20 shadow-2xl ${
                tile.type === 'aura'
                  ? 'bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-950 p-6 flex flex-col justify-between'
                  : 'bg-slate-900'
              }`}
              style={{
                boxShadow: tile.type === 'aura'
                  ? `0 16px 40px rgba(6,182,212,0.4), inset 0 2px 10px rgba(255,255,255,0.4)`
                  : `0 16px 36px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.25)`
              }}
            >
              {/* IMAGE TYPE TILES */}
              {tile.type === 'image' && (
                <>
                  <img
                    src={tile.mediaUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0'
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${tile.fallbackGradient} -z-10`} />
                </>
              )}

              {/* SPECIAL LAST BOX: 3D AURA MESH CARD ("All Your GitHub Data") */}
              {tile.type === 'aura' && (
                <>
                  {/* Inner Dark Aura Radial Core Shadow */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/60 pointer-events-none" />

                  {/* 3D Mona Cat Silhouette Graphic */}
                  <div className="absolute right-3 bottom-1 opacity-30 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                    <i className="ri-github-fill text-8xl text-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
                  </div>

                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-200" />
                      <span className="text-[10px] font-mono font-black tracking-wider text-white uppercase">
                        ANALYTICS ENGINE
                      </span>
                    </div>

                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-110 cursor-pointer z-20"
                      title="Open GitHub"
                    >
                      <ArrowUpRight className="w-4 h-4 text-cyan-200" />
                    </a>
                  </div>

                  {/* Headline & Subtitle */}
                  <div className="relative z-10 mt-auto">
                    <span className="text-xs font-semibold text-cyan-100 block mb-0.5 tracking-wide">
                      Real-time Analytics & Insights
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">
                      All Your GitHub Data
                    </h3>
                  </div>
                </>
              )}

              {/* Glass Top Highlight Overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-[32px] pointer-events-none" />

              {/* Glass Border */}
              <div className="absolute inset-0 rounded-[32px] border border-white/20 pointer-events-none group-hover:border-white/40 transition-colors duration-300" />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono relative z-10 px-2">
        <span>GitHub Dark 3D Visual System</span>
        <span>Click any tile to morph grid</span>
      </div>

    </div>
  )
}

export default RightContent