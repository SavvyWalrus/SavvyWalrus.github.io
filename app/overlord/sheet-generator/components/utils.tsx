import { Dispatch, RefObject, SetStateAction, useEffect } from "react"
import { useState } from "react"
import { SheetState, useSheetContext } from "./sheet-context"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Upload } from "lucide-react"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import * as htmlToImage from 'html-to-image'
import "../../styles/fonts.css"

interface Portrait {
  loc: string
  label: string
}

interface Preset {
  loc: string
  label: string
}

const portraits: Portrait[] = [
  {
    loc: "/overlord/portraits/01-Momonga.jpg",
    label: "01 Momonga",
  },
  {
    loc: "/overlord/portraits/02-Albedo.jpg",
    label: "02 Albedo",
  },
  {
    loc: "/overlord/portraits/03-Aura.jpg",
    label: "03 Aura",
  },
  {
    loc: "/overlord/portraits/04-Mare.jpg",
    label: "04 Mare",
  },
  {
    loc: "/overlord/portraits/05-Cocytus.jpg",
    label: "05 Cocytus",
  },
  {
    loc: "/overlord/portraits/06-Demiurge.jpg",
    label: "06 Demiurge",
  },
  {
    loc: "/overlord/portraits/07-Narberal.jpg",
    label: "07 Narberal",
  },
  {
    loc: "/overlord/portraits/09-Yuri.jpg",
    label: "09 Yuri",
  },
  {
    loc: "/overlord/portraits/10-CZ.jpg",
    label: "10 CZ2128",
  },
  {
    loc: "/overlord/portraits/11-Shalltear.jpg",
    label: "11 Shalltear",
  },
  {
    loc: "/overlord/portraits/12-Pandora_s.jpg",
    label: "12 Pandora's Actor",
  },
  {
    loc: "/overlord/portraits/17-Sebas.jpg",
    label: "17 Sebas",
  },
  {
    loc: "/overlord/portraits/18-Solution.jpg",
    label: "18 Solution",
  },
  {
    loc: "/overlord/portraits/23-Victim.jpg",
    label: "23 Victim",
  },
  {
    loc: "/overlord/portraits/24-Entoma.jpg",
    label: "24 Entoma",
  },
  {
    loc: "/overlord/portraits/38-Lupusregina.jpg",
    label: "38 Lupusregina",
  },
]

const presetFilenames: string[] = [
  "Albedo.json",
  "Aura Bella Fiora.json",
  "Cocytus.json",
  "CZ2128 Delta (Δ).json",
  "Demiurge.json",
  "Entoma Vasilissa Zeta (ζ).json",
  "Lupusregina Beta (β).json",
  "Mare Bello Fiore.json",
  "Momonga.json",
  "Narberal Gamma (Γ).json",
  "Pandora's Actor.json",
  "Sebas Tian.json",
  "Shalltear Bloodfallen.json",
  "Solution Epsilon (ε).json",
  "Victim.json",
  "Yuri Alpha (α).json",
]

const presets: Preset[] = presetFilenames.map((filename) => ({
  loc: `/overlord/presets/${filename}`,
  label: filename.replace(".json", ""),
}))

