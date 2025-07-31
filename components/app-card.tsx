"use client"

import Image from "next/image"
import React, { useRef, useEffect, useState } from 'react';
import { convertRemToPixels } from "@/util-funcs";

export interface AppCardType {
  title: string
  img: string
  url: string
  width: number
  height: number
}

// Used for calculating dummy card count
// Must match classname values in AppCard, DummyCard, and AppCardMenu
const cardWidth = 14
const cardGap = 1.2

/**
 * Builds an AppCard from the given settings, containing a title and image
 * @param settings AppCardType containing card settings (title, url, etc.)
 * @returns AppCard component
 */
export function AppCard({ settings }: {
  settings: AppCardType 
}): React.JSX.Element {
  return (
    <div className={`relative active:scale-107 hover:scale-110 transistion duration-100 cursor-pointer ease-in-out rounded-sm overflow-hidden h-[12rem] w-[14rem]`}>
      <div className="absolute bg-gray-900/50 w-[100%] h-[100%]" />
      <p className="absolute top-1/2 -translate-y-1/2 left-0 w-full text-white text-shadow-sm/50 text-shadow-indigo-400 text-center align-middle select-none">
        {settings.title}
      </p>
      <Image src={settings.img} alt="card-bg" width={settings.width} height={settings.height} />
      <a className="absolute top-0 w-[100%] h-[100%]" href={settings.url}/>
    </div>
  )
}

/**
 * Builds a DummyCard from the given settings, used to fill out last row of AppCardMenu
 * @param settings AppCardType containing card settings (title, url, etc.)
 * @returns AppCard component
 */
function DummyCard(): React.JSX.Element {
  return (
    <div className={`relative hover:scale-110 rounded-sm overflow-hidden h-[12rem] w-[14rem]`} />
  )
}

/**
 * Builds an AppCardMenu from a list of apps, used to link to different projects
 * @param apps List of AppCardType containing card settings (title, url, etc.)
 * @returns 
 */
export function AppCardMenu({ apps }: {
  apps: AppCardType[]
}): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [dummyCardCount, setDummyCardCount] = useState(0)

  // Observes window width on resizing
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }

        const entry = entries[0]
        setWidth(entry.contentRect.width)
    })
    
    const elem = containerRef.current

    if (!elem) {
      return
    }

    resizeObserver.observe(elem)
    return () => resizeObserver.unobserve(elem)
  }, [])

  // Calculates the number of dummy cards to insert in order to left align the final row
  useEffect(() => {
    const cardTotalWidth = convertRemToPixels(cardWidth + cardGap)
    const adjustedWidth = width + convertRemToPixels(cardGap)
    const cardsPerRow = Math.floor(adjustedWidth / cardTotalWidth)

    if (apps.length > cardsPerRow) {
      const dummiesNeeded = (cardsPerRow - (apps.length % cardsPerRow)) % cardsPerRow
      setDummyCardCount(dummiesNeeded)
    } else {
      setDummyCardCount(cardsPerRow - apps.length)
    }
  }, [width, apps.length])

  return (
    <div ref={containerRef} className={`card-container my-10 flex flex-wrap justify-center m-auto gap-[1.2rem]`} >
      {apps.map(app => <AppCard key={app.title} settings={app} />)}
      {Array.from({ length: dummyCardCount }, (_, index) => (<DummyCard key={`dummy-${index}`} />))}
    </div>
  )
}
