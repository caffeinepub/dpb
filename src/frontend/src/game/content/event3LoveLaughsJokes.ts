export const LOVE_LAUGHS_JOKES = [
  // Letter 1 (Jokes 1-5)
  "Dikshu calls me Chotu, but still my love for her is bigger than my CET percentile 😌📉❤️",
  "My CET score was 10, but Dikshita fell for me…\nProof that love doesn't need cut-off 😂💘",
  "Dikshu says my driving is dangerous,\nbut she still sits beside me — that's true love 🚗😌❤️",
  "She calls me tanned guy,\nbut still chooses me over fair Galaxy chocolate wrappers 🍫😆",
  "Dikshu roasts my CET marks,\nbut she's doing Civil Engineering —\nbeauty with brains still chose Chotu 🤓❤️",

  // Letter 2 (Jokes 6-10)
  "My driving skills are bad,\nbut Dikshu still trusts me with her heart…\nGPS toh galat hota hai, dil nahi 😘🧭",
  "She says \"Pata nahi\" a lot,\nbut somehow she was very sure about me 😏❤️",
  "Dikshu loves momos from Jaripatka,\nand still loves me even when I drive like Jaripatka roads 😭🚗",
  "She calls me Chotu,\nbut still lets me write big romantic songs for her 🎶❤️",
  "My CET percentile is 10,\nbut Dikshu rates my love 100/100 💯😍",

  // Letter 3 (Jokes 11-15)
  "Dikshu says I'm tanned,\nbut that's because I'm burning in her love daily 🔥😌",
  "She roasts my driving,\nbut still trusts me more than Google Maps 😆📍❤️",
  "Dikshu plays badminton so well,\nshe smashes shuttlecock AND my ego together 🏸😂❤️",
  "She loves sleeping,\nand I love watching her sleep —\nChotu ka Netflix premium 😴❤️",
  "My CET marks were low,\nbut Dikshu still believes I'm high-quality boyfriend material 😎💘",

  // Letter 4 (Jokes 16-20)
  "Dikshu's favorite actor is Aditya Roy Kapoor,\nbut she still talks to tanned Chotu daily 🤭❤️",
  "She teases my driving,\nbut still lets me drive her crazy — emotionally 😌❤️",
  "Dikshu wears a golden \"D\" locket,\nand I wear 10 percentile ka confidence proudly 😆🏅",
  "She roasts me in front of everyone,\nbut defends me silently — that's Dikshu love 🥺❤️",
  "My CET score was 10,\nbut Dikshu says \"marks don't define you\" —\nwife material alert 🚨💍",

  // Letter 5 (Jokes 21-25)
  "Dikshu says I drive like a beginner,\nbut she still chose me for a lifetime journey 🚗❤️♾️",
  "She calls me Chotu,\nbut gets angry if anyone else does —\nexclusive roasting rights only 😤😂❤️",
  "Dikshu loves Galaxy chocolate,\nbut still chooses me —\neven with no wrapper and full tan 😌🍫",
  "My driving scares her,\nbut losing me scares her more 😘❤️",
  "She roasts my CET marks,\nbut never doubts my intentions or love 🫶",

  // Letter 6 (Jokes 26-30)
  "Dikshu dances beautifully,\nand I dance badly —\nstill she dances with me 🕺💃❤️",
  "She calls me tanned guy,\nbut hugs me like I'm 24-carat gold 🫂✨",
  "My CET score is low,\nbut Dikshu says my effort matters more 🥹❤️",
  "Dikshu sleeps a lot,\nmaybe because listening to my CET stories is tiring 😴😂",
  "She roasts my driving,\nbut trusts me to drive her future dreams 💭❤️",

  // Letter 7 (Jokes 31-35)
  "Dikshu lives in North Star Building,\nand I live in her jokes daily 😆🏢❤️",
  "She loves Milky Mist curd,\nbut still tolerates extra spicy Chotu 😌🌶️",
  "My driving is bad,\nbut Dikshu says \"At least your heart is in right direction\" 🧭❤️",
  "Dikshu says \"pata nahi\",\nbut still knows I'm her Chotu forever 🥰",
  "She roasts my CET percentile,\nbut proudly tells people \"he's mine\" 😌❤️",

  // Letter 8 (Jokes 36-40)
  "Dikshu's Nanaji is her favorite person,\nand I'm second — fair enough, Chotu understands 😄❤️",
  "She teases me for being tanned,\nbut gets jealous if someone else notices me 😏🔥",
  "Dikshu loves Netflix,\nbut still pauses shows to talk to low-percentile Chotu 🎬😂❤️",
  "My driving is scary,\nbut Dikshu still believes I'll take her safely through life 🛣️❤️",
  "She roasts me daily,\nbut never lets me feel small —\nthat's Dikshu magic ✨❤️",

  // Letter 9 (Jokes 41-45)
  "Dikshu says my CET was only 10,\nbut my patience level with her roasting is 100 😌💯",
  "She calls me Chotu,\nbut still needs me when she's sad 🫂❤️",
  "Dikshu's brain is Civil Engineering,\nmine is emotional engineering —\nperfect balance 🧠❤️",
  "My driving is bad,\nbut Dikshu still trusts me with her favorite seat — her heart 💺❤️",
  "She roasts me for everything,\nbut smiles only because of me 😄❤️",

  // Letter 10 (Jokes 46-50)
  "Dikshu says I'm tanned,\nbut holds my hand like I'm her comfort zone 🤍",
  "My CET percentile was 10,\nbut Dikshu says \"You scored full marks in loving me\" 🥹❤️",
  "She laughs at my driving,\nbut cries if I'm upset — soft heart, sharp tongue 😌❤️",
  "Dikshu roasts me,\nbut still chooses me every day —\nthat's the biggest win 🏆❤️",
  "She calls me Chotu,\nteases my marks, my driving, my tan…\nbut loves me in a way\nno topper, no driver, no hero ever could 🥺💍❤️",
] as const;

export function getJokesForLetter(letterNumber: number): string[] {
  const startIndex = (letterNumber - 1) * 5;
  const endIndex = startIndex + 5;
  return LOVE_LAUGHS_JOKES.slice(startIndex, endIndex) as unknown as string[];
}
