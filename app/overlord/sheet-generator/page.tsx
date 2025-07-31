"use client"

import { SheetProvider } from "./components/sheet-context"
import { CharacterSheet } from "./components/character-sheet"

export default function OverlordSheetGenerator() {
  return (
    <SheetProvider>
      <div className="flex gap-10 m-10 justify-center h-[90%] w-full min-w-fit text-black">
        <CharacterSheet />
        <CharacterSheet edit={true} />
      </div>
    </SheetProvider>
  )
}
