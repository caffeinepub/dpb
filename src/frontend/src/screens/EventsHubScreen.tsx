import { Gamepad2, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { EVENTS } from '../game/content/events';
import PostUnlockHeader from '../components/layout/PostUnlockHeader';

interface EventsHubScreenProps {
  onEventSelect: (eventId: string) => void;
  mainGameDisabled?: boolean;
  promisesKeptGameDisabled?: boolean;
  quizGameDisabled?: boolean;
}

export default function EventsHubScreen({ 
  onEventSelect, 
  mainGameDisabled = false, 
  promisesKeptGameDisabled = false,
  quizGameDisabled = false 
}: EventsHubScreenProps) {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
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

      <div className="relative z-10">
        {/* Branded header with logo and DPB heading */}
        <PostUnlockHeader />

        {/* Events content */}
        <div className="max-w-2xl mx-auto px-6 pb-8 space-y-6">
          <p className="text-gray-300 text-lg text-center">
            world of joy for my dikshu
          </p>

          <div className="space-y-4">
            {EVENTS.map((event, index) => {
              const Icon = event.type === 'game' ? Gamepad2 : Mail;
              const iconColor = event.type === 'game' ? 'text-purple-500' : 'text-pink-500';
              const bgColor = event.type === 'game' ? 'bg-purple-950/40' : 'bg-pink-950/40';
              const borderColor = event.type === 'game' ? 'border-purple-800' : 'border-pink-800';
              const hoverBg = event.type === 'game' ? 'hover:bg-purple-900/50' : 'hover:bg-pink-900/50';
              
              // Disable game events if progress is still loading
              const isDisabled = event.type === 'game' && (
                (event.id === 'event-1' && mainGameDisabled) ||
                (event.id === 'event-4' && promisesKeptGameDisabled) ||
                (event.id === 'event-2' && quizGameDisabled)
              );
              const cursorClass = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';
              const opacityClass = isDisabled ? 'opacity-60' : '';

              // Determine button text based on event type
              const buttonText = event.type === 'game' 
                ? 'Start Playing' 
                : event.interactive 
                  ? 'Open Experience'
                  : 'Open Letter';

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
                          {buttonText} 💖
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
    </div>
  );
}
