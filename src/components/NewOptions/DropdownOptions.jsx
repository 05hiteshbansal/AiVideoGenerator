"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useDropdownConfig } from "@/hooks/useDropdownConfig";

const defaultOptions = [
  { key: "custom", label: "Custom Prompt" },
  { key: "Randamaistory", label: "Random AI Story" },
  { key: "scary", label: "Scary Story" },
  { key: "historicalfacts", label: "Historical Facts" },
  { key: "bedTime", label: "Bed Time Story" },
  { key: "motivation", label: "Motivation" },
  { key: "Fun Facts", label: "fact" },
];

export default function DropdownOptions({ onUserSelect, dropdownfield }) {
  const [selected, setSelected] = useState([]);
  const { config, loading, error } = useDropdownConfig();
  const [options, setOptions] = useState(defaultOptions);
  useEffect(() => {
    if (config?.[dropdownfield]) {
      setOptions(config[dropdownfield]);
    } else {
      setOptions(config?.[dropdownfield] || defaultOptions);
    }
  }, [config]);

  const handleSelectionChange = (e) => {
    setSelected(e.target.value);

    if (e.target.value !== "custom") {
      onUserSelect(dropdownfield || "value", e.target.value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <div>
      <Select
        items={options}
        name="storyCategory"
        label="Select an option"
        placeholder="Select an Story Category"
        className="w-full text-lg font-ubuntu pl-10 pr-10 pb-2 pt-4"
        onChange={handleSelectionChange}
        value={selected}
      >
        {(option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        )}
      </Select>
      {selected == "custom" ? (
        <Textarea
          placeholder="Enter your custom prompt"
          onChange={(e) => onUserSelect("value", e.target.value)}
          className="w-full text-lg font-ubuntu pl-10 pr-10 mt-3"
        />
      ) : (
        ""
      )}
    </div>
  );
}
