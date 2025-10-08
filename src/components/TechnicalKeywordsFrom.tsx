"use client";

import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { technicalKeywords } from "@/data/formData";
import { Control, FieldValues, Path } from "react-hook-form";

// Make the component generic over the form schema T
interface TechnicalKeywordsFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // the field name
}

export function TechnicalKeywordsField<T extends FieldValues>({
  control,
  name,
}: TechnicalKeywordsFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Technical Keywords</FormLabel>
          <FormControl>
            <MultiSelect
              selected={field.value || []}
              onChange={field.onChange}
              options={technicalKeywords}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    // Add event listener when mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="border rounded-lg p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((keyword) => (
          <Badge
            key={keyword}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => toggleOption(keyword)}
          >
            {keyword} ✕
          </Badge>
        ))}
      </div>

      <Command>
        <CommandInput
          placeholder="Search keywords..."
          onClick={() => setOpen(!open)}
          ref={dropdownRef}
        />
        {open && (
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => toggleOption(option)}
                  className={selected.includes(option) ? "bg-muted" : ""}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}
