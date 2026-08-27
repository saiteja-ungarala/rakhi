export const MESSAGE_TEMPLATES: Record<string, string[]> = {
  Heartfelt: [
    "Happy Raksha Bandhan, {receiver} ❤️ No matter where life takes us or how often we annoy each other, you'll always be one of the most special people in my life. Lucky to have you.",
    "Dear {receiver}, you're not just my sibling, you're my first friend and forever confidant. Happy Rakhi! ❤️",
    "Having you as a sibling is the greatest gift. Wishing you all the happiness in the world today and always. Happy Raksha Bandhan, {receiver} ❤️",
    "To the one who knows all my secrets and still loves me unconditionally. Happy Rakhi, {receiver}! ❤️",
    "Distance may separate us, but this thread keeps our hearts connected. Miss you and love you always, {receiver}. Happy Raksha Bandhan! ❤️"
  ],
  Funny: [
    "Happy Rakhi, {receiver}! 😂 Thanks for being my favourite headache for another year. Don't get too emotional though — I still expect you to share your snacks.",
    "Here's to another year of mom and dad loving me more. Happy Raksha Bandhan, {receiver}! 😂",
    "Happy Rakhi! I smiled while creating this because I realised there's absolutely nothing you can do to change the fact that we're siblings. 😂",
    "I was going to buy you a really expensive gift, but I figured my wonderful presence in your life is more than enough. Happy Rakhi, {receiver}! 😂",
    "Happy Raksha Bandhan, {receiver}! May you continue to be slightly less awesome than me. 😎😂"
  ],
  Roast: [
    "Happy Rakhi! I would say you're the best sibling ever... but let's keep at least one lie out of this celebration. 😂❤️",
    "I love you, {receiver}, even though you were definitely adopted. Happy Raksha Bandhan! 😂",
    "Happy Rakhi! It's truly amazing how you've managed to survive this long without my constant guidance. 😂",
    "To the monkey of the house: Happy Raksha Bandhan! Here's a banana 🍌 and this digital Rakhi.",
    "Happy Rakhi, {receiver}! You might be a pain, but at least you're my pain. ❤️😂"
  ],
  Emotional: [
    "Some relationships don't need daily conversations to stay close. No matter how much time passes, you'll always have a special place in my heart. Happy Raksha Bandhan, {receiver}. ❤️",
    "Growing up with you was the best part of my childhood. Thank you for always watching my back, {receiver}. Happy Rakhi. 🥹❤️",
    "Through all the ups and downs, you've been my constant anchor. I couldn't have asked for a better sibling. Happy Raksha Bandhan, {receiver}. ❤️",
    "Whenever I needed a hand, you gave me your whole heart. Thank you for everything, {receiver}. Happy Rakhi! 🥹",
    "You're the thread that holds so many of my happiest memories together. I love you, {receiver}. Happy Raksha Bandhan. ❤️"
  ],
  Cool: [
    "Different personalities. Same chaos. Same family. Happy Rakhi, {receiver}. 😎❤️",
    "Partner in crime since day one. Let's keep the streak going. Happy Rakhi, {receiver}! 😎",
    "Stay awesome, stay weird, and keep being the coolest sibling ever. Happy Raksha Bandhan, {receiver}! 👊",
    "No long emotional paragraphs here. Just lots of love and good vibes. Happy Rakhi, {receiver}! ✨😎",
    "To the one who always matches my freak. Happy Raksha Bandhan, {receiver}! 👊❤️"
  ],
  Magical: [
    "One thread. A thousand memories. And one bond that somehow survives all our fights. Happy Raksha Bandhan, {receiver}. ✨❤️",
    "May this simple thread bring you all the magic, luck, and happiness in the universe. Happy Rakhi, {receiver}! ✨",
    "Like a protective spell, this bond will always keep you safe and loved. Happy Raksha Bandhan, {receiver}. ✨❤️",
    "Sending you a little bit of magic wrapped in a digital Rakhi today. Have a beautiful day, {receiver}! ✨",
    "Our bond is the closest thing to real magic I know. Happy Raksha Bandhan, {receiver}! ✨❤️"
  ]
};

export function getRandomMessage(style: string, sender: string, receiver: string): string {
  const templates = MESSAGE_TEMPLATES[style] || MESSAGE_TEMPLATES['Heartfelt'];
  const randomIndex = Math.floor(Math.random() * templates.length);
  let msg = templates[randomIndex];
  msg = msg.replace(/{sender}/g, sender).replace(/{receiver}/g, receiver);
  return msg;
}
