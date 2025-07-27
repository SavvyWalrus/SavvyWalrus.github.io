"use client"

import { useState } from "react"
import { SheetProvider, useSheetContext } from "./components/sheet-context"
import Image from "next/image"
import { useEffect } from "react"
import { CharacterSheet, EditableCharacterSheet } from "./components/character-sheet"

export default function OverlordSheetGenerator() {
  return (
    <SheetProvider>
      <div className="flex gap-5 justify-center h-full w-full text-black">
        <CharacterSheet />
      </div>
    </SheetProvider>
  )
}
