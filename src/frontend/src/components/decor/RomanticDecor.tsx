import { Heart } from 'lucide-react';

interface RomanticDecorProps {
  variant?: 'hearts' | 'flowers' | 'teddies' | 'mixed';
}

export default function RomanticDecor({ variant = 'mixed' }: RomanticDecorProps) {
  const renderHearts = () => (
    <>
      {/* Black/dark hearts scattered around */}
      <Heart className="absolute top-8 left-8 w-8 h-8 text-gray-800 fill-gray-800 opacity-30 animate-float" />
      <Heart className="absolute top-16 right-12 w-6 h-6 text-gray-700 fill-gray-700 opacity-25 animate-float delay-150" />
      <Heart className="absolute bottom-20 left-16 w-7 h-7 text-gray-800 fill-gray-800 opacity-35 animate-float delay-300" />
      <Heart className="absolute bottom-32 right-8 w-5 h-5 text-gray-700 fill-gray-700 opacity-30 animate-float delay-450" />
      <Heart className="absolute top-1/3 right-1/4 w-6 h-6 text-red-950 fill-red-950 opacity-40 animate-float delay-600" />
      <Heart className="absolute bottom-1/3 left-1/4 w-5 h-5 text-red-950 fill-red-950 opacity-35 animate-float delay-750" />
    </>
  );

  const renderFlowers = () => (
    <>
      {/* Dark roses and flowers with reduced opacity */}
      <div className="absolute top-12 right-16 text-3xl opacity-20 animate-float grayscale-[50%]">🌹</div>
      <div className="absolute bottom-24 left-12 text-2xl opacity-15 animate-float delay-150 grayscale-[50%]">🌹</div>
      <div className="absolute top-1/3 left-8 text-2xl opacity-18 animate-float delay-300 grayscale-[60%]">🥀</div>
      <div className="absolute bottom-1/2 right-20 text-xl opacity-15 animate-float delay-450 grayscale-[50%]">🌺</div>
    </>
  );

  const renderTeddies = () => (
    <>
      {/* Dark teddies with subtle presence */}
      <div className="absolute top-20 left-1/4 text-4xl opacity-12 animate-float grayscale-[70%]">🧸</div>
      <div className="absolute bottom-28 right-1/4 text-3xl opacity-15 animate-float delay-150 grayscale-[70%]">🧸</div>
      <div className="absolute top-1/2 right-12 text-2xl opacity-10 animate-float delay-300 grayscale-[80%]">🧸</div>
    </>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {(variant === 'hearts' || variant === 'mixed') && renderHearts()}
      {(variant === 'flowers' || variant === 'mixed') && renderFlowers()}
      {(variant === 'teddies' || variant === 'mixed') && renderTeddies()}
    </div>
  );
}
