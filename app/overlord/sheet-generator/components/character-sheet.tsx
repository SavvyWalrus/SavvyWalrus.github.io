"use client"

import { useState } from "react"
import { SheetProvider, useSheetContext } from "./sheet-context"
import Image from "next/image"
import { useEffect } from "react"
import { TextFieldsRenderer } from "./text-fields"

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
      <div className="sheet-container relative max-h-[70rem] min-h-[20rem] aspect-[7/10]">
        <div className="portrait-container absolute left-[14%] top-[6.95%] w-[29.7%] h-[63.5%] z-0">
          <div
            className=""
            style={{ 
              width: `${state.portraitW}em`,
              height: `${state.portraitH}em`,
              left: `${state.portraitX}em`,
              top: `${state.portraitY}em`,
            }}
          >
            <Image 
              src={state.portrait}
              alt={state.romajiName1}
              fill
            />
          </div>
        </div>
        <div className="fields-container absolute w-full h-full z-2">
          <TextFieldsRenderer />
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: '1'
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
      <div className="sheet-container relative w-full h-full">
        <div
          className="portrait-container absolute ml-[3.5em] mt-[2.4em] z-0"
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
        <div className="fields-container absolute z-2">
          <TextFieldsRenderer />
        </div>
        <div className="template-container relative z-1 w-full h-full">
          <Image 
            src={state.template}
            alt="sheet template"
            style={{
              width: '80%',
              height: 'auto',
              maxWidth: '40em',
            }}
            width={700}
            height={1000}
          />
        </div>
      </div>
    </SheetProvider>
  )
}
