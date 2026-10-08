export type VoiceLine = {
  speaker: string
  line: string
}

const voices: Record<string, VoiceLine[]> = {
  city: [
    {
      speaker: "Evangelist",
      line: "The city will not hold. Keep your face toward the light, and do not turn when they call your name.",
    },
  ],
  evangelist: [
    {
      speaker: "Evangelist",
      line: "Do you see yonder shining light? Keep it in your eye, and knock when you come to the gate.",
    },
  ],
  slough: [
    {
      speaker: "Pliable",
      line: "I am going back. You may keep the mire, and the burden with it. I will have no more of this journey.",
    },
  ],
  help: [
    {
      speaker: "Help",
      line: "The steps are there, though fear hides them. Give me your hand, and I will set you on firm ground.",
    },
  ],
  wiseman: [
    {
      speaker: "Mr. Worldly Wiseman",
      line: "Why take the hard way? Morality is a civil town, and Legality will have that burden off you before night.",
    },
  ],
  sinai: [
    {
      speaker: "Mr. Legality",
      line: "Come up to the house. The hill is only the law being honest with you. Stand still, and it will settle.",
    },
  ],
  "evangelist-return": [
    {
      speaker: "Evangelist",
      line: "This hill falls on anyone who tries to be cured by it. Turn, and take the way I first showed you.",
    },
  ],
  wicket: [
    {
      speaker: "Goodwill",
      line: "Knock, and come through quickly. Arrows are shot from the castle at anyone who lingers on the step.",
    },
  ],
  interpreter: [
    {
      speaker: "Interpreter",
      line: "Remember the picture, and the water that settles the dust. I have shown you the rooms. The road is outside.",
    },
  ],
  cross: [
    {
      speaker: "A shining one",
      line: "Your burden is in the tomb. Take the roll, and do not lose it. They will ask for it at the gate.",
    },
  ],
  hill: [
    {
      speaker: "Formalist",
      line: "The hill is for people with time to waste. This side road will meet the way again. Come with us.",
    },
  ],
  arbour: [
    {
      speaker: "Timorous",
      line: "The lions are loose ahead of you. We are going back down, and you would be wise to come with us.",
    },
  ],
  palace: [
    {
      speaker: "Watchful",
      line: "The lions are chained. Stay in the middle of the path, and I will see you through to the door.",
    },
  ],
  humiliation: [
    {
      speaker: "Discretion",
      line: "This valley is green for some. It will not be green for you. Keep your sword loose in your hand.",
    },
  ],
  apollyon: [
    {
      speaker: "Apollyon",
      line: "You were my servant once. Turn back, and the wages of the country are still yours.",
    },
  ],
  shadow: [
    {
      speaker: "A pilgrim ahead",
      line: "If you can hear me, you are still on the path. Walk toward the voice. Day is at the far end.",
    },
  ],
  faithful: [
    {
      speaker: "Faithful",
      line: "I passed you while you slept on the hill. Come up, and we will tell each other what the road has cost.",
    },
  ],
  vanity: [
    {
      speaker: "Hopeful",
      line: "I saw how Faithful left this fair. If you are going out of it, I will walk with you.",
    },
  ],
  "by-ends": [
    {
      speaker: "By-ends",
      line: "I am for religion when the wind and the tide agree. Walk slower, and a man may keep his silver slippers.",
    },
  ],
  ease: [
    {
      speaker: "Hopeful",
      line: "The plain is kind, and it is shorter than it feels. Enjoy it, and do not sit down.",
    },
  ],
  lucre: [
    {
      speaker: "Demas",
      line: "Come over and see. The mine is little trouble, and the hill is full of silver.",
    },
  ],
  bypath: [
    {
      speaker: "Vain-confidence",
      line: "This meadow is softer than the road. Follow me, if you can still see me.",
    },
  ],
  despair: [
    {
      speaker: "Hopeful",
      line: "Brother, remember the key in your bosom. Try it in the lock before morning.",
    },
  ],
  delectable: [
    {
      speaker: "Knowledge",
      line: "We were told you would come. Sleep here, look through the glass, and do not forget the Flatterer or the Enchanted Ground.",
    },
  ],
  ignorance: [
    {
      speaker: "Ignorance",
      line: "I shall be let in as readily as you. My heart is good, and I have always thought well of the city.",
    },
  ],
  flatterer: [
    {
      speaker: "The Flatterer",
      line: "You were right to doubt the other turning. This is the way. Follow the light on my coat.",
    },
  ],
  atheist: [
    {
      speaker: "Atheist",
      line: "I have walked farther than you, and there is no such city. Save yourself the rest of the road.",
    },
  ],
  enchanted: [
    {
      speaker: "Hopeful",
      line: "Do not sit down. Tell me your story, or I will tell you mine, but keep your eyes open.",
    },
  ],
  beulah: [
    {
      speaker: "A shining one",
      line: "You are in the King’s country. The city is in sight, and the river is still between you and the gate.",
    },
  ],
  river: [
    {
      speaker: "Hopeful",
      line: "I feel the bottom. Take hold of me, and call the promises to mind. The water falls where you can stand.",
    },
  ],
  celestial: [
    {
      speaker: "A shining one",
      line: "Have you kept your roll? The bells are for those who come with a certificate.",
    },
  ],
}

export function voicesAt(stageId: string) {
  return voices[stageId] ?? []
}
