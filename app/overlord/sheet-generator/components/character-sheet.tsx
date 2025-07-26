"use client"

import { useState } from "react"
import { SheetProvider, useSheetContext } from "./sheet-context"
import Image from "next/image"
import { useEffect } from "react"

export default function CharacterSheet() {
  const [imageSrc, setImageSrc] = useState<string>()
  const {
    portrait: [portraitImg, setPortraitImg],
    name: [characterName, setCharacterName],
    template: [templateImg, setTemplateImg],
  } = useSheetContext()

  useEffect(() => {
    if (portraitImg) {
      const objectUrl = URL.createObjectURL(portraitImg);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageSrc("/overlord/portraits/01-Momonga.jpg")
    }
  }, [portraitImg])

  return (
    <SheetProvider>
      <div className="relative">
        <div className="absolute ml-[3.5rem] mt-[2.4rem] z-0">
          {imageSrc &&
            <Image 
              src={imageSrc}
              alt={characterName}
              width={119}
              height={100}
            />
          }
        </div>
        <div className="relative z-1">
          <Image 
            src={templateImg}
            alt="sheet template"
            width={400}
            height={400}
          />
        </div>
      </div>
    </SheetProvider>
  )
}
