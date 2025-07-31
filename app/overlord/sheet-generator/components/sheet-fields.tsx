import { SheetState, useSheetContext } from "./sheet-context"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
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

// Deepdene Roman's brackets are too low, so wrapping them with this component raises them by the specified amount
function RaisedBracket({ children }: { children: string }) {
  return <span className="relative top-[-0.18cqw]">{children}</span>
}

function StatBar({
  height,
  color,
  lengthAtOneHundred,
  val
} : {
  height: number,
  color: string,
  lengthAtOneHundred: number,
  val: number
}) {
  const mult = val / 100

  return (
    <div
      style={{
        height: `${height}cqw`,
        width: `${mult * lengthAtOneHundred}cqw`,
        backgroundColor: color,
      }}
    />
  )
}

function InputField({
  type,
  field,
  placeholder,
  classname,
} : {
  type: string,
  field: keyof SheetState,
  placeholder?: string,
  classname?: string,
}) {
  const { state, dispatch } = useSheetContext()

  return (
    <Input 
      type={type}
      placeholder={placeholder}
      className={cn("!bg-white !text-[1.7cqw]", classname)}
      value={state[field] as string | number}
      min={0}
      onChange={(val) => {
        dispatch({ type: "SET_FIELD", payload: { key: field, value: val.target.value } })
      }}
    />
  )
}

function Header({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      {
        edit ? 
          <InputField 
            type="text" 
            placeholder="Sheet Type..." 
            field="sheetType" 
            classname="absolute top-[5.5cqw] left-[14cqw] w-[12.5cqw] h-[4cqw]" 
          /> 
          : 
          <p className="absolute top-[7.5cqw] left-[14cqw] text-[1.6cqw] font-[packardAntique]">
            {state.sheetType}
          </p>
      }
      {
        edit ?
          <InputField
            type="number"
            placeholder="Sheet Num..."
            field="sheetNum"
            classname="absolute top-[5.5cqw] left-[27cqw] w-[9cqw] h-[4cqw]" 
          />
          :
          <p className="absolute top-[2cqw] left-[27cqw] text-[7cqw] font-[OPTIPaulDavid] tracking-[-0.8cqw]">
            {state.sheetNum}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Race..."
            field="raceType"
            classname="absolute top-[10.2cqw] left-[75.8cqw] w-[14cqw] h-[4cqw]"
          />
          :
          <p className="absolute top-[10.2cqw] left-[75.8cqw] text-[1.9cqw] font-[packardAntique]">
            {state.raceType}
          </p>
      }
    </>
  )
}

