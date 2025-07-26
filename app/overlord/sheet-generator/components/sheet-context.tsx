import { createContext, useContext, useState } from "react"

type SheetContextType = {
  portrait: [File | undefined, (img: File) => void],
  template: [string, (img: string) => void],
  name: [string, (name: string) => void],
  portraitW: [number, (width: number) => void],
  portraitH: [number, (width: number) => void],
  portraitX: [number, (width: number) => void],
  portraitY: [number, (width: number) => void],
  templateW: [number, (width: number) => void],
  templateH: [number, (width: number) => void],
  templateX: [number, (width: number) => void],
  templateY: [number, (width: number) => void],
}

const defaultValues: SheetContextType = {
  portrait: [undefined, () => {}],
  template: ["", () => {}],
  name: ["", () => {}],
  portraitW: [0, () => {}],
  portraitH: [0, () => {}],
  portraitX: [0, () => {}],
  portraitY: [0, () => {}],
  templateW: [0, () => {}],
  templateH: [0, () => {}],
  templateX: [0, () => {}],
  templateY: [0, () => {}],
}

const SheetContext = createContext<SheetContextType>(defaultValues)

export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [portraitImg, setPortraitImg] = useState<File | undefined>(undefined)
  const [characterName, setCharacterName] = useState<string>("")
  const [templateImg, setTemplateImg] = useState<string>("/overlord/templates/Heteromorph-Demihuman.png")
  const [portraitWidth, setPortraitWidth] = useState<number>(119)
  const [portraitHeight, setPortraitHeight] = useState<number>(362)
  const [portraitXPos, setPortraitXPos] = useState<number>(0)
  const [portraitYPos, setPortraitYPos] = useState<number>(0)
  const [templateWidth, setTemplateWidth] = useState<number>(400)
  const [templateHeight, setTemplateHeight] = useState<number>(568)
  const [templateXPos, setTemplateXPos] = useState<number>(0)
  const [templateYPos, setTemplateYPos] = useState<number>(0)

  return (
    <SheetContext.Provider
      value={{
        portrait: [portraitImg, setPortraitImg],
        name: [characterName, setCharacterName],
        template: [templateImg, setTemplateImg],
        portraitW: [portraitWidth, setPortraitWidth],
        portraitH: [portraitHeight, setPortraitHeight],
        portraitX: [portraitXPos, setPortraitXPos],
        portraitY: [portraitYPos, setPortraitYPos],
        templateW: [templateWidth, setTemplateWidth],
        templateH: [templateHeight, setTemplateHeight],
        templateX: [templateXPos, setTemplateXPos],
        templateY: [templateYPos, setTemplateYPos],
      }}
    >
      {children}
    </SheetContext.Provider>
  )
}

export const useSheetContext = () => useContext(SheetContext)
