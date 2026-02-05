import { useState } from 'react';
import { ArrowLeft, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getJokesForLetter } from '@/game/content/event3LoveLaughsJokes';
import { UPLOADED_IMAGES } from '@/game/assets/uploadedImages';

interface LoveLaughsEventScreenProps {
  onBack: () => void;
}

export default function LoveLaughsEventScreen({ onBack }: LoveLaughsEventScreenProps) {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  const handleLetterClick = (letterNumber: number) => {
    setSelectedLetter(letterNumber);
  };

  const handleCloseModal = () => {
    setSelectedLetter(null);
  };

  const getImageForJoke = (jokeIndex: number): string => {
    const imageIndex = jokeIndex % UPLOADED_IMAGES.length;
    return `/assets/${UPLOADED_IMAGES[imageIndex]}`;
  };

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
        {/* Back button */}
        <div className="p-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 bg-gray-900/80 border-gray-700 text-gray-300 hover:bg-gray-800 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </div>

        {/* Title section */}
        <div className="px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-100 mb-3 font-serif">
            LOVE LAUGHS
          </h1>
          <p className="text-gray-300 text-lg">
            Discover 10 hidden letters filled with jokes about our love story
          </p>
        </div>

        {/* Letters list - vertical stacked */}
        <div className="px-4 pb-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((letterNumber) => (
              <button
                key={letterNumber}
                onClick={() => handleLetterClick(letterNumber)}
                className="w-full group"
              >
                <Card className="w-full p-6 bg-amber-50/95 backdrop-blur-md border-amber-800 shadow-romantic hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-6 cursor-pointer">
                  <Mail className="w-12 h-12 text-red-600 group-hover:text-red-700 transition-colors flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <span className="text-2xl font-bold text-gray-900 block">
                      Hidden Letter {letterNumber}
                    </span>
                    <span className="text-sm text-gray-600">
                      Tap to reveal 5 jokes
                    </span>
                  </div>
                  <div className="text-rose-600 text-xl flex-shrink-0">→</div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for letter reveal */}
      <Dialog open={selectedLetter !== null} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-amber-50/98 backdrop-blur-md border-amber-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 font-serif flex items-center justify-between">
              <span>Hidden Letter {selectedLetter}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseModal}
                className="text-gray-700 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            {selectedLetter && (
              <div className="space-y-6 py-4">
                {getJokesForLetter(selectedLetter).map((joke, index) => {
                  const globalJokeIndex = (selectedLetter - 1) * 5 + index;
                  const imagePath = getImageForJoke(globalJokeIndex);
                  
                  return (
                    <Card key={index} className="p-4 bg-white/80 border-amber-700/30 shadow-md">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Image */}
                        <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                          <img
                            src={imagePath}
                            alt={`Joke ${globalJokeIndex + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">Image unavailable</div>';
                              }
                            }}
                          />
                        </div>

                        {/* Joke text */}
                        <div className="flex-1 flex items-center">
                          <p className="text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-line">
                            {joke}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <div className="pt-4 border-t border-amber-800/30 text-center">
            <Button
              onClick={handleCloseModal}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
