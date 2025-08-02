"use client"

import { useSheetContext } from "./sheet-context"
import Image from "next/image"
import { FieldsRenderer } from "./sheet-fields"
import { EditImageToggle, PortraitUploader, PresetSelector } from "./utils"
import { useEffect, useRef, useState } from "react"
import { Rnd } from "react-rnd"
import { cn } from "@/lib/utils"

export function CharacterSheet({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()
  const [editImage, setEditImage] = useState<boolean>(false)

  const portraitContainerRef = useRef<HTMLDivElement>(null)
  const [portraitContainerWidth, setPortraitContainerWidth] = useState(0)

  useEffect(() => {
    const el = portraitContainerRef.current
    if (!el) return

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect.width) {
          setPortraitContainerWidth(entry.contentRect.width)
        }
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={portraitContainerRef} className={cn("sheet-container relative min-h-[45rem] aspect-[7/10] bg-white overflow-hidden", !edit && "pointer-events-none")}>
      <div
        className={cn("portrait-container absolute left-[13.95%] top-[6.95%] w-[29.7%] h-[63.5%] bg-white", editImage && "z-4")}
      >
        <Rnd
          disableDragging={!editImage}
          enableResizing={editImage}
          position={{
            x: (state.portraitX),
            y: (state.portraitY),
          }}
          size={{
            width: (state.portraitW * (portraitContainerWidth / 560)),
            height: (state.portraitH * (portraitContainerWidth / 560))
          }}
          onDragStop={(e, d) => {
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitX",
                value: d.x
              }
            })
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitY",
                value: d.y
              }
            })
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitW",
                value: (parseInt(ref.style.width) * (560 / portraitContainerWidth))
              }
            })
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitH",
                value: (parseInt(ref.style.height) * (560 / portraitContainerWidth))
              }
            })
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitX",
                value: position.x
              }
            })
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitY",
                value: position.y
              }
            })
          }}
        >
          <Image 
            className={`pointer-events-none ${editImage ? "opacity-30" : ""}`}
            src={state.portrait}
            alt={state.romajiName1}
            fill
          />
        </Rnd>
      </div>
      {
        edit &&
          <div className="utils-container @container absolute w-full h-full">
            <PresetSelector classname={cn(editImage && "pointer-events-none")} />
            <PortraitUploader classname={cn(editImage && "pointer-events-none")} />
            <EditImageToggle editImage={editImage} setEditImage={setEditImage} />
          </div>
      }
      <div className={cn("fields-container absolute w-full h-full z-2", editImage && 'pointer-events-none')}>
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
              className="pointer-events-none"
              src="/overlord/templates/Input-Template.png"
              alt="sheet template"
              fill
            />
            :
            <Image 
              className="pointer-events-none"
              src={state.template}
              alt="sheet template"
              fill
            />
        }
      </div>
    </div>
  )
}
