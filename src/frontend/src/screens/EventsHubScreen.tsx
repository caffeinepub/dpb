import { Heart, Gamepad2, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { EVENTS } from '../game/content/events';

interface EventsHubScreenProps {
  onEventSelect: (eventId: string) => void;
  gameplayDisabled?: boolean;
}

export default function EventsHubScreen({ onEventSelect, gameplayDisabled = false }: EventsHubScreenProps) {
  return (
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, oklch(0.08 0.02 0 / 1), oklch(0.05 0.01 0 / 1))',
      }}
    >
      {/* Dark romantic vignette overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.03 0.01 0 / 0.6) 50%, oklch(0.02 0.01 0 / 0.9) 100%)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 space-y-8 py-8">
        <div className="text-center space-y-3">
          <Heart className="w-16 h-16 text-red-600 fill-red-600 mx-auto animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 drop-shadow-lg">
            Choose Your Experience
          </h1>
          <p className="text-gray-300 text-lg">
            Three ways to feel the love
          </p>
        </div>

        <div className="space-y-4">
          {EVENTS.map((event, index) => {
            const Icon = event.type === 'game' ? Gamepad2 : Mail;
            const iconColor = event.type === 'game' ? 'text-purple-500' : 'text-pink-500';
            const bgColor = event.type === 'game' ? 'bg-purple-950/40' : 'bg-pink-950/40';
            const borderColor = event.type === 'game' ? 'border-purple-800' : 'border-pink-800';
            const hoverBg = event.type === 'game' ? 'hover:bg-purple-900/50' : 'hover:bg-pink-900/50';
            
            // Disable game event if progress is still loading
            const isDisabled = event.type === 'game' && gameplayDisabled;
            const cursorClass = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';
            const opacityClass = isDisabled ? 'opacity-60' : '';

            return (
              <Card 
                key={event.id}
                className={`${bgColor} ${borderColor} backdrop-blur-md transition-all duration-300 ${!isDisabled ? hoverBg : ''} ${cursorClass} ${opacityClass} group`}
                onClick={() => !isDisabled && onEventSelect(event.id)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-black/40 ${iconColor} ${!isDisabled ? 'group-hover:scale-110' : ''} transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Event {index + 1}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${event.type === 'game' ? 'bg-purple-900/60 text-purple-300' : 'bg-pink-900/60 text-pink-300'}`}>
                          {event.subtitle}
                        </span>
                      </div>
                      <CardTitle className={`text-xl text-gray-100 ${!isDisabled ? 'group-hover:text-white' : ''} transition-colors`}>
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        {event.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${event.type === 'game' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-pink-600 hover:bg-pink-700'} text-white font-semibold`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDisabled) {
                        onEventSelect(event.id);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    {isDisabled ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        {event.type === 'game' ? 'Start Playing' : 'Open Letter'} 💖
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Made with love by Bunny for Chiuuu 💕
          </p>
        </div>
      </div>
    </div>
  );
}
