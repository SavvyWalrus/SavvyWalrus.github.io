import { Checkbox } from "@/components/ui/checkbox"
import { SheetArrayFields, SheetState, useSheetContext } from "./sheet-context"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import localFont from 'next/font/local'

export const packardAntique = localFont({
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

export const shipporiMincho = localFont({
  src: '../../fonts/ShipporiMinchoB1-ExtraBold.ttf'
})

export const calistoMT = localFont({
  src: '../../fonts/CALIST.ttf'
})

export const OPTIPaulDavid = localFont({
  src: '../../fonts/OPTIPaulDavid.otf'
})

export const deepdeneRoman = localFont({
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
      className="ease-in-out duration-250"
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
  checkbox,
  field,
  index,
  min=0,
  max,
  placeholder,
  classname,
  style
} : {
  type: string,
  checkbox?: boolean,
  field: keyof SheetState | SheetArrayFields,
  index?: number
  min?: number,
  max?: number,
  placeholder?: string,
  classname?: string,
  style?: object
}) {
  const { state, dispatch } = useSheetContext()

  const isArrayField = (key: keyof SheetState): key is SheetArrayFields =>
    ["raceClasses", "jobClasses", "raceLevels", "jobLevels"].includes(key)

  return (
    checkbox ?
      <Checkbox
        checked={state[field] as boolean}
        className={cn("!bg-white", classname)}
        style={style}
        onCheckedChange={() =>
          dispatch({
            type: "SET_FIELD",
            payload: { key: field, value: !state[field] }
          })
        }
      />
      :
      <Input 
        type={type}
        placeholder={placeholder}
        className={cn("!bg-white !text-[1.7cqw]", classname)}
        value={
          index !== undefined
            ? (state[field] as string[] | number[])[index]
            : (state[field] as number | string)
        }
        min={min}
        max={max}
        style={style}
        onChange={(e) => {
          const raw = e.target.value
          const value = type === "number" ? Number(raw) : raw
          
          if (max && typeof value === "number" && value > max) {
            return
          }

          if (index !== undefined && isArrayField(field)) {
            dispatch({
              type: "SET_FIELD_INDEX",
              payload: { key: field, index: index, value: value }
            })
          } else {
            dispatch({
              type: "SET_FIELD",
              payload: { key: field, value: value }
            })
          }
        }}
      />
  )
}

function Header({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

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
          <p
            className="absolute top-[7.5cqw] left-[14cqw] text-[1.6cqw]"
            style={packardAntique.style}
          >
            {state.sheetType}
          </p>
      }
      {
        edit ?
          <InputField
            type="number"
            placeholder="Sheet Num..."
            field="sheetNum"
            classname="absolute top-[5.5cqw] left-[27cqw] w-[11cqw] h-[4cqw]" 
          />
          :
          <p
            className="absolute top-[2cqw] left-[27cqw] text-[7cqw] tracking-[-0.8cqw]"
            style={OPTIPaulDavid.style}
          >
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
          <p
            className="absolute top-[10.2cqw] left-[75.8cqw] text-[1.9cqw]"
            style={packardAntique.style}
          >
            {state.raceType}
          </p>
      }
    </>
  )
}

function Names({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

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
          <p
            className="absolute top-[9.5cqw] left-[45cqw] text-[4.3cqw] font-bold tracking-[0.1cqw]"
            style={packardAntique.style}
          >
            {transformName(state.romajiName1, "text-[3.1cqw]")}
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
          <p
            className="absolute top-[14.5cqw] left-[45cqw] text-[4.3cqw] font-bold tracking-[0.1cqw]"
            style={packardAntique.style}
          >
            {transformName(state.romajiName2, "text-[3.1cqw]")}
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
          <p
            className="absolute top-[18.5cqw] left-[45cqw] text-[1.95cqw]"
            style={packardAntique.style}
          >
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
          <p
            className="absolute top-[20.8cqw] left-[45cqw] text-[2.6cqw] tracking-[-0.4cqw]"
            style={shipporiMincho.style}
          >
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
          <p
            className="absolute top-[25.2cqw] left-[45cqw] text-[1.3cqw] tracking-[-0.21cqw]"
            style={shipporiMincho.style}
          >
            {state.katakanaSecondaryName}
          </p>
      }
    </>
  )
}

