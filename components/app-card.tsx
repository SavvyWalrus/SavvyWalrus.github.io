"use client"

import Image from "next/image"
import React, { useRef, useEffect, useState } from 'react';

export interface AppCardType {
  title: string
  img: string
  url: string
  width: number
  height: number
}

const dummyCard: AppCardType = {
  title: "",
  img: "",
  url: "",
  width: 0,
  height: 0
}

const cardHeight = 12
const cardWidth = 14
const cardGap = 1.2

export function AppCard({ settings }: { settings: AppCardType }) {
  return (
    <div className={`relative hover:scale-110 rounded-sm overflow-hidden h-[${cardHeight}rem] w-[${cardWidth}rem]`}>
      <div className="absolute bg-gray-900/25 w-[100%] h-[100%]" />
      <p className="absolute text-white text-center">{settings.title}</p>
      <Image src={settings.img} alt="card-bg" width={settings.width} height={settings.height} />
    </div>
  )
}

export function DummyCard() {
  return (
    <div className={`relative hover:scale-110 rounded-sm overflow-hidden h-[${cardHeight}rem] w-[${cardWidth}rem]`} />
  )
}

export function AppCardMenu({ apps }: { apps: AppCardType[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [dummyCardCount, setDummyCardCount] = useState(10)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) return
        if (!entries.length) return
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

  useEffect(() => {
    const cardTotalWidth = cardWidth + cardGap
    const cardsPerRow = Math.floor((width + cardGap) / cardTotalWidth)

    if (cardsPerRow > 0) {
      const remainder = apps.length % cardsPerRow
      const dummiesNeeded = remainder === 0 ? 0 : cardsPerRow - remainder
      setDummyCardCount(dummiesNeeded)
    }
  }, [width])

  return (
    <div ref={containerRef} className={`card-container flex flex-wrap justify-center m-auto gap-[${cardGap}rem]`} >
      {apps.map(app => <AppCard key={app.title} settings={app} />)}
      {Array.from({ length: dummyCardCount }, (_, index) => (<DummyCard key={`dummy-${index}`} />))}
    </div>
  )
}