function Names({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  // Capitalizes all text other than that in parentheses and then wraps all letters 
  // following the first in a span, applying the passed in className
  const transformName = (name: string, className: string) => {
    if (!name) return <></>

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
      {
        edit ?
          <InputField
            type="text"
            placeholder="Romaji Name 1..."
            field="romajiName1"
            classname="absolute top-[10.4cqw] left-[45cqw] w-[29.5cqw] h-[3cqw]"
          />
          :
          <p className="absolute top-[9.5cqw] left-[45cqw] text-[5cqw] font-[packardAntique] font-bold tracking-[0.1cqw]">
            {transformName(state.romajiName1, "text-[3.8cqw]")}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Romaji Name 2..."
            field="romajiName2"
            classname="absolute top-[14cqw] left-[45cqw] w-[29.5cqw] h-[3cqw]"
          />
          :
          <p className="absolute top-[14.5cqw] left-[45cqw] text-[5cqw] font-[packardAntique] font-bold tracking-[0.1cqw]">
            {transformName(state.romajiName2, "text-[3.8cqw]")}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Romaji Secondary Name..."
            field="romajiSecondaryName"
            classname="absolute top-[17.6cqw] left-[45cqw] w-[29.5cqw] h-[3cqw]"
          />
          :
          <p className="absolute top-[18cqw] left-[45cqw] text-[1.85cqw] font-[packardAntique]">
            {state.romajiSecondaryName}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Katakana Name..."
            field="katakanaName"
            classname="absolute top-[21.5cqw] left-[45cqw] w-[29.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[20.8cqw] left-[45cqw] text-[3cqw] font-[shipporiMincho] tracking-[-0.4cqw]">
            {state.katakanaName}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Katakana Secondary Name..."
            field="katakanaSecondaryName"
            classname="absolute top-[24.3cqw] left-[45cqw] w-[29.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[25.3cqw] left-[45cqw] text-[1cqw] font-[shipporiMincho] tracking-[-0.1cqw]">
            {state.katakanaSecondaryName}
          </p>
      }
    </>
  )
}

function Epithet({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      {
        edit ?
          <InputField
            type="text"
            placeholder="Epithet 1..."
            field="epithet1"
            classname="absolute top-[28cqw] left-[45cqw] w-[29.5cqw] h-[4cqw]"
          />
          :
          <p className="absolute top-[27.5cqw] left-[45cqw] text-[3cqw] font-[packardAntique] tracking-[0.1cqw]">
            {state.epithet1}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Epithet 2..."
            field="epithet2"
            classname="absolute top-[32.5cqw] left-[45cqw] w-[29.5cqw] h-[4cqw]"
          />
          :
          <p className="absolute top-[31.5cqw] left-[45cqw] text-[3cqw] font-[packardAntique] tracking-[0.1cqw]">
            {state.epithet2}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Epithet 3..."
            field="epithet3"
            classname="absolute top-[37cqw] left-[45cqw] w-[29.5cqw] h-[4cqw]"
          />
          :
          <p className="absolute top-[35.5cqw] left-[45cqw] text-[3cqw] font-[packardAntique] tracking-[0.1cqw]">
            {state.epithet3}
          </p>
      }
    </>
  )
}

function Position({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[44cqw] left-[45cqw] text-[1.4cqw] font-[deepdeneRoman]">
        Position 
      </p>
      {
        edit ?
          <InputField
            type="text"
            placeholder="Position 1..."
            field="position1"
            classname="absolute top-[43.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[44cqw] left-[55.7cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw]">
            {state.position1}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Position 2..."
            field="position2"
            classname="absolute top-[46.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[46cqw] left-[55.7cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw]">
            {state.position2}
          </p>
      }
    </>
  )
}

function Residence({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[51cqw] left-[45cqw] text-[1.4cqw] font-[deepdeneRoman]">
        Residence 
      </p>
      {
        edit ?
          <InputField
            type="text"
            placeholder="Residence 1..."
            field="residence1"
            classname="absolute top-[50.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[51cqw] left-[55.7cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw]">
            {state.residence1}
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Residence 2..."
            field="residence2"
            classname="absolute top-[53.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p className="absolute top-[53cqw] left-[55.7cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw]">
            {state.residence2}
          </p>
      }
    </>
  )
}

function Alignment({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <p className="absolute top-[57.9cqw] left-[45cqw] text-[1.4cqw] font-[deepdeneRoman]">
        Alignment 
      </p>
      <p className="absolute top-[57.9cqw] left-[55cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw] bg-[#eae5e2] px-1">
        {state.alignmentText}
      </p>
      <p className="absolute top-[57.9cqw] left-[73cqw] text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw] bg-[#eae5e2] px-1">
        <RaisedBracket>[</RaisedBracket>Karma Value: {state.karmaValue}<RaisedBracket>]</RaisedBracket>
      </p>
    </>
  )
}

function Racials({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()
  
  return (
    state.visibleRacialClasses ? 
      <>
        <p className="absolute top-[62.5cqw] left-[45cqw] text-[1.4cqw] font-[deepdeneRoman]">
          Racial Levels
        </p>

        {/* Builds entries based on value of 'visibleRacialClasses' */}
        {Array.from({ length: state.visibleRacialClasses }, (_, index) => {
          const classTop = 62.5 + (3.78 * index)
          const levelTop = 61.3 + (3.78 * index)
          const paddingLeft = index > 0 ? 3 : 1
          const leftOffset = paddingLeft > 1 ? 52.65 : 54.65
          
          return (
            <div key={`racial-class-${index}`}>
              <p 
                className={`absolute text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw] bg-[#eae5e2] px-1`}
                style={{
                  top: `${classTop}cqw`,
                  paddingLeft: `${paddingLeft}cqw`,
                  left: `${leftOffset}cqw`
                }}
              >
                {state.raceClasses[index]}
              </p>
              <p
                className={`absolute left-[79.5cqw] font-[OPTIPaulDavid] [word-spacing:-0.5cqw] leading-[3cqw] bg-[#eae5e2] px-1`}
                style={{
                  top: `${levelTop}cqw`
                }}
              >
                {state.raceLevels[index] > 0 ? <><span className="text-[2.7cqw] tracking-[-0.1cqw]">lvl </span><span className="text-[5cqw] tracking-[-0.8cqw]">{state.raceLevels[index]}</span></> : <></>}
              </p>
            </div>
          )
        })}

        {state.raceOthers ? (() => {
          const othersTop = 61.6 + (3.78 * state.visibleRacialClasses)

          return (
            <>
              <p
                className="absolute left-[52cqw] text-[1.4cqw] bg-[#eae5e2] text-[#eae5e2] z-1"
                style={{
                  top: `${othersTop}cqw`
                }}
              >
                ■■■■■■■■■■■■■■■■■■■■■■■
              </p>
              <p
                className="absolute left-[55.65cqw] text-[1.2cqw] font-[deepdeneRoman] bg-[#eae5e2] z-2"
                style={{
                  top: `${othersTop}cqw`
                }}
              >
                Others
              </p>
            </>
          )
        })() : <></>}

        {/* Hides template lines depending on if visibleJobClasses > 0 */}
        {state.visibleJobClasses === 0 ? Array.from({ length: (8 - state.visibleRacialClasses)}, (_, index) => {
          const maskTop = 62.5 + (3.78 * (7 - index))
          
          return (
            <p
              className="absolute left-[52cqw] text-[1.4cqw] bg-[#eae5e2] text-[#eae5e2]"
              style={{
                top: `${maskTop}cqw`
              }}
              key={`racial-mask-${index}`}
            >
              ■■■■■■■■■■■■■■■■■■■■■■■
            </p>
          )
        }) : <></>}
      </> 
    : <></>
  )
}

function Classes({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()
  const classTopOffset = state.visibleRacialClasses && state.raceOthers ? 62.5 + (3.78 * (1 + state.visibleRacialClasses)) : 62.5 + (3.78 * state.visibleRacialClasses)
  const levelTopOffset = state.visibleRacialClasses && state.raceOthers ? 61.3 + (3.78 * (1 + state.visibleRacialClasses)) : 61.3 + (3.78 * state.visibleRacialClasses)
  const totalFilledClasses = state.visibleJobClasses + state.visibleRacialClasses + (state.visibleRacialClasses > 0 && state.raceOthers ? 1 : 0) + (state.jobOthers ? 1 : 0)

  return (
    state.visibleJobClasses ?
      <>
        <p
          className="absolute left-[45cqw] text-[1.4cqw] font-[deepdeneRoman]"
          style={{
            top: `${classTopOffset}cqw`
          }}
        >
          Class Levels
        </p>

        {/* Builds entries based on value of 'visibleJobClasses' */}
        {Array.from({ length: state.visibleJobClasses }, (_, index) => {
          const classTop = classTopOffset + (3.78 * index)
          const levelTop = levelTopOffset + (3.78 * index)
          const paddingLeft = index > 0 ? 3 : 1
          const leftOffset = paddingLeft > 1 ? 52.65 : 54.65
          
          return (
            <div key={`job-class-${index}`}>
              <p 
                className={`absolute text-[1.4cqw] font-[deepdeneRoman] tracking-[0.02cqw] bg-[#eae5e2] px-1`}
                style={{
                  top: `${classTop}cqw`,
                  paddingLeft: `${paddingLeft}cqw`,
                  left: `${leftOffset}cqw`
                }}
              >
                {state.jobClasses[index]}
              </p>
              <p
                className={`absolute left-[79.5cqw] font-[OPTIPaulDavid] [word-spacing:-0.5cqw] leading-[3cqw] bg-[#eae5e2] px-1`}
                style={{
                  top: `${levelTop}cqw`
                }}
              >
                {state.jobLevels[index] > 0 ? <><span className="text-[2.7cqw] tracking-[-0.1cqw]">lvl </span><span className="text-[5cqw] tracking-[-0.8cqw]">{state.jobLevels[index]}</span></> : <></>}
              </p>
            </div>
          )
        })}

        {state.jobOthers ? (() => {
          let othersTopOffset

          if (state.visibleRacialClasses > 0) {
            othersTopOffset = state.raceOthers ? 61.6 + (3.78 * (1 + state.visibleRacialClasses + state.visibleJobClasses)) : 61.6 + (3.78 * (state.visibleRacialClasses + state.visibleJobClasses))
          } else {
            othersTopOffset = 61.6 + (3.78 * state.visibleJobClasses)
          }

          return (
            <>
              <p
                className="absolute left-[52cqw] text-[1.4cqw] bg-[#eae5e2] text-[#eae5e2] z-1"
                style={{
                  top: `${othersTopOffset}cqw`
                }}
              >
                ■■■■■■■■■■■■■■■■■■■■■■■
              </p>
              <p
                className="absolute left-[55.65cqw] text-[1.2cqw] font-[deepdeneRoman] bg-[#eae5e2] z-2"
                style={{
                  top: `${othersTopOffset}cqw`
                }}
              >
                Others
              </p>
            </>
          )
        })() : <></>}

        {/* Hides template lines depending on visibleRacialClasses, visibleJobClasses, and if they show others */}
        {Array.from({ length: (8 - totalFilledClasses)}, (_, index) => {
          const maskTop = 62.5 + (3.78 * (7 - index))
          
          return (
            <p
              className="absolute left-[52cqw] text-[1.4cqw] bg-[#eae5e2] text-[#eae5e2]"
              style={{
                top: `${maskTop}cqw`
              }}
              key={`racial-mask-${index}`}
            >
              ■■■■■■■■■■■■■■■■■■■■■■■
            </p>
          )
        })}
      </>
    : <></>
  )
}

function LevelsData({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  if (state.template.includes("Humanoid")) {
    return <></>
  } else {
    return (
      <>
        <p className="absolute top-[94.2cqw] left-[55.2cqw] text-[1.4cqw] font-[deepdeneRoman] [word-spacing:0.2cqw] tracking-[0.02cqw]">
          <RaisedBracket>[</RaisedBracket>Racial Levels<RaisedBracket>]</RaisedBracket> + <RaisedBracket>[</RaisedBracket>Class Levels<RaisedBracket>]</RaisedBracket> = {state.totalLevels} Total Levels
        </p>
        <p className="absolute top-[96.2cqw] left-[56.4cqw] text-[1.4cqw] font-[deepdeneRoman]">
          Racial Levels
        </p>
        <p className="absolute top-[96.2cqw] left-[77.9cqw] text-[1.4cqw] font-[deepdeneRoman]">
          Class Levels
        </p>
        <p className="absolute top-[99.2cqw] left-[55.2cqw] text-[1.4cqw] font-[deepdeneRoman]">
          {state.totalRaceLevels} acquired total
        </p>
        <p className="absolute top-[99.2cqw] right-[13.95cqw] text-[1.4cqw] font-[deepdeneRoman]">
          {state.totalJobLevels} acquired total
        </p>
        <div className="racial-level-bar absolute top-[98.35cqw] left-[55.03cqw]">
          <StatBar height={0.85} color="#af5845" lengthAtOneHundred={30.95} val={state.totalRaceLevels} />
        </div>
        <div className="job-level-bar absolute top-[98.35cqw] right-[14.02cqw]">
          <StatBar height={0.85} color="#03a5a8" lengthAtOneHundred={30.95} val={state.totalJobLevels} />
        </div>
      </>
    )
  }
}

function Stats({ edit } : { edit?: boolean }) {
  const { state, dispatch } = useSheetContext()

  return (
    <>
      <div className="job-level-bar absolute top-[105.8cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.HP} />
      </div>
      <div className="job-level-bar absolute top-[109.5cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.MP} />
      </div>
      <div className="job-level-bar absolute top-[113.2cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.physicalAttack} />
      </div>
      <div className="job-level-bar absolute top-[116.9cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.physicalDefense} />
      </div>
      <div className="job-level-bar absolute top-[120.6cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.agility} />
      </div>
      <div className="job-level-bar absolute top-[124.3cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.magicAttack} />
      </div>
      <div className="job-level-bar absolute top-[128cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.magicDefense} />
      </div>
      <div className="job-level-bar absolute top-[131.7cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.resistance} />
      </div>
      <div className="job-level-bar absolute top-[135.4cqw] left-[36.1cqw]">
        <StatBar height={1.6} color="#ac7fa8" lengthAtOneHundred={49.9} val={state.special} />
      </div>
    </>
  )
}

export function FieldsRenderer({ edit } : { edit?: boolean }) {
  return (
    <div className="@container w-full h-full">
      <Header edit={edit} />
      <Names edit={edit} />
      <Epithet edit={edit} />
      <Position edit={edit} />
      <Residence edit={edit} />
      <Alignment edit={edit} />
      <Racials edit={edit} />
      <Classes edit={edit} />
      <LevelsData edit={edit} />
      <Stats />
    </div>
  )
}
