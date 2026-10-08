import { landmarks, stages } from "./journey.ts"
import type { VerseId } from "./kjv.ts"
import type { PlateSpec } from "./plate.ts"

export type Place = {
  id: string
  name: string
  role: string
  account: string
  plate: PlateSpec
  verses: { id: VerseId; why: string }[]
  stageId?: string
  landmarkId?: string
}

type Note = {
  role: string
  plate: PlateSpec
  verses: { id: VerseId; why: string }[]
  account?: string
}

const stageNotes: Record<string, Note> = {
  city: {
    role: "The town he flees",
    plate: { sky: "dusk", land: "town", mark: "fire", figure: "pilgrim" },
    verses: [
      { id: "matthew3_7", why: "The book in his hand warns him to flee from the wrath to come." },
      { id: "isaiah30_33", why: "He fears the burden will sink him lower than the grave, into Tophet." },
      { id: "acts2_37", why: "The cry “What shall I do?” is the cry of those who were pricked in their heart." },
    ],
  },
  evangelist: {
    role: "The field where the way is pointed out",
    plate: { sky: "day", land: "field", mark: "staff", figure: "pair" },
    verses: [
      { id: "matthew7_13", why: "Evangelist points across this field to the strait gate." },
      { id: "psalm119_105", why: "Christian cannot see the gate yet. He is told to follow the lamp of the word." },
    ],
  },
  slough: {
    role: "The mire of despond",
    plate: { sky: "dusk", land: "bog", mark: "pit", figure: "pair" },
    verses: [
      { id: "psalm40_2", why: "The slough is the horrible pit and the miry clay." },
      { id: "psalm69_14", why: "Deliver me out of the mire, and let me not sink. Pliable climbs out the wrong side." },
    ],
  },
  help: {
    role: "Where a hand sets him on firm ground",
    plate: { sky: "day", land: "bog", mark: "staff", figure: "elder" },
    verses: [
      { id: "psalm40_2", why: "Help’s work is the second half of the verse: feet set upon a rock." },
      { id: "isaiah35_3", why: "The stepping-stones are there for fearful hearts, if someone will show them." },
    ],
  },
  wiseman: {
    role: "Where the easier cure is offered",
    plate: { sky: "day", land: "road", mark: "book", figure: "gentle" },
    verses: [
      { id: "galatians6_12", why: "The counsel here is a fair show in the flesh, to avoid the cross." },
      { id: "luke13_24", why: "Leaving this spot for Morality is leaving the strait gate." },
    ],
  },
  sinai: {
    role: "The hill that hangs over Morality",
    plate: { sky: "dusk", land: "mount", mark: "fire", figure: "pilgrim" },
    verses: [
      { id: "hebrews12_21", why: "Bunyan’s Sinai is the mount that burned, where Moses said, I exceedingly fear and quake." },
      { id: "galatians3_10", why: "Under this hill the burden is the curse of the law, not a load a lawyer can lift." },
      { id: "galatians4_24", why: "The allegory of Hagar: Sinai genders to bondage." },
    ],
  },
  "evangelist-return": {
    role: "The rebuke that turns him back",
    plate: { sky: "dusk", land: "mount", mark: "staff", figure: "pair" },
    verses: [
      { id: "hebrews12_25", why: "See that you refuse not him that speaketh. Christian had preferred Wiseman." },
      { id: "psalm2_12", why: "Kiss the Son, lest you perish from the way. Evangelist sends him back onto it." },
      { id: "hebrews10_38", why: "The just shall live by faith. Drawing back is what the mountain was for." },
    ],
  },
  wicket: {
    role: "The strait gate",
    plate: { sky: "day", land: "road", mark: "gate", figure: "pilgrim" },
    verses: [
      { id: "matthew7_7", why: "Knock, and it shall be opened. The words are written over the gate." },
      { id: "matthew7_13", why: "Strait is the gate, and narrow is the way. This is that gate." },
      { id: "john6_37", why: "Goodwill pulls him in. The one who comes is not cast out." },
    ],
  },
  interpreter: {
    role: "The house of significant rooms",
    plate: { sky: "day", land: "house", mark: "book", figure: "elder" },
    verses: [
      { id: "job33_23", why: "An interpreter, one among a thousand, to show a man his uprightness." },
      { id: "ephesians5_26", why: "The water in the dusty room is the washing of water by the word." },
    ],
  },
  cross: {
    role: "Where the burden falls",
    plate: { sky: "glory", land: "hill", mark: "cross", figure: "shining" },
    verses: [
      { id: "colossians2_14", why: "The handwriting against him is nailed to the cross and taken out of the way. The burden tumbles into the tomb." },
      { id: "mark2_5", why: "The Shining Ones begin where Jesus began with the paralytic: thy sins be forgiven thee." },
      { id: "zechariah3_4", why: "They strip the filthy garments and clothe him with a change of raiment." },
      { id: "ephesians1_13", why: "The roll they set on his chest is the seal he must show at the gate." },
    ],
  },
  hill: {
    role: "The steep way, with two false roads at the foot",
    plate: { sky: "day", land: "hill", mark: "spring", figure: "pilgrim" },
    verses: [
      { id: "isaiah49_10", why: "The spring at the bottom is the shepherding in this verse: by the springs of water he shall guide them." },
      { id: "mark8_34", why: "The hill is the cost of the way. Whoever will come after must take up the cross." },
      { id: "john10_1", why: "Danger and Destruction are the other ways. They were not entered by the door." },
    ],
  },
  arbour: {
    role: "A rest the Lord of the hill built, and a place to lose the roll",
    plate: { sky: "dusk", land: "hill", mark: "roll", figure: "sleep" },
    verses: [
      { id: "proverbs6_6", why: "A voice wakes him with the proverb of the ant. The arbour was for rest, not for the night." },
      { id: "revelation2_5", why: "Going back for the roll, he remembers from whence he has fallen." },
      { id: "thessalonians1_5_6", why: "He slept in the daytime, in the midst of difficulty." },
    ],
  },
  palace: {
    role: "House Beautiful, above the lions",
    plate: { sky: "dusk", land: "house", mark: "lions", figure: "lady" },
    verses: [
      { id: "genesis9_27", why: "Bunyan’s margin for the lodging: dwell in the tents of Shem." },
      { id: "ephesians6_13", why: "In the armory they arm him with the whole armour of God, for the valley below." },
      { id: "isaiah25_8", why: "The chamber called Peace looks toward the day when tears are wiped away." },
    ],
  },
  humiliation: {
    role: "The valley under Palace Beautiful",
    plate: { sky: "day", land: "field", mark: "sword", figure: "pilgrim" },
    verses: [
      { id: "romans7_18", why: "For some this valley is green. For Christian it is the place where the flesh will not do the good he wills." },
      { id: "micah7_8", why: "He goes down knowing a fight is waiting, and that a fall is not the end." },
    ],
  },
  apollyon: {
    role: "The fight in the valley",
    plate: { sky: "dusk", land: "field", mark: "sword", figure: "fiend" },
    verses: [
      { id: "revelation9_11", why: "The fiend’s name is written here: Apollyon, angel of the bottomless pit." },
      { id: "james4_7", why: "When the dragon wings open and he leaves, the margin is: resist the devil, and he will flee." },
      { id: "romans8_37", why: "More than conquerors, through him that loved us. Christian does not win by being the stronger body." },
    ],
  },
  shadow: {
    role: "The valley of the shadow of death",
    plate: { sky: "night", land: "road", mark: "pit", figure: "pilgrim" },
    verses: [
      { id: "psalm23_4", why: "Christian says the psalm aloud. It is the sentence the valley is named for." },
      { id: "job10_22", why: "Bunyan quotes Job: a land of darkness, without any order." },
      { id: "amos5_8", why: "At the far end he says the Lord turns the shadow of death into the morning." },
      { id: "psalm116_4", why: "In the worst of it he cries, O Lord, I beseech thee, deliver my soul." },
    ],
  },
  faithful: {
    role: "Where Christian overtakes Faithful, and Talkative is left behind",
    plate: { sky: "day", land: "road", mark: "staff", figure: "pair" },
    verses: [
      { id: "revelation2_10", why: "Faithful’s name is already the promise he will be asked to keep." },
      { id: "james1_22", why: "The talk with Talkative turns on being a doer of the word, not a hearer only." },
    ],
  },
  vanity: {
    role: "The fair that sells everything, all the year",
    plate: { sky: "dusk", land: "fair", mark: "stalls", figure: "pair" },
    verses: [
      { id: "ecclesiastes1_2", why: "Bunyan names the town from the Preacher: all is vanity." },
      { id: "psalm119_37", why: "Their trade is in heaven, which is why they will not turn their eyes to the stalls." },
      { id: "proverbs23_23", why: "When the fair asks what they will buy, they answer: buy the truth, and sell it not." },
      { id: "hebrews11_16", why: "They say they seek a better country. The fair calls that a crime." },
    ],
  },
  "by-ends": {
    role: "The road just beyond the fair",
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs26_25", why: "Fair-speech, the town By-ends names, is the fair word with seven abominations behind it." },
      { id: "luke16_15", why: "Religion in silver slippers is what men esteem. Christian calls it abomination." },
    ],
  },
  ease: {
    role: "A narrow plain, pleasant and short",
    plate: { sky: "day", land: "field", mark: "none", figure: "pair" },
    verses: [
      { id: "galatians6_9", why: "The plain is kind, and it does not last. Weariness in well doing is the next temptation, not this one." },
      { id: "thessalonians1_5_3", why: "Peace and safety are not the same as the way. The hill Lucre is at the far edge." },
    ],
  },
  lucre: {
    role: "The hill with a silver mine",
    plate: { sky: "day", land: "hill", mark: "mine", figure: "gentle" },
    verses: [
      { id: "timothy2_4_10", why: "Demas calls from the mine. His name in scripture is the man who loved this present world." },
      { id: "genesis19_26", why: "Just beyond the hill, Lot’s wife stands as a pillar of salt, for looking back." },
      { id: "hosea14_8", why: "Bunyan’s question at the hill: what have I to do any more with idols?" },
    ],
  },
  bypath: {
    role: "The meadow over the stile",
    plate: { sky: "night", land: "field", mark: "pit", figure: "pair" },
    verses: [
      { id: "psalm23_2", why: "Before the stile, the way itself runs beside still waters. The meadow is the counterfeit of that rest." },
      { id: "numbers21_4", why: "They leave the rough bank because the soul is discouraged because of the way." },
      { id: "isaiah9_16", why: "Vain-confidence goes first and falls. The leaders cause them to err." },
    ],
  },
  despair: {
    role: "Doubting Castle",
    plate: { sky: "night", land: "castle", mark: "key", figure: "giant" },
    verses: [
      { id: "psalm88_6", why: "The dungeon is the lowest pit, in darkness, in the deeps." },
      { id: "job7_15", why: "The giant’s counsel is the soul choosing death rather than life." },
      { id: "jeremiah31_21", why: "The key lets them out. The sign at the stile is a waymark for whoever comes next." },
    ],
  },
  delectable: {
    role: "Immanuel’s land, and the shepherds’ tents",
    plate: { sky: "glory", land: "mount", mark: "glass", figure: "elder" },
    verses: [
      { id: "isaiah33_17", why: "From here they are shown a land very far off, and told they shall see the king in his beauty." },
      { id: "corinthians1_13_12", why: "The perspective glass is still through a glass, darkly. Christian’s hand shakes, and he cannot hold the view." },
      { id: "hebrews13_2", why: "The shepherds entertain strangers, as they were charged." },
    ],
  },
  ignorance: {
    role: "Where the crooked lane joins the way",
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "proverbs28_26", why: "Ignorance trusts his own heart. The proverb says that man is a fool." },
      { id: "psalm125_5", why: "His lane is a crooked way, and the Lord leads such aside with the workers of iniquity." },
      { id: "proverbs2_15", why: "The ways of the country he comes from are crooked." },
    ],
  },
  flatterer: {
    role: "The divided road, and the net",
    plate: { sky: "day", land: "road", mark: "net", figure: "shining" },
    verses: [
      { id: "proverbs29_5", why: "A flatterer spreads a net for the feet. They walk into it." },
      { id: "corinthians2_11_14", why: "The robe of light is an angel of light. The shepherds had already named him." },
    ],
  },
  atheist: {
    role: "A meeting on the road, and a man walking the other way",
    plate: { sky: "day", land: "road", mark: "none", figure: "gentle" },
    verses: [
      { id: "ecclesiastes10_15", why: "He has laboured a long time and does not know how to go to the city." },
      { id: "hebrews11_16", why: "They keep walking because they desire a better country, which he says is not there." },
    ],
  },
  enchanted: {
    role: "The country whose air makes pilgrims sleep",
    plate: { sky: "dusk", land: "garden", mark: "tree", figure: "pair" },
    verses: [
      { id: "thessalonians1_5_6", why: "The shepherd’s warning, which they repeat to each other: let us not sleep, as do others." },
      { id: "habakkuk2_3", why: "Hopeful’s story of coming to faith includes the vision that tarries and still comes." },
      { id: "matthew11_28", why: "He tells Christian he was invited to come, heavy laden, and that the invitation was not presumption." },
    ],
  },
  beulah: {
    role: "The land within sight of the city",
    plate: { sky: "glory", land: "garden", mark: "tree", figure: "shining" },
    verses: [
      { id: "isaiah62_4", why: "Bunyan takes the name from this verse: thy land Beulah, for the Lord delighteth in thee." },
      { id: "song2_10", why: "Flowers, and the voice of the turtle. The margin is the song of the beloved." },
      { id: "revelation19_9", why: "The contract renewed in Beulah looks toward the marriage supper of the Lamb." },
    ],
  },
  river: {
    role: "The river without a bridge",
    plate: { sky: "dusk", land: "water", mark: "none", figure: "pair" },
    verses: [
      { id: "isaiah43_2", why: "When thou passest through the waters, I will be with thee. Hopeful holds Christian to this." },
      { id: "psalm73_5", why: "Christian fears because the wicked seem to have no bands in their death. The crossing is not measured that way." },
      { id: "hebrews9_27", why: "It is appointed unto men once to die. The river is that appointment, and it is not the same depth for every pilgrim." },
    ],
  },
  celestial: {
    role: "The city on the hill, and the end of the dream",
    plate: { sky: "glory", land: "walls", mark: "city", figure: "shining" },
    verses: [
      { id: "hebrews12_22", why: "Mount Sion, the heavenly Jerusalem, an innumerable company of angels. This is the gate they have walked toward." },
      { id: "revelation22_14", why: "Right to the tree of life, and entrance through the gates. The roll is the certificate." },
      { id: "isaiah26_2", why: "Open the gates, that the righteous nation which keepeth the truth may enter in." },
      { id: "revelation21_4", why: "The bells and the welcome look toward the city where death and tears are gone." },
      { id: "matthew22_12", why: "Ignorance arrives without a garment and is bound. There is a way to hell from the gates of heaven." },
    ],
  },
}

