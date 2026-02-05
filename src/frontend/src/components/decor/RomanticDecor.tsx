import { Heart } from 'lucide-react';

interface RomanticDecorProps {
  variant?: 'hearts' | 'flowers' | 'teddies' | 'mixed';
}

export default function RomanticDecor({ variant = 'mixed' }: RomanticDecorProps) {
  const renderHearts = () => (
    <>
      {/* Soft pastel hearts scattered around */}
      <Heart className="absolute top-8 left-8 w-8 h-8 text-pink-300 fill-pink-300 opacity-40 animate-float" />
      <Heart className="absolute top-16 right-12 w-6 h-6 text-pink-200 fill-pink-200 opacity-35 animate-float delay-150" />
      <Heart className="absolute bottom-20 left-16 w-7 h-7 text-rose-300 fill-rose-300 opacity-45 animate-float delay-300" />
      <Heart className="absolute bottom-32 right-8 w-5 h-5 text-pink-200 fill-pink-200 opacity-40 animate-float delay-450" />
      <Heart className="absolute top-1/3 right-1/4 w-6 h-6 text-rose-200 fill-rose-200 opacity-50 animate-float delay-600" />
      <Heart className="absolute bottom-1/3 left-1/4 w-5 h-5 text-pink-300 fill-pink-300 opacity-45 animate-float delay-750" />
    </>
  );

  const renderFlowers = () => (
    <>
      {/* Soft flowers with reduced opacity */}
      <div className="absolute top-12 right-16 text-3xl opacity-25 animate-float">🌸</div>
      <div className="absolute bottom-24 left-12 text-2xl opacity-20 animate-float delay-150">🌺</div>
      <div className="absolute top-1/3 left-8 text-2xl opacity-23 animate-float delay-300">🌷</div>
      <div className="absolute bottom-1/2 right-20 text-xl opacity-20 animate-float delay-450">🌹</div>
    </>
  );

  const renderTeddies = () => (
    <>
      {/* Soft teddies with subtle presence */}
      <div className="absolute top-20 left-1/4 text-4xl opacity-15 animate-float">🧸</div>
      <div className="absolute bottom-28 right-1/4 text-3xl opacity-18 animate-float delay-150">🧸</div>
      <div className="absolute top-1/2 right-12 text-2xl opacity-12 animate-float delay-300">🧸</div>
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
