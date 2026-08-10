import React from 'react'

interface AuraGlassButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  title?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

export const AuraGlassButton: React.FC<AuraGlassButtonProps> = ({
  children,
  onClick,
  className = '',
  title,
  type = 'button',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-xs sm:text-sm',
    lg: 'px-8 py-4 text-sm sm:text-base font-extrabold'
  }[size]

  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className={`group relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none ${sizeClasses} ${className}`}
    >
      {/* 🛡️ 3D Dark Glass Capsule Body */}
      <span className="absolute inset-0 rounded-full bg-[#0d0e19]/90 backdrop-blur-2xl border border-white/25 shadow-[0_12px_30px_rgba(0,0,0,0.95),_inset_0_2px_5px_rgba(255,255,255,0.45),_inset_0_-4px_10px_rgba(0,0,0,0.7)] group-hover:border-white/50 group-hover:bg-[#131526]/95 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.95),_inset_0_3px_8px_rgba(255,255,255,0.65)] transition-all duration-200 z-10 pointer-events-none" />

      {/* 💎 Glass Top Reflection Highlight Gradient */}
      <span className="absolute top-0 left-3 right-3 h-1/2 rounded-t-full bg-gradient-to-b from-white/35 via-white/10 to-transparent z-15 pointer-events-none" />

      {/* 📝 Button Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 text-white font-mono tracking-wide drop-shadow-md">
        {children}
      </span>
    </button>
  )
}

export default AuraGlassButton
