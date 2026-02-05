import { type GameId, GAME_IDS } from '../constants';
import { getPromises100WinLetter, type Promises100WinLetter } from '../promises100/content/winLetters';

export interface WinLetter {
  loveLetter: string;
  promiseLetter: string;
}

export const WIN_LETTERS: Record<number, WinLetter> = {
  1: {
    loveLetter: "Hey Chiuuu! 💕\nYou found the first secret!\nJust like how you always find\nthe comfiest spot to sleep,\nyou found your way to my heart.",
    promiseLetter: "I promise to let you sleep\nas much as you want, Chiuuu.\nYour peaceful sleeping face\nis my favorite view. 😴💖"
  },
  2: {
    loveLetter: "My sleepy Chiuuu! 🌙\nYou made it night—perfect timing!\nI know how much you love\nyour cozy sleep time.\nSweet dreams are made of you.",
    promiseLetter: "I promise to always protect\nyour sleep, Dikshita.\nNo disturbances, just peaceful\ndreams and warm blankets. 🛌✨"
  },
  3: {
    loveLetter: "Chiuuu, you're so patient! 💌\nJust like waiting for\nthe perfect momos to arrive,\nyou held on with love.\nYou're worth every second.",
    promiseLetter: "I promise to take you\nfor momos whenever you want!\nYour happiness is my priority,\nalways. 🥟💕"
  },
  4: {
    loveLetter: "My smart Chiuuu! ❤️\nYou counted with your heart!\nJust like counting all the reasons\nI love you—it's infinite.\nYou're my everything.",
    promiseLetter: "I promise to count\nevery moment with you\nas a blessing, Dikshita.\nYou're my forever. ∞"
  },
  5: {
    loveLetter: "Chiuuu, you're amazing! 💪\nYou moved the unmovable!\nJust like how you moved my heart\nwithout even trying.\nYou're my miracle.",
    promiseLetter: "I promise to move mountains\nfor you, my love.\nAnything for my Chiuuu's\nhappiness. 🏔️💖"
  },
  6: {
    loveLetter: "My observant Chiuuu! 👀\nYou notice everything—\nlike how I notice\nevery cute thing you do.\nYou're adorably perfect.",
    promiseLetter: "I promise to notice\nevery little detail about you,\nfrom your sleepy yawns\nto your beautiful smile. 💕"
  },
  7: {
    loveLetter: "Dikshita, you're brilliant! 🛤️\nYou found the hidden path,\njust like how we found\neach other in this big world.\nOur journey is beautiful.",
    promiseLetter: "I promise to walk\nevery path with you,\nhand in hand, Chiuuu.\nForever and always. 🤝💖"
  },
  8: {
    loveLetter: "My intuitive Chiuuu! 💫\nYou trusted your instinct!\nJust like how my heart knew\nyou were the one.\nYou're my destiny.",
    promiseLetter: "I promise to trust in us,\nin our love, in our future.\nYou and me, Chiuuu,\nforever. 🙏💕"
  },
  9: {
    loveLetter: "Chiuuu, you're unpredictable! 🎨\nYou broke the pattern!\nLife with you is never boring—\nfrom Netflix marathons\nto badminton matches!",
    promiseLetter: "I promise to keep our love\nexciting and fresh,\njust like your favorite\nGalaxy chocolate! 🍫✨"
  },
  10: {
    loveLetter: "Ten levels, my Chiuuu! 💝\nTen reasons I adore you:\nYour sleep, your smile,\nyour love for momos,\nand seven more reasons!",
    promiseLetter: "I promise to give you\nten thousand more reasons\nto love me back, Dikshita.\nYou're my world. 🌍💖"
  },
  11: {
    loveLetter: "Good morning, Chiuuu! ☀️\nYou woke up to love!\nI love watching you sleep,\nbut I love your smile\nwhen you wake up even more.",
    promiseLetter: "I promise to be your reason\nto smile every morning,\neven when you're sleepy\nand adorable. 😊💕"
  },
  12: {
    loveLetter: "My healing Chiuuu! 💔➡️💖\nYou fixed what was broken!\nWith you, everything feels right.\nYou complete me, Dikshita.",
    promiseLetter: "I promise to mend your heart\nwhenever you need me.\nChotu is always here\nfor his Chiuuu. 🩹💖"
  },
  13: {
    loveLetter: "That smile, Chiuuu! 😊\nYou found the real smile!\nYour smile lights up my world\nmore than any star.\nYou're my sunshine.",
    promiseLetter: "I promise to make you smile\nevery single day,\nwith momos, love,\nand silly jokes. 🌈💕"
  },
  14: {
    loveLetter: "My patient Chiuuu! 💞\nYou held on for love!\nJust like holding on\nfor the next episode\nof your Netflix series!",
    promiseLetter: "I promise to hold onto you\nthrough everything,\nmy Netflix and chill partner.\nForever, Chiuuu. 🤗📺"
  },
  15: {
    loveLetter: "Chiuuu, my sunshine! 🌤️\nYou erased the sadness!\nWith you, even rainy days\nfeel like perfect\nbadminton weather.",
    promiseLetter: "I promise to chase away\nall your clouds, Dikshita.\nYou deserve endless sunshine\nand happiness. ☀️💖"
  },
  16: {
    loveLetter: "My clever Chiuuu! 🧠\nYou're getting smarter!\nI love how your mind works,\nalmost as much as I love\nwatching you sleep peacefully.",
    promiseLetter: "I promise to always admire\nyour brilliant mind, Chiuuu.\nYou're beautiful inside\nand out. 💡💕"
  },
  17: {
    loveLetter: "Chiuuu, you never quit! 💪\nYou didn't give up!\nJust like you never give up\non finding the perfect\nsleeping position!",
    promiseLetter: "I promise to never give up\non us, on you, on our love.\nChotu and Chiuuu forever! 🔒💖"
  },
  18: {
    loveLetter: "My Chiuuu has the key! 🗝️\nYou found the secret!\nThe secret is: you've always\nhad the key to my heart,\nDikshita.",
    promiseLetter: "I promise you'll always have\nthe key to my heart.\nIt's yours forever,\nmy love. 💝🔑"
  },
  19: {
    loveLetter: "Almost 20, Chiuuu! 🎉\nEvery level with you\nis like every day—\nfilled with love, momos,\nand your adorable sleepiness.",
    promiseLetter: "I promise to celebrate\nevery moment with you,\nfrom small wins\nto big dreams. 🎊💕"
  },
  20: {
    loveLetter: "Twenty levels, my love! 💕\nTwenty steps closer to forever!\nJust like twenty more minutes\nof sleep you always want,\nI want forever with you.",
    promiseLetter: "I promise our journey\nwill never end, Chiuuu.\nYou and me, always\nand forever. 🛤️∞"
  },
  21: {
    loveLetter: "Chiuuu sees through it! 🎭\nYou saw through the trick!\nYou see the real me,\njust like I see\nthe real you—perfect.",
    promiseLetter: "I promise to always be\nauthentic with you, Dikshita.\nNo masks, just love\nand honesty. 💯💖"
  },
  22: {
    loveLetter: "My truthful Chiuuu! 🎯\nYou caught the truth!\nThe truth is: I love you\nmore than you love\nGalaxy chocolates!",
    promiseLetter: "I promise to always be\nyour truth, your reality.\nYou're my everything,\nChiuuu. 📖💕"
  },
  23: {
    loveLetter: "Distance means nothing! 🌉\nYou closed the distance!\nEven when you're sleeping\nand I'm watching you,\nwe're always connected.",
    promiseLetter: "I promise distance will never\ncome between us, Dikshita.\nOur hearts are one. 🌍💕"
  },
  24: {
    loveLetter: "Turn up the love! 🔊\nYou turned up the volume!\nJust like turning up\nthe volume for your\nfavorite Netflix show!",
    promiseLetter: "I promise to amplify\nyour happiness always,\nmy Netflix partner.\nLoud and proud! 📢💖"
  },
  25: {
    loveLetter: "Chiuuu understands me! 📝\nYou read between the lines!\nYou know when I'm teasing,\nwhen I'm serious,\nwhen I'm in love—always.",
    promiseLetter: "I promise to always understand\nyour unspoken words, Chiuuu.\nEven your sleepy mumbles! 🤫💕"
  },
  26: {
    loveLetter: "Halfway there, my love! 🏃‍♀️\nWe're halfway through!\nJust like halfway through\na badminton match—\nwe're winning together!",
    promiseLetter: "I promise to walk beside you\nfor all of life's journey,\nfrom court to couch,\nDikshita. 👣💖"
  },
  27: {
    loveLetter: "Chiuuu, you're my light! 💡\nYou found the light!\nYou brighten my darkest days,\neven when you're\nfast asleep and snoring!",
    promiseLetter: "I promise to be your light\nin the darkness, Chiuuu.\nYour guiding star\nforever. 🕯️✨"
  },
  28: {
    loveLetter: "You unlocked my heart! 🔓\nBefore you, I was closed.\nYou opened me up to love,\nto momos, to happiness,\nto everything beautiful.",
    promiseLetter: "I promise to keep your heart\nsafe and cherished, Dikshita.\nYou're my treasure. 💝🔐"
  },
  29: {
    loveLetter: "Almost 30, Chiuuu! 🎈\nEvery number is a memory—\nlike that time you fell asleep\nduring our movie,\nso adorable!",
    promiseLetter: "I promise to create\ncountless memories with you,\nfrom sleepy moments\nto adventures. 📸💕"
  },
  30: {
    loveLetter: "Thirty levels of love! 💖\nThirty reasons I adore you:\nYour sleep, your smile,\nyour love for Aditya Roy Kapoor,\nand twenty-seven more!",
    promiseLetter: "I promise thirty more levels,\nthirty more years,\nthirty lifetimes\nwith you, Chiuuu. ∞💖"
  },
  31: {
    loveLetter: "Happy Chiuuu! 😊\nYou made her happy!\nYour happiness is my mission,\nwhether it's momos at midnight\nor letting you sleep in.",
    promiseLetter: "I promise to prioritize\nyour happiness always,\nmy sleepy princess.\nYou deserve it all. 🌟💕"
  },
  32: {
    loveLetter: "No more tears, Chiuuu! 😢➡️😊\nYou stopped the tears!\nI'll always wipe your tears\nand replace them\nwith smiles and momos.",
    promiseLetter: "I promise to wipe away\nevery tear you cry, Dikshita.\nChotu's got you,\nalways. 🤗💖"
  },
  33: {
    loveLetter: "Protecting our flame! 🕯️\nYou protected the flame!\nOur love is precious,\nlike your favorite\nGalaxy chocolate bar.",
    promiseLetter: "I promise to protect\nour love from any storm,\nmy precious Chiuuu.\nForever safe. 🛡️💕"
  },
  34: {
    loveLetter: "We're fixed, Chiuuu! 🔧\nYou fixed us!\nRelationships need work,\nlike convincing you\nto wake up in the morning!",
    promiseLetter: "I promise to always work\non making us better,\nstronger, happier.\nYou and me, Dikshita. 💪💖"
  },
  35: {
    loveLetter: "Perfect balance! ⚖️\nYou found the balance!\nSleep and play,\nNetflix and badminton,\nlove and more love!",
    promiseLetter: "I promise to keep our love\nbalanced and harmonious,\nmy perfect Chiuuu.\nJust right. 🎵💕"
  },
  36: {
    loveLetter: "Stronger every day! 💪\nYou're getting stronger!\nFrom badminton champion\nto puzzle master,\nyou're incredible, Dikshita.",
    promiseLetter: "I promise to be your strength\nwhen you feel weak,\nmy strong and beautiful\nChiuuu. 🦸💖"
  },
  37: {
    loveLetter: "You see me, Chiuuu! 👻\nYou saw the invisible!\nYou notice when I'm happy,\nsad, or just wanting\nto watch you sleep.",
    promiseLetter: "I promise to always see\nthe real you, Dikshita.\nEvery beautiful part\nof you. 👁️💕"
  },
  38: {
    loveLetter: "Connected dots! 🔗\nYou connected them!\nOur story is beautiful—\nfrom first meeting\nto forever together.",
    promiseLetter: "I promise our story will be\nbeautifully connected, Chiuuu.\nEvery moment matters. 📿💖"
  },
  39: {
    loveLetter: "Almost 40, my love! 🎯\nForty levels of us!\nForty times you've\nstolen my heart,\nforty times I've fallen deeper.",
    promiseLetter: "I promise forty more adventures,\nforty more momos dates,\nforty more reasons\nto love you. 🗺️💕"
  },
  40: {
    loveLetter: "Forty levels, Chiuuu! 💝\nWe're building something special!\nLike building the perfect\nNetflix watchlist,\nbut better—our love.",
    promiseLetter: "I promise to keep building\nour love story, Dikshita.\nBrick by brick,\nkiss by kiss. 🏗️💕"
  },
  41: {
    loveLetter: "Patient Chiuuu! ⏰\nYou waited for love!\nJust like waiting for\nthe momos to cool down\nbefore eating them!",
    promiseLetter: "I promise you're worth\nevery second of waiting.\nYou're my reward,\nmy love. ⌛💖"
  },
  42: {
    loveLetter: "Captured moments! 📸\nYou caught the moment!\nLike capturing your\nadorable sleeping face\nin my memory forever.",
    promiseLetter: "I promise to cherish\nevery moment with you,\nfrom sleepy mornings\nto starry nights. 🎬💕"
  },
  43: {
    loveLetter: "Calm Chiuuu! 🧘\nYou stayed calm!\nYou're my peace,\nmy comfort,\nmy safe place to rest.",
    promiseLetter: "I promise to be your calm\nin every storm, Dikshita.\nYour peaceful harbor\nalways. 🌊➡️🏖️"
  },
  44: {
    loveLetter: "Slow down, Chiuuu! 🐌\nYou slowed down!\nLike slowing down\nto enjoy every bite\nof your favorite momos.",
    promiseLetter: "I promise to savor\nevery moment with you,\nmy precious Chiuuu.\nNo rushing. 🍷💖"
  },
  45: {
    loveLetter: "Let it settle! 🍵\nYou let it settle!\nLike letting you settle\ninto your afternoon nap—\nperfect timing, perfect peace.",
    promiseLetter: "I promise to give our love\nthe time it deserves,\nmy patient Dikshita.\nNo rush. ⏳💕"
  },
  46: {
    loveLetter: "Almost halfway, Chiuuu! 🎊\nFifty levels await!\nFifty more reasons\nto love you,\nfifty more memories to make.",
    promiseLetter: "I promise the second half\nwill be even better,\nfilled with love,\nmomos, and you. 🎭💖"
  },
  47: {
    loveLetter: "Found the rhythm! 🎵\nYou found our rhythm!\nLike the rhythm of\nyour peaceful breathing\nwhen you sleep.",
    promiseLetter: "I promise to dance\nto our song forever,\nmy beautiful Chiuuu.\nOur perfect melody. 💃💕"
  },
  48: {
    loveLetter: "Mystery solved! 🔍\nYou solved it, Chiuuu!\nThe mystery of my heart—\nit belongs to you,\ncompletely and forever.",
    promiseLetter: "I promise to keep you\nguessing in the best way,\nwith surprises and love,\nDikshita. 🎭💖"
  },
  49: {
    loveLetter: "One away from 50! 🎯\nAlmost at the milestone!\nLike being one episode away\nfrom finishing your\nfavorite Netflix series!",
    promiseLetter: "I promise to celebrate\nevery 'almost' with you,\nbecause every moment\nmatters, Chiuuu. 🎉💕"
  },
  50: {
    loveLetter: "FIFTY LEVELS, CHIUUU! 🎊🎉\nHalfway through!\nHalfway to forever!\nLike fifty reasons I love you:\nYour sleep, your smile,\nyour love for momos...",
    promiseLetter: "I promise the next fifty\nwill be even more magical,\nfilled with Galaxy chocolates,\nNetflix, and endless love. ✨💖"
  },
  51: {
    loveLetter: "Perfect timing, Chiuuu! ⏰\nYou waited for the moment!\nLike waiting for\nthe perfect time\nto order momos!",
    promiseLetter: "I promise to always be\non time for you, Dikshita.\nNever late for\nour love. 🕐💕"
  },
  52: {
    loveLetter: "Secret unlocked! 🔐\nYou unlocked it, Chiuuu!\nThe secret is:\nI love watching you sleep\nmore than anything.",
    promiseLetter: "I promise to always be\ntransparent with you,\nmy precious Dikshita.\nNo secrets, just love. 💎💖"
  },
  53: {
    loveLetter: "Fixed the glitch! 🔧\nYou fixed it, Chiuuu!\nYou debug my problems\nwith your love\nand your adorable smile.",
    promiseLetter: "I promise to help fix\nwhatever troubles you,\nfrom bad days\nto empty momo plates. 🛠️💕"
  },
  54: {
    loveLetter: "Obstacle removed! 🚧\nYou cleared the path!\nNothing can stop us,\nnot even your\ndeep afternoon sleep!",
    promiseLetter: "I promise to clear\nany path for you, Chiuuu.\nYour happiness is\nmy mission. 🛤️💖"
  },
  55: {
    loveLetter: "Hidden option found! 🎁\nYou found it, Chiuuu!\nLike finding the last\nGalaxy chocolate\nin the fridge!",
    promiseLetter: "I promise to keep\nsurprising you, Dikshita.\nWith love, momos,\nand adventures. 🎀💕"
  },
  56: {
    loveLetter: "Past halfway, Chiuuu! 🏃\nWe're in the second half!\nLike the second half\nof a badminton match—\nwe're winning!",
    promiseLetter: "I promise the best\nis yet to come,\nmy champion Chiuuu.\nWe've got this! 🌅💖"
  },
  57: {
    loveLetter: "Mastered the trick! 🎪\nYou're so clever, Chiuuu!\nYou're getting better\nat stealing my heart\nevery single day.",
    promiseLetter: "I promise to let you\nsteal my heart forever,\nmy beautiful thief,\nDikshita. 💝💕"
  },
  58: {
    loveLetter: "Pattern recognized! 🔢\nYou saw it, Chiuuu!\nThe pattern is:\nI love you more\nevery single day.",
    promiseLetter: "I promise to find meaning\nin every moment with you,\nfrom Netflix marathons\nto quiet naps. 📊💖"
  },
  59: {
    loveLetter: "Almost 60, my love! 🎯\nSixty levels of us!\nSixty times you've\nmade me smile,\nsixty times I've fallen deeper.",
    promiseLetter: "I promise sixty more\nand infinity beyond,\nmy precious Chiuuu.\nForever and always. ∞💕"
  },
  60: {
    loveLetter: "SIXTY LEVELS, CHIUUU! 🎊\nSixty steps together!\nSixty memories made,\nfrom momos dates\nto badminton games!",
    promiseLetter: "I promise to keep falling\nfor you every day,\nmy beautiful Dikshita.\nYou're my everything. 💕💖"
  },
  61: {
    loveLetter: "Followed the steps! 👣\nYou did it, Chiuuu!\nLike following the steps\nto the perfect\nafternoon nap routine!",
    promiseLetter: "I promise to follow\nour path together,\nhand in hand,\nheart to heart. 🛤️💕"
  },
  62: {
    loveLetter: "Chaos calmed! 🌪️➡️🌤️\nYou calmed it, Chiuuu!\nYou bring peace\nto my storms,\nlike a warm blanket.",
    promiseLetter: "I promise to be your\npeace always, Dikshita.\nYour calm in\nany chaos. ☮️💖"
  },
  63: {
    loveLetter: "Pieces combined! 🧩\nYou did it, Chiuuu!\nWe fit together perfectly,\nlike momos and chutney,\nlike you and sleep!",
    promiseLetter: "I promise we'll always\nfit together, my love.\nTwo pieces,\none heart. 🔗💕"
  },
  64: {
    loveLetter: "Distraction removed! 🎯\nYou focused, Chiuuu!\nIn a world full of noise,\nyou're my focus,\nmy priority, my love.",
    promiseLetter: "I promise to keep\nmy focus on you,\nmy beautiful Dikshita.\nYou're all I see. 👁️💖"
  },
  65: {
    loveLetter: "Mistake fixed! ✏️\nYou corrected it, Chiuuu!\nEveryone makes mistakes,\nbut you make\neverything right.",
    promiseLetter: "I promise to always\nmake things right with you,\nmy forgiving and\nbeautiful Chiuuu. ✅💕"
  },
  66: {
    loveLetter: "Two-thirds there! 📊\nWe're almost done, Chiuuu!\nLike being two-thirds\nthrough your favorite\nNetflix series!",
    promiseLetter: "I promise the final third\nwill be unforgettable,\nfilled with love\nand happiness. 🎭💖"
  },
  67: {
    loveLetter: "Illusion shattered! 🎭\nYou saw through it, Chiuuu!\nYou see the real me,\nand you love me\nanyway—that's magic.",
    promiseLetter: "I promise to always\nsee the real you, Dikshita.\nEvery beautiful,\nsleepy part. 👁️💕"
  },
  68: {
    loveLetter: "Truth found! 📖\nYou found it, Chiuuu!\nThe truth is:\nYou're my everything,\nmy world, my love.",
    promiseLetter: "I promise to always be\nhonest with you,\nmy truthful and\nbeautiful Chiuuu. 🤝💖"
  },
  69: {
    loveLetter: "Almost 70, my love! 🎯\nSeventy levels await!\nSeventy more reasons\nto adore you,\nfrom your sleep to your smile.",
    promiseLetter: "I promise seventy more\nand beyond, Dikshita.\nForever is just\nthe beginning. 🌟💕"
  },
  70: {
    loveLetter: "SEVENTY LEVELS, CHIUUU! 🎊\nSeventy steps together!\nSeventy times you've\namazed me with\nyour beauty and love.",
    promiseLetter: "I promise to keep being\namazed by you, Dikshita.\nYou're my wonder,\nmy miracle. 😍💖"
  },
  71: {
    loveLetter: "Questioned everything! 🤔\nYou thought it through, Chiuuu!\nYour mind is beautiful,\nalmost as beautiful\nas your sleeping face.",
    promiseLetter: "I promise to always\nchallenge you lovingly,\nmy intelligent and\nbeautiful Chiuuu. 🧠💕"
  },
  72: {
    loveLetter: "Perfect inaction! 🧘\nYou did nothing, Chiuuu!\nLike your perfect\nafternoon naps—\nsometimes rest is best.",
    promiseLetter: "I promise to appreciate\nyour peaceful moments,\nmy sleepy and\nadorable Dikshita. 🕊️💖"
  },
  73: {
    loveLetter: "Adapted perfectly! 🦎\nYou changed, Chiuuu!\nFlexible and strong,\nlike switching from\nbadminton to Netflix!",
    promiseLetter: "I promise to adapt\nand grow with you,\nmy flexible and\nbeautiful Chiuuu. 🌱💕"
  },
  74: {
    loveLetter: "Embraced the unexpected! 🎲\nYou handled it, Chiuuu!\nLike unexpected momos\ndelivered to your door—\nlife's beautiful surprises!",
    promiseLetter: "I promise to face\nthe unexpected with you,\nmy brave and\nbeautiful Dikshita. 🎪💖"
  },
  75: {
    loveLetter: "Failure to success! 🔄\nYou turned it around, Chiuuu!\nYou see opportunities\neverywhere, like finding\nthe last Galaxy chocolate!",
    promiseLetter: "I promise to turn every\nchallenge into growth,\nmy inspiring and\nbeautiful Chiuuu. 📈💕"
  },
  76: {
    loveLetter: "Final stretch, Chiuuu! 🏃\nWe're almost there!\nLike the final episodes\nof your favorite show—\nexciting and bittersweet!",
    promiseLetter: "I promise our journey\nwill continue forever,\nmy eternal love,\nDikshita. 🛤️∞💖"
  },
  77: {
    loveLetter: "Lucky sevens, Chiuuu! 🎰\nI'm the luckiest Chotu\nbecause I have you!\nYou're my jackpot,\nmy everything.",
    promiseLetter: "I promise to make you feel\nlucky every day,\nmy precious and\nbeautiful Chiuuu. 🍀💕"
  },
  78: {
    loveLetter: "Almost 80, my love! 🎯\nEighty levels of us!\nEighty reasons you're perfect:\nYour sleep, your smile,\nyour love for Aditya Roy Kapoor!",
    promiseLetter: "I promise eighty more\nand infinity beyond,\nmy beautiful Dikshita.\nForever yours. ∞💖"
  },
  79: {
    loveLetter: "One from 80, Chiuuu! 🎊\nSo close to the milestone!\nLike being one momo away\nfrom finishing\nthe perfect plate!",
    promiseLetter: "I promise every milestone\nwill be celebrated,\nmy precious Chiuuu.\nYou deserve it all. 🎉💕"
  },
  80: {
    loveLetter: "EIGHTY LEVELS, CHIUUU! 🎊🎉\nEighty steps together!\nEighty memories from\nNetflix nights to\nbadminton victories!",
    promiseLetter: "I promise the final twenty\nwill be the best yet,\nfilled with love,\nmomos, and you. 💖✨"
  },
  81: {
    loveLetter: "Built our memories! 📸\nYou created them, Chiuuu!\nEvery moment with you\nis a treasure,\nfrom sleepy mornings to starry nights.",
    promiseLetter: "I promise to create\nbeautiful memories with you,\nmy precious Dikshita.\nForever and always. 🎬💕"
  },
  82: {
    loveLetter: "Matched the moments! 💫\nYou remembered, Chiuuu!\nYou remember everything,\nlike my favorite momos order\nand your favorite sleeping position!",
    promiseLetter: "I promise to remember\nevery moment with you,\nmy thoughtful and\nbeautiful Chiuuu. 🧠💖"
  },
  83: {
    loveLetter: "Fixed what was torn! 🩹\nYou healed it, Chiuuu!\nYou have healing hands\nand a healing heart,\nlike a warm hug after a long day.",
    promiseLetter: "I promise to heal\nany hurt you feel,\nmy caring and\nbeautiful Dikshita. 💊💕"
  },
  84: {
    loveLetter: "Right promise chosen! 🤝\nYou chose wisely, Chiuuu!\nYou know what matters:\nlove, momos, sleep,\nand us together.",
    promiseLetter: "I promise to always\nchoose you, Dikshita.\nIn every lifetime,\nevery moment. 💍💖"
  },
  85: {
    loveLetter: "Heart kept safe! 💝\nYou protected it, Chiuuu!\nYou guard what's precious,\nlike guarding your\nfavorite Galaxy chocolate!",
    promiseLetter: "I promise to guard\nyour heart forever,\nmy protective and\nbeautiful Chiuuu. 🛡️💕"
  },
  86: {
    loveLetter: "Final fifteen, Chiuuu! 🎯\nFifteen levels left!\nFifteen more memories,\nfifteen more reasons\nto love you forever.",
    promiseLetter: "I promise these final steps\nwill be magical,\nfilled with love\nand happiness. ✨💖"
  },
  87: {
    loveLetter: "Almost there, my love! 🏃\nThe end is near!\nBut our love story\nis just beginning,\nmy beautiful Chiuuu.",
    promiseLetter: "I promise our love\nhas no end, Dikshita.\nInfinity and beyond,\nforever yours. ∞💕"
  },
  88: {
    loveLetter: "Double infinity, Chiuuu! ∞∞\nEight is infinity sideways!\nDouble eight means\ndouble forever\nwith you, my love.",
    promiseLetter: "I promise infinity\ntimes infinity, Dikshita.\nEndless love,\nendless us. ∞²💖"
  },
  89: {
    loveLetter: "Almost 90, Chiuuu! 🎊\nNinety levels of love!\nNinety moments of magic,\nfrom momos dates\nto Netflix marathons!",
    promiseLetter: "I promise ninety more\nand beyond, my love.\nForever is just\nthe start. 🌟💕"
  },
  90: {
    loveLetter: "NINETY LEVELS, CHIUUU! 🎊🎉\nNinety steps together!\nNinety times you've\nstolen my heart\nwith your beautiful smile!",
    promiseLetter: "I promise the final ten\nwill be unforgettable,\nmy precious Dikshita.\nThe best is coming. 💖✨"
  },
  91: {
    loveLetter: "Combined everything! 🧩\nYou mastered it, Chiuuu!\nAll the skills, patience,\nand love you've shown—\nyou're incredible, Dikshita.",
    promiseLetter: "I promise to use everything\nI've learned to love you,\nmy amazing and\nbeautiful Chiuuu. 📚💕"
  },
  92: {
    loveLetter: "Time and space mastered! ⏰🌌\nYou understand, Chiuuu!\nLove transcends everything,\neven your deep\nafternoon sleep!",
    promiseLetter: "I promise to love you\nacross time and space,\nmy universal and\nbeautiful Dikshita. 🚀💖"
  },
  93: {
    loveLetter: "Solved with emotion! 💕\nYou felt it, Chiuuu!\nYou don't just think,\nyou feel, you love,\nyou care—beautifully.",
    promiseLetter: "I promise to always\nlead with my heart,\nmy emotional and\nbeautiful Chiuuu. ❤️💕"
  },
  94: {
    loveLetter: "Saw through fake ending! 🎭\nYou knew, Chiuuu!\nOur story doesn't end—\nit continues forever,\nlike an endless Netflix series!",
    promiseLetter: "I promise our story\nwill never end, Dikshita.\nForever and always,\nChotu and Chiuuu. 📖∞💖"
  },
  95: {
    loveLetter: "Trusted completely! 🤝\nYou trust me, Chiuuu!\nTrust is everything,\nand you've given me\nyours—I treasure it.",
    promiseLetter: "I promise to always\nbe worthy of your trust,\nmy trusting and\nbeautiful Dikshita. 🔒💕"
  },
  96: {
    loveLetter: "Perfect timing, Chiuuu! ⏰\nYou timed it right!\nLike timing your nap\nto perfection,\nyou're always on point.",
    promiseLetter: "I promise to always\nbe in sync with you,\nmy perfectly timed\nand beautiful Chiuuu. 🎵💖"
  },
  97: {
    loveLetter: "Moved everything! 🌍\nYou did it, Chiuuu!\nYou've moved my heart,\nmy soul, my world—\ncompletely and forever.",
    promiseLetter: "I promise to move\nmountains for you,\nmy powerful and\nbeautiful Dikshita. 🏔️💕"
  },
  98: {
    loveLetter: "Understood the words! 📝\nYou get me, Chiuuu!\nYou understand everything,\neven my silent love\nwhen you're sleeping.",
    promiseLetter: "I promise to always\nunderstand you, Dikshita.\nYour words, your silence,\nyour heart. 💭💖"
  },
  99: {
    loveLetter: "One away from 100! 🎯\nOne level left, Chiuuu!\nOne step to completion,\none moment from\nour forever beginning.",
    promiseLetter: "I promise the best\nis saved for last,\nmy precious and\nbeautiful Chiuuu. 🎁💕"
  },
  100: {
    loveLetter: "YOU DID IT, CHIUUU! 🎊🎉💖\n\nOne hundred levels of love!\nOne hundred moments of magic!\nOne hundred reasons I love you!\n\nFrom your peaceful sleep\nto your beautiful smile,\nfrom momos dates\nto Netflix marathons,\nfrom badminton games\nto Galaxy chocolate moments—\nevery second with you\nis a treasure.\n\nThank you for being you,\nmy sleepy, beautiful,\namazing Dikshita.\n\nPari, Harshal sir, Megha mama,\nand Varsha aunty are lucky\nto have you in their family,\nbut I'm the luckiest\nto have you in my heart.\n\nThis isn't the end, Chiuuu—\nit's just the beginning\nof our forever.\n\nI love you more than\nyou love sleep,\nmore than you love momos,\nmore than you love\nAditya Roy Kapoor!\n\n(Though I know you won't say it,\nI know you love me too. 😊)\n\nYou're my everything. 💕\n\nForever yours,\nChotu 💖",
    promiseLetter: "I promise to love you\nfor a hundred lifetimes\nand beyond, my Chiuuu.\n\nI promise to let you sleep\nas much as you want.\n\nI promise endless momos,\nGalaxy chocolates,\nand Netflix marathons.\n\nI promise to play badminton\nwith you forever.\n\nI promise to watch you sleep\nand smile every time.\n\nI promise to be your Chotu,\nalways and forever.\n\nYou're my world, Dikshita.\n\n∞💖∞"
  },
};

function convertPromises100ToWinLetter(promises100Letter: Promises100WinLetter): WinLetter {
  return {
    loveLetter: promises100Letter.loveLetter,
    promiseLetter: promises100Letter.promise
  };
}

export function getWinLetterForLevel(levelNumber: number, gameId: GameId = GAME_IDS.DEFAULT): WinLetter {
  if (gameId === GAME_IDS.PROMISES_100) {
    const promises100Letter = getPromises100WinLetter(levelNumber);
    return convertPromises100ToWinLetter(promises100Letter);
  }
  return WIN_LETTERS[levelNumber] || WIN_LETTERS[1];
}