export function PortraitUploader({ classname } : { classname?: string }) {
  const { dispatch } = useSheetContext()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()
  const [options, setOptions] = useState<Portrait[]>(portraits)
  const hiddenFileInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (imageURL) {
      dispatch({
        type: "SET_FIELD",
        payload: { key: "portrait", value: imageURL }
      })
    }
  }, [imageURL, dispatch])

  function updateOptions(loc: string, label: string) {
    const updatedOptions = [
      { loc: loc, label: label },
      ...options
    ]

    setOptions(updatedOptions)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target.files || event.target.files.length < 1) {
      return
    }

    const file = event.target.files[0]
    
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      setImageURL(dataUrl)
      updateOptions(dataUrl, file.name)
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className={cn("absolute top-[0.5cqw] left-[23cqw] z-3", classname)}>
      {
        hiddenFileInput &&
          <input
            type="file"
            ref={hiddenFileInput ? hiddenFileInput as React.Ref<HTMLInputElement> : undefined}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
      }
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={menuOpen}
            className="text-[1.5cqw] w-[25.5cqw] h-[3.7cqw] justify-between"
          >
            <p className="max-w-full truncate">
              {
                imageURL
                  ? options.find((opt) => opt.loc === imageURL)?.label
                  : "Select character portrait..."
              }
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  key={"portrait-upload"}
                  onSelect={() => {
                    setMenuOpen(false)
                    hiddenFileInput?.current?.click()
                  }}
                >
                  Upload Img...
                  <Upload className="ml-auto" />
                </CommandItem>
                <DropdownMenuSeparator />
                {options.map((opt) => (
                  <CommandItem
                    key={opt.loc}
                    value={opt.loc}
                    onSelect={(currentValue) => {
                      setImageURL(currentValue === imageURL ? imageURL : currentValue)
                      setMenuOpen(false)
                    }}
                  >
                    <p
                      className="text-nowrap"
                    >
                      {opt.label}
                    </p>
                    <Check
                      className={cn(
                        "ml-auto",
                        imageURL === opt.loc ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function PresetSelector({ classname } : { classname?: string }) {
  const { preset, setPreset } = useSheetContext()
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className={cn("absolute top-[0.5cqw] left-[2cqw] z-3", classname)}>
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={menuOpen}
            className="text-[1.5cqw] overflow-ellipsis w-[19cqw] h-[3.7cqw] justify-between"
          >
            <p className="max-w-full truncate">
              {
                preset
                  ? presets.find((opt) => opt.loc === preset)?.label
                  : "Select preset..."
              }
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {presets.map((opt) => (
                  <CommandItem
                    key={opt.loc}
                    value={opt.loc}
                    onSelect={(currentValue) => {
                      setPreset(currentValue === preset ? preset : currentValue)
                      setMenuOpen(false)
                    }}
                  >
                    <p
                      className="text-nowrap"
                    >
                      {opt.label}
                    </p>
                    <Check
                      className={cn(
                        "ml-auto",
                        preset === opt.loc ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function EditPortraitToggle({
  editPortrait,
  setEditPortrait
} : {
  editPortrait: boolean
  setEditPortrait: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      className="absolute flex top-[1cqw] right-[1cqw] z-5"
    >
      <p
        className="text-[2.2cqw] font-[DeepdeneRoman]">
        Edit Portrait:
      </p>
      <Checkbox
        checked={editPortrait}
        className="!bg-white mx-[1cqw] my-[0.7cqw]"
        onCheckedChange={() =>
          setEditPortrait(!editPortrait)
        }
      />
    </div>
  )
}

export function SheetDownloader({
  characterSheetRef,
}: {
  characterSheetRef: RefObject<HTMLDivElement | null>
}) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownload = async () => {
    const node = characterSheetRef.current
    if (!node) return

    setLoading(true)

    try {
      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: Math.max(3, window.devicePixelRatio || 1),
        backgroundColor: "#ffffff",
        style: { transform: "none", transformOrigin: "top left" },
        cacheBust: true,
        filter: (n) => !(n instanceof Element && n.hasAttribute("data-no-export")),
      })

      if (!blob) return

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = "character-sheet"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (e) {
      console.error("Download failed:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      data-no-export
      disabled={loading}
      variant="secondary"
      className={cn("text-[1.5cqw] text-ellipsis w-[21.1cqw] h-[3.7cqw] justify-between")}
      onClick={handleDownload}
    >
      <p className="max-w-full truncate mx-auto">Download as Image</p>
    </Button>
  )
}

export function SettingsExporter() {
  const { state } = useSheetContext()
  const [loading, setLoading] = useState<boolean>(false)

  function downloadJSON() {
    setLoading(true)

    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = state.romajiName1
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setLoading(false)
  }

  return (
    <Button
      data-no-export
      disabled={loading}
      variant="secondary"
      className={cn("text-[1.5cqw] text-ellipsis w-[17cqw] h-[3.7cqw] justify-between")}
      onClick={downloadJSON}
    >
      <p className="max-w-full truncate mx-auto">Export Settings</p>
    </Button>
  )
}

export function SettingsImporter() {
  const { state, dispatch } = useSheetContext()
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const openPicker = () => inputRef.current?.click()

  const importJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)

    try {
      const file = e.target.files?.[0]
      if (inputRef.current) inputRef.current.value = ""
      if (!file) return

      const data = JSON.parse(await file.text())
      const stateKeys = new Set(Object.keys(state ?? {}))
      const entries = Object.entries(data as SheetState)
        .filter(([k]) => stateKeys.has(k))

      if (entries.length === 0) {
        throw new Error("No applicable settings found in file.");
      }

      const payload = Object.fromEntries(entries) as SheetState
      dispatch({ type: "SET", payload })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={importJSON}
      />
      <Button
        data-no-export
        disabled={loading}
        variant="secondary"
        className={cn("text-[1.5cqw] text-ellipsis w-[17cqw] h-[3.7cqw] justify-between")}
        onClick={openPicker}
      >
        <p className="max-w-full truncate mx-auto">Import Settings</p>
      </Button>
    </>
  )
}