function Epithet({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

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
          <p
            className="absolute top-[27.5cqw] left-[45cqw] text-[3cqw] tracking-[0.1cqw]"
            style={packardAntique.style}
          >
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
          <p
            className="absolute top-[31.5cqw] left-[45cqw] text-[3cqw] tracking-[0.1cqw]"
            style={packardAntique.style}
          >
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
          <p
            className="absolute top-[35.5cqw] left-[45cqw] text-[3cqw] tracking-[0.1cqw]"
            style={packardAntique.style}
          >
            {state.epithet3}
          </p>
      }
    </>
  )
}

function Position({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  return (
    <>
      {
        edit ? 
          <></> 
          : 
          <p
            className="absolute top-[44cqw] left-[45cqw] text-[1.4cqw]"
            style={deepdeneRoman.style}
          >
            Position
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Position 1..."
            field="position1"
            classname="absolute top-[43.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p
            className="absolute top-[44cqw] left-[55.7cqw] text-[1.4cqw] tracking-[0.02cqw]"
            style={deepdeneRoman.style}
          >
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
          <p
            className="absolute top-[46cqw] left-[55.7cqw] text-[1.4cqw] tracking-[0.02cqw]"
            style={deepdeneRoman.style}
          >
            {state.position2}
          </p>
      }
    </>
  )
}

function Residence({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  return (
    <>
      {
        edit ? 
          <></> 
          : 
          <p
            className="absolute top-[51cqw] left-[45cqw] text-[1.4cqw]"
            style={deepdeneRoman.style}
          >
            Residence 
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Residence 1..."
            field="residence1"
            classname="absolute top-[50.6cqw] left-[55.7cqw] w-[37.5cqw] h-[2.7cqw]"
          />
          :
          <p
            className="absolute top-[51cqw] left-[55.7cqw] text-[1.4cqw] tracking-[0.02cqw]"
            style={deepdeneRoman.style}
          >
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
          <p
            className="absolute top-[53cqw] left-[55.7cqw] text-[1.4cqw] tracking-[0.02cqw]"
            style={deepdeneRoman.style}
          >
            {state.residence2}
          </p>
      }
    </>
  )
}

function Alignment({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  return (
    <>
      {
        edit ? 
          <></> 
          : 
          <p
            className="absolute top-[57.9cqw] left-[45cqw] text-[1.4cqw]"
            style={deepdeneRoman.style}
          >
            Alignment 
          </p>
      }
      {
        edit ?
          <InputField
            type="text"
            placeholder="Alignment..."
            field="alignmentText"
            classname="absolute top-[57.6cqw] left-[55.7cqw] w-[14cqw] h-[2.7cqw]"
          />
          :
          <p
            className="absolute top-[57.9cqw] left-[55cqw] text-[1.4cqw] tracking-[0.02cqw] bg-[#eae5e2] px-1"
            style={deepdeneRoman.style}
          >
            {state.alignmentText}
          </p>
      }
      {
        edit ?
          <InputField
            type="number"
            min={-500}
            max={500}
            placeholder="Karma..."
            field="karmaValue"
            classname="absolute top-[57.6cqw] left-[72.7cqw] w-[12.5cqw] h-[2.7cqw] z-1"
          />
          :
          <p
            className="absolute top-[57.9cqw] left-[73cqw] text-[1.4cqw] tracking-[0.02cqw] bg-[#eae5e2] px-1"
            style={deepdeneRoman.style}
          >
            <RaisedBracket>[</RaisedBracket>Karma Value: {state.karmaValue}<RaisedBracket>]</RaisedBracket>
          </p>
      }
    </>
  )
}

function Racials({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()
  
  return (
    <>
      {
        edit ? 
          <>
            <p
              className="absolute top-[62.5cqw] left-[45cqw] text-[2cqw]"
              style={deepdeneRoman.style}
            >
              Visible Racial Levels:
            </p> 
            <InputField
              type="number"
              field="visibleRacialClasses"
              classname="absolute top-[62.7cqw] left-[62cqw] w-[10cqw] h-[2.7cqw] z-2"
              min={0}
              max={8}
            />
          </>
          : 
          (
            state.visibleRacialClasses > 0 ?
              <p
                className="absolute top-[62.5cqw] left-[45cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                Racial Levels
              </p>
              :
              <></>
          )
      }

      {/* Builds entries based on value of 'visibleRacialClasses' */}
      {Array.from({ length: state.visibleRacialClasses }, (_, index) => {
        const classTop = 62.5 + (3.78 * index)
        const levelTop = 61.3 + (3.78 * index)
        const paddingLeft = index > 0 ? 3 : 1
        const leftOffset = paddingLeft > 1 ? 52.65 : 54.65
        
        return (
            edit ?
              <div key={`racial-class-edit-${index}`}>
                <InputField
                  type="text"
                  placeholder={`Racial Class ${index}...`}
                  field="raceClasses"
                  index={index}
                  classname="absolute left-[44cqw] w-[16cqw] h-[2.7cqw] z-2"
                  style={{
                    top: `${classTop * 0.8 + 15.6}cqw`
                  }}
                />
                <InputField
                  type="number"
                  min={0}
                  max={99}
                  field="raceLevels"
                  index={index}
                  classname="absolute left-[60.3cqw] w-[11cqw] h-[2.7cqw] z-2"
                  style={{
                    top: `${classTop * 0.8 + 15.6}cqw`
                  }}
                />
              </div>
              :
              <div key={`racial-class-${index}`}>
                <p 
                  className={`absolute text-[1.4cqw] tracking-[0.02cqw] bg-[#eae5e2] px-1`}
                  style={{
                    ...deepdeneRoman.style,
                    top: `${classTop}cqw`,
                    paddingLeft: `${paddingLeft}cqw`,
                    left: `${leftOffset}cqw`
                  }}
                >
                  {state.raceClasses[index]}
                </p>
                <p
                  className={`absolute left-[79.5cqw] [word-spacing:-0.5cqw] leading-[3cqw] bg-[#eae5e2] px-1`}
                  style={{
                    ...OPTIPaulDavid.style,
                    top: `${levelTop}cqw`
                  }}
                >
                  {state.raceLevels[index] > 0 ? <><span className="text-[3.3cqw] tracking-[-0.1cqw]">lvl </span><span className="text-[6cqw] tracking-[-0.8cqw]">{state.raceLevels[index]}</span></> : <></>}
                </p>
              </div>
        )
      })}

      {
        !edit ? (() => {
          const othersTop = 61.6 + (3.78 * state.visibleRacialClasses)

          return (
            <>
              {
                state.visibleRacialClasses > 0 && state.raceLevels[0] > 0 ?
                  <p
                    className="absolute left-[52cqw] text-[1.4cqw] bg-[#eae5e2] text-[#eae5e2] z-1"
                    style={{
                      top: `${othersTop}cqw`
                    }}
                  >
                    ■■■■■■■■■■■■■■■■■■■■■■■
                  </p>
                  :
                  <></>
              }
              {
                state.visibleRacialClasses > 0 && state.raceOthers ?
                  <p
                    className="absolute left-[55.65cqw] text-[1.2cqw] bg-[#eae5e2] z-2"
                    style={{
                      ...deepdeneRoman.style,
                      top: `${othersTop}cqw`
                    }}
                  >
                    Others
                  </p> : <></>
              }
            </>
          )
        })() : <></>
      }

      {
        edit ?
          <>
            <p
              className="absolute left-[45cqw] text-[2cqw]"
              style={{
                ...deepdeneRoman.style,
                top: `${65.5 + (3.4 * state.visibleRacialClasses) - (0.4 * state.visibleRacialClasses)}cqw`
              }}
            >
              Others:
            </p>
            <InputField
              type=""
              checkbox={true}
              field="raceOthers"
              classname="absolute left-[51.5cqw]"
              style={{
                top: `${66 + (3.4 * state.visibleRacialClasses) - (0.4 * state.visibleRacialClasses)}cqw`
              }}
            />
          </>
          :
          <></>
      }

      {/* Hides template lines depending on if visibleJobClasses > 0 */}
      {!edit && state.visibleJobClasses === 0 ? Array.from({ length: (8 - state.visibleRacialClasses)}, (_, index) => {
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
  )
}

function Classes({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()
  const classTopOffset = state.visibleRacialClasses > 0 && state.raceLevels[0] > 0 ? 62.5 + (3.78 * (1 + state.visibleRacialClasses)) : 62.5 + (3.78 * state.visibleRacialClasses)
  const levelTopOffset = state.visibleRacialClasses > 0 && state.raceLevels[0] > 0 ? 61.3 + (3.78 * (1 + state.visibleRacialClasses)) : 61.3 + (3.78 * state.visibleRacialClasses)
  const totalFilledClasses = state.visibleJobClasses + state.visibleRacialClasses + (state.visibleRacialClasses > 0 ? 1 : 0) + (state.jobOthers ? 1 : 0)

  return (
    <>
      {
        edit ? 
          <>
            <p
              className="absolute top-[62.5cqw] left-[72.8cqw] text-[2cqw]"
              style={deepdeneRoman.style}
            >
              Visible Racial Levels:
            </p>
            <InputField
              type="number"
              field="visibleJobClasses"
              classname="absolute top-[62.7cqw] left-[90cqw] w-[10cqw] h-[2.7cqw] z-2"
              min={0}
              max={8}
            />
          </>
          : 
          (
            state.visibleJobClasses > 0 ?
              <p
                className="absolute left-[45cqw] text-[1.4cqw]"
                style={{
                  ...deepdeneRoman.style,
                  top: `${classTopOffset}cqw`
                }}
              >
                Class Levels
              </p>
              :
              <></>
          )
      }

      {/* Builds entries based on value of 'visibleJobClasses' */}
      {Array.from({ length: state.visibleJobClasses }, (_, index) => {
        const classTop = classTopOffset + (3.78 * index)
        const levelTop = levelTopOffset + (3.78 * index)
        const paddingLeft = index > 0 ? 3 : 1
        const leftOffset = paddingLeft > 1 ? 52.65 : 54.65
        
        return (
          edit ?
            <div key={`job-class-edit-${index}`}>
              <InputField
                type="text"
                placeholder={`Job Class ${index}...`}
                field="jobClasses"
                index={index}
                classname="absolute left-[71.8cqw] w-[17cqw] h-[2.7cqw] z-2"
                style={{
                  top: `${(62.5 + (3.78 * index)) * 0.8 + 15.6}cqw`
                }}
              />
              <InputField
                type="number"
                min={0}
                max={99}
                field="jobLevels"
                index={index}
                classname="absolute left-[89cqw] w-[11cqw] h-[2.7cqw] z-2"
                style={{
                  top: `${(62.5 + (3.78 * index)) * 0.8 + 15.6}cqw`
                }}
              />
            </div>
            :
            <div key={`job-class-${index}`}>
              <p 
                className={`absolute text-[1.4cqw] tracking-[0.02cqw] bg-[#eae5e2] px-1`}
                style={{
                  ...deepdeneRoman.style,
                  top: `${classTop}cqw`,
                  paddingLeft: `${paddingLeft}cqw`,
                  left: `${leftOffset}cqw`
                }}
              >
                {state.jobClasses[index]}
              </p>
              <p
                className={`absolute left-[79.5cqw] [word-spacing:-0.5cqw] leading-[3cqw] bg-[#eae5e2] px-1`}
                style={{
                  ...OPTIPaulDavid.style,
                  top: `${levelTop}cqw`
                }}
              >
                {state.jobLevels[index] > 0 ? <><span className="text-[3.3cqw] tracking-[-0.1cqw]">lvl </span><span className="text-[6cqw] tracking-[-0.8cqw]">{state.jobLevels[index]}</span></> : <></>}
              </p>
            </div>
        )
      })}

      {
        !edit && state.jobOthers ? (() => {
          let othersTopOffset

          if (state.visibleRacialClasses > 0) {
            othersTopOffset = 61.6 + (3.78 * ((state.raceLevels[0] > 0 ? 1 : 0) + state.visibleRacialClasses + state.visibleJobClasses))
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
                className="absolute left-[55.65cqw] text-[1.2cqw] bg-[#eae5e2] z-2"
                style={{
                  ...deepdeneRoman.style,
                  top: `${othersTopOffset}cqw`
                }}
              >
                Others
              </p>
            </>
          )
        })() : <></>
      }

      {
        edit ?
          <>
            <p
              className="absolute left-[72.8cqw] text-[2cqw]"
              style={{
                ...deepdeneRoman.style,
                top: `${65.5 + (3.4 * state.visibleJobClasses) - (0.4 * state.visibleJobClasses)}cqw`
              }}
            >
              Others:
            </p>
            <InputField
              type=""
              checkbox={true}
              field="jobOthers"
              classname="absolute left-[79.2cqw]"
              style={{
                top: `${66 + (3.4 * state.visibleJobClasses) - (0.4 * state.visibleJobClasses)}cqw`
              }}
            />
          </>
          :
          <></>
      }

      {/* Hides template lines depending on visibleRacialClasses, visibleJobClasses, and if they show others */}
      {!edit && Array.from({ length: (8 - totalFilledClasses + (state.raceLevels[0] > 0 ? 0 : 1))}, (_, index) => {
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
  )
}

function LevelsData({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  if (state.template.includes("Humanoid")) {
    return <>
        {
          edit ?
            <>
              <InputField
                type="number"
                field="totalJobLevels"
                classname="absolute top-[97cqw] left-[86.5cqw] h-[4cqw] w-[11cqw]"
              />
            </>
            :
            <>
              <p
                className="absolute top-[96.2cqw] left-[56.4cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                Class Levels
              </p>
              <p
                className="absolute top-[99.2cqw] left-[55.2cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                {state.totalJobLevels} acquired total
              </p>
            </>
        }
        <div className="job-level-bar absolute top-[98.35cqw] left-[55.03cqw] max-w-[30.95cqw] overflow-hidden">
          <StatBar height={0.85} color="#03a5a8" lengthAtOneHundred={30.95} val={state.totalJobLevels} />
        </div>
      </>
  } else {
    return (
      <>
        {
          edit ?
            <>
              <InputField
                type="number"
                field="totalRaceLevels"
                classname="absolute top-[97cqw] left-[43.9cqw] h-[4cqw] w-[11cqw]"
              />
              <InputField
                type="number"
                field="totalJobLevels"
                classname="absolute top-[97cqw] left-[86.5cqw] h-[4cqw] w-[11cqw]"
              />
            </>
            :
            <>
              <p
                className="absolute top-[93.8cqw] left-[55cqw] text-[1.5cqw] [word-spacing:0.1cqw] tracking-[0.01cqw]"
                style={deepdeneRoman.style}
              >
                <RaisedBracket>[</RaisedBracket>Racial Levels<RaisedBracket>]</RaisedBracket> + <RaisedBracket>[</RaisedBracket>Class Levels<RaisedBracket>]</RaisedBracket> = {state.totalLevels} Total Levels
              </p>
              <p
                className="absolute top-[96.2cqw] left-[56.4cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                Racial Levels
              </p>
              <p
                className="absolute top-[96.2cqw] left-[77.9cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                Class Levels
              </p>
              <p
                className="absolute top-[99.2cqw] left-[55.2cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                {state.totalRaceLevels} acquired total
              </p>
              <p
                className="absolute top-[99.2cqw] right-[13.95cqw] text-[1.4cqw]"
                style={deepdeneRoman.style}
              >
                {state.totalJobLevels} acquired total
              </p>
            </>
        }
        <div className="racial-level-bar absolute top-[98.35cqw] left-[55.03cqw] max-w-[30.95cqw] overflow-hidden">
          <StatBar height={0.85} color="#af5845" lengthAtOneHundred={30.95} val={state.totalRaceLevels} />
        </div>
        <div className="job-level-bar absolute top-[98.35cqw] right-[14.02cqw] max-w-[30.95cqw] overflow-hidden">
          <StatBar height={0.85} color="#03a5a8" lengthAtOneHundred={30.95} val={state.totalJobLevels} />
        </div>
      </>
    )
  }
}

function Stats({ edit } : { edit?: boolean }) {
  const { state } = useSheetContext()

  return (
    edit ?
      <>
        <InputField
          type="number"
          field="HP"
          classname="job-level-bar absolute top-[105cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="MP"
          classname="job-level-bar absolute top-[108.8cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="physicalAttack"
          classname="job-level-bar absolute top-[112.5cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="physicalDefense"
          classname="job-level-bar absolute top-[116.3cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="agility"
          classname="job-level-bar absolute top-[120cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="magicAttack"
          classname="job-level-bar absolute top-[123.8cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="magicDefense"
          classname="job-level-bar absolute top-[127.6cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="resistance"
          classname="job-level-bar absolute top-[131.4cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
        <InputField
          type="number"
          field="special"
          classname="job-level-bar absolute top-[135.1cqw] left-[36.1cqw] h-[3cqw] w-[11cqw]"
        />
      </>
      :
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
      <Stats edit={edit} />
    </div>
  )
}
