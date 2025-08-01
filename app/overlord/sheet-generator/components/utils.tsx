import { useEffect } from "react"
import { useState } from "react"
import { useSheetContext } from "./sheet-context"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Upload } from "lucide-react"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useRef } from "react"

interface Portrait {
  value: string
  label: string
}

const portraits: Portrait[] = [
  {
    value: "/overlord/portraits/01-Momonga.jpg",
    label: "01 Momonga",
  },
  {
    value: "/overlord/portraits/02-Albedo.jpg",
    label: "02 Albedo",
  },
  {
    value: "/overlord/portraits/03-Aura.jpg",
    label: "03 Aura",
  },
  {
    value: "/overlord/portraits/04-Mare.jpg",
    label: "04 Mare",
  },
  {
    value: "/overlord/portraits/05-Cocytus.jpg",
    label: "05 Cocytus",
  },
  {
    value: "/overlord/portraits/06-Demiurge.jpg",
    label: "06 Demiurge",
  },
  {
    value: "/overlord/portraits/07-Narberal.jpg",
    label: "07 Narberal",
  },
  {
    value: "/overlord/portraits/09-Yuri.jpg",
    label: "09 Yuri",
  },
  {
    value: "/overlord/portraits/10-CZ.jpg",
    label: "10 CZ2128",
  },
  {
    value: "/overlord/portraits/11-Shalltear.jpg",
    label: "11 Shalltear",
  },
  {
    value: "/overlord/portraits/12-Pandora_s.jpg",
    label: "12 Pandora's Actor",
  },
  {
    value: "/overlord/portraits/17-Sebas.jpg",
    label: "17 Sebas",
  },
  {
    value: "/overlord/portraits/18-Solution.jpg",
    label: "18 Solution",
  },
  {
    value: "/overlord/portraits/23-Victim.jpg",
    label: "23 Victim",
  },
  {
    value: "/overlord/portraits/24-Entoma.jpg",
    label: "24 Entoma",
  },
  {
    value: "/overlord/portraits/38-Lupusregina.jpg",
    label: "38 Lupusregina",
  },
]

export function PortraitUploader() {
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

  function updateOptions(value: string, label: string) {
    const updatedOptions = [
      { value: value, label: label },
      ...options
    ]

    setOptions(updatedOptions)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target.files || event.target.files.length < 1) {
      return
    }

    const file = event.target.files[0]
    
    if (file) {
      const url = URL.createObjectURL(file)
      const fileName = file.name

      setImageURL(url)
      updateOptions(url, fileName)
    }
  }

  return (
    <>
      <div className="absolute top-[1cqw] left-[2cqw]">
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
              className="text-[1.5cqw] w-[25cqw] h-[3.7cqw] justify-between"
            >
              {imageURL
                ? options.find((opt) => opt.value === imageURL)?.label
                : "Select character portrait..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[20cqw] p-0">
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
                      key={opt.value}
                      value={opt.value}
                      onSelect={(currentValue) => {
                        setImageURL(currentValue === imageURL ? imageURL : currentValue)
                        setMenuOpen(false)
                      }}
                    >
                      {opt.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          imageURL === opt.value ? "opacity-100" : "opacity-0"
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
    </>
  )
}
