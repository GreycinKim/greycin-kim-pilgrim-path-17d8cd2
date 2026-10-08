export const regions = [
  {
    id: "destruction",
    name: "Valley of Destruction",
    short: "Destruction",
    plate: "Plate I",
    image: "/maps/destruction.jpg",
    blurb: "Christian leaves home, loses the way, and reaches the gate.",
  },
  {
    id: "salvation",
    name: "Way of Salvation",
    short: "Salvation",
    plate: "Plate II",
    image: "/maps/salvation.jpg",
    blurb: "The Interpreter, the cross, and the climb of Hill Difficulty.",
  },
  {
    id: "shadow",
    name: "Valley of the Shadow of Death",
    short: "Shadow",
    plate: "Plate III",
    image: "/maps/shadow.jpg",
    blurb: "Palace Beautiful, Apollyon, the dark valley, and Vanity Fair.",
  },
  {
    id: "celestial",
    name: "The Celestial Gates",
    short: "Gates",
    plate: "Plate IV",
    image: "/maps/celestial.jpg",
    blurb: "From the silver mine and Doubting Castle to the river and the city.",
  },
] as const

export type RegionId = (typeof regions)[number]["id"]

export type Stage = {
  id: string
  title: string
  regionId: RegionId
  x: number
  y: number
  readCue: string
  synopsis: string
  quote?: string
  related?: string[]
}

export type Landmark = {
  id: string
  name: string
  regionId: RegionId
  x: number
  y: number
  note: string
}

