"use client"

import { useSheetContext } from "./sheet-context"
import { FieldsRenderer } from "./sheet-fields"
import { EditPortraitToggle, PortraitUploader, PresetSelector, SheetDownloader } from "./utils"
import { useEffect, useRef, useState } from "react"
import { Rnd } from "react-rnd"
import { cn } from "@/lib/utils"

export function CharacterSheet({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()
  const [editPortrait, setEditPortrait] = useState<boolean>(false)

  const sheetContainerRef = useRef<HTMLDivElement>(null)
  const [sheetContainerWidth, setSheetContainerWidth] = useState(0)

  useEffect(() => {
    const el = sheetContainerRef.current
    if (!el) return

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setSheetContainerWidth(entry.contentRect.width)
        }
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sheetContainerRef} className="sheet-container @container relative min-h-[45rem] aspect-[7/10] bg-white overflow-hidden">
      <div
        className={cn("portrait-container absolute left-[13.95%] top-[6.95%] w-[29.7%] h-[63.5%] bg-white", editPortrait && "z-4", !edit && "pointer-events-none")}
      >
        <Rnd
          disableDragging={!editPortrait}
          enableResizing={editPortrait}
          position={{
            x: (state.portraitX),
            y: (state.portraitY),
          }}
          size={{
            width: (state.portraitW * (sheetContainerWidth / 560)),
            height: (state.portraitH * (sheetContainerWidth / 560))
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
                value: (parseInt(ref.style.width) * (560 / sheetContainerWidth))
              }
            })
            dispatch({
              type: "SET_FIELD",
              payload: {
                key: "portraitH",
                value: (parseInt(ref.style.height) * (560 / sheetContainerWidth))
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className={`pointer-events-none absolute top-0 left-0 w-full h-full object-fit ${editPortrait ? "opacity-30" : ""}`}
            src={state.portrait}
            alt={state.romajiName1}
          />
        </Rnd>
      </div>
      {
        edit &&
          <div className="utils-container @container absolute w-full h-full">
            <PresetSelector classname={cn(editPortrait && "pointer-events-none")} />
            <PortraitUploader classname={cn(editPortrait && "pointer-events-none")} />
            <EditPortraitToggle editPortrait={editPortrait} setEditPortrait={setEditPortrait} />
          </div>
      }
      <div className={cn("fields-container absolute w-full h-full z-2", editPortrait && 'pointer-events-none')}>
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
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                className="pointer-events-none absolute top-0 left-0 w-full h-full object-fit"
                src="/overlord/templates/Input-Template.png"
                alt="sheet template"
              />
            </>
            :
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                className="pointer-events-none absolute top-0 left-0 w-full h-full object-fit"
                src={state.template}
                alt="sheet template"
              />
            </>
        }
      </div>
      {
        !edit &&
          <div className="absolute top-[0.5cqw] left-[77cqw] z-3">
            <SheetDownloader
              characterSheetRef={sheetContainerRef}
            />
          </div>
      }
    </div>
  )
}
