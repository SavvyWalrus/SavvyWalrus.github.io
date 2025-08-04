"use client"

import { SheetProvider } from "./components/sheet-context"
import { CharacterSheet } from "./components/character-sheet"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function OverlordSheetGenerator() {
  const [sideBySide, setSideBySide] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)

  return (
    <SheetProvider>
      <div className="justify-center h-[90%] w-full min-w-fit text-black">
        <div className="flex justify-center py-3 gap-3">
          <div className="flex items-center ml-13 bg-background text-foreground">
            <Switch
              checked={sideBySide}
              onCheckedChange={() => {setSideBySide(!sideBySide)}}
              className="data-[state=checked]:bg-purple-500"
            />
            <Label
              className="font-bold mx-2"
            >
              Side-by-side
            </Label>
          </div>
          {
            !sideBySide ?
              <div className="flex items-center bg-background text-foreground">
                <Checkbox
                  checked={edit}
                  onCheckedChange={() => {setEdit(!edit)}}
                />
                <Label
                  className="font-bold mx-2"
                >
                  Edit Mode
                </Label>
              </div>
              :
              <></>
          }
        </div>
        <div className="flex gap-5 mx-5 h-[100%] w-[100%] justify-center">
          {
            sideBySide ?
              <>
                <CharacterSheet />
                <CharacterSheet edit={true} />
              </>
              :
              <CharacterSheet edit={edit} />
          }
        </div>
      </div>
    </SheetProvider>
  )
}
