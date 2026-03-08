"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useDropdownConfig } from "@/hooks/useDropdownConfig";

const defaultOptions = [
  { key: "10", label: "10 Seconds" },
  { key: "30", label: "30 Seconds" },
  { key: "60", label: "60 Seconds" },
];

export default function DurationOption({ onUserSelect }) {
  const [selected, setSelected] = useState([]);
  const { config, loading, error } = useDropdownConfig();
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    if (config?.durations) {
      setOptions(config.durations);
    }
  }, [config]);

  const handleSelectionChange = (e) => {
    setSelected(e.target.value);
    onUserSelect("Duration", e.target.value);
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
        name="TimeCategory"
        label="Select Time Duration"
        placeholder="Select Time Duration"
        className="w-full text-lg font-ubuntu md:pl-10 md:pr-10 pb-2 pt-4"
        onChange={handleSelectionChange}
        value={selected}
      >
        {(option) => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
