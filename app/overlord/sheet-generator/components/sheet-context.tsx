import { createContext, useContext, useState } from "react"

type SheetContextType = {
  portrait: [File | undefined, (img: File) => void],
  template: [string, (img: string) => void],
  name: [string, (name: string) => void],
}

const defaultValues: SheetContextType = {
  portrait: [undefined, () => {}],
  template: ["", () => {}],
  name: ["", () => {}],
}

const SheetContext = createContext<SheetContextType>(defaultValues)

export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [portraitImg, setPortraitImg] = useState<File | undefined>(undefined)
  const [characterName, setCharacterName] = useState<string>("")
  const [templateImg, setTemplateImg] = useState<string>("/overlord/templates/Heteromorph-Demihuman.png")

  return (
    <SheetContext.Provider
      value={{
        portrait: [portraitImg, setPortraitImg],
        name: [characterName, setCharacterName],
        template: [templateImg, setTemplateImg],
      }}
    >
      {children}
    </SheetContext.Provider>
  )
}

export const useSheetContext = () => useContext(SheetContext)