export const stages: Stage[] = [
  {
    id: "city",
    title: "City of Destruction",
    regionId: "destruction",
    x: 46,
    y: 74,
    readCue:
      "From the opening of the dream through Christian’s flight from home.",
    synopsis:
      "Christian lives in the City of Destruction with a burden on his back. A book convinces him that the city will be burned, and his family thinks the fear has made him ill. Evangelist finds him outside and points across a wide field toward a wicket gate. He runs, fingers in his ears, crying life, life, eternal life.",
    quote: "What shall I do to be saved?",
    related: ["stupidity", "vain-delights", "dark-land"],
  },
  {
    id: "evangelist",
    title: "Evangelist",
    regionId: "destruction",
    x: 64,
    y: 63,
    readCue:
      "The talk with Evangelist in the field, then Obstinate and Pliable on the plain.",
    synopsis:
      "Evangelist asks why Christian stands still, then directs him to the light at the wicket gate and tells him to knock when he arrives. Neighbors come after him. Obstinate mocks the journey and turns home. Pliable is willing to go and see, and walks on beside him.",
  },
  {
    id: "slough",
    title: "The Slough of Despond",
    regionId: "destruction",
    x: 37,
    y: 39,
    readCue: "From the fall into the slough until Pliable gets out and goes home.",
    synopsis:
      "The way leads into a miry slough. Both men fall in, and the burden on Christian’s back sinks him deeper. Pliable struggles out on the side nearest his house and leaves, telling Christian he will have no more of the journey. Christian wanders in the mire toward the side nearer the gate.",
    quote: "This miry slough is such a place as cannot be mended.",
  },
  {
    id: "help",
    title: "Help",
    regionId: "destruction",
    x: 43,
    y: 31,
    readCue: "Help’s rescue, and his account of why the slough is there.",
    synopsis:
      "A man named Help draws Christian out and sets him on firm ground. The slough, he says, is the scum that runs down from conviction of sin. The King’s surveyors have laid stepping-stones across it, but fear makes them hard to see. Christian thanks him and goes on toward the gate.",
  },
  {
    id: "wiseman",
    title: "Mr. Worldly Wiseman",
    regionId: "destruction",
    x: 56,
    y: 26,
    readCue:
      "The meeting with Worldly Wiseman until Christian turns toward the village of Morality.",
    synopsis:
      "A gentleman from the town of Carnal Policy stops him. Worldly Wiseman speaks against the book and against Evangelist, and offers an easier cure: go to the village of Morality and let Mr. Legality take the burden off. Christian, glad of any relief, leaves the way.",
    related: ["carnal-policy"],
  },
  {
    id: "sinai",
    title: "Mount Sinai",
    regionId: "destruction",
    x: 76,
    y: 19,
    readCue:
      "The village of Morality, Mr. Legality’s house, and the mountain that threatens to fall.",
    synopsis:
      "The road brings him under Mount Sinai, beside the houses of Morality. The hill flashes with fire and seems ready to fall on him. His burden grows heavier, not lighter. He stops, afraid to go forward and ashamed to go back.",
    related: ["morality"],
  },
  {
    id: "evangelist-return",
    title: "Evangelist Again",
    regionId: "destruction",
    x: 66,
    y: 30,
    readCue:
      "Evangelist’s rebuke under the mountain until Christian is set on the way again.",
    synopsis:
      "Evangelist finds him trembling and asks whether he is the man he sent toward the wicket gate. He shows what Worldly Wiseman’s counsel is worth: Legality cannot take a burden off, and Sinai is the hill that will crush anyone who tries to be made whole by the law. Christian repents and is sent back.",
  },
  {
    id: "wicket",
    title: "The Wicket Gate",
    regionId: "destruction",
    x: 54,
    y: 14,
    readCue:
      "From the knocking at the gate through Goodwill’s counsel, until Christian is sent to the Interpreter.",
    synopsis:
      "Christian knocks and calls. Goodwill opens and pulls him quickly inside, because arrows are shot from Beelzebub’s castle at anyone who comes to the gate. Goodwill asks about the journey, writes directions for the straight way, and sends him on to the house of the Interpreter.",
    related: ["beelzebub", "apostasy"],
  },
  {
    id: "interpreter",
    title: "The Interpreter’s House",
    regionId: "salvation",
    x: 58,
    y: 83,
    readCue:
      "The whole visit, room by room, until Christian is sent out toward the highway.",
    synopsis:
      "The Interpreter receives him and shows him the significant rooms: a grave portrait of the guide he should follow, a dusty parlor that sweeping only chokes until water is sprinkled, Passion and Patience with their treasure, a fire the devil cannot quench, a palace a brave man fights his way into, a man locked in an iron cage, and a dream of the last day. Then he sends Christian on.",
  },
  {
    id: "cross",
    title: "The Cross",
    regionId: "salvation",
    x: 50,
    y: 72,
    readCue:
      "The cross and the sepulchre, the three shining ones, then Simple, Sloth, Presumption, Formalist, and Hypocrisy.",
    synopsis:
      "He comes to a cross and a sepulchre a little below it. The burden looses, falls from his back, and tumbles into the mouth of the tomb. Three shining ones greet him, give him new clothing, and set a sealed roll on his chest. Farther on he finds three men asleep beside the way, and two others, Formalist and Hypocrisy, who have climbed the wall from the land of Vain-glory rather than enter by the gate.",
  },
  {
    id: "hill",
    title: "Hill Difficulty",
    regionId: "salvation",
    x: 50,
    y: 42,
    readCue:
      "The foot of the hill, the spring, and the climb. Formalist and Hypocrisy take the side roads here.",
    synopsis:
      "The straight way goes up Hill Difficulty. At the bottom is a spring. Christian drinks and begins to climb. Formalist and Hypocrisy refuse the hill and take the two easier roads, Danger and Destruction, supposing those paths will meet the way again on the far side. They do not.",
    related: ["danger", "destruction", "vain-glory", "pretense"],
  },
  {
    id: "arbour",
    title: "The Arbour",
    regionId: "salvation",
    x: 47,
    y: 25,
    readCue:
      "The rest in the arbour, the lost roll, Timorous and Mistrust, and the walk back to find the roll.",
    synopsis:
      "Midway up, the Lord of the hill has set an arbour for weary pilgrims. Christian sleeps there and the roll slips from his hand. He meets Timorous and Mistrust running down from lions ahead, then discovers the roll is gone. In grief he retraces the hill until he finds it, and goes on more carefully.",
    related: ["tower", "carnal-security"],
  },
  {
    id: "palace",
    title: "Palace Beautiful",
    regionId: "shadow",
    x: 50,
    y: 93,
    readCue:
      "The lions in the way, then the night at Palace Beautiful — also called House Beautiful — through the morning he leaves.",
    synopsis:
      "Lions stand in the path. Christian cannot see that they are chained, and he nearly turns back until the porter Watchful calls him through. Discretion, Piety, Prudence, and Charity hear his story, feed him, and lodge him in a chamber called Peace. They show him the armory and, at dawn, the Delectable Mountains from the roof. They arm him and send him down into the valley.",
  },
  {
    id: "humiliation",
    title: "Valley of Humiliation",
    regionId: "shadow",
    x: 34,
    y: 64,
    readCue: "The descent from the palace into the valley, before Apollyon appears.",
    synopsis:
      "Armed from the palace, Christian goes down into the Valley of Humiliation. For some pilgrims it is a quiet green place. He has been told it will not be quiet for him, and he walks warily, sword loose in his hand.",
  },
  {
    id: "apollyon",
    title: "Apollyon",
    regionId: "shadow",
    x: 57,
    y: 81,
    readCue:
      "The argument and the fight with Apollyon, through the healing of Christian’s wounds.",
    synopsis:
      "Apollyon straddles the way and claims Christian as an old subject. He offers wages to turn back, then rages when Christian refuses. They fight for half a day. Christian is wounded and loses his sword, recovers it, and gives the fiend a mortal stroke. Apollyon spreads his dragon wings and leaves. A hand brings leaves of the tree of life for the wounds.",
    quote: "Rejoice not against me, O mine enemy: when I fall, I shall arise.",
  },
  {
    id: "shadow",
    title: "Valley of the Shadow of Death",
    regionId: "shadow",
    x: 51,
    y: 50,
    readCue:
      "From the entrance of the valley until daylight at the far end, including the mouth of hell and the cave of Pagan and Pope.",
    synopsis:
      "The next valley is darker. A ditch lies on one side of the path and a quag on the other. In the middle of it Christian hears the mouth of hell, and a whisperer suggests blasphemies he fears are his own. He cries out and keeps walking. Toward morning he hears a voice ahead reciting a psalm, and day shows him the bones of other travelers. At the end of the valley, Pagan is dead and Pope is a spent giant in a cave.",
    quote:
      "Though I walk through the valley of the shadow of death, I will fear none ill, for thou art with me.",
    related: ["mouth-of-hell"],
  },
  {
    id: "faithful",
    title: "Faithful and Talkative",
    regionId: "shadow",
    x: 50,
    y: 36,
    readCue:
      "Christian catching Faithful, their stories of the road, and the exposure of Talkative.",
    synopsis:
      "Christian overtakes Faithful, who had gone ahead while he slept on the hill. They compare what the journey has cost them: Wanton, Adam the First, Moses, Shame, and the rest. Talkative joins them, full of fine speech about religion. Faithful questions him until the hollowness shows, and Talkative drops behind.",
  },
  {
    id: "vanity",
    title: "Vanity Fair",
    regionId: "shadow",
    x: 43,
    y: 23,
    readCue:
      "Entering the fair, the trial, Faithful’s death, and Hopeful joining Christian.",
    synopsis:
      "They come into the town of Vanity, where a fair runs all the year and sells honors, titles, lusts, and lives as readily as gold. Their plain speech and strange clothing start a hubbub. They are beaten, caged, and tried before Lord Hate-good. Faithful is condemned and put to death, and a chariot carries him through the clouds to the gate of the city. Christian is spared. Hopeful, who saw Faithful die, leaves the fair and walks with him.",
    quote:
      "The name of that town is Vanity; and at the town there is a fair kept, called Vanity Fair.",
  },
  {
    id: "by-ends",
    title: "By-ends",
    regionId: "shadow",
    x: 16,
    y: 22,
    readCue:
      "The meeting with By-ends of Fair-speech and the dispute with Hold-the-world, Money-love, and Save-all.",
    synopsis:
      "Christian and Hopeful overtake a water-side man from the town of Fair-speech. By-ends likes religion when it walks in silver slippers, and he will not travel with people who refuse to wait for wind and tide. His companions argue that a man may use religion to get on in the world. Christian and Hopeful answer them and walk ahead.",
  },
  {
    id: "ease",
    title: "The Plain of Ease",
    regionId: "shadow",
    x: 48,
    y: 8,
    readCue:
      "The narrow plain called Ease, just before the hill Lucre. It is a short passage.",
    synopsis:
      "They enter a delicate plain called Ease and go along it with pleasure. The plain is narrow. They are soon at the far side, where a little hill called Lucre stands in the way, and a silver mine.",
  },
  {
    id: "lucre",
    title: "Hill Lucre",
    regionId: "celestial",
    x: 40,
    y: 90,
    readCue:
      "Demas calling from the silver mine, and the pillar of salt that was Lot’s wife.",
    synopsis:
      "Demas, gentlemanlike, calls them off the road to see a silver mine in the hill. Christian remembers that this hill has overturned many pilgrims and will not turn aside. They pass on and come to a strange monument: the pillar of salt that was Lot’s wife, set up as a warning to anyone who looks back.",
    related: ["demas", "coveting", "lots-wife"],
  },
  {
    id: "bypath",
    title: "By-Path Meadow",
    regionId: "celestial",
    x: 40,
    y: 73,
    readCue:
      "The river of the water of life, the stile, Vain-confidence, and the night on Giant Despair’s grounds.",
    synopsis:
      "For a while the way runs beside a river where they drink, eat fruit, and sleep. When the path grows rough they see a stile into a meadow and a smoother track. Vain-confidence is ahead of them and falls into a pit in the dark. The storm rises. They sleep on ground that belongs to Giant Despair.",
    related: ["water-of-life"],
  },
  {
    id: "despair",
    title: "Doubting Castle",
    regionId: "celestial",
    x: 17,
    y: 58,
    readCue:
      "The capture, the dungeon, Diffidence’s counsel, and the escape with the key called Promise.",
    synopsis:
      "Giant Despair finds them sleeping, drives them to Doubting Castle, and locks them in a dark dungeon. On his wife Diffidence’s advice he beats them and tells them to make an end of themselves. They nearly do. Then Christian remembers a key in his bosom called Promise. It opens the dungeon, the outer door, and the iron gate. They raise a sign at the stile to warn the next pilgrims.",
  },
  {
    id: "delectable",
    title: "The Delectable Mountains",
    regionId: "celestial",
    x: 50,
    y: 56,
    readCue:
      "The shepherds Knowledge, Experience, Watchful, and Sincere, and what they show from the mountains.",
    synopsis:
      "The mountains are in Immanuel’s land, and the shepherds welcome them by name. They are shown the hill Error, where climbers have fallen, the hill Caution, where blind men stumble among tombs, a door in a hillside that opens toward hell, and, from the top of Mount Clear, the gate of the Celestial City through a perspective glass. The shepherds warn them of the Flatterer and the Enchanted Ground, and send them on their way.",
    related: ["error", "caution", "clear", "marvel"],
  },
  {
    id: "ignorance",
    title: "Ignorance",
    regionId: "celestial",
    x: 46,
    y: 47,
    readCue:
      "The first meeting with Ignorance, who comes in by the crooked lane from the country of Conceit.",
    synopsis:
      "A very brisk lad overtakes them. He came not through the wicket gate but by a little crooked lane from the country of Conceit. Ignorance is sure of his welcome because his heart is good and his thoughts are good. Christian and Hopeful talk with him, then let him walk behind while they speak of Little-faith, who was robbed on the road and barely kept his jewels.",
    related: ["conceit"],
  },
  {
    id: "flatterer",
    title: "The Flatterer",
    regionId: "celestial",
    x: 57,
    y: 43,
    readCue:
      "The divided way, the man in the light robe, the net, and the shining one with the whip.",
    synopsis:
      "The road divides. A black man in a robe of light offers to guide them, and they follow him into a net. They lie there weeping until a shining one comes, tears the net, and chastises them for forgetting the shepherds’ warning. He sets them back on the way.",
    related: ["dead-mans-lane"],
  },
  {
    id: "atheist",
    title: "Atheist",
    regionId: "celestial",
    x: 51,
    y: 39,
    readCue: "The short meeting with Atheist, who laughs at the journey.",
    synopsis:
      "They meet a man coming softly the other way, laughing. Atheist tells them there is no such place as the city they seek, and that he has been looking longer than they have. They reason with him. He laughs again and walks on.",
  },
  {
    id: "enchanted",
    title: "The Enchanted Ground",
    regionId: "celestial",
    x: 50,
    y: 32,
    readCue:
      "The drowsiness of the Enchanted Ground, Hopeful’s story of how he became a pilgrim, and the later talk with Ignorance.",
    synopsis:
      "The air of this country makes a pilgrim sleepy. Hopeful keeps Christian awake by telling, at his request, how he came to leave Vanity Fair. They pass Heedless and Too-bold, already asleep in the arbor, and do not sit down. Ignorance catches them up once more, and they talk about whether a good thought in the heart is enough to enter the city.",
    related: ["slothfuls-friend"],
  },
  {
    id: "beulah",
    title: "The Land of Beulah",
    regionId: "celestial",
    x: 50,
    y: 20,
    readCue:
      "From entering Beulah until the shining ones meet them at the edge of the river.",
    synopsis:
      "Beyond the enchanted air the country is Beulah, within sight of the city. The sun shines night and day, birds sing, flowers never fail, and angels walk the roads. The contract of the pilgrims is renewed here. They fall sick with longing. Shining ones come out to meet them and tell them they must go through the river before they can enter.",
  },
  {
    id: "river",
    title: "The River of Death",
    regionId: "celestial",
    x: 50,
    y: 12,
    readCue:
      "The crossing. There is no bridge. Stay with it until they reach the far bank.",
    synopsis:
      "The river is deep or shallow according to a pilgrim’s faith. Christian goes in and immediately sinks. The water rises over his head and he forgets everything Hopeful says, sure he will be lost. Hopeful holds him up and calls to mind the promises. Christian finds ground, and the water falls. They cross.",
  },
  {
    id: "celestial",
    title: "The Celestial City",
    regionId: "celestial",
    x: 50,
    y: 7,
    readCue:
      "From the far bank to the gate, the welcome, and the dream’s last scene with Ignorance. This is the end of Part I.",
    synopsis:
      "Two shining ones meet them on the bank, strip off their mortal garments, and take them up the hill. The city sits upon it, and the pilgrims shine as they climb. At the gate their certificates are read, the bells ring, and they are brought in. Ignorance arrives later, ferried by Vain-hope, and without a certificate he is bound and put out of the way. Then the dreamer wakes.",
    quote: "So I awoke, and behold it was a dream.",
  },
]

