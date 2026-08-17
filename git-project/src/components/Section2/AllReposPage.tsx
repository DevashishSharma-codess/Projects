import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Star, GitFork, ExternalLink, Sparkles, Filter, Code, ChevronLeft, ChevronRight } from 'lucide-react'
import AuraGlassButton from '../common/AuraGlassButton'
import { useRepos } from '../../hooks/useRepos'


const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400 text-black',
  Python: 'bg-emerald-500',
  'C++': 'bg-pink-500',
  Go: 'bg-cyan-400 text-black',
  Rust: 'bg-orange-500',
  Java: 'bg-red-500',
  HTML: 'bg-orange-600',
  CSS: 'bg-indigo-500',
  Vue: 'bg-emerald-400 text-black',
  Shell: 'bg-gray-400 text-black'
}


const AllReposPage = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'stars' | 'forks'>('stars')

  const { data, isLoading, isError } = useRepos(page, 30)
  const activeRepos = data?.repos ?? []

  const handleBack = () => {
    navigate('/')
  }

  // Extract unique languages for filter options
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>()
    activeRepos.forEach((r) => {
      if (r.language) langs.add(r.language)
    })
    return ['All', ...Array.from(langs).sort()]
  }, [activeRepos])

  // Filter & Sort 100 Repositories
  const filteredRepos = useMemo(() => {
    return activeRepos
      .filter((repo) => {
        const matchesQuery =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (repo.owner?.login && repo.owner.login.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage

        return matchesQuery && matchesLanguage
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
        return b.forks_count - a.forks_count
      })
  }, [activeRepos, searchQuery, selectedLanguage, sortBy])

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 sm:p-12 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 z-10 relative mb-10">
        
        {/* 3D Aura Glass Back Button */}
        <div className="self-start">
          <AuraGlassButton onClick={handleBack} size="sm" title="Return to Section 2">
            <ArrowLeft className="w-4 h-4 text-purple-300" />
            <span>Back to Main Page</span>
          </AuraGlassButton>
        </div>

        {/* Title Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-purple-300 uppercase">
                COMPLETE DIRECTORY
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              All 100 Trending Repositories
            </h1>
          </div>

          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-purple-200">
            Showing <strong className="text-white text-sm">{filteredRepos.length}</strong> of {activeRepos.length} Repos
          </div>
        </div>

        {/* ⏳ Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 text-purple-300 z-10 my-4">
            <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono tracking-wide">Fetching GitHub Repositories...</span>
          </div>
        )}

        {isError && (
          <div className="text-red-400 text-sm font-mono z-10 my-4">
            Failed to fetch repositories. Please try again.
          </div>
        )}

        {/* Filters & Search Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          {/* Search Input */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 pl-4 rounded-full shadow-xl w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-300" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Filter 100 repos by name or topic..."
              className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
              <Filter className="w-3.5 h-3.5 text-purple-400" />
              <span>Sort:</span>
            </div>

            <button
              onClick={() => setSortBy('stars')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer ${
                sortBy === 'stars'
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/15 border border-white/10'
              }`}
            >
              ⭐ Most Stars
            </button>

            <button
              onClick={() => setSortBy('forks')}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer ${
                sortBy === 'forks'
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/15 border border-white/10'
              }`}
            >
              🍴 Most Forks
            </button>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 pr-2">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>Language:</span>
          </div>
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

      </div>

      {/* 📦 100 Repositories Bento Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 z-10 relative">
        {filteredRepos.map((repo, idx) => {
          const langColorClass = LANGUAGE_COLORS[repo.language] || 'bg-purple-500'

          return (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.4) }}
              whileHover={{ scale: 1.025, y: -4 }}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer group shadow-xl transition-all duration-150 no-underline text-white relative"
            >
              {/* Top Row: Owner Avatar + Repo Name */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {repo.owner?.avatar_url && (
                      <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        className="w-8 h-8 rounded-full border border-white/20"
                      />
                    )}
                    <span className="text-xs font-mono text-purple-300 truncate max-w-[130px]">
                      @{repo.owner?.login || 'github'}
                    </span>
                  </div>

                  <span className="p-2 rounded-full bg-black/40 group-hover:bg-white/20 border border-white/20 text-white transition-all duration-150 group-hover:scale-110">
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Repo Title */}
                <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2">
                  {repo.name}
                </h3>

                {/* Description Excerpt */}
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed font-light mb-4">
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              {/* Bottom Row: Language + Stars & Forks */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${langColorClass}`} />
                  <span className="text-[11px] uppercase tracking-wider">{repo.language || 'Code'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {(repo.stargazers_count / 1000).toFixed(1)}k
                  </span>
                  <span className="flex items-center gap-1 text-purple-200">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* No Results Message */}
      {filteredRepos.length === 0 && (
        <div className="w-full text-center py-20 text-gray-400 font-mono z-10 relative">
          No repositories found matching "{searchQuery}" with language "{selectedLanguage}".
        </div>
      )}

      {/* Pagination Controls */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-4 mt-12 z-10 relative">
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

      {/* Footer Back Button */}
      <div className="w-full max-w-7xl mx-auto flex justify-center mt-8 z-10 relative">
        <AuraGlassButton onClick={handleBack} size="lg">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </AuraGlassButton>
      </div>

    </div>
  )
}

export default AllReposPage
