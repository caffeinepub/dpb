import { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkPassword, unlockPassword } from '../game/storage/passwordGate';
import RomanticDecor from '../components/decor/RomanticDecor';
import InstallHeartButton from '../components/pwa/InstallHeartButton';

interface LandingScreenProps {
  onSuccess: () => void;
}

export default function LandingScreen({ onSuccess }: LandingScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkPassword(password)) {
      setError('');
      unlockPassword();
      onSuccess();
    } else {
      setError('That\'s not quite right. Try again!');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black"
    >
      {/* Romantic decor overlay - hearts, flowers, teddies in dark theme */}
      <RomanticDecor variant="mixed" />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/80" />
      
      {/* Install button - heart-shaped, positioned in top right, always visible */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <InstallHeartButton />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md space-y-6 sm:space-y-8">
        {/* Main heading with lock indicator */}
        <div className="text-center space-y-3 sm:space-y-4 px-2 sm:px-4">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 fill-red-600 animate-pulse" />
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 fill-red-500 absolute top-0 left-0 animate-ping opacity-75" />
              {/* Lock indicator overlaid on heart */}
              <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2 border-2 border-red-600">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <p className="text-lg xs:text-xl sm:text-2xl text-gray-200 font-semibold mt-3 sm:mt-4 px-2">
            THE WORLD OF LOVE FOR MY GIRL 💕
          </p>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-4">
            <Lock className="w-4 h-4" />
            <span>Unlock to enter the world of love</span>
          </div>
        </div>

        {/* Description Card with heading */}
        <Card className="bg-gray-900/90 backdrop-blur-md border-red-900/40 shadow-romantic mx-2 sm:mx-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl xs:text-3xl sm:text-4xl font-bold text-red-600 leading-tight break-words hyphens-auto text-center" style={{ wordBreak: 'break-word' }}>
              #PROUDDIKSHUKAGULAM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed text-center">
              hey my bachha dikshu this game I am creating for you so whenever you feel low you can play 2-3 levels and and after wining you will get my reassurnce which will make you happy
            </p>
          </CardContent>
        </Card>

        {/* Password form */}
        <div className={`bg-gray-900/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 md:p-8 shadow-romantic border border-red-900/30 mx-2 sm:mx-0 ${isShaking ? 'animate-shake' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200 flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-600" />
                Enter the secret password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type the magic word..."
                className="border-gray-700 bg-gray-800 text-white focus:border-red-600 focus:ring-red-600 h-11 sm:h-12 text-base"
                autoFocus
              />
            </div>
            
            {error && (
              <div className="p-3 sm:p-4 bg-red-950/50 border border-red-900 rounded-lg">
                <p className="text-sm text-red-300 text-center">
                  {error}
                </p>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-5 sm:py-6 text-base sm:text-lg shadow-romantic"
            >
              Unlock 💖
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
