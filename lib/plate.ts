export type Sky = "day" | "dusk" | "night" | "glory"
export type Land = "field" | "bog" | "mount" | "town" | "hill" | "house" | "water" | "walls" | "garden" | "fair" | "road" | "castle"
export type Mark =
  | "none"
  | "cross"
  | "gate"
  | "castle"
  | "city"
  | "lions"
  | "mine"
  | "net"
  | "cage"
  | "pillar"
  | "fire"
  | "spring"
  | "stalls"
  | "tomb"
  | "glass"
  | "arrows"
  | "tree"
  | "roll"
  | "burden"
  | "sword"
  | "book"
  | "key"
  | "crown"
  | "staff"
  | "pit"
export type Figure = "none" | "pilgrim" | "elder" | "gentle" | "lady" | "giant" | "fiend" | "shining" | "sleep" | "pair"

export type PlateSpec = {
  sky: Sky
  land: Land
  mark: Mark
  figure: Figure
}
