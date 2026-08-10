import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Star, GitFork, ExternalLink, Loader2, X } from 'lucide-react'
import { useSearchRepos } from '../../hooks/useSearchRepos'
import { useDebounce } from '../../hooks/useDebounce'
import type { GitHubRepo } from '../../api/fetchRepos'
import AuraGlassButton from './AuraGlassButton'

type SearchAutocompleteProps = {
  onSelectRepo?: (repo: GitHubRepo) => void
  onSearchUser?: (username: string) => void
  placeholder?: string
}

const SearchAutocomplete = ({
  onSelectRepo,
  onSearchUser,
  placeholder = 'Search GitHub repos...',
}: SearchAutocompleteProps) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 350)
  const { data, isLoading, isFetching } = useSearchRepos(debouncedQuery)

  const suggestions = data?.repos ?? []
  const totalCount = data?.totalCount ?? 0
  const showDropdown = isOpen && query.trim().length >= 2

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-suggestion-item]')
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const handleSelect = useCallback(
    (repo: GitHubRepo) => {
      setQuery(repo.full_name)
      setIsOpen(false)
      setHighlightedIndex(-1)
      onSelectRepo?.(repo)
    },
    [onSelectRepo]
  )

  const handleSearchSubmit = useCallback(() => {
    if (query.trim()) {
      onSearchUser?.(query.trim())
      setIsOpen(false)
    }
  }, [query, onSearchUser])

  const handleClear = useCallback(() => {
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearchSubmit()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex])
        } else {
          handleSearchSubmit()
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Highlight matching text in suggestion
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-cyan-300 font-bold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <div ref={containerRef} className="relative flex-1 md:flex-initial z-50">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 pl-4 rounded-full shadow-xl transition-all duration-200 focus-within:border-purple-400/60 focus-within:bg-white/15 focus-within:shadow-purple-500/10 focus-within:shadow-2xl">
        <Search className="w-4 h-4 text-gray-300 shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setHighlightedIndex(-1)
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          className="bg-transparent text-white placeholder-gray-400 outline-none w-full md:w-52 text-sm"
        />

        {/* Loading spinner / Clear button */}
        {(isLoading || isFetching) && query.trim().length >= 2 ? (
          <Loader2 className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
        ) : query.length > 0 ? (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        ) : null}

        <AuraGlassButton onClick={handleSearchSubmit} size="sm">
          Search
        </AuraGlassButton>
      </div>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0d0b1a]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Results header */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                  Repositories
                </span>
                <span className="text-[11px] font-mono text-purple-300">
                  {totalCount.toLocaleString()} found
                </span>
              </div>
            )}

            {/* Suggestion items */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto scrollbar-none">
              {suggestions.length > 0
                ? suggestions.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      data-suggestion-item
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.12, delay: index * 0.03 }}
                      onClick={() => handleSelect(repo)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-all duration-100 group/item ${
                        highlightedIndex === index
                          ? 'bg-white/10 border-l-2 border-l-purple-400'
                          : 'border-l-2 border-l-transparent hover:bg-white/5'
                      }`}
                    >
                      {/* Owner Avatar */}
                      <img
                        src={repo.owner?.avatar_url}
                        alt={repo.owner?.login}
                        className="w-9 h-9 rounded-lg border border-white/15 shrink-0 mt-0.5"
                      />

                      {/* Repo Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white truncate group-hover/item:text-purple-300 transition-colors">
                            {highlightMatch(repo.full_name)}
                          </span>
                          <ExternalLink className="w-3 h-3 text-gray-500 shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                          {repo.description || 'No description'}
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-[11px] text-amber-300/90 font-mono">
                            <Star className="w-3 h-3 fill-amber-300/90" />
                            {(repo.stargazers_count / 1000).toFixed(1)}k
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-purple-300/80 font-mono">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count.toLocaleString()}
                          </span>
                          {repo.language && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-gray-300 font-mono uppercase tracking-wider">
                              {repo.language}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                : !isLoading &&
                  !isFetching && (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-gray-400 font-mono">
                        No repos found for "{query}"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Try a different search term
                      </p>
                    </div>
                  )}

              {/* Loading skeleton */}
              {(isLoading || isFetching) && suggestions.length === 0 && (
                <div className="px-4 py-3 space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                      <div className="w-9 h-9 rounded-lg bg-white/10 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 bg-white/10 rounded-md w-3/4" />
                        <div className="h-2.5 bg-white/5 rounded-md w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Keyboard hints footer */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 text-[9px]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 text-[9px]">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400 text-[9px]">esc</kbd>
                    close
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchAutocomplete
