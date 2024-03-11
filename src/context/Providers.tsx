"use client";

import React from "react";
import { GlobalProvider } from "./Global";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
