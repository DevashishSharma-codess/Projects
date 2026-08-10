import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Sparkles, ArrowUpRight, Grid, LayoutGrid, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import AuraGlassButton from '../common/AuraGlassButton'
import SearchAutocomplete from '../common/SearchAutocomplete'
import { useRepos } from '../../hooks/useRepos'
import type { GitHubRepo } from '../../api/fetchRepos'

type GitHubUser = {
  name?: string
  login: string
  avatar_url: string
  bio?: string
  followers: number
  following: number
  public_repos: number
  html_url: string
  repos_url: string
}



// 6 Distinct Bento Themes derived directly from reference UI image
const BENTO_THEMES = [
  // 1. Top-Left text, Orange/Red gradient with bright glowing white base
  {
    id: 'theme-1',
    headerText: 'UNLOCK',
    serifText: 'FINANCIAL FREEDOM',
    layoutStyle: 'top-left',
    bgClass: 'bg-[#0a0614]',
    spanClass: 'col-span-1 md:col-span-2', // Hero Wide Bento Card
    renderGlow: () => (
      <>
        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#ea580c] via-[#f97316] to-[#eab308]/60 rounded-b-[32px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white via-[#fef08a] to-transparent blur-[1px] rounded-b-[32px] pointer-events-none" />
      </>
    )
  },
  // 2. Bottom-Left text, Red/Yellow sunburst with dark bottom-right cutout wave
  {
    id: 'theme-2',
    headerText: 'EMPOWERING',
    serifText: 'SMARTER DECISIONS',
    layoutStyle: 'bottom-left',
    bgClass: 'bg-[#08050e]',
    spanClass: 'col-span-1 md:col-span-1',
    renderGlow: () => (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444] via-[#f97316] to-[#eab308] rounded-[32px] pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-black rounded-full blur-[1px] pointer-events-none" />
      </>
    )
  },
  // 3. Top-Left text, Magenta/Purple background with bright white bottom spotlight
  {
    id: 'theme-3',
    headerText: 'MANAGE',
    serifText: 'MONEY EFFORTLESSLY',
    layoutStyle: 'top-left',
    bgClass: 'bg-[#0a0416]',
    spanClass: 'col-span-1 md:col-span-1',
    renderGlow: () => (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e1065] via-[#7e22ce] to-[#c026d3]/80 rounded-[32px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white via-[#f472b6] to-transparent blur-[1px] rounded-b-[32px] pointer-events-none" />
      </>
    )
  },
  // 4. Top-Right text, Indigo dark with 4-Point Star Lens Flare Graphic
  {
    id: 'theme-4',
    headerText: 'ROAD TO',
    serifText: 'FINANCIAL STABILITY',
    layoutStyle: 'top-right',
    bgClass: 'bg-[#060312]',
    spanClass: 'col-span-1 md:col-span-2', // Hero Wide Bento Card
    renderGlow: () => (
      <>
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#c084fc] via-[#8b5cf6]/70 to-transparent blur-md rounded-b-[32px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white via-purple-100/60 to-transparent blur-sm rounded-b-[32px] pointer-events-none" />
        {/* 4-Point Glowing Lens Flare Star on Left Middle */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
          <div className="w-16 h-16 bg-purple-300/50 rounded-full blur-xl absolute" />
          <svg className="w-9 h-9 text-white drop-shadow-[0_0_16px_rgba(255,255,255,1)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </>
    )
  },
  // 5. Middle-Left text, Electric Cyan/Blue Dome Light
  {
    id: 'theme-5',
    headerText: 'TRUST YOUR',
    serifText: 'FUTURE WITH US',
    layoutStyle: 'middle-left',
    bgClass: 'bg-[#040816]',
    spanClass: 'col-span-1 md:col-span-2', // Hero Wide Bento Card
    renderGlow: () => (
      <>
        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#38bdf8] via-[#0284c7] to-transparent blur-sm rounded-b-[32px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-white via-cyan-100/70 to-transparent blur-sm rounded-b-[32px] pointer-events-none" />
      </>
    )
  },
  // 6. Top-Right text, Dark Plum with White/Pink Burst at bottom-left
  {
    id: 'theme-6',
    headerText: 'SECURE',
    serifText: 'FINANCIAL GROWTH',
    layoutStyle: 'top-right',
    bgClass: 'bg-[#0b0413]',
    spanClass: 'col-span-1 md:col-span-1',
    renderGlow: () => (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-[#180828] via-[#4a044e]/50 to-[#881337] rounded-[32px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-80 h-72 bg-gradient-to-tr from-white via-[#f43f5e] to-transparent rounded-full blur-[2px] opacity-95 pointer-events-none" />
      </>
    )
  }
]

const Section2 = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [userRepos, setUserRepos] = useState<GitHubRepo[]>([])
  const [isAsymmetricLayout, setIsAsymmetricLayout] = useState(true)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useRepos(page, 6)
  const repos = userRepos.length > 0 ? userRepos : (data?.repos ?? [])

  // Fetch specific GitHub user & user's repos
  async function fetchUser(name?: string) {
    const searchName = name || username
    if (!searchName.trim()) return

    try {
      const res = await fetch(`https://api.github.com/users/${searchName}`)
      const userData = await res.json()
      setUser(userData)

      const repoRes = await fetch(userData.repos_url)
      const repoData = await repoRes.json()
      if (Array.isArray(repoData)) {
        setUserRepos(repoData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Format repo name into split upper sans & serif titles
  const formatRepoTitle = (repo: GitHubRepo, index: number) => {
    const defaultTheme = BENTO_THEMES[index % BENTO_THEMES.length]
    
    // Clean repo name into clean uppercase words
    const cleanName = repo.name.replace(/[-_]/g, ' ').toUpperCase()
    const nameWords = cleanName.split(' ')

    const header = nameWords[0] || defaultTheme.headerText
    const subtext = nameWords.slice(1).join(' ') || repo.language || defaultTheme.serifText

    return { header, subtext }
  }

  return (
    <section
      id="section2"
      className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-between p-6 sm:p-12 pt-28 sm:pt-32 scroll-mt-28 relative overflow-hidden selection:bg-purple-600 selection:text-white"
    >
      
      {/* Background Ambient Glow FX */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header & Search Bar */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-30 relative mb-10">
        
        <div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Featured Repositories
          </h2>
        </div>

        {/* Control Bar: 3D Aura Glass Buttons + Search Bar */}
        <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto">
          
          {/* View All 100 Repos Header Button */}
          <AuraGlassButton
            onClick={() => navigate('/repos')}
            size="sm"
            title="Open Directory of All 100 Repositories"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-200" />
            <span>All 100 Repos ({repos.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </AuraGlassButton>

          {/* Bento Layout Toggle Button */}
          <AuraGlassButton
            onClick={() => setIsAsymmetricLayout(!isAsymmetricLayout)}
            size="sm"
            title="Toggle Bento Layout Mode"
          >
            {isAsymmetricLayout ? <LayoutGrid className="w-4 h-4 text-cyan-400" /> : <Grid className="w-4 h-4 text-purple-400" />}
            <span className="hidden sm:inline">{isAsymmetricLayout ? 'Asymmetric Bento' : '3-Column Grid'}</span>
          </AuraGlassButton>

          {/* 🔍 Search Input with Autocomplete */}
          <SearchAutocomplete
            onSelectRepo={(repo) => window.open(repo.html_url, '_blank')}
            onSearchUser={(username) => {
              setUsername(username)
              fetchUser(username)
            }}
            placeholder="Search GitHub repos..."
          />
        </div>
      </div>

      {/* ⏳ Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-3 text-purple-300 z-10 my-8">
          <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono tracking-wide">Fetching GitHub Repositories...</span>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-red-400 text-sm font-mono z-10 my-8">
          Failed to fetch repositories. Please try again.
        </div>
      )}

      {/* 👤 Searched User Card */}
      {user && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.open(user.html_url, '_blank')}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl text-center w-full max-w-sm cursor-pointer hover:scale-105 transition-all duration-150 shadow-2xl z-10 mb-8 group"
        >
          <img
            src={user.avatar_url}
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-400/50 shadow-lg group-hover:scale-110 transition-transform duration-150"
          />
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-150">
            {user.name || user.login}
          </h3>
          <p className="text-gray-300 text-xs mt-1 line-clamp-2 px-2 font-light">
            {user.bio || 'GitHub Content Creator'}
          </p>
          
          <div className="flex justify-around mt-5 pt-4 border-t border-white/10 text-xs">
            <div>
              <p className="font-extrabold text-white text-sm">{user.followers}</p>
              <p className="text-gray-400 text-[11px]">Followers</p>
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">{user.following}</p>
              <p className="text-gray-400 text-[11px]">Following</p>
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">{user.public_repos}</p>
              <p className="text-gray-400 text-[11px]">Repos</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 📦 BIGGER 6-Card Bento Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full max-w-7xl z-10 relative">
        {repos.slice(0, 6).map((repo, index) => {
          const theme = BENTO_THEMES[index % BENTO_THEMES.length]
          const { header, subtext } = formatRepoTitle(repo, index)

          // Asymmetric vs symmetric bento span class
          const bentoSpanClass = isAsymmetricLayout ? theme.spanClass : 'col-span-1'

          // Determine layout flex alignment
          let alignmentClasses = 'justify-between items-start text-left'
          if (theme.layoutStyle === 'bottom-left') {
            alignmentClasses = 'justify-end items-start text-left'
          } else if (theme.layoutStyle === 'top-right') {
            alignmentClasses = 'justify-between items-end text-right'
          } else if (theme.layoutStyle === 'middle-left') {
            alignmentClasses = 'justify-between items-start text-left'
          }

          return (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ scale: 1.025, y: -6 }}
              className={`relative h-[400px] sm:h-[450px] ${bentoSpanClass} ${theme.bgClass} rounded-[36px] p-8 sm:p-9 flex flex-col ${alignmentClasses} overflow-hidden cursor-pointer group shadow-2xl border border-white/10 hover:border-white/40 transition-all duration-150 ease-out block no-underline`}
            >
              {/* Dynamic Aura Gradient Lighting & FX */}
              {theme.renderGlow()}

              {/* Glass Top Highlight Overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[36px] pointer-events-none" />

              {/* ↗️ WORKING ARROW CLICK BUTTON */}
              <div className="absolute top-7 right-7 z-30 flex items-center gap-2">
                <span
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(repo.html_url, '_blank')
                  }}
                  className="p-3 rounded-full bg-black/40 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all duration-150 ease-out group-hover:scale-110 group-hover:border-white/60 group-hover:bg-white/25 shadow-lg flex items-center justify-center cursor-pointer"
                  title="Open Repository in GitHub"
                >
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                </span>
              </div>

              {/* MAIN EDITORIAL TYPOGRAPHY HEADER */}
              <div className={`relative z-20 ${theme.layoutStyle === 'middle-left' ? 'my-auto' : ''} max-w-[82%]`}>
                <h3 className="font-editorial-sans font-black text-2xl sm:text-4xl uppercase tracking-[0.18em] text-white leading-tight drop-shadow-md group-hover:translate-x-0.5 transition-transform duration-150">
                  {header}
                </h3>
                <p className="font-editorial-serif font-normal italic uppercase tracking-[0.15em] text-white/90 text-base sm:text-xl mt-1.5 drop-shadow-md">
                  {subtext}
                </p>
              </div>

              {/* REPO CONTENT & DETAILS BADGE */}
              <div className="relative z-20 w-full mt-auto pt-4 flex flex-col gap-3.5">
                {/* Description Excerpt */}
                <p className={`text-xs sm:text-sm text-white/85 line-clamp-3 font-light leading-relaxed drop-shadow-sm ${theme.layoutStyle === 'top-right' ? 'text-right' : 'text-left'}`}>
                  {repo.description || 'Modern open-source repository built for high performance and scale.'}
                </p>

                {/* Footer Pill: Repo Stats & Direct Link Arrow */}
                <div className="flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-xs sm:text-sm font-mono text-white/90 shadow-xl group-hover:bg-black/70 group-hover:border-white/40 transition-all duration-150 ease-out">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Star className="w-4 h-4 fill-amber-300" />
                      {(repo.stargazers_count / 1000).toFixed(1)}k
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-200">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/90 font-sans group-hover:text-white">
                    {repo.language && (
                      <span className="hidden sm:inline-block px-2.5 py-1 bg-white/15 rounded-md text-[11px] uppercase font-mono tracking-wider font-semibold">
                        {repo.language}
                      </span>
                    )}
                    <span className="p-1.5 rounded-md bg-white/10 group-hover:bg-white/25 transition-colors duration-150">
                      <ExternalLink className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Glass Inner Border Highlight */}
              <div className="absolute inset-0 rounded-[36px] border border-white/15 pointer-events-none group-hover:border-white/35 transition-colors duration-150" />
            </motion.a>
          )
        })}
      </div>

      {/* Pagination Controls */}
      <div className="w-full max-w-7xl z-10 flex items-center justify-center gap-4 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!data?.hasPrevPage}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <span className="text-sm font-mono text-gray-300">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.hasNextPage}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all cursor-pointer"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 🚀 3D AURA GLASS EXPLORE ALL 100 REPOSITORIES FEATURE BANNER */}
      <div className="w-full max-w-7xl z-10 flex flex-col items-center justify-center mt-8">
        <AuraGlassButton
          onClick={() => navigate('/repos')}
          size="lg"
          title="Open Directory of All 100 Repositories"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span>Explore All Trending Repositories</span>
          <ArrowUpRight className="w-5 h-5 text-purple-200 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </AuraGlassButton>
        <p className="text-xs font-mono text-gray-400 mt-3">
          Click to open full repository directory with search, language filters & sorting
        </p>
      </div>

    </section>
  )
}

export default Section2