import 'remixicon/fonts/remixicon.css'
import githubRainbowLogo from '../../assets/github-rainbow-logo.png'

const LeftContent = () => {
  const handleScrollToSection2 = () => {
    const section2 = document.getElementById('section2')
    if (section2) {
      const yOffset = -110
      const y = section2.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div className='w-full lg:w-1/2 min-h-full text-white flex flex-col justify-center items-start px-6 sm:px-12 lg:pl-16 lg:pr-8 py-8 lg:py-12 bg-black'>

      {/* Spaced container covering height with responsive font sizing */}
      <div className='w-full max-w-xl flex flex-col justify-between gap-8 py-2'>
        
        {/* Main Hero Heading */}
        <div className='flex flex-col justify-between gap-2 sm:gap-4'>
          <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[8.5rem] font-normal leading-[0.9] tracking-tight text-white uppercase selection:bg-purple-600'>
            GitHub
          </h1>

          {/* PR [RAINBOW CIRCLE LOGO "O"] FILE */}
          <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[8.5rem] font-normal leading-[0.9] tracking-tight text-white uppercase selection:bg-purple-600 flex items-center gap-1 sm:gap-2'>
            <span>PR</span>
            <span className="inline-flex items-center justify-center rounded-full overflow-hidden w-[0.78em] h-[0.78em] border-2 border-white/20 group hover:scale-110 transition-transform duration-300 mx-0.5 cursor-pointer">
              <img
                src={githubRainbowLogo}
                alt="O"
                className="w-full h-full object-cover rounded-full group-hover:rotate-12 transition-transform duration-500"
              />
            </span>
            <span>FILE</span>
          </h1>

          <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[8.5rem] font-normal leading-[0.9] tracking-tight text-white uppercase selection:bg-purple-600'>
            Finder
          </h1>
        </div>

        {/* Interactive Arrow Button at the bottom */}
        <button 
          onClick={handleScrollToSection2}
          className='group cursor-pointer inline-block self-start pt-2 border-none bg-transparent outline-none text-left'
          title="Scroll to Section 2"
          aria-label="Scroll to Section 2"
        >
          <div className='text-6xl sm:text-7xl lg:text-8xl text-white group-hover:translate-x-4 group-hover:-translate-y-2 transition-transform duration-200 ease-out flex items-center gap-2'>
            <i className="ri-arrow-right-fill" />
          </div>
        </button>

      </div>

    </div>
  )
}

export default LeftContent