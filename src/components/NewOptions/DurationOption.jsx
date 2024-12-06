"use client"
import React, { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
const options = [
  {key: "10", label: "10 Seconds"},  
  {key: "30", label: "30 Seconds"},
    {key: "60", label: "60 Seconds"}
  ];



export default function DurationOption({onUserSelect}) {
  const [selected, setSelected] = useState([]);
  const handleSelectionChange = (e) => {
    setSelected(e.target.value);
    onUserSelect("Duration" , e.target.value);
  };
    return (
    <div>
    <Select
      items={options}
      name='TimeCategory'
      label="Select Time Duration"
      placeholder="Select Time Duration"
      className="w-full text-lg font-ubuntu md:pl-10 md:pr-10 pb-2 pt-4"
      onChange={handleSelectionChange}
      value={selected}         
    >
      {(options) => <SelectItem key={options.key} value={options.key} >{options.label}</SelectItem>}
    </Select>
    </div>
  );
}