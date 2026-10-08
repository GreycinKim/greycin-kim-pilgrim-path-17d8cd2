export const MISSION_POINTS = 25

export type MissionWhen = "before" | "after"
export type MissionShot = "photo" | "selfie"

export type Mission = {
  id: string
  when: MissionWhen
  shot: MissionShot
  title: string
  detail: string
  points: number
}

export const missions: Mission[] = [
  {
    id: "wave",
    when: "before",
    shot: "selfie",
    title: "Your wave",
    detail: "A selfie at church with the people in your wave, before the vehicles leave.",
    points: MISSION_POINTS,
  },
  {
    id: "pack",
    when: "before",
    shot: "photo",
    title: "Packed for the night",
    detail: "A photo of your sleeping bag, pillow, and a warm layer.",
    points: MISSION_POINTS,
  },
  {
    id: "bible",
    when: "before",
    shot: "photo",
    title: "Bible and pen",
    detail: "A photo of the Bible and pen you are bringing for the examination.",
    points: MISSION_POINTS,
  },
  {
    id: "water",
    when: "before",
    shot: "photo",
    title: "Water and shoes",
    detail: "A photo of your water and the shoes you will walk in.",
    points: MISSION_POINTS,
  },
  {
    id: "read",
    when: "before",
    shot: "selfie",
    title: "The passage",
    detail: "A selfie with the passage you are reading open.",
    points: MISSION_POINTS,
  },
  {
    id: "line",
    when: "after",
    shot: "photo",
    title: "One line",
    detail: "A photo of one line you wrote from the sermon or the fire.",
    points: MISSION_POINTS,
  },
  {
    id: "driver",
    when: "after",
    shot: "selfie",
    title: "Your driver",
    detail: "A selfie with the person who drove you.",
    points: MISSION_POINTS,
  },
  {
    id: "joshua",
    when: "after",
    shot: "photo",
    title: "A Joshua tree",
    detail: "A photo of a Joshua tree, or of the Cholla Cactus Garden on the way home.",
    points: MISSION_POINTS,
  },
  {
    id: "home",
    when: "after",
    shot: "selfie",
    title: "Back in Santa Ana",
    detail: "A selfie once you are home, with someone you told about Cottonwood.",
    points: MISSION_POINTS,
  },
]

export function getMission(id: string) {
  return missions.find((mission) => mission.id === id)
}

export function missionPhotoSrc(id: string, takenAt: string | null | undefined) {
  if (!takenAt || !getMission(id)) return null
  return `/api/mission/${encodeURIComponent(id)}?v=${encodeURIComponent(takenAt)}`
}
