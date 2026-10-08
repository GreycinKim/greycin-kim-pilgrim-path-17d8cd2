export type ChoicePrompt = {
  prompt: string
  choices: [string, string, string]
}

export type StageChallenge = {
  quiz: [ChoicePrompt, ChoicePrompt, ChoicePrompt]
  path: ChoicePrompt
}

export const challenges: Record<string, StageChallenge> = {
  city: {
    quiz: [
      {
        prompt: "What is Christian afraid will happen to his city?",
        choices: ["It will be flooded", "It will be burned", "It will be sold"],
      },
      {
        prompt: "Who points him across the field?",
        choices: ["Help", "Goodwill", "Evangelist"],
      },
      {
        prompt: "What does he cry as he runs from home?",
        choices: ["Life, life, eternal life", "The burden, the burden", "Peace, peace"],
      },
    ],
    path: {
      prompt: "Where is he living when the dream begins?",
      choices: ["Vanity", "The City of Destruction", "Beulah"],
    },
  },
  evangelist: {
    quiz: [
      {
        prompt: "What should he do when he reaches the gate?",
        choices: ["Knock", "Wait for morning", "Pay a toll"],
      },
      {
        prompt: "Which neighbor mocks the journey and turns home?",
        choices: ["Pliable", "Obstinate", "Faithful"],
      },
      {
        prompt: "Who walks on with him, willing to see the way?",
        choices: ["Talkative", "Ignorance", "Pliable"],
      },
    ],
    path: {
      prompt: "Where is the light Evangelist tells him to follow?",
      choices: ["Mount Sinai", "The wicket gate", "The silver mine"],
    },
  },
  slough: {
    quiz: [
      {
        prompt: "What happens to both men in the slough?",
        choices: ["They build a bridge", "They fall in", "They find stepping-stones at once"],
      },
      {
        prompt: "Why does Christian sink deeper?",
        choices: ["The burden on his back", "He drops his roll", "Pliable holds him down"],
      },
      {
        prompt: "Which side does Pliable climb out on?",
        choices: ["The side nearer the gate", "The side nearest his house", "A boat to Morality"],
      },
    ],
    path: {
      prompt: "What is this miry place called?",
      choices: ["The Slough of Despond", "By-Path Meadow", "The Plain of Ease"],
    },
  },
  help: {
    quiz: [
      {
        prompt: "Who draws Christian out of the mire?",
        choices: ["Watchful", "Help", "Goodwill"],
      },
      {
        prompt: "What has the King laid across the slough?",
        choices: ["Stepping-stones", "An iron bridge", "A ferry"],
      },
      {
        prompt: "What makes those stones hard to see?",
        choices: ["The fair’s lamps", "Night on the hill", "Fear"],
      },
    ],
    path: {
      prompt: "Where does Help set him?",
      choices: ["Back in the city", "On firm ground", "Under Sinai"],
    },
  },
  wiseman: {
    quiz: [
      {
        prompt: "What town is Worldly Wiseman from?",
        choices: ["Carnal Policy", "Fair-speech", "Vanity"],
      },
      {
        prompt: "Who does he say can take the burden off?",
        choices: ["Evangelist", "Mr. Legality", "The Interpreter"],
      },
      {
        prompt: "What does Christian do with that counsel?",
        choices: ["He knocks at the gate", "He fights", "He leaves the way"],
      },
    ],
    path: {
      prompt: "Which village is the easier cure supposed to be in?",
      choices: ["Morality", "Beulah", "Destruction"],
    },
  },
  sinai: {
    quiz: [
      {
        prompt: "What seems ready to fall on him?",
        choices: ["The wicket gate", "Palace Beautiful", "Mount Sinai"],
      },
      {
        prompt: "What happens to the burden under the mountain?",
        choices: ["It grows heavier", "It falls into a tomb", "Help takes it"],
      },
      {
        prompt: "Which houses stand beside the hill?",
        choices: ["Vanity’s shops", "The houses of Morality", "The shepherds’ tents"],
      },
    ],
    path: {
      prompt: "Why does he stop?",
      choices: ["He is waiting for Pliable", "The gate is locked", "Afraid to go on, and ashamed to go back"],
    },
  },
  "evangelist-return": {
    quiz: [
      {
        prompt: "What does Evangelist ask the trembling man?",
        choices: ["Whether he is the man sent toward the gate", "Whether he has brought gold", "Whether Faithful is dead"],
      },
      {
        prompt: "Who cannot take a burden off?",
        choices: ["The shining ones", "Legality", "Goodwill"],
      },
      {
        prompt: "What does Christian do after the rebuke?",
        choices: ["He climbs the mountain", "He goes home", "He repents and is sent back"],
      },
    ],
    path: {
      prompt: "What will Sinai do to anyone who trusts the law to make them whole?",
      choices: ["Crush them", "Shelter them", "Arm them"],
    },
  },
  wicket: {
    quiz: [
      {
        prompt: "Who opens the gate?",
        choices: ["Watchful", "Goodwill", "Knowledge"],
      },
      {
        prompt: "Why is he pulled inside so quickly?",
        choices: ["Arrows from Beelzebub’s castle", "A rising flood", "Lions in the porch"],
      },
      {
        prompt: "Where is he sent next?",
        choices: ["Vanity Fair", "The Interpreter’s house", "Doubting Castle"],
      },
    ],
    path: {
      prompt: "How does he get the gate to open?",
      choices: ["He climbs the wall", "He pays Demas", "He knocks and calls"],
    },
  },
  interpreter: {
    quiz: [
      {
        prompt: "What happens if the dusty parlor is only swept?",
        choices: ["The dust chokes the room", "The room is clean", "A fire starts"],
      },
      {
        prompt: "What settles the dust?",
        choices: ["A sword", "Water sprinkled on it", "Opening the windows"],
      },
      {
        prompt: "Who cannot get out of the iron cage?",
        choices: ["Hopeful", "The porter", "A man shut in by his own despair"],
      },
    ],
    path: {
      prompt: "What is he shown in the first room?",
      choices: ["A grave portrait of the guide he should follow", "A map of Vanity", "Lot’s wife"],
    },
  },
  cross: {
    quiz: [
      {
        prompt: "Where does the burden go?",
        choices: ["Back onto Pliable", "Into the mouth of the tomb", "Into the slough"],
      },
      {
        prompt: "What do the three shining ones set on his chest?",
        choices: ["A sword", "A crown of silver", "A sealed roll"],
      },
      {
        prompt: "How did Formalist and Hypocrisy get onto the way?",
        choices: ["Over the wall from Vain-glory", "Through the wicket gate", "Across the river"],
      },
    ],
    path: {
      prompt: "What stands a little above the sepulchre?",
      choices: ["A silver mine", "A cross", "A giant’s cave"],
    },
  },
  hill: {
    quiz: [
      {
        prompt: "What is at the bottom of Hill Difficulty?",
        choices: ["A spring", "A fair", "A dungeon"],
      },
      {
        prompt: "Which roads do Formalist and Hypocrisy take?",
        choices: ["The straight climb", "Danger and Destruction", "The river bank"],
      },
      {
        prompt: "Do those side roads meet the way again?",
        choices: ["Yes, at the arbor", "Only at night", "No"],
      },
    ],
    path: {
      prompt: "What does Christian do at the spring?",
      choices: ["He drinks, then climbs", "He sleeps until morning", "He turns back"],
    },
  },
  arbour: {
    quiz: [
      {
        prompt: "What slips from his hand while he sleeps?",
        choices: ["His sword", "The roll", "The key called Promise"],
      },
      {
        prompt: "Who comes running down from the lions?",
        choices: ["Timorous and Mistrust", "Formalist and Hypocrisy", "Demas and By-ends"],
      },
      {
        prompt: "What does he do when the roll is missing?",
        choices: ["He buys another at the fair", "He asks Ignorance for his", "He walks back until he finds it"],
      },
    ],
    path: {
      prompt: "Who set the arbour on the hill for weary pilgrims?",
      choices: ["Giant Despair", "The Lord of the hill", "Atheist"],
    },
  },
  palace: {
    quiz: [
      {
        prompt: "What does Christian fail to see about the lions?",
        choices: ["They are chained", "They are asleep", "They are only painted"],
      },
      {
        prompt: "Who calls him through?",
        choices: ["Apollyon", "The porter Watchful", "By-ends"],
      },
      {
        prompt: "What is his sleeping chamber called?",
        choices: ["Error", "Ease", "Peace"],
      },
    ],
    path: {
      prompt: "What do they give him before the valley?",
      choices: ["Armor from the armory", "A share of the silver mine", "Ignorance’s certificate"],
    },
  },
  humiliation: {
    quiz: [
      {
        prompt: "What is this valley like for some pilgrims?",
        choices: ["A quiet green place", "A year-long fair", "A burning hill"],
      },
      {
        prompt: "What has he been told about his own crossing?",
        choices: ["He may sleep safely", "It will not be quiet for him", "The giant is already dead"],
      },
      {
        prompt: "How does he walk into it?",
        choices: ["Warily, with his sword loose", "Singing and unarmed", "In a chariot"],
      },
    ],
    path: {
      prompt: "Where has he just come down from?",
      choices: ["The Slough of Despond", "Palace Beautiful", "The Land of Beulah"],
    },
  },
  apollyon: {
    quiz: [
      {
        prompt: "What does Apollyon claim about Christian?",
        choices: ["He is an old subject", "He has no roll", "He was born in Beulah"],
      },
      {
        prompt: "How long do they fight?",
        choices: ["Until the fair closes", "Half a day", "Seven nights"],
      },
      {
        prompt: "What is brought for the wounds?",
        choices: ["Leaves of the tree of life", "Water from the slough", "Sleep in the arbor"],
      },
    ],
    path: {
      prompt: "What does Christian lose and then recover in the fight?",
      choices: ["His sword", "His family", "A bag of silver"],
    },
  },
  shadow: {
    quiz: [
      {
        prompt: "What borders the path in the dark valley?",
        choices: ["Two inns", "A ditch and a quag", "Lions and a spring"],
      },
      {
        prompt: "What does he fear the whisperer has given him?",
        choices: ["A psalm", "Blasphemies", "The key Promise"],
      },
      {
        prompt: "Who is left in the cave when day comes?",
        choices: ["Pope, a spent giant", "Apollyon", "Faithful"],
      },
    ],
    path: {
      prompt: "What has become of Pagan by the end of the valley?",
      choices: ["He rules the fair", "He is dead", "He guides pilgrims through"],
    },
  },
  faithful: {
    quiz: [
      {
        prompt: "Why had Faithful gotten ahead?",
        choices: ["Christian slept on the hill", "Faithful took By-Path Meadow", "Christian stayed in the city"],
      },
      {
        prompt: "What is Talkative full of?",
        choices: ["Armor", "Fine speech about religion", "Silence"],
      },
      {
        prompt: "What happens when Faithful questions him?",
        choices: ["He is given a certificate", "The hollowness shows, and he drops behind", "He leads them into the valley"],
      },
    ],
    path: {
      prompt: "Who catches up to whom?",
      choices: ["Christian overtakes Faithful", "Ignorance overtakes Hopeful", "Atheist overtakes Evangelist"],
    },
  },
  vanity: {
    quiz: [
      {
        prompt: "What does the fair sell as readily as gold?",
        choices: ["Honors, titles, lusts, and lives", "Only bread", "Rolls and keys"],
      },
      {
        prompt: "Who tries them?",
        choices: ["Goodwill", "Lord Hate-good", "Watchful"],
      },
      {
        prompt: "Who leaves the fair to walk with Christian?",
        choices: ["Ignorance", "By-ends", "Hopeful"],
      },
    ],
    path: {
      prompt: "How does Faithful leave Vanity Fair?",
      choices: ["A chariot carries him to the city gate", "He buys his freedom", "He climbs the wall"],
    },
  },
  "by-ends": {
    quiz: [
      {
        prompt: "What town is By-ends from?",
        choices: ["Fair-speech", "Destruction", "Beulah"],
      },
      {
        prompt: "When does he like religion?",
        choices: ["When the hill is steep", "When it walks in silver slippers", "When the river is deep"],
      },
      {
        prompt: "What do his companions say a man may do?",
        choices: ["Throw his roll away", "Use religion to get on in the world", "Fight Apollyon for wages"],
      },
    ],
    path: {
      prompt: "Who will By-ends not travel with?",
      choices: ["People who refuse to wait for wind and tide", "Anyone from the fair", "The shepherds"],
    },
  },
  ease: {
    quiz: [
      {
        prompt: "What is the delicate plain called?",
        choices: ["Humiliation", "Ease", "Beulah"],
      },
      {
        prompt: "How wide is it?",
        choices: ["Narrow", "A day’s march across", "Wider than the fair"],
      },
      {
        prompt: "What stands at the far side?",
        choices: ["The wicket gate", "Doubting Castle", "A little hill called Lucre"],
      },
    ],
    path: {
      prompt: "How do they cross that plain?",
      choices: ["With pleasure, and soon they are through", "Fighting the whole way", "Asleep in a chariot"],
    },
  },
  lucre: {
    quiz: [
      {
        prompt: "Who calls them off the road?",
        choices: ["Demas", "Hopeful", "Knowledge"],
      },
      {
        prompt: "Why will Christian not turn aside?",
        choices: ["The mine is empty", "This hill has overturned many pilgrims", "Evangelist is standing there"],
      },
      {
        prompt: "What monument do they come to next?",
        choices: ["A statue of Pliable", "The iron cage", "The pillar of salt that was Lot’s wife"],
      },
    ],
    path: {
      prompt: "What is Demas inviting them to see?",
      choices: ["A silver mine", "The key called Promise", "The armory"],
    },
  },
  bypath: {
    quiz: [
      {
        prompt: "What runs beside the right way at first?",
        choices: ["A river where they drink and sleep", "A fair", "A wall of fire"],
      },
      {
        prompt: "Who falls into a pit after dark?",
        choices: ["Christian", "Vain-confidence", "The shepherds"],
      },
      {
        prompt: "Whose ground do they sleep on?",
        choices: ["The Interpreter’s garden", "Giant Despair’s", "Beelzebub’s castle"],
      },
    ],
    path: {
      prompt: "How do they leave the rough path?",
      choices: ["Over Hill Difficulty again", "By a stile into a meadow", "Through the wicket gate"],
    },
  },
  despair: {
    quiz: [
      {
        prompt: "Where does the giant lock them?",
        choices: ["A dungeon in Doubting Castle", "The iron cage", "Vanity’s cage"],
      },
      {
        prompt: "Who tells him to beat them?",
        choices: ["Hopeful", "His wife Diffidence", "Charity"],
      },
      {
        prompt: "What opens the doors?",
        choices: ["Watchful’s shout", "A key called Promise", "The sealed roll, burned"],
      },
    ],
    path: {
      prompt: "What do they raise at the stile after they escape?",
      choices: ["A sign to warn the next pilgrims", "A pillar of salt", "A silver standard"],
    },
  },
  delectable: {
    quiz: [
      {
        prompt: "Whose land are the mountains in?",
        choices: ["Immanuel’s land", "Carnal Policy", "The country of Conceit"],
      },
      {
        prompt: "What do they see from Mount Clear?",
        choices: ["The slough", "The gate of the Celestial City", "Beelzebub’s castle"],
      },
      {
        prompt: "Who are they warned about?",
        choices: ["The Flatterer and the Enchanted Ground", "Evangelist and Help", "Discretion and Piety"],
      },
    ],
    path: {
      prompt: "Which shepherd is among those who welcome them?",
      choices: ["Demas", "Knowledge", "Atheist"],
    },
  },
  ignorance: {
    quiz: [
      {
        prompt: "How did Ignorance get onto the road?",
        choices: ["By a crooked lane from Conceit", "Through the wicket gate", "Over Hill Difficulty"],
      },
      {
        prompt: "Why is he sure the city will welcome him?",
        choices: ["He carries a certificate", "His heart and his thoughts are good", "He fought Apollyon"],
      },
      {
        prompt: "Who was robbed and barely kept his jewels?",
        choices: ["Faithful", "By-ends", "Little-faith"],
      },
    ],
    path: {
      prompt: "Where does that crooked lane begin?",
      choices: ["The country of Conceit", "Beulah", "The City of Destruction"],
    },
  },
  flatterer: {
    quiz: [
      {
        prompt: "What does the man in the light robe do?",
        choices: ["He leads them into a net", "He parts the river", "He arms them"],
      },
      {
        prompt: "What had they forgotten?",
        choices: ["Their names", "The shepherds’ warning", "The price of a title"],
      },
      {
        prompt: "What does the shining one do once the net is torn?",
        choices: ["He sends them home", "He laughs and leaves", "He chastises them and sets them on the way"],
      },
    ],
    path: {
      prompt: "What does the road do just before they meet him?",
      choices: ["It divides", "It ends", "It becomes the river"],
    },
  },
  atheist: {
    quiz: [
      {
        prompt: "How is Atheist walking when they meet him?",
        choices: ["The other way, softly, and laughing", "Up Hill Difficulty", "Back toward the gate they left"],
      },
      {
        prompt: "What does he say about the city?",
        choices: ["It stands on the next hill", "There is no such place", "The river has a bridge"],
      },
      {
        prompt: "How does he leave them?",
        choices: ["He joins the company", "He laughs again and walks on", "A shining one strikes him"],
      },
    ],
    path: {
      prompt: "Why does he think he knows the road better?",
      choices: ["The shepherds sent him", "He has been looking longer than they have", "He still has his roll"],
    },
  },
  enchanted: {
    quiz: [
      {
        prompt: "What does the air of this country do?",
        choices: ["It makes a pilgrim sleepy", "It heals old wounds", "It shows the city clearly"],
      },
      {
        prompt: "How does Hopeful keep Christian awake?",
        choices: ["By showing him the mine", "By telling how he left Vanity Fair", "By reading the fair’s law"],
      },
      {
        prompt: "Who is already asleep in the arbor?",
        choices: ["Heedless and Too-bold", "The four shepherds", "Two shining ones"],
      },
    ],
    path: {
      prompt: "Do Christian and Hopeful sit down there?",
      choices: ["No", "Yes, until morning", "Only when Ignorance asks"],
    },
  },
  beulah: {
    quiz: [
      {
        prompt: "What is within sight in Beulah?",
        choices: ["The city", "Mount Sinai", "The slough"],
      },
      {
        prompt: "What never fails in that country?",
        choices: ["The storm", "The flowers", "The fair"],
      },
      {
        prompt: "What must they pass before the gate?",
        choices: ["The silver mine", "Hill Difficulty again", "The river"],
      },
    ],
    path: {
      prompt: "Who comes out to meet them?",
      choices: ["Shining ones", "Giant Despair", "Worldly Wiseman"],
    },
  },
  river: {
    quiz: [
      {
        prompt: "What is not there to help them across?",
        choices: ["A bridge", "Water", "A far bank"],
      },
      {
        prompt: "What does the depth follow?",
        choices: ["The season", "A pilgrim’s faith", "The weight of the gold they carry"],
      },
      {
        prompt: "Who holds Christian up when he sinks?",
        choices: ["Ignorance", "Hopeful", "Vain-hope"],
      },
    ],
    path: {
      prompt: "What does Christian find before they reach the bank?",
      choices: ["A ferry", "Ground under his feet", "A chariot in the water"],
    },
  },
  celestial: {
    quiz: [
      {
        prompt: "What is read at the gate?",
        choices: ["Their certificates", "The charges from the fair", "A letter from Atheist"],
      },
      {
        prompt: "Who ferries Ignorance to the gate?",
        choices: ["Hopeful", "Vain-hope", "Goodwill"],
      },
      {
        prompt: "What happens to Ignorance without a certificate?",
        choices: ["He is crowned with them", "He is sent to the Interpreter", "He is bound and put out of the way"],
      },
    ],
    path: {
      prompt: "How does Part I end?",
      choices: ["The dreamer wakes", "Christian turns back home", "The fair is pulled down"],
    },
  },
}

export function challengeAt(stageId: string) {
  return challenges[stageId]
}
