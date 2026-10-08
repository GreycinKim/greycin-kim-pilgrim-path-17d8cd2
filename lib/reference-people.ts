import type { VerseId } from "./kjv.ts"
import type { PlateSpec } from "./plate.ts"

export type Person = {
  id: string
  name: string
  aliases?: string[]
  role: string
  account: string
  seenAt: string[]
  plate: PlateSpec
  verses: { id: VerseId; why: string }[]
}

const pilgrim: PlateSpec["figure"] = "pilgrim"

export const people: Person[] = [
  {
    id: "christian",
    name: "Christian",
    aliases: ["Graceless"],
    role: "The pilgrim",
    account:
      "He begins as a man with a book and a burden, living in the City of Destruction under the name Graceless. Evangelist turns him toward the wicket gate. The burden falls at the cross, and he goes on, with Faithful and then Hopeful, until the river and the gate of the city.",
    seenAt: [
      "city", "evangelist", "slough", "help", "wiseman", "sinai", "evangelist-return", "wicket", "interpreter", "cross", "hill", "arbour", "palace", "humiliation", "apollyon", "shadow", "faithful", "vanity", "by-ends", "ease", "lucre", "bypath", "despair", "delectable", "ignorance", "flatterer", "atheist", "enchanted", "beulah", "river", "celestial",
    ],
    plate: { sky: "day", land: "field", mark: "burden", figure: pilgrim },
    verses: [
      { id: "psalm38_4", why: "Bunyan’s margin on the burden. It is the weight of sin, not a pack he can set down himself." },
      { id: "acts16_30", why: "His cry outside the city is the jailer’s question. The answer he is walking toward is in the next verse." },
      { id: "matthew11_28", why: "The rest he is promised is not Morality. It is the call of Christ to the heavy laden." },
    ],
  },
  {
    id: "family",
    name: "Christian’s wife and children",
    role: "The household that stays",
    account:
      "They think the book has made him ill, and they cry after him when he runs. He stops his ears and does not look back. Part I leaves them in the city. Their own journey is the story of Part II.",
    seenAt: ["city"],
    plate: { sky: "dusk", land: "town", mark: "none", figure: "pair" },
    verses: [
      { id: "luke14_26", why: "Bunyan sets this beside the running. Following Christ can divide a house." },
      { id: "genesis19_17", why: "He looks not behind him, as Lot was told on the plain." },
    ],
  },
  {
    id: "evangelist",
    name: "Evangelist",
    role: "The guide at the start, and again before the fair",
    account:
      "He finds Christian in the fields, points him to the wicket gate by way of a distant light, and later meets him trembling under Sinai and turns him back. Before Vanity Fair he warns Christian and Faithful that the town will not love their speech, and that one of them will not leave it alive.",
    seenAt: ["city", "evangelist", "evangelist-return", "vanity"],
    plate: { sky: "day", land: "field", mark: "staff", figure: "elder" },
    verses: [
      { id: "matthew7_13", why: "The wicket gate is Bunyan’s picture of the strait gate." },
      { id: "psalm119_105", why: "The shining light Evangelist tells him to keep in his eye is the word." },
      { id: "peter2_1_19", why: "Bunyan pairs the lamp of the word with the day star that rises in a dark place." },
    ],
  },
  {
    id: "obstinate",
    name: "Obstinate",
    role: "The neighbor who turns home",
    account:
      "He comes after Christian with Pliable to fetch him back. The country Christian describes sounds like nonsense to him. He mocks the journey and returns to the city.",
    seenAt: ["evangelist"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs26_16", why: "Bunyan’s margin on a man wise in his own conceit, who will not hear a reason." },
      { id: "jeremiah20_10", why: "The neighbors come out to report on him as he runs." },
    ],
  },
  {
    id: "pliable",
    name: "Pliable",
    role: "The neighbor who starts, and turns in the mud",
    account:
      "He likes the sound of the inheritance and walks with Christian until the Slough of Despond. The mire is enough. He climbs out on the side nearest home and will not be persuaded back.",
    seenAt: ["evangelist", "slough"],
    plate: { sky: "dusk", land: "bog", mark: "none", figure: "gentle" },
    verses: [
      { id: "luke8_13", why: "He receives the word with joy and falls away at the first trouble. Bunyan uses the stony ground for this kind of hearer." },
      { id: "peter1_1_4", why: "The country he almost wanted is the inheritance that does not fade. He never sees it." },
    ],
  },
  {
    id: "help",
    name: "Help",
    role: "The man who pulls Christian from the slough",
    account:
      "He hears Christian crying in the mire, draws him out, and sets him on sound ground. The slough, he says, is the scum that conviction of sin drains into the way. The King’s surveyors have laid stepping-stones, but fear hides them.",
    seenAt: ["help"],
    plate: { sky: "day", land: "bog", mark: "staff", figure: "elder" },
    verses: [
      { id: "psalm40_2", why: "Bunyan’s picture of the rescue: up out of the pit and the miry clay, feet on a rock." },
      { id: "isaiah35_3", why: "Help’s errand is the prophet’s: strengthen the weak hands and tell the fearful heart to be strong." },
    ],
  },
  {
    id: "worldly-wiseman",
    name: "Mr. Worldly Wiseman",
    aliases: ["Mr. Worldly Wiseman"],
    role: "A gentleman of Carnal Policy",
    account:
      "He stops Christian on the road and speaks against the book and against Evangelist. His cure is the village of Morality, and Mr. Legality to take the burden off. Christian leaves the way to try it. Evangelist later calls that counsel a turning aside from the strait gate.",
    seenAt: ["wiseman"],
    plate: { sky: "day", land: "town", mark: "book", figure: "gentle" },
    verses: [
      { id: "galatians6_12", why: "Bunyan marks him as a fair show in the flesh, a way to avoid the cross." },
      { id: "john1_4_5", why: "He speaks the doctrine of this world, and the world hears him gladly." },
      { id: "luke13_24", why: "Evangelist’s rebuke quotes the command to strive for the strait gate Wiseman made him leave." },
    ],
  },
  {
    id: "legality",
    name: "Mr. Legality",
    aliases: ["Mr. Legality"],
    role: "The lawyer of the village of Morality",
    account:
      "Worldly Wiseman says Legality can take a burden off. Christian never reaches the house. The hill over it, Sinai, flashes with fire and the burden grows heavier. Evangelist says the law cannot cure what only the cross can loose.",
    seenAt: ["sinai", "wiseman"],
    plate: { sky: "dusk", land: "mount", mark: "fire", figure: "elder" },
    verses: [
      { id: "galatians3_10", why: "The law’s sentence on everyone who does not continue in all of it. That is the burden growing heavier." },
      { id: "galatians4_24", why: "Bunyan’s Sinai is the covenant that genders to bondage." },
      { id: "romans10_4", why: "Christ, not Legality, is the end of the law for righteousness." },
    ],
  },
  {
    id: "civility",
    name: "Civility",
    role: "Mr. Legality’s son",
    account:
      "If Legality is not at home, Wiseman says, the son Civility is as good a physician. Christian does not meet him. The name is the manners of Morality offered as a cure for guilt.",
    seenAt: ["wiseman", "sinai"],
    plate: { sky: "day", land: "town", mark: "none", figure: "gentle" },
    verses: [
      { id: "isaiah64_6", why: "A civil life, offered as righteousness, is still counted filthy rags." },
      { id: "galatians2_16", why: "A man is not justified by the works of the law." },
    ],
  },
  {
    id: "goodwill",
    name: "Goodwill",
    role: "The keeper of the wicket gate",
    account:
      "He opens at Christian’s knock and pulls him in at once, because Beelzebub’s archers shoot at anyone who lingers on the step. He asks about the road, sets him on the straight way, and sends him to the Interpreter. In Part II the keepers of the gate are spoken of as the Lord himself.",
    seenAt: ["wicket"],
    plate: { sky: "day", land: "road", mark: "gate", figure: "elder" },
    verses: [
      { id: "matthew7_7", why: "The writing over the gate is this promise: knock, and it shall be opened." },
      { id: "john6_37", why: "Goodwill’s welcome is the word that whoever comes will not be cast out." },
      { id: "ephesians6_16", why: "The arrows from the castle are the fiery darts the shield of faith is given to quench." },
    ],
  },
  {
    id: "interpreter",
    name: "The Interpreter",
    aliases: ["Interpreter"],
    role: "The master of the significant rooms",
    account:
      "Goodwill sends Christian to his house. Room by room he shows the portrait of the true guide, the dusty parlor, Passion and Patience, the fire that will not go out, the palace a man fights his way into, the iron cage, and a dream of the last day. Then he sends him toward the highway.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "book", figure: "elder" },
    verses: [
      { id: "job33_23", why: "Bunyan’s margin: an interpreter, one among a thousand, to show a man what is right." },
      { id: "corinthians1_4_15", why: "He is a father in the gospel, not one more instructor among ten thousand." },
    ],
  },
  {
    id: "portrait",
    name: "The man in the portrait",
    role: "The picture of the guide to follow",
    account:
      "The first room holds a grave picture: a person with the best of books in his hand, the law of truth on his lips, the world behind his back, a crown above him, and he stands as if he would plead with men. The Interpreter tells Christian to remember this face, because only this kind of guide is safe.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "crown", figure: "elder" },
    verses: [
      { id: "corinthians2_4_18", why: "The world is behind his back because the things that are seen are temporal." },
      { id: "timothy2_4_8", why: "The crown over the portrait is the crown laid up, not a prize the world gives." },
    ],
  },
  {
    id: "sweeper",
    name: "The man who sweeps",
    role: "Law, in the dusty parlor",
    account:
      "A room is thick with dust. A man sweeps, and the dust flies until Christian nearly chokes. The Interpreter says the dust is original sin, and sweeping is the law, which discovers sin and cannot clear it.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "staff", figure: "elder" },
    verses: [
      { id: "corinthians1_15_56", why: "The strength of sin is the law. Sweeping stirs what it cannot take away." },
      { id: "romans7_24", why: "The choked room is the cry of the man who knows the law and cannot keep it." },
    ],
  },
  {
    id: "damsel",
    name: "The damsel with the water",
    role: "The gospel, sprinkled on the dust",
    account:
      "After the sweeping, a damsel sprinkles the room with water and the dust settles, so the room can be cleaned. The Interpreter says the water is the gospel.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "spring", figure: "lady" },
    verses: [
      { id: "ephesians5_26", why: "Bunyan’s sprinkling is the washing of water by the word." },
      { id: "john15_3", why: "Clean through the word, which is what the law’s broom could not do." },
    ],
  },
  {
    id: "passion",
    name: "Passion",
    role: "The child who will have his treasure now",
    account:
      "In a little room two children sit. Passion is discontented until a bag of treasure is poured at his feet. He laughs at his brother, spends it at once, and has nothing left but rags.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "none", figure: "gentle" },
    verses: [
      { id: "luke16_25", why: "Bunyan quotes the rich man and Lazarus. Passion has his good things in this life." },
      { id: "corinthians2_4_18", why: "What he can see is temporal. He will not wait for what he cannot see." },
    ],
  },
  {
    id: "patience",
    name: "Patience",
    role: "The child who waits for the better things",
    account:
      "He sits quiet beside Passion and is willing to wait until the next year, which the Interpreter reads as the world to come. His portion comes last, and so it lasts.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "house", mark: "crown", figure: "pilgrim" },
    verses: [
      { id: "hebrews11_16", why: "Patience is the pilgrim who desires a better country." },
      { id: "revelation21_4", why: "The best things he waits for include the end of tears." },
    ],
  },
  {
    id: "oil-bearer",
    name: "The man who pours the oil",
    role: "The figure behind the wall, feeding the fire",
    account:
      "Christian sees a fire burning against a wall. Someone stands by and throws water on it, yet it burns higher. The Interpreter takes him behind the wall, where a man secretly pours oil. The water is the devil’s work. The oil is the grace of Christ.",
    seenAt: ["interpreter"],
    plate: { sky: "night", land: "house", mark: "fire", figure: "shining" },
    verses: [
      { id: "corinthians2_12_9", why: "Bunyan’s margin on the fire: grace is sufficient, and strength is made perfect in weakness." },
    ],
  },
  {
    id: "brave-man",
    name: "The man who fought into the palace",
    role: "The figure of a pilgrim who will not turn",
    account:
      "A stately palace is crowded with people in gold, and armed men at the door refuse entrance. A man with a determined face cuts his way in. Those inside welcome him. The lesson is that the kingdom is entered through tribulation.",
    seenAt: ["interpreter"],
    plate: { sky: "day", land: "castle", mark: "sword", figure: "pilgrim" },
    verses: [
      { id: "acts14_22", why: "Bunyan sets this fight beside the word that we enter the kingdom through much tribulation." },
    ],
  },
  {
    id: "iron-cage",
    name: "The man in the iron cage",
    role: "A professor shut up in despair",
    account:
      "In a dark room a man sits in a cage and says he cannot get out. He once professed the faith, then hardened, and now believes God has denied him repentance. The Interpreter leaves him as a warning, not as the last word about every fear.",
    seenAt: ["interpreter"],
    plate: { sky: "night", land: "house", mark: "cage", figure: "sleep" },
    verses: [
      { id: "hebrews6_6", why: "Bunyan’s margin for a man who crucifies the Son afresh and treats the shame of the cross as nothing." },
      { id: "hebrews10_29", why: "The cage is the story’s picture of despising the blood of the covenant." },
      { id: "luke19_14", why: "He had said, in effect, that he would not have this man reign over him." },
    ],
  },
  {
    id: "dreamer-of-the-day",
    name: "The man who dreamed of the judgment",
    role: "The last room in the Interpreter’s house",
    account:
      "A man rises trembling from a dream of the last day: the heavens on fire, the Judge on the cloud, and a voice that he is not fit to enter. The Interpreter tells Christian to keep the dream in mind.",
    seenAt: ["interpreter"],
    plate: { sky: "night", land: "field", mark: "fire", figure: "sleep" },
    verses: [
      { id: "matthew25_31", why: "The dream is the Son of man coming in glory and separating the nations." },
      { id: "hebrews9_27", why: "It is appointed unto men once to die, and after this the judgment. That fear is what started Christian." },
    ],
  },
  {
    id: "shining-ones",
    name: "The Shining Ones",
    aliases: ["A shining one"],
    role: "The messengers at the cross, the river, and the gate",
    account:
      "Three of them meet Christian when the burden falls. They greet him with peace, give him new clothing, set a mark on his forehead, and a sealed roll on his chest. Others walk the land of Beulah, conduct the pilgrims through the river, and, at the end, bind Ignorance and carry him away.",
    seenAt: ["cross", "beulah", "river", "celestial"],
    plate: { sky: "glory", land: "field", mark: "roll", figure: "shining" },
    verses: [
      { id: "mark2_5", why: "The first word at the cross is forgiveness, as Jesus spoke it to the paralytic." },
      { id: "zechariah3_4", why: "Bunyan’s change of raiment is the filthy garments taken away." },
      { id: "ephesians1_13", why: "The sealed roll is the seal of the Spirit, to be shown at the gate." },
    ],
  },
  {
    id: "simple",
    name: "Simple",
    role: "One of the three asleep in irons",
    account:
      "A little out of the way beyond the cross, Christian finds three men fast asleep with fetters on their heels. Simple is the first. Christian tries to wake them. They will not get up.",
    seenAt: ["cross"],
    plate: { sky: "day", land: "road", mark: "none", figure: "sleep" },
    verses: [
      { id: "proverbs6_6", why: "The same rebuke that wakes Christian in the arbour belongs to these sleepers: consider the ant." },
      { id: "thessalonians1_5_6", why: "They sleep as others do, in a place where a pilgrim is told to watch." },
    ],
  },
  {
    id: "sloth",
    name: "Sloth",
    role: "The second of the sleepers",
    account:
      "He lies fettered beside Simple and Presumption and answers, in effect, that he wants more sleep. Christian goes on grieving that a warning is not wanted.",
    seenAt: ["cross"],
    plate: { sky: "dusk", land: "road", mark: "none", figure: "sleep" },
    verses: [
      { id: "proverbs13_4", why: "The sluggard desires, and has nothing. Sloth will not even desire the rest of the road." },
    ],
  },
  {
    id: "presumption",
    name: "Presumption",
    role: "The third of the sleepers",
    account:
      "He tells Christian not to meddle, and that every tub must stand on its own bottom. The fetters do not trouble him. He is sure he is safe where he lies.",
    seenAt: ["cross"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs26_12", why: "More hope of a fool than of a man wise in his own conceit. That is Presumption’s answer." },
    ],
  },
  {
    id: "formalist",
    name: "Formalist",
    role: "He climbs the wall from Vain-glory",
    account:
      "He and Hypocrisy tumble over the wall onto the way, from the land of Vain-glory, and claim the custom of their country is as good as the gate. At Hill Difficulty they refuse the steep path. Formalist takes the way called Danger.",
    seenAt: ["cross", "hill"],
    plate: { sky: "day", land: "hill", mark: "none", figure: "gentle" },
    verses: [
      { id: "john10_1", why: "Bunyan quotes it to their faces: the one who climbs in some other way is a thief and a robber." },
      { id: "galatians2_16", why: "They trust the custom they were born to, which cannot justify." },
    ],
  },
  {
    id: "hypocrisy",
    name: "Hypocrisy",
    role: "Formalist’s companion over the wall",
    account:
      "He comes the same false way and takes the by-path called Destruction, supposing it will meet the road again. It leads into dark mountains. Christian does not see him after the hill.",
    seenAt: ["cross", "hill"],
    plate: { sky: "dusk", land: "hill", mark: "none", figure: "gentle" },
    verses: [
      { id: "matthew23_28", why: "Outwardly on the way, and not entered by the door. That is the name Bunyan gives him." },
      { id: "hosea14_9", why: "The ways of the Lord are right, and transgressors fall in them. The by-path is where he falls." },
    ],
  },
  {
    id: "timorous",
    name: "Timorous",
    role: "He runs back from the lions",
    account:
      "Coming down Hill Difficulty he meets Christian with news that lions are loose ahead. He and Mistrust are going home. Their fright sends Christian feeling for his roll, which he finds he lost in the arbour.",
    seenAt: ["arbour"],
    plate: { sky: "dusk", land: "hill", mark: "lions", figure: "gentle" },
    verses: [
      { id: "numbers13_32", why: "Bunyan calls them children of the spies who brought up an evil report of the good land." },
      { id: "peter1_5_8", why: "The lions are real enough to fear. They are also chained, which Timorous does not stay to learn." },
    ],
  },
  {
    id: "mistrust",
    name: "Mistrust",
    role: "Timorous’s companion on the hill",
    account:
      "He runs with Timorous from the lions at the top of Hill Difficulty and helps talk Christian into fear. A later rogue on Dead Man’s Lane bears the same name. This is the man on the hill.",
    seenAt: ["arbour"],
    plate: { sky: "dusk", land: "hill", mark: "none", figure: "gentle" },
    verses: [
      { id: "numbers13_32", why: "With Timorous he is the evil report that turns pilgrims back from a land they have not entered." },
    ],
  },
  {
    id: "watchful",
    name: "Watchful",
    aliases: ["Watchful"],
    role: "Porter of Palace Beautiful",
    account:
      "He calls Christian through the lions, which are chained, and bids him stay in the middle of the path. He is the porter, not the shepherd of the same name who lives later in the Delectable Mountains.",
    seenAt: ["palace"],
    plate: { sky: "dusk", land: "house", mark: "lions", figure: "elder" },
    verses: [
      { id: "thessalonians1_5_6", why: "His name is the command Christian has already failed once, in the arbour: watch." },
      { id: "peter1_5_8", why: "He knows the lions and also knows the length of their chains." },
    ],
  },
  {
    id: "discretion",
    name: "Discretion",
    role: "One of the four at Palace Beautiful",
    account:
      "She is the first of the damsels to examine Christian’s story, and she judges that he may be received. The house lodges him, shows him the armory, and in the morning shows the Delectable Mountains from the roof.",
    seenAt: ["palace", "humiliation"],
    plate: { sky: "day", land: "house", mark: "none", figure: "lady" },
    verses: [
      { id: "genesis9_27", why: "Bunyan’s margin for the welcome of the house: dwell in the tents of Shem." },
      { id: "hebrews13_2", why: "The house entertains a stranger, which is the charge given to the shepherds later as well." },
    ],
  },
  {
    id: "piety",
    name: "Piety",
    role: "She asks Christian how he came to travel",
    account:
      "At supper she draws out the story of the book, the burden, the gate, and the cross. Her questions are the house making sure of the road he has actually walked.",
    seenAt: ["palace"],
    plate: { sky: "day", land: "house", mark: "book", figure: "lady" },
    verses: [
      { id: "peter1_1_4", why: "What she wants to hear is that he seeks the inheritance kept in heaven." },
    ],
  },
  {
    id: "prudence",
    name: "Prudence",
    role: "She asks what he still carries from the old life",
    account:
      "Her questions are about the thoughts that remain, and how he answers them. Christian says the memory of his old life is grief, and that he looks much at the cross.",
    seenAt: ["palace"],
    plate: { sky: "day", land: "house", mark: "book", figure: "lady" },
    verses: [
      { id: "romans7_18", why: "Her examination matches the chapter Christian is living: the will is present, and the doing fails." },
    ],
  },
  {
    id: "charity",
    name: "Charity",
    role: "She asks why he left his family",
    account:
      "She is the damsel at Palace Beautiful, not the mountain of the same name on the plate. She asks about his wife and children, and whether he prayed for them and warned them. A peak in the Delectable range is lettered with her name by the map-maker.",
    seenAt: ["palace"],
    plate: { sky: "day", land: "house", mark: "none", figure: "lady" },
    verses: [
      { id: "ezekiel3_19", why: "Bunyan’s margin when Christian says he warned his house: if they will not turn, he has delivered his soul." },
      { id: "john1_3_12", why: "Charity names Cain. The household hated him because his way condemned theirs." },
      { id: "corinthians1_13_13", why: "Her name is the greatest of the three that abide. The questions she asks are how love behaved at home." },
    ],
  },
  {
    id: "apollyon",
    name: "Apollyon",
    role: "The fiend of the Valley of Humiliation",
    account:
      "He straddles the way, claims Christian as an old subject, and offers the wages of the old country if he will turn back. Christian refuses. They fight half a day. Christian is wounded, recovers his sword, and Apollyon spreads dragon wings and leaves.",
    seenAt: ["apollyon", "humiliation"],
    plate: { sky: "dusk", land: "field", mark: "sword", figure: "fiend" },
    verses: [
      { id: "revelation9_11", why: "The name is from this verse: the angel of the bottomless pit, Apollyon." },
      { id: "micah7_8", why: "Christian’s word in the fight, when he has fallen and means to rise." },
      { id: "james4_7", why: "Bunyan’s margin when the fiend leaves: resist the devil, and he will flee." },
      { id: "ephesians6_13", why: "The sword he drops and finds again is the sword of the Spirit. The palace armed him for this valley." },
    ],
  },
  {
    id: "pagan",
    name: "Pagan",
    role: "A dead giant at the end of the dark valley",
    account:
      "Toward the far end of the Valley of the Shadow of Death, Christian passes a cave where the giant Pagan used to trouble pilgrims. He is dead. Pope is still in the cave, but grown stiff with age.",
    seenAt: ["shadow"],
    plate: { sky: "night", land: "castle", mark: "none", figure: "giant" },
    verses: [
      { id: "hebrews2_14", why: "What had the power of death is broken. Pagan’s cave is Bunyan’s picture of an old persecution that no longer walks." },
    ],
  },
  {
    id: "pope",
    name: "Pope",
    role: "The aged giant in the cave",
    account:
      "He sits where Pagan died and bites his nails at pilgrims he can no longer reach. Christian goes by without a fight. The cave is Bunyan’s figure of a power that once burned men and is now past its strength.",
    seenAt: ["shadow"],
    plate: { sky: "night", land: "castle", mark: "cage", figure: "giant" },
    verses: [
      { id: "revelation2_10", why: "The faithfulness unto death in this verse is what that cave used to demand. Christian walks past it." },
    ],
  },
  {
    id: "faithful",
    name: "Faithful",
    aliases: ["A pilgrim ahead"],
    role: "Christian’s companion as far as Vanity Fair",
    account:
      "He passes Christian while Christian sleeps on the hill, and the voice in the dark valley reciting a psalm is his. They walk together, unmask Talkative, and are arrested in Vanity Fair. Faithful is tried before Lord Hate-good and put to death. A chariot carries him through the clouds to the gate.",
    seenAt: ["shadow", "faithful", "vanity"],
    plate: { sky: "day", land: "road", mark: "crown", figure: "pilgrim" },
    verses: [
      { id: "revelation2_10", why: "His name and his death are this promise: faithful unto death, and a crown of life." },
      { id: "psalm23_4", why: "The voice Christian follows out of the valley is the psalm Faithful is saying ahead of him." },
      { id: "hebrews11_34", why: "The chariot is Bunyan’s picture of one who, out of weakness, was made strong." },
    ],
  },
  {
    id: "wanton",
    name: "Madam Wanton",
    role: "She meets Faithful on the road",
    account:
      "Faithful tells Christian that she was very loud in her invitations, and that he shut his eyes and went on. She is one of the old acquaintances who find a pilgrim who has left their town.",
    seenAt: ["faithful"],
    plate: { sky: "dusk", land: "road", mark: "none", figure: "lady" },
    verses: [
      { id: "proverbs5_5", why: "Bunyan quotes an old writing Faithful remembered: her steps take hold on hell." },
      { id: "genesis39_12", why: "The margin on Faithful’s escape is Joseph leaving his garment." },
      { id: "job31_1", why: "Faithful’s shut eyes are the covenant Job made with his." },
    ],
  },
  {
    id: "adam",
    name: "Adam the First",
    role: "An old man of the town of Deceit",
    account:
      "He offers Faithful wages, his house, and marriage to his three daughters if Faithful will live with him. Faithful feels a pull and then breaks away. Moses overtakes him afterward for having been inclined to go.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "town", mark: "none", figure: "elder" },
    verses: [
      { id: "ephesians4_22", why: "Bunyan’s margin. Adam the First is the old man, corrupt according to deceitful lusts." },
      { id: "romans7_24", why: "When Adam’s pull tears at him, Faithful’s cry is this verse." },
    ],
  },
  {
    id: "adams-daughters",
    name: "Adam’s three daughters",
    role: "The Lust of the Flesh, the Lust of the Eyes, and the Pride of Life",
    account:
      "Adam the First offers them to Faithful as a marriage. Their names are taken straight from the apostle. Faithful will not have the house they keep.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "town", mark: "none", figure: "lady" },
    verses: [
      { id: "john1_2_16", why: "Bunyan quotes the verse as their names. They are not of the Father." },
    ],
  },
  {
    id: "moses",
    name: "Moses",
    role: "He overtakes Faithful and beats him",
    account:
      "After Faithful has half a mind to go with Adam, Moses finds him and strikes him without mercy, saying he does not know how to show any. Another comes by and bids Moses forbear. Faithful goes on wounded. The figure is the law, which can condemn and cannot pardon.",
    seenAt: ["faithful"],
    plate: { sky: "dusk", land: "mount", mark: "staff", figure: "elder" },
    verses: [
      { id: "john1_17", why: "The law was given by Moses. Grace and truth, which stop the beating, come by Jesus Christ." },
      { id: "galatians3_10", why: "Moses’ blows are the curse on everyone who does not continue in all that is written." },
    ],
  },
  {
    id: "shame",
    name: "Shame",
    role: "He taunts Faithful for the pilgrimage",
    account:
      "He tells Faithful that religion is a pitiful, low, sneaking business, unfit for the brave. Faithful answers that what God says is wiser than what Shame prefers, and at last Shame leaves him.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "mark8_38", why: "Bunyan’s answer to Shame: the one who is ashamed of Christ, of him the Son will be ashamed." },
      { id: "proverbs3_35", why: "Shame’s own promotion, in the proverb Faithful remembers, is the promotion of fools." },
      { id: "corinthians1_1_26", why: "Not many noble are called. Shame thinks that is an argument. Faithful thinks it is the point." },
    ],
  },
  {
    id: "discontent",
    name: "Discontent and Faithful’s kindred",
    role: "Pride, Arrogancy, Self-conceit, and Worldly-glory",
    account:
      "They overtake Faithful early on the road and are offended that a man of their family should take a burden and leave town. He tells Christian their names. They do not walk with him long.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "road", mark: "none", figure: "pair" },
    verses: [
      { id: "philippians3_8", why: "What they call a loss of standing, Faithful counts loss for Christ." },
      { id: "john7_48", why: "Their argument is the old one: have any of the rulers believed? Faithful has heard it." },
    ],
  },
  {
    id: "talkative",
    name: "Talkative",
    role: "A son of Say-well, from Prating Row",
    account:
      "He joins Christian and Faithful full of fine speech about religion. Christian knows him of old. Faithful questions him until it is plain that his talk and his life do not meet, and Talkative drops behind, offended at being examined.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "road", mark: "book", figure: "gentle" },
    verses: [
      { id: "matthew23_3", why: "Bunyan’s proverb for him: they say, and do not." },
      { id: "corinthians1_4_20", why: "The kingdom of God is not in word, but in power. Talkative has the word only." },
      { id: "james1_22", why: "Faithful presses him to be a doer, not a hearer who deceives himself." },
      { id: "leviticus11_3", why: "Christian’s test, from Moses’ clean beasts: the hoof parted, and the cud chewed. Talkative chews the word and does not walk it." },
    ],
  },
  {
    id: "say-well",
    name: "Say-well",
    role: "Talkative’s father",
    account:
      "Christian names him when he names Talkative. He dwelt in Prating Row. He does not appear on the road. The father’s name is the son’s inheritance: speech without a life to match it.",
    seenAt: ["faithful"],
    plate: { sky: "day", land: "town", mark: "book", figure: "elder" },
    verses: [
      { id: "james1_27", why: "The religion Say-well’s house does not practice is the one James describes, unspotted from the world." },
    ],
  },
  {
    id: "hate-good",
    name: "Lord Hate-good",
    role: "Judge of Vanity Fair",
    account:
      "He sits on the trial of Faithful, hears Envy, Superstition, and Pickthank, and directs the jury toward a verdict he has already chosen. Faithful’s defense does not move him. The sentence is death.",
    seenAt: ["vanity"],
    plate: { sky: "dusk", land: "fair", mark: "stalls", figure: "giant" },
    verses: [
      { id: "luke16_15", why: "What this court highly esteems, the verse calls abomination. The judge’s name says which side he is on." },
      { id: "matthew4_8", why: "Bunyan recalls the temptation: the fair is the kingdoms of the world offered for a bow." },
    ],
  },
  {
    id: "envy",
    name: "Envy",
    role: "The first witness against Faithful",
    account:
      "He swears that Faithful despises the laws and customs of their town and speaks contemptibly of its prince. The charge is that Faithful has said the opposite of what the fair believes.",
    seenAt: ["vanity"],
    plate: { sky: "dusk", land: "fair", mark: "none", figure: "gentle" },
    verses: [
      { id: "galatians5_26", why: "His name is the thing the pilgrims are told not to be: desirous of vain glory, envying one another." },
    ],
  },
  {
    id: "superstition",
    name: "Superstition",
    role: "The second witness",
    account:
      "He tells the court that Faithful has said their religion is vain. He cannot bear a word against the worship of the town.",
    seenAt: ["vanity"],
    plate: { sky: "dusk", land: "fair", mark: "none", figure: "elder" },
    verses: [
      { id: "ecclesiastes1_2", why: "The town’s name is Vanity. Its worship, Faithful says, is the same." },
    ],
  },
  {
    id: "pickthank",
    name: "Pickthank",
    role: "The third witness",
    account:
      "He reports that Faithful has railed on their prince, Beelzebub, and on the lords of the fair. His business is to pick up words that will please the judge.",
    seenAt: ["vanity"],
    plate: { sky: "dusk", land: "fair", mark: "none", figure: "gentle" },
    verses: [
      { id: "john7_48", why: "The fair’s assumption, which Pickthank serves, is that the rulers are the ones who see clearly." },
    ],
  },
  {
    id: "jury",
    name: "The jury of Vanity Fair",
    role: "Mr. Blind-man and the eleven with him",
    account:
      "Mr. Blind-man, Mr. No-good, Mr. Malice, Mr. Love-lust, Mr. Live-loose, Mr. Heady, Mr. High-mind, Mr. Enmity, Mr. Liar, Mr. Cruelty, Mr. Hate-light, and Mr. Implacable. Each gives a private verdict against Faithful, and they bring him in guilty of death.",
    seenAt: ["vanity"],
    plate: { sky: "night", land: "fair", mark: "stalls", figure: "pair" },
    verses: [
      { id: "daniel3_6", why: "Bunyan sets the trial beside Nebuchadnezzar’s furnace and the other old laws that punished men for refusing a bow." },
      { id: "revelation2_10", why: "The verdict is death. The promise attached to Faithful’s name is a crown on the other side of it." },
    ],
  },
  {
    id: "hopeful",
    name: "Hopeful",
    role: "He leaves the fair when Faithful dies",
    account:
      "He was of Vanity, and Faithful’s death makes a pilgrim of him. He walks with Christian the rest of the way: through By-ends, the meadow, Doubting Castle, the shepherds, the net, the Enchanted Ground, Beulah, and the river, where he is the one who holds Christian up.",
    seenAt: ["vanity", "by-ends", "ease", "lucre", "bypath", "despair", "delectable", "ignorance", "flatterer", "atheist", "enchanted", "beulah", "river", "celestial"],
    plate: { sky: "day", land: "road", mark: "staff", figure: "pilgrim" },
    verses: [
      { id: "romans6_21", why: "His own account of leaving the fair begins from the end of those things, which is death." },
      { id: "acts16_30", why: "In the Enchanted Ground he tells how he was brought to the same word: believe on the Lord Jesus Christ." },
      { id: "isaiah43_2", why: "At the river he is the voice that the waters shall not overflow." },
    ],
  },
  {
    id: "by-ends",
    name: "By-ends",
    aliases: ["By-ends"],
    role: "A gentleman of Fair-speech",
    account:
      "He will not tell his name at first. He is for religion when the wind and tide agree, and when it walks in silver slippers. Christian and Hopeful will not wait for his pace. His kindred fill the town he comes from.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "town", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs26_25", why: "Bunyan’s margin on Fair-speech: when he speaks fair, believe him not." },
      { id: "luke16_15", why: "Silver slippers are what men esteem. The verse is Christian’s answer." },
    ],
  },
  {
    id: "by-ends-kin",
    name: "The kindred of By-ends",
    role: "Lady Feigning’s daughter, and the lords of Fair-speech",
    account:
      "His wife is Lady Feigning’s daughter. He claims my Lord Turn-about, my Lord Time-server, my Lord Fair-speech, Mr. Smooth-man, Mr. Facing-both-ways, Mr. Any-thing, and the parson Mr. Two-tongues. They are the town, not a crowd on the road.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "town", mark: "none", figure: "pair" },
    verses: [
      { id: "proverbs26_25", why: "Seven abominations in the heart of fair speech. Bunyan lets By-ends count his relatives himself." },
    ],
  },
  {
    id: "hold-the-world",
    name: "Mr. Hold-the-world",
    role: "A schoolfellow of By-ends",
    account:
      "He, Money-love, and Save-all catch By-ends up after Christian has gone ahead. They were taught by Mr. Gripe-man in the town of Love-gain. Hold-the-world argues that a man may be religious and still get on.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "timothy1_6_10", why: "The love of money, which their school taught as a skill, is the root the apostle names." },
      { id: "luke20_47", why: "Bunyan points at men who use a show of religion and receive the greater damnation." },
    ],
  },
  {
    id: "money-love",
    name: "Mr. Money-love",
    role: "He argues that religion may be used to get rich",
    account:
      "His case is that a minister, or a tradesman, may become religious in order to get a better living, provided he chooses a religion that is popular. Christian answers that making religion a stalking-horse is to be wicked still.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "acts8_20", why: "Bunyan sends the reader to Simon, who thought the gift of God could be bought." },
      { id: "genesis34_23", why: "The other margin is Shechem’s men agreeing to religion so that the cattle would be theirs." },
    ],
  },
  {
    id: "save-all",
    name: "Mr. Save-all",
    role: "The third schoolfellow",
    account:
      "He walks with Hold-the-world and Money-love and agrees with their divinity. His name is the whole lesson of Love-gain: keep everything, including a reputation for religion.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "road", mark: "burden", figure: "gentle" },
    verses: [
      { id: "luke16_15", why: "Christian’s answer to the whole company is that what men esteem highly is abomination with God." },
    ],
  },
  {
    id: "gripe-man",
    name: "Mr. Gripe-man",
    role: "Schoolmaster in Love-gain",
    account:
      "He taught By-ends and his three friends the art of getting, by violence, cozenage, flattery, lying, or a show of religion. He does not appear on the road. The pilgrims meet only his old boys.",
    seenAt: ["by-ends"],
    plate: { sky: "day", land: "town", mark: "book", figure: "elder" },
    verses: [
      { id: "timothy1_6_10", why: "Love-gain is a market town whose lesson is the love of money." },
    ],
  },
  {
    id: "demas",
    name: "Demas",
    role: "He calls from the silver mine in Hill Lucre",
    account:
      "Gentlemanlike, he invites Christian and Hopeful to turn aside and see a mine. Christian remembers that the hill has maimed other pilgrims and will not go over. Demas’s great-grandfather, Christian says, is the Demas who forsook the apostle.",
    seenAt: ["lucre"],
    plate: { sky: "day", land: "hill", mark: "mine", figure: "gentle" },
    verses: [
      { id: "timothy2_4_10", why: "Bunyan names him from this verse: Demas hath forsaken me, having loved this present world." },
      { id: "hosea14_8", why: "The margin on the danger of the hill: what have I to do any more with idols?" },
    ],
  },
  {
    id: "vain-confidence",
    name: "Vain-confidence",
    role: "He walks ahead into By-Path Meadow",
    account:
      "When Christian and Hopeful climb the stile, they see him ahead on the smoother track and follow. Night comes. He falls into a pit and is not heard again. They cannot find the stile back.",
    seenAt: ["bypath"],
    plate: { sky: "night", land: "field", mark: "pit", figure: "gentle" },
    verses: [
      { id: "isaiah9_16", why: "Bunyan’s margin: the leaders of this people cause them to err, and those who are led are destroyed." },
    ],
  },
  {
    id: "despair",
    name: "Giant Despair",
    role: "Master of Doubting Castle",
    account:
      "He finds Christian and Hopeful asleep on his grounds, drives them to the castle, and locks them in a dark dungeon. On his wife’s counsel he beats them with a crab-tree cudgel and tells them to make an end of themselves. A fit takes his strength. Christian remembers a key called Promise, and they escape.",
    seenAt: ["despair"],
    plate: { sky: "night", land: "castle", mark: "key", figure: "giant" },
    verses: [
      { id: "psalm88_6", why: "The dungeon is the lowest pit, in darkness, in the deeps." },
      { id: "job7_15", why: "Bunyan’s margin on the counsel to die: the soul choosing strangling rather than life." },
      { id: "jeremiah31_21", why: "The sign they raise at the stile is a waymark, to turn the next pilgrim back to the highway." },
    ],
  },
  {
    id: "diffidence",
    name: "Diffidence",
    role: "Wife of Giant Despair",
    account:
      "At night he tells her about the prisoners, and she advises him. First the beating. Then the counsel that they kill themselves. Then, when they are still alive, she fears they have a picklock. Her counsel is the giant’s cruelty given a plan.",
    seenAt: ["despair"],
    plate: { sky: "night", land: "castle", mark: "none", figure: "lady" },
    verses: [
      { id: "job7_15", why: "The advice to make an end is this verse, put in her mouth as counsel." },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    role: "A shepherd of the Delectable Mountains",
    account:
      "With Experience, Watchful, and Sincere he welcomes the pilgrims by name into Immanuel’s land. The shepherds show them Error, Caution, a door in a hillside, and the gate through a perspective glass, and they warn them of the Flatterer and the Enchanted Ground.",
    seenAt: ["delectable"],
    plate: { sky: "day", land: "mount", mark: "glass", figure: "elder" },
    verses: [
      { id: "john10_11", why: "They are shepherds because the good shepherd is the one whose land this is." },
      { id: "isaiah33_17", why: "From these hills the pilgrims are to see the king in his beauty, and a land very far off." },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    role: "The second shepherd",
    account:
      "He walks the mountains with the others and adds what the hills have already cost careless men. The warnings are not theories. The shepherds have buried people at the foot of Error.",
    seenAt: ["delectable"],
    plate: { sky: "day", land: "mount", mark: "staff", figure: "elder" },
    verses: [
      { id: "hosea14_9", why: "Who is wise, and he shall understand. The just walk in the ways; transgressors fall. That is the hill Error." },
    ],
  },
  {
    id: "watchful-shepherd",
    name: "Watchful the shepherd",
    role: "The third shepherd, not the porter",
    account:
      "He shares the name of the porter at Palace Beautiful and is a different man. His part of the farewell is the warning not to sleep on the Enchanted Ground.",
    seenAt: ["delectable"],
    plate: { sky: "dusk", land: "mount", mark: "staff", figure: "elder" },
    verses: [
      { id: "thessalonians1_5_6", why: "The warning he gives is the verse Christian and Hopeful quote when the enchanted air makes them drowsy." },
    ],
  },
  {
    id: "sincere",
    name: "Sincere",
    role: "The fourth shepherd",
    account:
      "He is one of the four who take the pilgrims to their tents. The plate letters his name on an eastern slope. Little-faith, in the story they tell later, dwelt in a town of this same name.",
    seenAt: ["delectable"],
    plate: { sky: "day", land: "mount", mark: "none", figure: "elder" },
    verses: [
      { id: "hebrews13_2", why: "Bunyan’s margin on their welcome: do not forget to entertain strangers." },
    ],
  },
  {
    id: "ignorance",
    name: "Ignorance",
    role: "A brisk lad from the country of Conceit",
    account:
      "He comes onto the way by a crooked lane, not by the wicket gate, and is sure the gate of the city will open because his heart is good. Christian and Hopeful talk with him twice and leave him to follow behind. At the river, Vain-hope ferries him. He has no certificate. The Shining Ones bind him and put him in at the door in the hill.",
    seenAt: ["ignorance", "enchanted", "celestial"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs28_26", why: "Christian quotes it to him: he that trusts his own heart is a fool." },
      { id: "proverbs26_12", why: "After the first talk Christian says there is more hope of a fool than of him." },
      { id: "matthew7_21", why: "At the gate Ignorance’s plea is Lord, Lord. He is not known." },
      { id: "matthew22_12", why: "The end of his story is the guest without a wedding garment." },
    ],
  },
  {
    id: "little-faith",
    name: "Little-faith",
    role: "He was robbed on Dead Man’s Lane",
    account:
      "Christian tells the story as they walk beyond the shepherds. Little-faith sat down and slept, and three rogues took his silver. They did not find his jewels. He was left alive, and he scrabbled on. Christian will not have him compared with Esau, who sold his birthright.",
    seenAt: ["ignorance"],
    plate: { sky: "dusk", land: "road", mark: "none", figure: "pilgrim" },
    verses: [
      { id: "hebrews12_16", why: "Hopeful raises Esau. Christian answers that Little-faith did not sell the jewels." },
      { id: "genesis25_32", why: "Esau’s sentence, which Little-faith never spoke: what profit shall this birthright do to me?" },
    ],
  },
  {
    id: "robbers",
    name: "Faint-heart, Mistrust, and Guilt",
    role: "The three brothers who rob Little-faith",
    account:
      "They come down Dead Man’s Lane from Broad-way Gate. Faint-heart demands the purse, Mistrust takes a bag of silver, and Guilt fells Little-faith with a club. They run when they think Great-grace may be on the road. This Mistrust is not the man who ran from the lions.",
    seenAt: ["ignorance"],
    plate: { sky: "night", land: "road", mark: "pit", figure: "pair" },
    verses: [
      { id: "peter1_5_8", why: "Christian says they serve the king of the bottomless pit, whose voice is as a roaring lion." },
      { id: "ephesians6_16", why: "The darts and the club are what the shield of faith is given to quench. Little-faith had little of it in his hand." },
    ],
  },
  {
    id: "great-grace",
    name: "Great-grace",
    role: "The King’s champion, of the city of Good-confidence",
    account:
      "He does not walk with Christian. He is the man the robbers fear. Christian says even Great-grace carries scars, and that a little faith must not be asked to fight as the King’s champion fights.",
    seenAt: ["ignorance"],
    plate: { sky: "day", land: "road", mark: "sword", figure: "pilgrim" },
    verses: [
      { id: "psalm3_6", why: "Christian’s contrast: with God, a pilgrim need not fear ten thousands. Without him, the helpers fall." },
      { id: "exodus33_15", why: "He would rather not take a step without the presence of God. That is the champion’s strength, not a louder courage." },
    ],
  },
  {
    id: "flatterer",
    name: "The Flatterer",
    aliases: ["The Flatterer"],
    role: "A man of dark flesh in a light robe",
    account:
      "Where the road divides, he offers himself as a guide. Christian and Hopeful follow him into a net. A Shining One tears the net, whips them for forgetting the shepherds’ warning, and sets them back on the way.",
    seenAt: ["flatterer"],
    plate: { sky: "day", land: "road", mark: "net", figure: "shining" },
    verses: [
      { id: "proverbs29_5", why: "Bunyan’s text for him: a man that flatters his neighbor spreads a net for his feet." },
      { id: "corinthians2_11_14", why: "The light robe is Satan transformed into an angel of light." },
      { id: "romans16_18", why: "Fair speeches deceive the hearts of the simple. They did not imagine the fine-spoken man was the one they were warned of." },
      { id: "deuteronomy25_2", why: "The whip is Bunyan’s reading of the judge who causes a wicked man to be beaten according to his fault." },
    ],
  },
  {
    id: "atheist",
    name: "Atheist",
    role: "He laughs, coming the other way",
    account:
      "They meet him walking softly toward them, laughing. He says he has been seeking the city longer than they have, and there is no such place. They reason with him. He laughs again and goes on.",
    seenAt: ["atheist"],
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "ecclesiastes10_15", why: "The labour of the foolish wearies them, because he does not know how to go to the city. That is Atheist’s twenty years." },
      { id: "hebrews10_39", why: "Christian and Hopeful answer by refusing to be of those who draw back." },
      { id: "proverbs19_27", why: "Cease to hear the instruction that causes to err. They let him walk on." },
    ],
  },
  {
    id: "heedless",
    name: "Heedless",
    role: "Asleep in an arbour on the Enchanted Ground",
    account:
      "The air of that country makes a pilgrim sleepy. Heedless and Too-bold are already asleep where an arbour offers rest, and calling does not wake them. Christian and Hopeful do not sit down.",
    seenAt: ["enchanted"],
    plate: { sky: "dusk", land: "garden", mark: "tree", figure: "sleep" },
    verses: [
      { id: "thessalonians1_5_6", why: "The shepherd’s warning, which they quote here: let us not sleep, as do others." },
      { id: "proverbs13_4", why: "A desire to arrive, and a body that will not walk, is the sluggard’s soul." },
    ],
  },
  {
    id: "too-bold",
    name: "Too-bold",
    role: "Asleep beside Heedless",
    account:
      "He trusted the arbour and the soft air. Boldness about the danger is why he is still there. The pilgrims shake the sleepers, get no answer, and keep each other awake by talking.",
    seenAt: ["enchanted"],
    plate: { sky: "dusk", land: "garden", mark: "none", figure: "sleep" },
    verses: [
      { id: "proverbs13_4", why: "He desired the end of the journey and stopped short of it." },
    ],
  },
  {
    id: "temporary",
    name: "Temporary",
    role: "A forward man who went back",
    account:
      "On the Enchanted Ground, Christian asks Hopeful if he remembers Temporary, of the town of Graceless, who was earnest for a while. His neighbor Turn-back and the old reasons — the shame of religion, the hardness of the way — undid him. He is a warning told, not a man they meet.",
    seenAt: ["enchanted"],
    plate: { sky: "dusk", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "luke8_13", why: "For a while he believed, and in time of temptation fell away. The same ground as Pliable." },
      { id: "hebrews10_38", why: "If any man draw back, my soul shall have no pleasure in him." },
    ],
  },
  {
    id: "turn-away",
    name: "Turn-away",
    role: "Carried back by seven devils",
    account:
      "In a dark lane beyond the shepherds, Christian and Hopeful meet a man bound with seven cords, being led back toward the door in the hillside. Christian thinks it is Turn-away of the town of Apostasy. A paper on his back reads that he is a wanton professor and an apostate.",
    seenAt: ["delectable", "ignorance"],
    plate: { sky: "night", land: "road", mark: "pit", figure: "sleep" },
    verses: [
      { id: "matthew12_45", why: "Bunyan’s margin: seven other spirits, and the last state worse than the first." },
      { id: "proverbs5_22", why: "His own iniquities take him, and the cords of his sin hold him." },
    ],
  },
  {
    id: "vain-hope",
    name: "Vain-hope",
    role: "The ferryman who sets Ignorance over",
    account:
      "At the river he keeps a boat. Ignorance crosses with almost none of the trouble Christian had, because Vain-hope carries him. No one meets Ignorance on the far bank. The certificate is still missing at the gate.",
    seenAt: ["celestial", "river"],
    plate: { sky: "day", land: "water", mark: "none", figure: "gentle" },
    verses: [
      { id: "matthew7_21", why: "A dry crossing is not the same thing as being known by the King." },
      { id: "isaiah43_2", why: "The promise of the river is for those who pass through the waters with the Lord, not for those who are rowed around the fear." },
    ],
  },
  {
    id: "gardener",
    name: "The gardener of Beulah",
    role: "He keeps the King’s orchards",
    account:
      "Near the end of Beulah the pilgrims find orchards and vineyards opening onto the highway. The gardener says they are the King’s, planted for his delight and for the solace of pilgrims, and he lets them eat.",
    seenAt: ["beulah"],
    plate: { sky: "glory", land: "garden", mark: "tree", figure: "elder" },
    verses: [
      { id: "deuteronomy23_24", why: "Bunyan’s margin: they may eat of the vineyard, and not carry it off as their own store." },
      { id: "song2_10", why: "The gardens belong to the country where the beloved says, Rise up, and come away." },
    ],
  },
  {
    id: "dreamer",
    name: "The Dreamer",
    role: "The man who tells the story",
    account:
      "He falls asleep and dreams a man with a burden, and he walks behind that man to the gate of the city. At the end he turns, sees what becomes of Ignorance, and wakes. The dream is the book.",
    seenAt: ["city", "celestial"],
    plate: { sky: "night", land: "field", mark: "book", figure: "sleep" },
    verses: [
      { id: "habakkuk2_2", why: "The margin on the book in Christian’s hand is also the dreamer’s errand: write the vision plain, that he may run who reads it." },
      { id: "hebrews11_16", why: "What the dream confesses, from the first field to the last hill, is that these are strangers seeking a better country." },
    ],
  },
]
