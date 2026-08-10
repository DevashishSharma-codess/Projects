import { ArrowUpRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-20 pb-0 overflow-hidden relative flex flex-col items-center justify-between">
      
      {/* TOP CALL-TO-ACTION SECTION */}
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6 px-6 z-10">
        
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Start your free trial today
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
          The fit-for-purpose tool for planning and building modern software products.
        </p>

        {/* Call to Action Button */}
        <button
          onClick={() => {
            const section2 = document.getElementById('section2')
            if (section2) {
              const yOffset = -110
              const y = section2.getBoundingClientRect().top + window.pageYOffset + yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
            }
          }}
          className="mt-2 px-8 py-3.5 bg-white text-black font-extrabold text-sm sm:text-base rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
        >
          Get started
        </button>

      </div>

      {/* NAVIGATION LINKS ROW */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 mt-16 mb-12 px-6 z-10">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm font-medium text-gray-300">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
            Twitter <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>

        {/* Secondary Sub-Links */}
        <div className="text-xs text-gray-500 font-light mt-1">
          <a href="#privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
        </div>
      </div>

      {/* MASSIVE BRAND TYPOGRAPHY AT THE VERY BOTTOM ("mainline") */}
      <div className="w-full flex justify-center items-end overflow-hidden leading-none select-none pointer-events-none mt-4">
        <h1 className="font-editorial-sans font-extrabold tracking-tighter text-[16vw] sm:text-[18vw] lg:text-[20vw] leading-[0.75] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/5 drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
          <span>main</span>
          <span className="font-editorial-serif font-black italic -skew-x-12 inline-block text-transparent bg-clip-text bg-gradient-to-t from-cyan-400 via-sky-300 to-white drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]">L</span>
          <span>ine</span>
        </h1>
      </div>

    </footer>
  )
}

export default Footer
