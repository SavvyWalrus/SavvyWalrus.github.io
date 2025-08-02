"use client"

import { useSheetContext } from "./sheet-context"
import Image from "next/image"
import { FieldsRenderer } from "./sheet-fields"
import { PortraitUploader, PresetSelector } from "./utils"

export function CharacterSheet({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  return (
    <div className="sheet-container relative min-h-[50rem] aspect-[7/10] bg-white overflow-hidden">
      <div className="portrait-container absolute left-[13.95%] top-[6.95%] w-[29.7%] h-[63.5%] z-0 bg-white">
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
      {
        edit &&
          <div className="@container utils-container absolute w-full h-full">
            <PortraitUploader />
            <PresetSelector />
          </div>
      }
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
