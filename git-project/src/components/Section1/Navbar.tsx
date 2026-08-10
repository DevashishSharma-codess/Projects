import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleFeaturedReposClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const section2 = document.getElementById('section2')
        if (section2) {
          const yOffset = -110
          const y = section2.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    } else {
      const section2 = document.getElementById('section2')
      if (section2) {
        const yOffset = -110
        const y = section2.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className='min-h-[85px] py-3 w-full flex items-center justify-between px-4 sm:px-8 lg:px-12 bg-black/95 backdrop-blur-2xl border-b border-white/10 text-white z-50 sticky top-0 left-0 right-0 shadow-2xl'>

      {/* Brand Header: "mainline" with custom stylized "L" Logo */}
      <Link to="/" className="flex items-center no-underline">
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black font-editorial-sans tracking-tighter uppercase text-white flex items-center select-none cursor-pointer'>
          <span>main</span>
          {/* Custom Stylized Logo "L" */}
          <span className="inline-block mx-0.5 text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 via-purple-400 to-white font-editorial-serif font-black italic -skew-x-12 scale-110 drop-shadow-[0_0_16px_rgba(56,189,248,0.9)]">
            L
          </span>
          <span>ine</span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className='flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-gray-300'>
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>

        <Link to="/repos" className="hover:text-white transition-colors">
          All Repos
        </Link>

        <a
          href="#section2"
          onClick={handleFeaturedReposClick}
          className="hover:text-white transition-colors whitespace-nowrap"
        >
          Featured Repos
        </a>
        <a href="#pricing" className="hidden sm:inline-block hover:text-white transition-colors">Pricing</a>
        <a href="#contact" className="hidden sm:inline-block hover:text-white transition-colors">Contact</a>
      </div>

    </nav>
  )
}

export default Navbar