import { createContext, useContext, useReducer, useState } from "react"
import { promises as fs } from 'fs'
import { useEffect } from 'react'

export type SheetState = {
  sheetType: string,
  raceType: string,
  sheetNum: number,
  romajiName1: string,
  romajiName2: string,
  romajiSecondaryName: string,
  katakanaName: string,
  katakanaSecondaryName: string,
  epithet1: string,
  epithet2: string,
  epithet3: string,
  position1: string,
  position2: string,
  residence1: string,
  residence2: string,
  alignmentText: string,
  karmaValue: number,
  visibleRacialClasses: number,
  raceClasses: string[],
  visibleJobClasses: number,
  jobClasses: string[],
  raceLevels: number[],
  jobLevels: number[],
  raceOthers: boolean,
  jobOthers: boolean,
  totalLevels: number,
  totalRaceLevels: number,
  totalJobLevels: number,
  HP: number,
  MP: number,
  physicalAttack: number,
  physicalDefense: number,
  agility: number,
  magicAttack: number,
  magicDefense: number,
  resistance: number,
  special: number,
  portrait: string,
  template: string,
  portraitW: number,
  portraitH: number,
  portraitX: number,
  portraitY: number,
  templateW: number,
  templateH: number,
  templateX: number,
  templateY: number,
}

export type SheetArrayFields =
  | "raceClasses"
  | "jobClasses"
  | "raceLevels"
  | "jobLevels"

type SheetAction =
  | { type: "SET"; payload: Partial<SheetState> }
  | { type: "SET_FIELD"; payload: { key: keyof SheetState; value: string | number | boolean } }
  | {
      type: "SET_FIELD_INDEX"
      payload: {
        key: SheetArrayFields
        index: number
        value: string | number
      }
    }

type SheetContextType = {
  state: SheetState
  dispatch: React.Dispatch<SheetAction>
  preset: string
  setPreset: React.Dispatch<React.SetStateAction<string>>
}

// Initial Momonga preset to avoid rerendering errors
const initialState: SheetState = {
  sheetType: "Character",
  raceType: "Heteromorph",
  sheetNum: 1,
  romajiName1: "Momonga",
  romajiName2: "",
  romajiSecondaryName: "Ainz Ooal Gown",
  katakanaName: "モモンガ",
  katakanaSecondaryName: "アインズ・ウール・ゴウン",
  epithet1: "A skeletal spellcaster who",
  epithet2: "wields powerful magic",
  epithet3: "",
  position1: "One of the 41 Supreme Beings; Ruler of the",
  position2: "Great Underground Tomb of Nazarick",
  residence1: "His chambers on the 9th Floor of the Great",
  residence2: "Underground Tomb of Nazarick",
  alignmentText: "Extreme Evil",
  karmaValue: -500,
  visibleRacialClasses: 3,
  raceClasses: ["Skeleton Mage", "Elder Lich", "Overlord", "", "", "", "", ""],
  visibleJobClasses: 2,
  jobClasses: ["Necromancer", "Ruler of Death", "", "", "", "", "", ""],
  raceLevels: [15, 10, 5, 0, 0, 0, 0, 0],
  jobLevels: [10, 10, 0, 0, 0, 0, 0, 0],
  raceOthers: true,
  jobOthers: true,
  totalLevels: 100,
  totalRaceLevels: 40,
  totalJobLevels: 60,
  HP: 60,
  MP: 115,
  physicalAttack: 35,
  physicalDefense: 70,
  agility: 40,
  magicAttack: 90,
  magicDefense: 95,
  resistance: 95,
  special: 100,
  portrait: "/overlord/portraits/01-Momonga.jpg",
  template: "/overlord/templates/Heteromorph-Demihuman.png",
  portraitW: 167,
  portraitH: 508,
  portraitX: 0,
  portraitY: 0,
  templateW: 210,
  templateH: 300,
  templateX: 0,
  templateY: 0,
}

function sheetReducer(state: SheetState, action: SheetAction): SheetState {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload }
    case "SET_FIELD":
      return { ...state, [action.payload.key]: action.payload.value }
    case "SET_FIELD_INDEX": {
      const { key, index, value } = action.payload
      const array = [...state[key]]
      array[index] = value
      return { ...state, [key]: array }
    }
    default:
      return state
  }
}

const SheetContext = createContext<SheetContextType>({
  state: initialState, 
  dispatch: () => {}, 
  preset: "",
  setPreset: () => {} 
})

export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = useState<string>("/overlord/presets/Momonga.json")
  const [state, dispatch] = useReducer(sheetReducer, initialState)

  useEffect(() => {
    // Extracts JSON from preset and sets the new state
    async function setter() {
      const res = await fetch(preset)
      const j = await res.json()
      dispatch({ type: "SET", payload: j })
    }

    setter()
  }, [preset])

  return (
    <SheetContext.Provider value={{ state, dispatch, preset, setPreset }}>
      {children}
    </SheetContext.Provider>
  )
}

export const useSheetContext = () => useContext(SheetContext)
