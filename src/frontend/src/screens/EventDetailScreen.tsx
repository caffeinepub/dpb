import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getEventById } from '../game/content/events';
import DPBEventScreen from './romantic/DPBEventScreen';
import TogetherForeverEventScreen from './romantic/TogetherForeverEventScreen';
import LoveLaughsEventScreen from './romantic/LoveLaughsEventScreen';
import PostUnlockHeader from '../components/layout/PostUnlockHeader';

interface EventDetailScreenProps {
  eventId: string;
  onBack: () => void;
}

export default function EventDetailScreen({ eventId, onBack }: EventDetailScreenProps) {
  const event = getEventById(eventId);

  if (!event || event.type !== 'romantic') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 bg-gray-950/85 backdrop-blur-md border-gray-800">
          <p className="text-gray-300">Event not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Route to interactive screens
  if (event.interactive) {
    if (eventId === 'dpb') {
      return <DPBEventScreen onBack={onBack} />;
    }
    if (eventId === 'together-forever') {
      return <TogetherForeverEventScreen onBack={onBack} />;
    }
    if (eventId === 'event-3') {
      return <LoveLaughsEventScreen onBack={onBack} />;
    }
  }

  // Fallback static romantic letter view (should not be reached for event-3 anymore)
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
        {/* Branded header */}
        <PostUnlockHeader />

        {/* Back button */}
        <div className="px-4 pb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 bg-gray-900/80 border-gray-700 text-gray-300 hover:bg-gray-800 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </div>

        {/* Photo section */}
        {event.photo && (
          <div className="w-full px-4 mb-6">
            <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-red-900/40">
              <img 
                src={event.photo} 
                alt={event.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('Failed to load event photo:', event.photo);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Letter section */}
        {event.letter && (
          <div className="px-4 pb-8">
            <Card className="max-w-2xl mx-auto bg-amber-50/95 backdrop-blur-md border-amber-800 shadow-romantic p-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-red-600 fill-red-600 animate-pulse" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 font-serif">
                {event.letter.title}
              </h2>

              <div className="space-y-4 text-gray-800 leading-relaxed">
                {event.letter.body.map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg font-serif">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-amber-800/30 text-center">
                <p className="text-sm text-gray-600 italic">
                  Forever and always 💕
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
