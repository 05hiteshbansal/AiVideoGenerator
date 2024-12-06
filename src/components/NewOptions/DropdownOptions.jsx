"use client"
import React, { useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
const options = [
    {key: "custom", label: "Custom Prompt"},
    {key: "Randamaistory", label: "Random AI Story"},
    {key: "scary", label: "Scary Story"},
    {key: "historicalfacts", label: "Historical Facts"},
    {key: "bedTime", label: "Bed Time Story"},
    {key: "motivation", label: "Motivation"},
    {key: "Fun Facts", label: "fact"}
  ];



export default function DropdownOptions({onUserSelect}) {
  const [selected, setSelected] = useState([]);
  const handleSelectionChange = (e) => {
    setSelected(e.target.value);

    if(e.target.value!="custom"){
        onUserSelect("value" , e.target.value);
    }
  };
    return (
    <div>
    <Select
      items={options}
      name='storyCategory'
      label="Select an option"
      placeholder="Select an Story Category"
      className="w-full text-lg font-ubuntu pl-10 pr-10 pb-2 pt-4"
      onChange={handleSelectionChange}
      value={selected}         
    >
      {(options) => <SelectItem key={options.key} value={options.key} >{options.label}</SelectItem>}
    </Select>
      {selected=="custom"?
    <Textarea
      placeholder="Enter your custom prompt"
      onChange={(e) => onUserSelect("value", e.target.value)}
      className="w-full text-lg font-ubuntu pl-10 pr-10"
    />:""}
    </div>
  );
}