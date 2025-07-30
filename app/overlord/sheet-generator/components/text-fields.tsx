import { useSheetContext } from "./sheet-context"
import localFont from 'next/font/local'

const packardAntique = localFont({
  src: [
    {
      path: '../../fonts/PackardAntique.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../fonts/PackardAntique-Bold.ttf',
      weight: '700',
      style: 'normal'
    }
  ]
})

const shipporiMincho = localFont({
  src: '../../fonts/ShipporiMinchoB1-ExtraBold.ttf'
})

const calistoMT = localFont({
  src: '../../fonts/CALIST.ttf'
})

const OPTIPaulDavid = localFont({
  src: '../../fonts/OPTIPaulDavid.otf'
})

const deepdeneRoman = localFont({
  src: '../../fonts/Deepdene\ Roman.ttf'
})

function Header() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[7.5cqw] left-[14cqw] text-[1.6cqw] font-[packardAntique]">
        {state.sheetType}
      </p>
      <p className="absolute top-[2cqw] left-[27cqw] text-[7cqw] font-[OPTIPaulDavid]">
        {state.sheetNum}
      </p>
      <p className="absolute top-[10.2cqw] left-[75.8cqw] text-[1.9cqw] font-[packardAntique]">
        {state.raceType}
      </p>
    </>
  )
}

function Names() {
  const { state, dispatch } = useSheetContext()

  // Capitalizes all text other than that in parentheses and then wraps all letters 
  // following the first in a span, applying the passed in className
  const transformName = (name: string, className: string) => {
    if (!name) return <p></p>

    const formattedName = name.split(' ').map((word, index) => {
      // Preserve the case for text inside parentheses
      if (word.startsWith('(')) {
        return <span key={index}>{word} </span>
      }

      const firstLetter = word[0].toUpperCase()
      const restOfLetters = word.slice(1).toUpperCase()
      
      return <span key={index}>{firstLetter}<span className={className}>{restOfLetters} </span></span>
    })

    return (
      <>
        {formattedName}
      </>
    )
  }

  return (
    <>
      <p className="absolute top-[9.5cqw] left-[45cqw] text-[5cqw] font-[packardAntique] font-bold tracking-[0.1cqw]">
        {transformName(state.romajiName1, "text-[3.8cqw]")}
      </p>
      <p className="absolute top-[14.5cqw] left-[45cqw] text-[5cqw] font-[packardAntique] font-bold tracking-[0.1cqw]">
        {transformName(state.romajiName2, "text-[3.8cqw]")}
      </p>
      <p className="absolute top-[18cqw] left-[45cqw] text-[1.85cqw] font-[packardAntique]">
        {state.romajiSecondaryName}
      </p>
      <p className="absolute top-[20.8cqw] left-[45cqw] text-[3cqw] font-[shipporiMincho] tracking-[-0.4cqw]">
        {state.katakanaName}
      </p>
      <p className="absolute top-[25.3cqw] left-[45cqw] text-[1cqw] font-[shipporiMincho] tracking-[-0.1cqw]">
        {state.katakanaSecondaryName}
      </p>
    </>
  )
}

function Epithet() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Position() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Residence() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Alignment() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Racials() {
  const { state, dispatch } = useSheetContext()
  
  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Classes() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function LevelsData() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

function Stats() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[1cqw] left-[1cqw] text-[1cqw] font-[]">
        {}
      </p>
    </>
  )
}

export function TextFieldsRenderer() {
  return (
    <div className="@container w-full h-full">
      <Header />
      <Names />
      <Epithet />
      <Position />
      <Residence />
      <Alignment />
      <Racials />
      <Classes />
      <LevelsData />
      <Stats />
    </div>
  )
}
