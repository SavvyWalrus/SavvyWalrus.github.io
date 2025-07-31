"use client"

import { useState } from "react"
import { useSheetContext } from "./sheet-context"
import Image from "next/image"
import { useEffect } from "react"
import { FieldsRenderer } from "./sheet-fields"

export function CharacterSheet({ edit } : { edit?: boolean }) {
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
    <div className="sheet-container relative min-h-[50rem] aspect-[7/10]">
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
        <FieldsRenderer edit={edit} />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: '1'
        }}
      >
        {
          edit ?
            <Image 
              src="/overlord/templates/Input-Template.png"
              alt="sheet template"
              fill
            />
            :
            <Image 
              src={state.template}
              alt="sheet template"
              fill
            />
        }
      </div>
    </div>
  )
}