export const landmarks: Landmark[] = [
  {
    id: "beelzebub",
    name: "Beelzebub’s Castle",
    regionId: "destruction",
    x: 43,
    y: 13,
    note: "The castle that overlooks the wicket gate. Arrows are shot from it at pilgrims as they enter. Goodwill pulls Christian inside quickly for that reason.",
  },
  {
    id: "apostasy",
    name: "Apostasy",
    regionId: "destruction",
    x: 33,
    y: 17,
    note: "The plate’s name for the ground under Beelzebub’s castle: the fall of people who come near the gate and turn away. It is not a separate episode in the book.",
  },
  {
    id: "morality",
    name: "Morality",
    regionId: "destruction",
    x: 88,
    y: 17,
    note: "The village where Mr. Legality and his son Civility are said to live. Worldly Wiseman sends Christian here to have his burden removed. The mountain over the village is Sinai.",
  },
  {
    id: "carnal-policy",
    name: "Carnal Policy",
    regionId: "destruction",
    x: 75,
    y: 51,
    note: "The town Mr. Worldly Wiseman comes from. His counsel is the policy of that town: leave the hard way and settle the burden by legality.",
  },
  {
    id: "stupidity",
    name: "Stupidity",
    regionId: "destruction",
    x: 33,
    y: 66,
    note: "A hamlet off the road on this plate. It is the map-maker’s name, kin to the sleepers Christian later finds by the way — Simple, Sloth, and Presumption — who will not be woken.",
  },
  {
    id: "vain-delights",
    name: "Vain Delights",
    regionId: "destruction",
    x: 51,
    y: 88,
    note: "Pleasure-grounds drawn south of the city, off the Way. The book does not stop the story here. The plate sets them opposite the road Christian takes north.",
  },
  {
    id: "dark-land",
    name: "Dark Land",
    regionId: "destruction",
    x: 81,
    y: 77,
    note: "The dim country east of the city on this plate, beyond the coast. It is the illustrator’s name for the region Christian is leaving, not a chapter of its own.",
  },
  {
    id: "carnality",
    name: "River of Carnality",
    regionId: "destruction",
    x: 47,
    y: 62,
    note: "A river signed on the plate between Stupidity and the city. Christian’s road does not follow it. It marks the pull of the country he is trying to leave.",
  },
  {
    id: "vain-glory-road",
    name: "To Van Glory",
    regionId: "destruction",
    x: 27,
    y: 21,
    note: "A track leaving the Way. It runs toward the Land of Vain-glory, the country Formalist and Hypocrisy come from when they climb over the wall.",
  },
  {
    id: "carnal-security",
    name: "Palace of Carnal Security",
    regionId: "salvation",
    x: 34,
    y: 16,
    note: "A false palace above the straight road. The plate marks it as a refuge that is not Palace Beautiful. Christian’s way does not turn in at the door.",
  },
  {
    id: "platform",
    name: "Platform",
    regionId: "salvation",
    x: 42,
    y: 7,
    note: "The flat height above the Palace of Carnal Security. An illustrator’s label for the show-place off the Way, not a stop in the narrative.",
  },
  {
    id: "tower",
    name: "Tower of Spiritual Pride",
    regionId: "salvation",
    x: 63,
    y: 12,
    note: "A tower on the right-hand height. The plate’s warning above Hill Difficulty: the climb can turn into self-regard. Christian’s road stays on the straight cut below it.",
  },
  {
    id: "contemplation",
    name: "Contemplation",
    regionId: "salvation",
    x: 60,
    y: 24,
    note: "Signed on the slope beneath the tower. The plate’s name, not a house Christian enters.",
  },
  {
    id: "good-resolution",
    name: "Good Resolution",
    regionId: "salvation",
    x: 65,
    y: 27,
    note: "A neighbor of Contemplation on the same slope. Another of the plate’s side-names along the hill, off the straight way.",
  },
  {
    id: "destruction",
    name: "Destruction",
    regionId: "salvation",
    x: 35,
    y: 28,
    note: "One of the two by-paths at the foot of Hill Difficulty. Hypocrisy takes the way called Destruction and is lost among dark mountains. It is not the City of Destruction.",
  },
  {
    id: "danger",
    name: "Danger",
    regionId: "salvation",
    x: 70,
    y: 33,
    note: "The other by-path at Hill Difficulty. It leads into a great wood. Formalist and Hypocrisy choose these roads because the hill looks steep.",
  },
  {
    id: "pretense",
    name: "Pretense",
    regionId: "salvation",
    x: 20,
    y: 50,
    note: "A settlement on the winding road called the Land of Vain-glory. The plate’s name for that false way, which Formalist and Hypocrisy travel before they climb the wall onto the true road.",
  },
  {
    id: "deceit",
    name: "Deceit",
    regionId: "salvation",
    x: 80,
    y: 47,
    note: "A castle in the eastern hills, off the Way. The illustrator’s mark, in the same country as the by-path Danger.",
  },
  {
    id: "mirth",
    name: "Mirth",
    regionId: "salvation",
    x: 44,
    y: 54,
    note: "Signed just west of the straight road. A mood the plate sets beside the way, not a chapter.",
  },
  {
    id: "mourning",
    name: "Mourning",
    regionId: "salvation",
    x: 57,
    y: 54,
    note: "Signed just east of the road, opposite Mirth. The plate pairs the two beside the way Christian walks after the cross.",
  },
  {
    id: "vain-glory",
    name: "Land of Vain Glory",
    regionId: "salvation",
    x: 22,
    y: 66,
    note: "The long road on the west of this plate. Formalist and Hypocrisy come from this country and tumble over the wall, hoping to share the benefits of the way without entering at the gate.",
  },
  {
    id: "stately-palace",
    name: "Stately Palace",
    regionId: "salvation",
    x: 80,
    y: 79,
    note: "A great house in the woods east of the Interpreter, across the river. It is not Palace Beautiful, which stands farther along the Way. The plate leaves it off the road.",
  },
  {
    id: "gaius",
    name: "Gaius’ Inn",
    regionId: "shadow",
    x: 43,
    y: 33,
    note: "Gaius keeps this inn in Part II, and lodges Christiana’s company there. Christian does not stop at it on this journey. The plate includes it beside the road north of the valley.",
  },
  {
    id: "altar",
    name: "Altar of Incense",
    regionId: "shadow",
    x: 37,
    y: 40,
    note: "Marked west of the road above the valley. An illustrator’s sign, not a scene in Part I.",
  },
  {
    id: "graceless",
    name: "Graceless",
    regionId: "shadow",
    x: 85,
    y: 13,
    note: "Graceless was Christian’s name before he set out. The plate gives that old name a height in the northern hills, apart from the road.",
  },
  {
    id: "honesty",
    name: "Honesty",
    regionId: "shadow",
    x: 84,
    y: 19,
    note: "Old Honest is a pilgrim Christiana meets in Part II. The plate places his name in the hills above Vanity. He is not on Christian’s road in Part I.",
  },
  {
    id: "mouth-of-hell",
    name: "Mouth to Hell",
    regionId: "shadow",
    x: 68,
    y: 57,
    note: "In the midst of the Valley of the Shadow of Death, hard by the wayside. Christian hears it roaring while he gropes between the ditch and the quag.",
  },
  {
    id: "coveting",
    name: "Coveting",
    regionId: "celestial",
    x: 30,
    y: 94,
    note: "A cluster of houses at the foot of Hill Lucre. The plate’s name for the country of the silver mine, where Demas calls pilgrims aside.",
  },
  {
    id: "demas",
    name: "Demas",
    regionId: "celestial",
    x: 46,
    y: 96,
    note: "Demas stands at the mine and beckons. Christian recognizes him and will not go over. The hill has maimed and killed others who did.",
  },
  {
    id: "lots-wife",
    name: "Lot’s Wife",
    regionId: "celestial",
    x: 50,
    y: 92,
    note: "The pillar of salt just beyond the mine, on the Way itself. Christian and Hopeful stop and read it as a warning against looking back.",
  },
  {
    id: "water-of-life",
    name: "Water of Life",
    regionId: "celestial",
    x: 73,
    y: 67,
    note: "The river Christian and Hopeful walk beside before By-Path Meadow. They drink it, eat the fruit of the trees, and sleep. When the bank grows rough they leave it for the stile.",
  },
  {
    id: "error",
    name: "Mount Error",
    regionId: "celestial",
    x: 22,
    y: 46,
    note: "One of the hills the shepherds show them. Men who climbed it have fallen and been dashed to pieces at the bottom. The shepherds are buried there.",
  },
  {
    id: "caution",
    name: "Mount Caution",
    regionId: "celestial",
    x: 20,
    y: 53,
    note: "From this hill the shepherds show blind men walking among tombs. They wandered off the way, and the giant who caught them put out their eyes.",
  },
  {
    id: "marvel",
    name: "Mount Marvel",
    regionId: "celestial",
    x: 33,
    y: 47,
    note: "One of the named heights in the Delectable range on this plate. The book’s shepherds dwell in these mountains and walk the peaks with the pilgrims.",
  },
  {
    id: "clear",
    name: "Mount Clear",
    regionId: "celestial",
    x: 41,
    y: 52,
    note: "The high hill where the shepherds bring out a perspective glass and bid the pilgrims look at the gate of the city. Christian’s hand shakes, and he cannot see it steadily.",
  },
  {
    id: "innocence",
    name: "Mount Innocence",
    regionId: "celestial",
    x: 64,
    y: 52,
    note: "A peak on the east side of the Delectable Mountains, named on this plate. The narrative gathers these hills into the shepherds’ country rather than visiting each one.",
  },
  {
    id: "charity",
    name: "Mount Charity",
    regionId: "celestial",
    x: 74,
    y: 52,
    note: "The easternmost of the signed peaks. Charity is also the name of one of the damsels at Palace Beautiful. Here the plate gives the name to a mountain above the Water of Life.",
  },
  {
    id: "conceit",
    name: "Conceit",
    regionId: "celestial",
    x: 20,
    y: 40,
    note: "Ignorance’s country. A crooked lane runs from it onto the Way, which is how he gets in without the wicket gate.",
  },
  {
    id: "dead-mans-lane",
    name: "Dead Man’s Lane",
    regionId: "celestial",
    x: 62,
    y: 46,
    note: "The plate’s name for a side lane near the Flatterer. It sits by the divided road where Christian and Hopeful leave the Way and are caught in the net.",
  },
  {
    id: "sincere",
    name: "Sincere",
    regionId: "celestial",
    x: 66,
    y: 46,
    note: "Sincere is one of the four shepherds of the Delectable Mountains, with Knowledge, Experience, and Watchful. The plate letters his name on the eastern slope.",
  },
  {
    id: "broadway",
    name: "Broadway Gate",
    regionId: "celestial",
    x: 86,
    y: 40,
    note: "A gate in the far eastern hills, off the Way. The plate’s sign for a wide entrance that is not the wicket gate and not the gate of the city.",
  },
  {
    id: "good-confidence",
    name: "Good-confidence",
    regionId: "celestial",
    x: 78,
    y: 48,
    note: "A house in the eastern mountains on this plate, aside from the road the shepherds set Christian on.",
  },
  {
    id: "slothfuls-friend",
    name: "Slothful’s Friend",
    regionId: "celestial",
    x: 38,
    y: 33,
    note: "Signed in the Enchanted Ground, where the air makes pilgrims sleep. Nearby in the book, Heedless and Too-bold are already asleep and cannot be woken.",
  },
]

