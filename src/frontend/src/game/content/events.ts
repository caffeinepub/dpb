export interface EventContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'game' | 'romantic';
  interactive?: boolean;
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
  },
  {
    id: 'event-2',
    title: 'Love Quiz Journey',
    subtitle: 'Test Your Love',
    description: '10 levels of romantic questions about our story',
    type: 'game',
  },
  {
    id: 'event-3',
    title: 'LOVE LAUGHS',
    subtitle: 'Hidden Letters of Joy',
    description: 'Discover 10 hidden letters, each filled with 5 jokes celebrating our love story',
    type: 'romantic',
    interactive: true,
  },
  {
    id: 'event-4',
    title: '100 Promises I Kept',
    subtitle: 'Romantic Journey',
    description: 'A calm, emotional journey through 100 promises of love',
    type: 'game',
  },
  {
    id: 'dpb',
    title: 'DPB',
    subtitle: 'Special Question',
    description: 'A very important question for you, my Dikshu',
    type: 'romantic',
    interactive: true,
  },
  {
    id: 'together-forever',
    title: 'Together Forever',
    subtitle: 'Forever Promise',
    description: 'A promise that will last for eternity',
    type: 'romantic',
    interactive: true,
  }
];

export function getEventById(id: string): EventContent | undefined {
  return EVENTS.find(event => event.id === id);
}
