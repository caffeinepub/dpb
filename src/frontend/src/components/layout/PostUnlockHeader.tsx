import { Heart } from 'lucide-react';

export default function PostUnlockHeader() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Romantic decorative flourish background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/romantic-header-flourish.dim_1200x300.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, oklch(0.08 0.02 0 / 0.3), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-8 px-4 space-y-3">
        {/* Logo with romantic glow */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-red-600/30 rounded-full animate-pulse" />
          <img 
            src="/assets/file_000000007b7c7206b4fb54a3c1ce9985.png" 
            alt="DPB Logo" 
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Heading with decorative hearts */}
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 drop-shadow-lg tracking-wide">
            DPB
          </h1>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500 animate-pulse" />
        </div>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-300 text-center italic">
          A world of love, joy & promises
        </p>
      </div>
    </div>
  );
}
