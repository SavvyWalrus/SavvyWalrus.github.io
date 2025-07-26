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
    portraitW: [portraitWidth, setPortraitWidth],
    portraitH: [portraitHeight, setPortraitHeight],
    portraitX: [portraitXPos, setPortraitXPos],
    portraitY: [portraitYPos, setPortraitYPos],
    templateW: [templateWidth, setTemplateWidth],
    templateH: [templateHeight, setTemplateHeight],
    templateX: [templateXPos, setTemplateXPos],
    templateY: [templateYPos, setTemplateYPos],
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
        <div
          className="absolute ml-[3.5rem] mt-[2.4rem] z-0"
          style={{ width: portraitWidth, height: portraitHeight, left: portraitXPos, top: portraitYPos }}
        >
          {imageSrc &&
            <Image 
              src={imageSrc}
              alt={characterName}
              fill
            />
          }
        </div>
        <div 
          className="relative z-1"
          style={{ width: templateWidth, height: templateHeight, left: templateXPos, top: templateYPos }}
        >
          <Image 
            src={templateImg}
            alt="sheet template"
            fill
          />
        </div>
      </div>
    </SheetProvider>
  )
}
