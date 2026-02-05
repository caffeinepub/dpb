import type { QuizLevel } from '../types';

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    levelNumber: 1,
    title: 'BASIC LOVE',
    questions: [
      {
        id: 1,
        question: 'What is her full name?',
        options: [
          { text: 'Dikshita', isCorrect: true },
          { text: 'Diksha', isCorrect: false },
          { text: 'Disha', isCorrect: false },
          { text: 'Divya', isCorrect: false },
        ],
      },
      {
        id: 2,
        question: 'What do I call her?',
        options: [
          { text: 'Dikshu', isCorrect: false },
          { text: 'Baby', isCorrect: false },
          { text: 'Chiuuuu', isCorrect: true },
          { text: 'Sweetu', isCorrect: false },
        ],
      },
      {
        id: 3,
        question: 'What is my name?',
        options: [
          { text: 'Bunny', isCorrect: true },
          { text: 'Sunny', isCorrect: false },
          { text: 'Chintu', isCorrect: false },
          { text: 'Bittu', isCorrect: false },
        ],
      },
      {
        id: 4,
        question: 'What does she call me?',
        options: [
          { text: 'Bunny', isCorrect: false },
          { text: 'Chotu', isCorrect: true },
          { text: 'Baby', isCorrect: false },
          { text: 'Hero', isCorrect: false },
        ],
      },
      {
        id: 5,
        question: 'Who is always a winner for me?',
        options: [
          { text: 'Me', isCorrect: false },
          { text: 'Friends', isCorrect: false },
          { text: 'Dikshita', isCorrect: true },
          { text: 'No one', isCorrect: false },
        ],
      },
      {
        id: 6,
        question: 'What word does she say very often?',
        options: [
          { text: 'Maybe', isCorrect: false },
          { text: 'Okay', isCorrect: false },
          { text: 'Pata nahi', isCorrect: true },
          { text: 'Whatever', isCorrect: false },
        ],
      },
      {
        id: 7,
        question: 'What does she like to do a lot?',
        options: [
          { text: 'Study', isCorrect: false },
          { text: 'Sleep', isCorrect: true },
          { text: 'Travel', isCorrect: false },
          { text: 'Shop', isCorrect: false },
        ],
      },
      {
        id: 8,
        question: 'What is her favorite chocolate?',
        options: [
          { text: 'Dairy Milk', isCorrect: false },
          { text: 'KitKat', isCorrect: false },
          { text: 'Galaxy', isCorrect: true },
          { text: 'Five Star', isCorrect: false },
        ],
      },
      {
        id: 9,
        question: 'What sport does she play?',
        options: [
          { text: 'Cricket', isCorrect: false },
          { text: 'Tennis', isCorrect: false },
          { text: 'Badminton', isCorrect: true },
          { text: 'Football', isCorrect: false },
        ],
      },
      {
        id: 10,
        question: 'How does she treat me playfully?',
        options: [
          { text: 'Ignores', isCorrect: false },
          { text: 'Roasts me a lot', isCorrect: true },
          { text: 'Scolds', isCorrect: false },
          { text: 'Avoids', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu my chiuuuu ❤️
Just like these easy questions,
loving you comes naturally to me.
You are my first thought and my forever answer.
— Your Chotu 😘`,
  },
  {
    levelNumber: 2,
    title: 'FOOD & HABITS',
    questions: [
      {
        id: 11,
        question: 'What food does she love the most?',
        options: [
          { text: 'Pizza', isCorrect: false },
          { text: 'Burger', isCorrect: false },
          { text: 'Momos', isCorrect: true },
          { text: 'Pasta', isCorrect: false },
        ],
      },
      {
        id: 12,
        question: 'From where does she like momos?',
        options: [
          { text: 'Sadar', isCorrect: false },
          { text: 'Jaripatka', isCorrect: true },
          { text: 'Itwari', isCorrect: false },
          { text: 'Dharampeth', isCorrect: false },
        ],
      },
      {
        id: 13,
        question: 'What dairy product does she love?',
        options: [
          { text: 'Ice cream', isCorrect: false },
          { text: 'Milk', isCorrect: false },
          { text: 'Milky Mist curd', isCorrect: true },
          { text: 'Butter', isCorrect: false },
        ],
      },
      {
        id: 14,
        question: 'What does she enjoy doing on weekends?',
        options: [
          { text: 'Party', isCorrect: false },
          { text: 'Sleeping', isCorrect: true },
          { text: 'Shopping', isCorrect: false },
          { text: 'Cooking', isCorrect: false },
        ],
      },
      {
        id: 15,
        question: 'What does she watch a lot?',
        options: [
          { text: 'TV serials', isCorrect: false },
          { text: 'YouTube', isCorrect: false },
          { text: 'Netflix movies', isCorrect: true },
          { text: 'News', isCorrect: false },
        ],
      },
      {
        id: 16,
        question: 'What does she prefer more?',
        options: [
          { text: 'Fast food', isCorrect: false },
          { text: 'Healthy food', isCorrect: false },
          { text: 'Momos', isCorrect: true },
          { text: 'Street food', isCorrect: false },
        ],
      },
      {
        id: 17,
        question: 'Which habit of hers is cutest?',
        options: [
          { text: 'Roasting', isCorrect: false },
          { text: 'Sleeping a lot', isCorrect: true },
          { text: 'Studying', isCorrect: false },
          { text: 'Scrolling phone', isCorrect: false },
        ],
      },
      {
        id: 18,
        question: 'What snack reminds me of her?',
        options: [
          { text: 'Chips', isCorrect: false },
          { text: 'Chocolate', isCorrect: false },
          { text: 'Momos', isCorrect: true },
          { text: 'Sandwich', isCorrect: false },
        ],
      },
      {
        id: 19,
        question: 'What flavor of life does she add?',
        options: [
          { text: 'Spicy', isCorrect: false },
          { text: 'Sweet', isCorrect: false },
          { text: 'Comforting', isCorrect: true },
          { text: 'Bitter', isCorrect: false },
        ],
      },
      {
        id: 20,
        question: 'Who loves her eating habits?',
        options: [
          { text: 'Friends', isCorrect: false },
          { text: 'Me (Bunny)', isCorrect: true },
          { text: 'Everyone', isCorrect: false },
          { text: 'Nobody', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu ❤️
I love you the way you love momos,
especially those Jaripatka ones 😋
Every bite, every smile, every moment with you
feels perfect.
— Chotu 😘`,
  },
  {
    levelNumber: 3,
    title: 'ENTERTAINMENT',
    questions: [
      {
        id: 21,
        question: 'What platform does she love watching movies on?',
        options: [
          { text: 'Amazon Prime', isCorrect: false },
          { text: 'Hotstar', isCorrect: false },
          { text: 'Netflix', isCorrect: true },
          { text: 'YouTube', isCorrect: false },
        ],
      },
      {
        id: 22,
        question: 'Who is her favorite actor?',
        options: [
          { text: 'Ranbir Kapoor', isCorrect: false },
          { text: 'Varun Dhawan', isCorrect: false },
          { text: 'Aditya Roy Kapoor', isCorrect: true },
          { text: 'Vicky Kaushal', isCorrect: false },
        ],
      },
      {
        id: 23,
        question: 'What was her older caller tune?',
        options: [
          { text: 'Kesariya', isCorrect: false },
          { text: 'Soch Na Sake', isCorrect: true },
          { text: 'Raabta', isCorrect: false },
          { text: 'Tum Hi Ho', isCorrect: false },
        ],
      },
      {
        id: 24,
        question: 'What caller tune came after that?',
        options: [
          { text: 'Agar Tum Saath Ho', isCorrect: false },
          { text: 'Yaadon Ki Kaid Mein', isCorrect: true },
          { text: 'Shayad', isCorrect: false },
          { text: 'Jeena Jeena', isCorrect: false },
        ],
      },
      {
        id: 25,
        question: 'What is her current caller tune?',
        options: [
          { text: 'Romantic song', isCorrect: false },
          { text: 'Sad song', isCorrect: false },
          { text: 'Instrumental', isCorrect: false },
          { text: 'No caller tune', isCorrect: true },
        ],
      },
      {
        id: 26,
        question: 'What kind of movies does she enjoy?',
        options: [
          { text: 'Horror', isCorrect: false },
          { text: 'Romantic', isCorrect: true },
          { text: 'Action', isCorrect: false },
          { text: 'Thriller', isCorrect: false },
        ],
      },
      {
        id: 27,
        question: 'What makes her relax the most?',
        options: [
          { text: 'Music', isCorrect: false },
          { text: 'Movies', isCorrect: true },
          { text: 'Games', isCorrect: false },
          { text: 'Reading', isCorrect: false },
        ],
      },
      {
        id: 28,
        question: 'Who watches movies with her in my dreams?',
        options: [
          { text: 'Friends', isCorrect: false },
          { text: 'Family', isCorrect: false },
          { text: 'Me (Chotu)', isCorrect: true },
          { text: 'Alone', isCorrect: false },
        ],
      },
      {
        id: 29,
        question: 'What song stays in my heart for her?',
        options: [
          { text: 'Random song', isCorrect: false },
          { text: 'Her caller tune memories', isCorrect: true },
          { text: 'Pop songs', isCorrect: false },
          { text: 'Old songs', isCorrect: false },
        ],
      },
      {
        id: 30,
        question: 'What entertainment do I enjoy most?',
        options: [
          { text: 'Movies', isCorrect: false },
          { text: 'Writing songs for her', isCorrect: true },
          { text: 'Games', isCorrect: false },
          { text: 'Travel', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Chiuuuu ❤️
Like your favorite movies,
you are my favorite story.
No caller tune needed,
your voice already plays in my heart 🎶
— Your Bunny 😘`,
  },
  {
    levelNumber: 4,
    title: 'FAMILY',
    questions: [
      {
        id: 31,
        question: 'Who is her favorite person?',
        options: [
          { text: 'Me', isCorrect: false },
          { text: 'Mom', isCorrect: false },
          { text: 'Nanaji', isCorrect: true },
          { text: 'Sister', isCorrect: false },
        ],
      },
      {
        id: 32,
        question: "What is her sister's name?",
        options: [
          { text: 'Pooja', isCorrect: false },
          { text: 'Pari', isCorrect: true },
          { text: 'Priya', isCorrect: false },
          { text: 'Payal', isCorrect: false },
        ],
      },
      {
        id: 33,
        question: "What is her mother's name?",
        options: [
          { text: 'Sunita', isCorrect: false },
          { text: 'Megha Mam', isCorrect: true },
          { text: 'Kavita', isCorrect: false },
          { text: 'Neha', isCorrect: false },
        ],
      },
      {
        id: 34,
        question: "What is her father's name?",
        options: [
          { text: 'Rajesh', isCorrect: false },
          { text: 'Harshal Sir', isCorrect: true },
          { text: 'Suresh', isCorrect: false },
          { text: 'Mahesh', isCorrect: false },
        ],
      },
      {
        id: 35,
        question: 'Who are my parents-in-law?',
        options: [
          { text: 'Friends', isCorrect: false },
          { text: 'Relatives', isCorrect: false },
          { text: 'Megha & Harshal', isCorrect: true },
          { text: 'Neighbors', isCorrect: false },
        ],
      },
      {
        id: 36,
        question: 'Whose blessings matter most?',
        options: [
          { text: 'Everyone', isCorrect: false },
          { text: "Nanaji's", isCorrect: true },
          { text: 'Friends', isCorrect: false },
          { text: 'Teachers', isCorrect: false },
        ],
      },
      {
        id: 37,
        question: 'What does family mean to her?',
        options: [
          { text: 'Responsibility', isCorrect: false },
          { text: 'Love', isCorrect: true },
          { text: 'Pressure', isCorrect: false },
          { text: 'Duty', isCorrect: false },
        ],
      },
      {
        id: 38,
        question: 'Who makes our bond stronger?',
        options: [
          { text: 'Time', isCorrect: false },
          { text: 'Love', isCorrect: false },
          { text: 'Family', isCorrect: true },
          { text: 'Distance', isCorrect: false },
        ],
      },
      {
        id: 39,
        question: 'Who do I respect deeply?',
        options: [
          { text: 'Friends', isCorrect: false },
          { text: 'Her family', isCorrect: true },
          { text: 'Colleagues', isCorrect: false },
          { text: 'Everyone', isCorrect: false },
        ],
      },
      {
        id: 40,
        question: 'What makes me proud?',
        options: [
          { text: 'Money', isCorrect: false },
          { text: 'Career', isCorrect: false },
          { text: 'Being part of her family', isCorrect: true },
          { text: 'Fame', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu ❤️
Your family became my world.
Nanaji's blessings, Megha Mam's care,
Harshal Sir's strength —
I'm lucky to love you.
— Chotu 🥺`,
  },
  {
    levelNumber: 5,
    title: 'PLACES & LIFE',
    questions: [
      {
        id: 41,
        question: 'Where did Dikshita use to live earlier?',
        options: [
          { text: 'Mumbai', isCorrect: false },
          { text: 'Pune', isCorrect: true },
          { text: 'Nagpur', isCorrect: false },
          { text: 'Nashik', isCorrect: false },
        ],
      },
      {
        id: 42,
        question: 'Where does she live now?',
        options: [
          { text: 'Sadar, Nagpur', isCorrect: false },
          { text: 'Civil Lines', isCorrect: false },
          { text: 'North Star Building, Nagpur', isCorrect: true },
          { text: 'Dharampeth', isCorrect: false },
        ],
      },
      {
        id: 43,
        question: 'Which city holds her old memories?',
        options: [
          { text: 'Nagpur', isCorrect: false },
          { text: 'Pune', isCorrect: true },
          { text: 'Delhi', isCorrect: false },
          { text: 'Indore', isCorrect: false },
        ],
      },
      {
        id: 44,
        question: 'What matters more than place for her?',
        options: [
          { text: 'House', isCorrect: false },
          { text: 'City', isCorrect: false },
          { text: 'People she loves', isCorrect: true },
          { text: 'Comfort', isCorrect: false },
        ],
      },
      {
        id: 45,
        question: 'No matter where she lives, where does my heart live?',
        options: [
          { text: 'With me', isCorrect: false },
          { text: 'With work', isCorrect: false },
          { text: 'With Dikshita', isCorrect: true },
          { text: 'In memories', isCorrect: false },
        ],
      },
      {
        id: 46,
        question: 'Which place feels like home to me?',
        options: [
          { text: 'Pune', isCorrect: false },
          { text: 'Nagpur', isCorrect: false },
          { text: 'Wherever she is', isCorrect: true },
          { text: 'My house', isCorrect: false },
        ],
      },
      {
        id: 47,
        question: "What changed, but love didn't?",
        options: [
          { text: 'Phone', isCorrect: false },
          { text: 'City', isCorrect: true },
          { text: 'Career', isCorrect: false },
          { text: 'Friends', isCorrect: false },
        ],
      },
      {
        id: 48,
        question: 'What stays constant?',
        options: [
          { text: 'Distance', isCorrect: false },
          { text: 'Time', isCorrect: false },
          { text: 'My love for her', isCorrect: true },
          { text: 'Routine', isCorrect: false },
        ],
      },
      {
        id: 49,
        question: 'What building is special now?',
        options: [
          { text: 'Sky Tower', isCorrect: false },
          { text: 'North Star Building', isCorrect: true },
          { text: 'Pearl Heights', isCorrect: false },
          { text: 'Moon Residency', isCorrect: false },
        ],
      },
      {
        id: 50,
        question: 'What does "home" mean now?',
        options: [
          { text: 'Address', isCorrect: false },
          { text: 'City', isCorrect: false },
          { text: 'Her presence', isCorrect: true },
          { text: 'Walls', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu ❤️
Pune or Nagpur doesn't matter to me.
North Star ho ya koi aur jagah,
home is wherever you are.
— Always your Chotu 🏠😘`,
  },
  {
    levelNumber: 6,
    title: 'PERSONALITY & HABITS',
    questions: [
      {
        id: 51,
        question: 'What makes her extra cute?',
        options: [
          { text: 'Silence', isCorrect: false },
          { text: 'Anger', isCorrect: false },
          { text: "Saying 'pata nahi' a lot", isCorrect: true },
          { text: 'Being serious', isCorrect: false },
        ],
      },
      {
        id: 52,
        question: 'What does she enjoy doing to me?',
        options: [
          { text: 'Ignoring', isCorrect: false },
          { text: 'Teaching', isCorrect: false },
          { text: 'Roasting me 😄', isCorrect: true },
          { text: 'Scolding', isCorrect: false },
        ],
      },
      {
        id: 53,
        question: 'What kind of girl is Dikshita?',
        options: [
          { text: 'Lazy', isCorrect: false },
          { text: 'Simple', isCorrect: false },
          { text: 'Very smart', isCorrect: true },
          { text: 'Shy', isCorrect: false },
        ],
      },
      {
        id: 54,
        question: 'How does she react when confused?',
        options: [
          { text: 'Cries', isCorrect: false },
          { text: 'Thinks silently', isCorrect: false },
          { text: 'Says "pata nahi"', isCorrect: true },
          { text: 'Gets angry', isCorrect: false },
        ],
      },
      {
        id: 55,
        question: 'What makes me laugh the most?',
        options: [
          { text: 'Jokes', isCorrect: false },
          { text: 'Movies', isCorrect: false },
          { text: 'Her roasting', isCorrect: true },
          { text: 'Friends', isCorrect: false },
        ],
      },
      {
        id: 56,
        question: 'What does she balance perfectly?',
        options: [
          { text: 'Work & play', isCorrect: false },
          { text: 'Fun & intelligence', isCorrect: true },
          { text: 'Sleep & food', isCorrect: false },
          { text: 'Silence & noise', isCorrect: false },
        ],
      },
      {
        id: 57,
        question: 'What side of her do I love the most?',
        options: [
          { text: 'Serious', isCorrect: false },
          { text: 'Funny', isCorrect: false },
          { text: 'Smart + playful', isCorrect: true },
          { text: 'Quiet', isCorrect: false },
        ],
      },
      {
        id: 58,
        question: 'Who understands her habits best?',
        options: [
          { text: 'Friends', isCorrect: false },
          { text: 'Family', isCorrect: false },
          { text: 'Me (Chotu)', isCorrect: true },
          { text: 'Teachers', isCorrect: false },
        ],
      },
      {
        id: 59,
        question: 'What word reminds me of her instantly?',
        options: [
          { text: 'Okay', isCorrect: false },
          { text: 'Later', isCorrect: false },
          { text: 'Pata nahi', isCorrect: true },
          { text: 'Maybe', isCorrect: false },
        ],
      },
      {
        id: 60,
        question: 'What never annoys me?',
        options: [
          { text: 'Distance', isCorrect: false },
          { text: 'Her habits', isCorrect: false },
          { text: 'Her roasting', isCorrect: true },
          { text: 'Waiting', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Aye chiuuuu ❤️
Even when you say 'pata nahi'
or roast me non-stop,
I fall for you harder 😄
Smart, funny, and mine.
— Your Chotu 😘`,
  },
  {
    levelNumber: 7,
    title: 'TALENTS & CAREER',
    questions: [
      {
        id: 61,
        question: 'What is Dikshita studying?',
        options: [
          { text: 'Architecture', isCorrect: false },
          { text: 'Mechanical', isCorrect: false },
          { text: 'Civil Engineering', isCorrect: true },
          { text: 'Electrical', isCorrect: false },
        ],
      },
      {
        id: 62,
        question: 'Which sport does she play?',
        options: [
          { text: 'Cricket', isCorrect: false },
          { text: 'Badminton', isCorrect: true },
          { text: 'Tennis', isCorrect: false },
          { text: 'Basketball', isCorrect: false },
        ],
      },
      {
        id: 63,
        question: 'What is she very good at?',
        options: [
          { text: 'Singing', isCorrect: false },
          { text: 'Dancing', isCorrect: true },
          { text: 'Painting', isCorrect: false },
          { text: 'Acting', isCorrect: false },
        ],
      },
      {
        id: 64,
        question: 'What shows her discipline?',
        options: [
          { text: 'Sleep', isCorrect: false },
          { text: 'Food', isCorrect: false },
          { text: 'Studies', isCorrect: true },
          { text: 'Movies', isCorrect: false },
        ],
      },
      {
        id: 65,
        question: 'What talent makes me proud?',
        options: [
          { text: 'One thing', isCorrect: false },
          { text: 'Her beauty', isCorrect: false },
          { text: 'Everything she does', isCorrect: true },
          { text: 'Her cooking', isCorrect: false },
        ],
      },
      {
        id: 66,
        question: 'What does she manage well?',
        options: [
          { text: 'Time', isCorrect: false },
          { text: 'Studies + fun', isCorrect: true },
          { text: 'Stress', isCorrect: false },
          { text: 'Silence', isCorrect: false },
        ],
      },
      {
        id: 67,
        question: 'What future do I imagine for her?',
        options: [
          { text: 'Ordinary', isCorrect: false },
          { text: 'Average', isCorrect: false },
          { text: 'Successful & happy', isCorrect: true },
          { text: 'Busy', isCorrect: false },
        ],
      },
      {
        id: 68,
        question: 'What do I admire the most?',
        options: [
          { text: 'Looks', isCorrect: false },
          { text: 'Talent', isCorrect: false },
          { text: 'Dedication + heart', isCorrect: true },
          { text: 'Confidence', isCorrect: false },
        ],
      },
      {
        id: 69,
        question: 'What kind of engineer is she becoming?',
        options: [
          { text: 'Weak', isCorrect: false },
          { text: 'Average', isCorrect: false },
          { text: 'Strong & smart', isCorrect: true },
          { text: 'Unsure', isCorrect: false },
        ],
      },
      {
        id: 70,
        question: 'What role do I play?',
        options: [
          { text: 'Pressure', isCorrect: false },
          { text: 'Distraction', isCorrect: false },
          { text: 'Support system', isCorrect: true },
          { text: 'Critic', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu ❤️
Watching you study, play, dance,
and grow stronger every day
makes me so proud.
Civil engineer ho ya life engineer,
you're already winning.
— Chotu 🫶`,
  },
  {
    levelNumber: 8,
    title: 'ROMANTIC DETAILS',
    questions: [
      {
        id: 71,
        question: 'What jewelry does she always wear?',
        options: [
          { text: 'Ring', isCorrect: false },
          { text: 'Bracelet', isCorrect: false },
          { text: "Golden locket with 'D'", isCorrect: true },
          { text: 'Chain', isCorrect: false },
        ],
      },
      {
        id: 72,
        question: 'What letter is on her locket?',
        options: [
          { text: 'B', isCorrect: false },
          { text: 'C', isCorrect: false },
          { text: 'D', isCorrect: true },
          { text: 'P', isCorrect: false },
        ],
      },
      {
        id: 73,
        question: "What does that 'D' mean to me?",
        options: [
          { text: 'Design', isCorrect: false },
          { text: 'Diamond', isCorrect: false },
          { text: 'Dikshita ❤️', isCorrect: true },
          { text: 'Destiny', isCorrect: false },
        ],
      },
      {
        id: 74,
        question: 'What chocolate reminds me of her?',
        options: [
          { text: 'Dairy Milk', isCorrect: false },
          { text: 'KitKat', isCorrect: false },
          { text: 'Galaxy', isCorrect: true },
          { text: 'Munch', isCorrect: false },
        ],
      },
      {
        id: 75,
        question: 'What is sweeter than chocolate?',
        options: [
          { text: 'Sugar', isCorrect: false },
          { text: 'Cake', isCorrect: false },
          { text: 'Her smile', isCorrect: true },
          { text: 'Ice cream', isCorrect: false },
        ],
      },
      {
        id: 76,
        question: 'What do I notice first?',
        options: [
          { text: 'Clothes', isCorrect: false },
          { text: 'Jewelry', isCorrect: false },
          { text: 'That locket on her neck', isCorrect: true },
          { text: 'Shoes', isCorrect: false },
        ],
      },
      {
        id: 77,
        question: 'What is locked in my heart?',
        options: [
          { text: 'Memories', isCorrect: false },
          { text: 'Dreams', isCorrect: false },
          { text: 'Dikshita', isCorrect: true },
          { text: 'Songs', isCorrect: false },
        ],
      },
      {
        id: 78,
        question: 'What does that locket symbolize?',
        options: [
          { text: 'Style', isCorrect: false },
          { text: 'Fashion', isCorrect: false },
          { text: 'Love & identity', isCorrect: true },
          { text: 'Trend', isCorrect: false },
        ],
      },
      {
        id: 79,
        question: 'What makes every gift special?',
        options: [
          { text: 'Price', isCorrect: false },
          { text: 'Size', isCorrect: false },
          { text: 'Emotional meaning', isCorrect: true },
          { text: 'Brand', isCorrect: false },
        ],
      },
      {
        id: 80,
        question: 'What stays closest to my heart?',
        options: [
          { text: 'Phone', isCorrect: false },
          { text: 'Wallet', isCorrect: false },
          { text: "Her 'D' locket memory", isCorrect: true },
          { text: 'Watch', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Chiuuuu ❤️
That golden 'D' you wear,
it's not just a locket —
it's locked inside my heart too 🔐
Galaxy chocolate se bhi zyada sweet tu hai 😘
— Your Bunny`,
  },
  {
    levelNumber: 9,
    title: 'MEMORIES & EMOTIONS',
    questions: [
      {
        id: 81,
        question: 'Which caller tune came first?',
        options: [
          { text: 'Yaadon Ki Kaid Mein', isCorrect: false },
          { text: 'Soch Na Sake', isCorrect: true },
          { text: 'Shayad', isCorrect: false },
          { text: 'None', isCorrect: false },
        ],
      },
      {
        id: 82,
        question: 'Which caller tune came later?',
        options: [
          { text: 'Kesariya', isCorrect: false },
          { text: 'Soch Na Sake', isCorrect: false },
          { text: 'Yaadon Ki Kaid Mein', isCorrect: true },
          { text: 'None', isCorrect: false },
        ],
      },
      {
        id: 83,
        question: 'What is her current caller tune?',
        options: [
          { text: 'Romantic song', isCorrect: false },
          { text: 'Sad song', isCorrect: false },
          { text: 'Instrumental', isCorrect: false },
          { text: 'No caller tune', isCorrect: true },
        ],
      },
      {
        id: 84,
        question: 'Even without a caller tune, what do I hear?',
        options: [
          { text: 'Silence', isCorrect: false },
          { text: 'Noise', isCorrect: false },
          { text: 'Her voice in my heart ❤️', isCorrect: true },
          { text: 'Songs', isCorrect: false },
        ],
      },
      {
        id: 85,
        question: 'What connects past and present?',
        options: [
          { text: 'Time', isCorrect: false },
          { text: 'Distance', isCorrect: false },
          { text: 'Memories with her', isCorrect: true },
          { text: 'Calls', isCorrect: false },
        ],
      },
      {
        id: 86,
        question: 'What song plays in my mind?',
        options: [
          { text: 'Random', isCorrect: false },
          { text: 'Old', isCorrect: false },
          { text: 'Our memories', isCorrect: true },
          { text: 'New', isCorrect: false },
        ],
      },
      {
        id: 87,
        question: 'What never fades?',
        options: [
          { text: 'Photos', isCorrect: false },
          { text: 'Chats', isCorrect: false },
          { text: 'Feelings for her', isCorrect: true },
          { text: 'Calls', isCorrect: false },
        ],
      },
      {
        id: 88,
        question: 'What replaces caller tunes now?',
        options: [
          { text: 'Ringtone', isCorrect: false },
          { text: 'Silence', isCorrect: false },
          { text: 'Her presence in my thoughts', isCorrect: true },
          { text: 'Music', isCorrect: false },
        ],
      },
      {
        id: 89,
        question: 'What matters more than calls?',
        options: [
          { text: 'Time', isCorrect: false },
          { text: 'Love', isCorrect: true },
          { text: 'Network', isCorrect: false },
          { text: 'Phone', isCorrect: false },
        ],
      },
      {
        id: 90,
        question: 'What keeps us connected?',
        options: [
          { text: 'Phone', isCorrect: false },
          { text: 'Internet', isCorrect: false },
          { text: 'Heart ❤️', isCorrect: true },
          { text: 'Distance', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu ❤️
Caller tune ho ya na ho,
tu hi meri permanent melody hai 🎶
Every memory, every silence,
still says your name.
— Chotu 🥺`,
  },
  {
    levelNumber: 10,
    title: 'FINAL MIX & LOVE',
    questions: [
      {
        id: 91,
        question: 'Who is my forever winner?',
        options: [
          { text: 'Me', isCorrect: false },
          { text: 'Life', isCorrect: false },
          { text: 'Dikshita ❤️', isCorrect: true },
          { text: 'Fate', isCorrect: false },
        ],
      },
      {
        id: 92,
        question: 'What do I love writing the most?',
        options: [
          { text: 'Stories', isCorrect: false },
          { text: 'Notes', isCorrect: false },
          { text: 'Songs for her 🎵', isCorrect: true },
          { text: 'Poems', isCorrect: false },
        ],
      },
      {
        id: 93,
        question: 'Who inspires my songs?',
        options: [
          { text: 'Music', isCorrect: false },
          { text: 'Pain', isCorrect: false },
          { text: 'Dikshita', isCorrect: true },
          { text: 'Dreams', isCorrect: false },
        ],
      },
      {
        id: 94,
        question: 'What does love mean to me?',
        options: [
          { text: 'Time', isCorrect: false },
          { text: 'Effort', isCorrect: false },
          { text: 'Dikshita in every form ❤️', isCorrect: true },
          { text: 'Luck', isCorrect: false },
        ],
      },
      {
        id: 95,
        question: 'What level is hardest?',
        options: [
          { text: 'Quiz', isCorrect: false },
          { text: 'Game', isCorrect: false },
          { text: 'Loving her every day (worth it)', isCorrect: true },
          { text: 'None', isCorrect: false },
        ],
      },
      {
        id: 96,
        question: 'What did this game test?',
        options: [
          { text: 'Memory', isCorrect: false },
          { text: 'Speed', isCorrect: false },
          { text: 'Love & attention ❤️', isCorrect: true },
          { text: 'Luck', isCorrect: false },
        ],
      },
      {
        id: 97,
        question: 'Who completed all levels?',
        options: [
          { text: 'Anyone', isCorrect: false },
          { text: 'Player', isCorrect: false },
          { text: 'Chotu for Dikshu ❤️', isCorrect: true },
          { text: 'System', isCorrect: false },
        ],
      },
      {
        id: 98,
        question: 'What is my final promise?',
        options: [
          { text: 'To win', isCorrect: false },
          { text: 'To play', isCorrect: false },
          { text: 'To always choose her', isCorrect: true },
          { text: 'To stop', isCorrect: false },
        ],
      },
      {
        id: 99,
        question: 'What never changes?',
        options: [
          { text: 'Cities', isCorrect: false },
          { text: 'Phones', isCorrect: false },
          { text: 'My love for her ❤️', isCorrect: true },
          { text: 'Time', isCorrect: false },
        ],
      },
      {
        id: 100,
        question: 'Final answer of my life?',
        options: [
          { text: 'Career', isCorrect: false },
          { text: 'Money', isCorrect: false },
          { text: 'Dikshita (Chiuuuu) 💍❤️', isCorrect: true },
          { text: 'Game', isCorrect: false },
        ],
      },
    ],
    secretLetter: `Dikshu, my chiuuuu ❤️
You weren't just the answer to these questions.
You are the answer to my life.
Every level, every memory, every song —
I choose you. Always.
— Your Chotu 🥺💍`,
  },
];