const landmarkNotes: Record<string, Note> = {
  beelzebub: {
    role: "The castle that shoots at the gate",
    plate: { sky: "dusk", land: "castle", mark: "arrows", figure: "none" },
    verses: [{ id: "ephesians6_16", why: "The arrows are the fiery darts. Goodwill will not let a pilgrim stand in the open." }],
  },
  apostasy: {
    role: "The ground under the castle, on the plate",
    plate: { sky: "night", land: "castle", mark: "arrows", figure: "none" },
    verses: [{ id: "hebrews10_38", why: "The name is for those who come near the gate and draw back." }],
  },
  morality: {
    role: "The village under Sinai",
    plate: { sky: "day", land: "town", mark: "none", figure: "gentle" },
    verses: [{ id: "isaiah64_6", why: "A moral town, offered as a righteousness, is still filthy rags beside the cross." }],
  },
  "carnal-policy": {
    role: "The town Worldly Wiseman comes from",
    plate: { sky: "day", land: "town", mark: "book", figure: "gentle" },
    verses: [{ id: "john1_4_5", why: "Its policy is the speech of the world, and the world hears it." }],
  },
  stupidity: {
    role: "A hamlet on the plate, off the road",
    plate: { sky: "day", land: "town", mark: "none", figure: "sleep" },
    verses: [{ id: "proverbs6_6", why: "The map-maker’s name for a sleep like Simple, Sloth, and Presumption. The book does not stop the story here." }],
  },
  "vain-delights": {
    role: "Pleasure-grounds south of the city, on the plate",
    plate: { sky: "day", land: "garden", mark: "none", figure: "none" },
    verses: [{ id: "john1_2_16", why: "The plate sets them opposite the road. They are the world that is not of the Father." }],
  },
  "dark-land": {
    role: "The dim country east of the city, on the plate",
    plate: { sky: "night", land: "field", mark: "none", figure: "none" },
    verses: [{ id: "job10_22", why: "An illustrator’s name for the region he is leaving: a land of darkness." }],
  },
  carnality: {
    role: "A river signed on the plate, not the road he walks",
    plate: { sky: "dusk", land: "water", mark: "none", figure: "none" },
    verses: [{ id: "romans8_5", why: "The name is the mind set on the flesh. Christian’s road does not follow the river." }],
  },
  "vain-glory-road": {
    role: "A track off the Way, toward Vain-glory",
    plate: { sky: "day", land: "road", mark: "none", figure: "none" },
    verses: [{ id: "galatians5_26", why: "The road’s name is the vain glory the pilgrims are told not to desire." }],
  },
  "carnal-security": {
    role: "A false palace above the road, on the plate",
    plate: { sky: "day", land: "castle", mark: "castle", figure: "none" },
    verses: [{ id: "thessalonians1_5_3", why: "It offers peace and safety. It is not Palace Beautiful, and the way does not turn in." }],
  },
  platform: {
    role: "The flat height above that palace, on the plate",
    plate: { sky: "day", land: "hill", mark: "none", figure: "none" },
    verses: [{ id: "matthew23_28", why: "A show-place off the Way. Outward show is not the gate." }],
  },
  tower: {
    role: "The Tower of Spiritual Pride, on the plate",
    plate: { sky: "day", land: "hill", mark: "castle", figure: "none" },
    verses: [{ id: "proverbs16_18", why: "The plate’s warning above the hill: pride goes before destruction. Christian’s road stays below it." }],
  },
  contemplation: {
    role: "A name on the slope, on the plate",
    plate: { sky: "day", land: "hill", mark: "book", figure: "none" },
    verses: [{ id: "psalm119_15", why: "Meditation belongs on the way. The plate letters the word off the road, where it is only a view." }],
  },
  "good-resolution": {
    role: "A neighbor of Contemplation on the plate",
    plate: { sky: "day", land: "hill", mark: "none", figure: "none" },
    verses: [{ id: "luke9_62", why: "A resolution that looks back is not fit for the kingdom. The plate sets the name beside the hill, not on the path." }],
  },
  destruction: {
    role: "The by-path Hypocrisy takes",
    plate: { sky: "night", land: "hill", mark: "pit", figure: "none" },
    verses: [{ id: "matthew7_13", why: "Not the City of Destruction. This is the broad way at the foot of the hill, and it leads to dark mountains." }],
  },
  danger: {
    role: "The other by-path at Hill Difficulty",
    plate: { sky: "dusk", land: "hill", mark: "pit", figure: "none" },
    verses: [{ id: "hosea14_9", why: "Formalist takes it because the hill looks steep. Transgressors fall in a way that is not the Way." }],
  },
  pretense: {
    role: "A settlement on the Vain-glory road, on the plate",
    plate: { sky: "day", land: "town", mark: "none", figure: "none" },
    verses: [{ id: "matthew23_28", why: "The plate’s name for that false way: righteous outwardly, and not entered by the door." }],
  },
  deceit: {
    role: "A castle in the eastern hills, on the plate",
    plate: { sky: "dusk", land: "castle", mark: "castle", figure: "none" },
    verses: [{ id: "jeremiah17_9", why: "The illustrator’s mark, kin to the town of Deceit where Adam the First lives. The heart is deceitful." }],
  },
  mirth: {
    role: "Signed just west of the road, on the plate",
    plate: { sky: "day", land: "field", mark: "none", figure: "none" },
    verses: [{ id: "proverbs14_13", why: "The plate pairs it with Mourning. Even in laughter the heart is sorrowful." }],
  },
  mourning: {
    role: "Signed just east of the road, opposite Mirth",
    plate: { sky: "dusk", land: "field", mark: "none", figure: "none" },
    verses: [{ id: "matthew5_4", why: "Blessed are they that mourn. The plate sets the word beside the way after the cross." }],
  },
  "vain-glory": {
    role: "The country Formalist and Hypocrisy come from",
    plate: { sky: "day", land: "road", mark: "none", figure: "pair" },
    verses: [{ id: "galatians5_26", why: "They climb the wall from here, hoping to share the way without the gate." }],
  },
  "stately-palace": {
    role: "A great house off the road, on the plate",
    plate: { sky: "day", land: "house", mark: "none", figure: "none" },
    verses: [{ id: "luke12_19", why: "It is not Palace Beautiful. The plate leaves it across the river, a house of goods laid up." }],
  },
  gaius: {
    role: "An inn from Part II, drawn on this plate",
    plate: { sky: "day", land: "house", mark: "none", figure: "elder" },
    verses: [{ id: "romans16_23", why: "Paul calls Gaius his host. Christian does not stop here. Christiana’s company does, in Part II." }],
  },
  altar: {
    role: "The Altar of Incense, marked on the plate",
    plate: { sky: "glory", land: "hill", mark: "fire", figure: "none" },
    verses: [{ id: "revelation8_3", why: "An illustrator’s sign beside the road, not a scene Christian enters. The altar and the incense are from this verse." }],
  },
  graceless: {
    role: "A height lettered with Christian’s old name",
    plate: { sky: "dusk", land: "hill", mark: "none", figure: "none" },
    verses: [{ id: "ephesians2_8", why: "Graceless is who he was. The plate puts the old name off the road he is walking by grace." }],
  },
  honesty: {
    role: "Old Honest’s name, in the hills above Vanity",
    plate: { sky: "day", land: "hill", mark: "staff", figure: "elder" },
    verses: [{ id: "proverbs12_17", why: "He speaks truth. He is a pilgrim of Part II, and he is not on Christian’s road." }],
  },
  "mouth-of-hell": {
    role: "Hard by the way, in the dark valley",
    plate: { sky: "night", land: "road", mark: "fire", figure: "none" },
    verses: [
      { id: "psalm116_4", why: "Christian hears it and cries to be delivered." },
      { id: "matthew12_31", why: "The whispers he fears are his own are met, in the book, by the word that blasphemy shall be forgiven — and by the warning of the one blasphemy that shall not." },
    ],
  },
  coveting: {
    role: "Houses at the foot of Hill Lucre",
    plate: { sky: "day", land: "town", mark: "mine", figure: "none" },
    verses: [{ id: "exodus20_17", why: "The plate’s name for the country of the silver mine. Thou shalt not covet." }],
  },
  demas: {
    role: "Where he stands and beckons",
    plate: { sky: "day", land: "hill", mark: "mine", figure: "gentle" },
    verses: [{ id: "timothy2_4_10", why: "The spot on the plate is the man who loved this present world." }],
  },
  "lots-wife": {
    role: "The pillar of salt on the Way",
    plate: { sky: "day", land: "road", mark: "pillar", figure: "none" },
    verses: [
      { id: "genesis19_26", why: "She looked back and became a pillar of salt. Christian and Hopeful stop and read her." },
      { id: "luke9_62", why: "The warning is the same as the hand on the plough: do not look back." },
    ],
  },
  "water-of-life": {
    role: "The river beside the way, before the stile",
    plate: { sky: "glory", land: "water", mark: "spring", figure: "pair" },
    verses: [
      { id: "revelation22_1", why: "Bunyan calls it the river of the water of life, clear as crystal." },
      { id: "psalm23_2", why: "They drink, eat, and lie down beside it. The meadow over the stile is where they leave it." },
      { id: "ezekiel47_1", why: "John’s river, and Ezekiel’s waters from the threshold. Bunyan names both." },
    ],
  },
  error: {
    role: "The hill where climbers have fallen",
    plate: { sky: "dusk", land: "mount", mark: "pit", figure: "none" },
    verses: [{ id: "hosea14_9", why: "The shepherds show it as a warning. The ways of the Lord are right, and transgressors fall." }],
  },
  caution: {
    role: "The hill of the blind men among the tombs",
    plate: { sky: "dusk", land: "mount", mark: "tomb", figure: "none" },
    verses: [{ id: "proverbs21_16", why: "They wandered out of the way and remain among the dead. The giant put out their eyes." }],
  },
  marvel: {
    role: "A named height in the shepherds’ country",
    plate: { sky: "day", land: "mount", mark: "none", figure: "none" },
    verses: [{ id: "isaiah33_17", why: "The plate gathers these peaks into the land that is very far off. The narrative does not visit this hill by itself." }],
  },
  clear: {
    role: "Where they look through the perspective glass",
    plate: { sky: "glory", land: "mount", mark: "glass", figure: "pilgrim" },
    verses: [{ id: "corinthians1_13_12", why: "They see the gate through a glass, darkly. Christian’s hand shakes, and the view will not hold still." }],
  },
  innocence: {
    role: "A peak on the east side of the mountains, on the plate",
    plate: { sky: "day", land: "mount", mark: "none", figure: "none" },
    verses: [{ id: "isaiah33_17", why: "One of the signed heights in the shepherds’ country, not a separate visit." }],
  },
  charity: {
    role: "The easternmost signed peak",
    plate: { sky: "day", land: "mount", mark: "none", figure: "none" },
    verses: [{ id: "corinthians1_13_13", why: "Charity is also the damsel at Palace Beautiful. Here the plate gives the name to a mountain above the Water of Life." }],
  },
  conceit: {
    role: "Ignorance’s country",
    plate: { sky: "day", land: "town", mark: "none", figure: "gentle" },
    verses: [{ id: "proverbs26_12", why: "A man wise in his own conceit. A crooked lane runs from here onto the Way." }],
  },
  "dead-mans-lane": {
    role: "The lane where Little-faith was robbed",
    plate: { sky: "night", land: "road", mark: "pit", figure: "none" },
    verses: [{ id: "proverbs21_16", why: "So called because of the murders done there. Whoever wanders out of the way remains in the congregation of the dead." }],
  },
  sincere: {
    role: "The shepherd’s name, lettered on the slope",
    plate: { sky: "day", land: "mount", mark: "staff", figure: "elder" },
    verses: [{ id: "hebrews13_2", why: "Sincere is one of the four who welcome strangers into the mountains." }],
  },
  broadway: {
    role: "Broad-way Gate, off the Way",
    plate: { sky: "day", land: "road", mark: "gate", figure: "none" },
    verses: [{ id: "matthew7_13", why: "Wide is the gate, and broad is the way. The robbers come down from this gate. It is not the wicket." }],
  },
  "good-confidence": {
    role: "The city where Great-grace dwells",
    plate: { sky: "day", land: "walls", mark: "sword", figure: "none" },
    verses: [{ id: "hebrews10_35", why: "Cast not away your confidence. The robbers flee when they think its champion is on the road." }],
  },
  "slothfuls-friend": {
    role: "A name in the Enchanted Ground, on the plate",
    plate: { sky: "dusk", land: "garden", mark: "tree", figure: "sleep" },
    verses: [{ id: "proverbs13_4", why: "The air here makes pilgrims sleep. The sluggard desires, and has nothing." }],
  },
}

