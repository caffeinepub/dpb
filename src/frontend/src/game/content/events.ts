export interface EventContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'game' | 'romantic';
  gameId?: string;
  photo?: string;
  letter?: {
    title: string;
    body: string[];
  };
}

export const EVENTS: EventContent[] = [
  {
    id: 'event-1',
    title: 'The Game of Love',
    subtitle: 'Play & Win',
    description: 'Solve puzzles and unlock love letters from Bunny',
    type: 'game',
    gameId: 'default',
  },
  {
    id: 'event-2',
    title: 'A Moment Together',
    subtitle: 'Romantic Memory',
    description: 'A special memory captured in time',
    type: 'romantic',
    photo: '/assets/generated/event-2-photo.dim_1024x1024.png',
    letter: {
      title: 'My Dearest Chiuuu',
      body: [
        'Every moment with you feels like a dream I never want to wake up from. When I look at this photo, I remember how your smile lights up my entire world. You are my happiness, my peace, and my forever.',
        'I promise to always be there for you, through every laugh and every tear. You make me want to be a better person every single day. Your love has transformed my life in ways I never imagined possible.',
        'Thank you for being you - for your kindness, your warmth, and the way you make everything feel magical. I love you more than words can express, my beautiful Dikshita.',
        'Forever yours, Bunny (Chotu) 💖'
      ]
    }
  },
  {
    id: 'event-3',
    title: 'Our Forever Promise',
    subtitle: 'Love Letter',
    description: 'Words from the heart, sealed with love',
    type: 'romantic',
    photo: '/assets/generated/event-3-photo.dim_1024x1024.png',
    letter: {
      title: 'To My One and Only',
      body: [
        'Chiuuu, my love, every day with you is a blessing. I want you to know that no matter what happens, I will always stand by your side. You are my strength when I feel weak, and my joy when the world feels heavy.',
        'I promise to love you unconditionally, to support your dreams, and to cherish every moment we share together. Whether we\'re watching Netflix, eating momos, or just talking about our day, every second with you is precious.',
        'You are my best friend, my partner, and my soulmate. I can\'t wait to create a lifetime of beautiful memories with you. Thank you for choosing me, for loving me, and for being the most amazing person I know.',
        'I love you endlessly, now and forever. With all my heart, Bunny 💕'
      ]
    }
  },
  {
    id: 'event-4',
    title: '100 Promises I Kept',
    subtitle: 'Romantic Journey',
    description: 'A gentle game of love, patience, and promises',
    type: 'game',
    gameId: 'promises-100',
    photo: '/assets/generated/event-4-photo.dim_1024x1024.png',
  }
];

export function getEventById(id: string): EventContent | undefined {
  return EVENTS.find(event => event.id === id);
}
