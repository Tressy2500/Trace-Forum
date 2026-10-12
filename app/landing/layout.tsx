import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TRACE Forum 2027",
  description: "TRACE Forum 2027 landing page",
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return children;
}