const extraPlaces: Place[] = [
  {
    id: "fair-speech",
    name: "Fair-speech",
    role: "By-ends’s town",
    account:
      "Almost the whole town is his kindred. It took its name from the ancestors of my Lord Fair-speech. Christian asks whether any good lives there, and does not stay for the answer he is offered.",
    plate: { sky: "day", land: "town", mark: "none", figure: "gentle" },
    verses: [{ id: "proverbs26_25", why: "When he speaketh fair, believe him not. The town is built on that voice." }],
  },
  {
    id: "prating-row",
    name: "Prating Row",
    role: "Where Talkative is known",
    account:
      "Christian places him there, the son of Say-well. Everyone acquainted with that row knows the name Talkative, and few of them have a good word for the life behind the talk.",
    plate: { sky: "day", land: "town", mark: "book", figure: "gentle" },
    verses: [{ id: "romans2_24", why: "Through a man like this, Christian says, the name of God is blasphemed. The row is famous for the talk." }],
  },
  {
    id: "town-of-deceit",
    name: "The town of Deceit",
    role: "Where Adam the First keeps his house",
    account:
      "He tells Faithful the name of the town when he offers wages and his daughters. Faithful feels the pull of the house and gets free. Moses meets him on the road afterward.",
    plate: { sky: "dusk", land: "town", mark: "none", figure: "elder" },
    verses: [{ id: "ephesians4_22", why: "Bunyan’s margin on the old man of that town: corrupt according to the deceitful lusts." }],
  },
  {
    id: "love-gain",
    name: "Love-gain",
    role: "A market town in the county of Coveting",
    account:
      "Mr. Gripe-man kept a school here and taught By-ends, Hold-the-world, Money-love, and Save-all how to get, including by a show of religion. The pilgrims do not visit it. They meet the scholars on the road.",
    plate: { sky: "day", land: "town", mark: "mine", figure: "none" },
    verses: [{ id: "timothy1_6_10", why: "The county is Coveting, and the lesson of the school is the love of money." }],
  },
]

function fromStages(): Place[] {
  return stages.map((stage) => {
    const note = stageNotes[stage.id]
    if (!note) throw new Error(`Missing reference for ${stage.id}`)
    return {
      id: stage.id,
      name: stage.title,
      role: note.role,
      account: note.account ?? stage.synopsis,
      plate: note.plate,
      verses: note.verses,
      stageId: stage.id,
    }
  })
}

function fromLandmarks(): Place[] {
  return landmarks.map((place) => {
    const note = landmarkNotes[place.id]
    if (!note) throw new Error(`Missing reference for ${place.id}`)
    return {
      id: place.id,
      name: place.name,
      role: note.role,
      account: note.account ?? place.note,
      plate: note.plate,
      verses: note.verses,
      landmarkId: place.id,
    }
  })
}

export const places: Place[] = [...fromStages(), ...fromLandmarks(), ...extraPlaces]
