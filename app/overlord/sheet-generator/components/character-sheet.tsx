"use client"

import { useState } from "react"
import { SheetProvider, useSheetContext } from "./sheet-context"
import Image from "next/image"
import { useEffect } from "react"

export function CharacterSheet() {
  const { state, dispatch } = useSheetContext()

  // TODO Image File handling rather than just URL in public folder
  // const [imageSrc, setImageSrc] = useState<string>()
  //
  // useEffect(() => {
  //   if (state.portrait) {
  //     const objectUrl = URL.createObjectURL(state.portrait);
  //     setImageSrc(objectUrl);

  //     return () => URL.revokeObjectURL(objectUrl);
  //   }
  // }, [state.portrait])

  return (
    <SheetProvider>
      <div className="sheet-container relative">
        <div
          className="portrait-container absolute ml-[3.5rem] mt-[2.4rem] z-0"
          style={{ 
            width: state.portraitW,
            height: state.portraitH,
            left: state.portraitX,
            top: state.portraitY,
          }}
        >
          <Image 
            src={state.portrait}
            alt={state.romajiName1}
            fill
          />
        </div>
        <div 
          className="template-container relative z-1"
          style={{ 
            width: state.templateW,
            height: state.templateH,
            left: state.templateX,
            top: state.templateY,
          }}
        >
          <Image 
            src={state.template}
            alt="sheet template"
            fill
          />
        </div>
      </div>
    </SheetProvider>
  )
}

export function EditableCharacterSheet() {
  const { state, dispatch } = useSheetContext()

  // TODO Image File handling rather than just URL in public folder
  // const [imageSrc, setImageSrc] = useState<string>()
  //
  // useEffect(() => {
  //   if (state.portrait) {
  //     const objectUrl = URL.createObjectURL(state.portrait);
  //     setImageSrc(objectUrl);

  //     return () => URL.revokeObjectURL(objectUrl);
  //   }
  // }, [state.portrait])

  return (
    <SheetProvider>
      <div className="relative">
        <div
          className="absolute ml-[3.5rem] mt-[2.4rem] z-0"
          style={{ 
            width: state.portraitW,
            height: state.portraitH,
            left: state.portraitX,
            top: state.portraitY,
          }}
        >
          <Image 
            src={state.portrait}
            alt={state.romajiName1}
            fill
          />
        </div>
        <div 
          className="relative z-1"
          style={{ 
            width: state.templateW,
            height: state.templateH,
            left: state.templateX,
            top: state.templateY,
          }}
        >
          <Image 
            src={state.template}
            alt="sheet template"
            fill
          />
        </div>
      </div>
    </SheetProvider>
  )
}
