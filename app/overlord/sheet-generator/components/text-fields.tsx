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

  return (
    <>
      
    </>
  )
}

function Epithet() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function Position() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function Residence() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function Alignment() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function Racials() {
  const { state, dispatch } = useSheetContext()
  
  return (
    <>
      
    </>
  )
}

function Classes() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function LevelsData() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
    </>
  )
}

function Stats() {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      
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