const stageById = new Map(stages.map((stage) => [stage.id, stage]))
const landmarkById = new Map(landmarks.map((place) => [place.id, place]))
const regionById = new Map(regions.map((region) => [region.id, region]))

export function getRegion(id: RegionId) {
  const region = regionById.get(id)
  if (!region) throw new Error(`Unknown region ${id}`)
  return region
}

export function getStage(id: string) {
  return stageById.get(id)
}

export function getLandmark(id: string) {
  return landmarkById.get(id)
}

export function stageIndex(id: string) {
  return stages.findIndex((stage) => stage.id === id)
}

export function hasReached(currentId: string, finished: boolean, stageId: string) {
  const index = stageIndex(stageId)
  const current = stageIndex(currentId)
  if (index < 0 || current < 0) return false
  if (finished) return true
  return index <= current
}

export function stagesReached(stageId: string, finished: boolean) {
  const current = stageIndex(stageId)
  if (current < 0) return []
  const last = finished ? stages.length - 1 : current
  return stages.slice(0, last + 1).map((stage) => stage.id)
}

export function stagesInRegion(id: RegionId) {
  return stages.filter((stage) => stage.regionId === id)
}

export function landmarksInRegion(id: RegionId) {
  return landmarks.filter((place) => place.regionId === id)
}

export function progressPercent(index: number, finished: boolean) {
  if (finished) return 100
  if (index < 0) return 0
  return Math.round((index / stages.length) * 100)
}
