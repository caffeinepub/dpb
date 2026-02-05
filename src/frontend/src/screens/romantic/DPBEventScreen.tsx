import { useState } from 'react';
import { Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import RomanticDecor from '@/components/decor/RomanticDecor';
import { UPLOADED_IMAGES } from '@/game/assets/uploadedImages';

interface DPBEventScreenProps {
  onBack: () => void;
}

const CONVINCING_MESSAGES = [
  "Please, my Dikshu, accept me... 💕",
  "Think about all our beautiful moments together... 💖",
  "My heart beats only for you, Dikshu. Please say yes! ❤️",
  "I can't imagine my life without you, Dikshu... 🌹",
  "You're my everything, Dikshu. Please give me a chance! 💝",
  "Every moment with you is magical. Say yes! ✨",
  "I promise to love you forever, Dikshu. Please! 💍",
  "You make my world complete. Say yes, my love! 🌟",
  "I'll make you the happiest person alive, I promise! 💞",
  "Our love story deserves a happy ending. Say yes! 📖"
];

const HIDDEN_LETTER_TEXT = `Hey mazi dikshu thank you tumne yes dabaya but I know you don't really mean it 
And I know that you don't love me now 
You know dikshita you are smart and geniuse but in terms of duniyadaari I you are just a little girls for me I always saw you as my little girl you made your decision it's okay but you my life experiance know that you will realise that you were very wrong to make that decision of breaking up that bond now you pressed yes in just fun but I'm real you know your heart also know that it's yes because you feel very comfortable with me you laugh with me you can share with me anything you have the best bond with me although your brain is thinking different but your heart knows it's truly yes 
Dikshita and muze pata hai tum abhi choti bachi ho aur tumhare sochne ki capacity nahi hai but I know kuch saalo me tum smaj jaaogi is rishte ki real value aur iss bond ki real value and I am not convincing you you understand me i don't want you to understand me i just want you to understand yourself what actually your hearts like like I will give you example 
If there is a a who stays happy with disabled guys then why will she marry any good guy 
Just in the pressure of society and the brain 
But she will stay happy if she listen to her heart just like that you are not understanding and I know that you will understand that and I have no role in that you find your happiness and styay happy I am not saying include me in your life it's your choice and my to add you in my life that's my choice 
So understand yourself and be happy always I will be there always
Just play all the games and be happy and know that I am here`;

export default function DPBEventScreen({ onBack }: DPBEventScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [hiddenLetterOpen, setHiddenLetterOpen] = useState(false);

  const handleNoClick = () => {
    // Cycle to next message
    setMessageIndex((prev) => (prev + 1) % CONVINCING_MESSAGES.length);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const handleHiddenLetterToggle = () => {
    setHiddenLetterOpen((prev) => !prev);
  };

  // Calculate Yes button size based on message index (number of No clicks)
  const yesScale = Math.min(1 + (messageIndex * 0.15), 2.5);
  const yesPadding = Math.min(0.75 + (messageIndex * 0.15), 1.5);

  if (accepted) {
    // Celebration screen
    const celebrationPhotos = [
      UPLOADED_IMAGES[5],
      UPLOADED_IMAGES[12],
      UPLOADED_IMAGES[20],
      UPLOADED_IMAGES[28]
    ];

    return (
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.85 0.15 350 / 1) 0%, oklch(0.90 0.12 20 / 1) 50%, oklch(0.88 0.14 340 / 1) 100%)',
        }}
      >
        <RomanticDecor variant="mixed" />
        
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 bg-white/80 border-pink-300 text-pink-700 hover:bg-white"
          >
            ← Back to Events
          </Button>

          <div className="space-y-8 animate-in fade-in duration-1000">
            {/* Celebration Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-3 text-5xl animate-bounce">
                💐 🎉 💕 🎊 💖
              </div>
              <h1 
                className="text-4xl md:text-5xl font-bold text-pink-700 drop-shadow-lg"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Yay! Now you are Dikshita Parth Bhagat! 💍
              </h1>
              <div className="flex justify-center gap-3 text-4xl">
                🌹 🧸 🎁 🌺 🧸
              </div>
            </div>

            {/* Hidden Letter Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleHiddenLetterToggle}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 animate-in zoom-in"
                style={{ animationDelay: '600ms' }}
              >
                {hiddenLetterOpen ? (
                  <>
                    <Unlock className="w-6 h-6 mr-2" />
                    Hide Secret Letter 🔓
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6 mr-2" />
                    Reveal Hidden Letter 🔒
                  </>
                )}
              </Button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              {celebrationPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="rounded-lg overflow-hidden shadow-2xl border-4 border-pink-300 animate-in zoom-in duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img 
                    src={`/assets/${photo}`}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Love Letter */}
            <Card className="bg-white/95 backdrop-blur-md border-pink-300 shadow-2xl p-8 animate-in slide-in-from-bottom duration-1000">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-pink-600 fill-pink-600 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold text-center text-pink-700 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                My Dearest Dikshu 💕
              </h2>

              <div className="space-y-4 text-gray-800 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                <p className="text-lg">
                  My beautiful Dikshu, from the moment I met you, I knew you were the one. Your smile lights up my darkest days, and your love gives me strength to face anything.
                </p>
                <p className="text-lg">
                  Every moment with you is a treasure. Whether we're laughing together, sharing momos, watching our favorite shows, or just sitting in comfortable silence, I feel complete. You are my best friend, my partner, and my soulmate.
                </p>
                <p className="text-lg">
                  I promise to love you unconditionally, to support your dreams, to hold your hand through every challenge, and to celebrate every victory with you. I promise to make you laugh when you're sad, to comfort you when you're worried, and to remind you every single day how incredibly special you are.
                </p>
                <p className="text-lg">
                  Thank you for saying yes to forever with me. I can't wait to build our beautiful life together, to create countless memories, and to love you more with each passing day.
                </p>
                <p className="text-lg font-semibold text-pink-700">
                  You are my everything, Dikshita Parth Bhagat. I love you endlessly. 💖
                </p>
                <p className="text-right text-lg italic text-pink-600 mt-6">
                  Forever yours,<br />
                  Parth (Your Bunny) 🐰💕
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-pink-300 text-center">
                <div className="flex justify-center gap-2 text-3xl mb-3">
                  💍 💕 💐 💖 🌹
                </div>
                <p className="text-sm text-gray-600 italic">
                  Together forever and always 💕
                </p>
              </div>
            </Card>

            {/* Hidden Letter Card */}
            {hiddenLetterOpen && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-md border-purple-300 shadow-2xl p-8 animate-in slide-in-from-bottom duration-700">
                <div className="flex items-center justify-center mb-6">
                  <Unlock className="w-10 h-10 text-purple-600 animate-pulse" />
                </div>
                
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Hidden Letter 💜
                </h2>

                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem' }}>
                  {HIDDEN_LETTER_TEXT}
                </div>

                <div className="mt-8 pt-6 border-t border-purple-300 text-center">
                  <div className="flex justify-center gap-2 text-3xl mb-3">
                    💜 🔓 💭 🌟 💜
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    From the heart, with truth 💜
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const currentMessage = messageIndex > 0 ? CONVINCING_MESSAGES[messageIndex - 1] : null;

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, oklch(0.85 0.15 350 / 1) 0%, oklch(0.90 0.12 20 / 1) 50%, oklch(0.88 0.14 340 / 1) 100%)',
      }}
    >
      <RomanticDecor variant="mixed" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <Button
          onClick={onBack}
          variant="outline"
          className="absolute top-0 left-0 bg-white/80 border-pink-300 text-pink-700 hover:bg-white"
        >
          ← Back
        </Button>

        <Card className="bg-white/95 backdrop-blur-md border-pink-300 shadow-2xl p-8 md:p-12 mt-16">
          <div className="text-center space-y-8">
            {/* Romantic decorative elements */}
            <div className="flex justify-center gap-3 text-4xl animate-pulse">
              💕 💖 💕
            </div>

            {/* The Question */}
            <h1 
              className="text-3xl md:text-5xl font-bold text-pink-700 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Will you marry me, my Dikshu? 💍
            </h1>

            <div className="flex justify-center gap-3 text-3xl">
              🌹 💐 🌹
            </div>

            {/* Convincing message */}
            {currentMessage && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <p className="text-xl text-pink-600 font-semibold italic">
                  {currentMessage}
                </p>
              </div>
            )}

            {/* Buttons - Using grid layout to prevent overlap */}
            <div className="grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto">
              <Button
                onClick={handleYesClick}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl col-span-1"
                style={{
                  fontSize: `${yesScale}rem`,
                  padding: `${yesPadding}rem`,
                  minHeight: '3rem',
                }}
              >
                Yes! 💖
              </Button>

              <Button
                onClick={handleNoClick}
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold col-span-1 min-h-[3rem]"
              >
                No
              </Button>
            </div>

            <div className="flex justify-center gap-2 text-2xl pt-4">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              <Heart className="w-6 h-6 text-pink-600 fill-pink-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
