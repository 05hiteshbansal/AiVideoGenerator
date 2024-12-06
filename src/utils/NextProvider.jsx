"use client"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";

export default function NextProvider({children}) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}