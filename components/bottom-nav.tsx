"use client"

import { Search, Bell, MessageCircle, User, Heart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TabKey = "meet" | "search" | "notifications" | "messages" | "profile"

type Tab = {
  key: TabKey
  label: string
  icon: LucideIcon | "double-heart"
}

const TABS: Tab[] = [
  { key: "meet", label: "Meet", icon: "double-heart" },
  { key: "search", label: "Search", icon: Search },
  { key: "notifications", label: "Alerts", icon: Bell },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "profile", label: "Profile", icon: User },
]

function DoubleHeart({ active }: { active: boolean }) {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center">
      <Heart
        className={`absolute h-5 w-5 -translate-x-1.5 -translate-y-0.5 ${
          active ? "fill-primary text-primary" : "text-current"
        }`}
      />
      <Heart
        className={`absolute h-[1.4rem] w-[1.4rem] translate-x-1 translate-y-0.5 ${
          active ? "fill-accent text-accent" : "text-current"
        }`}
      />
    </span>
  )
}

export function BottomNav({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="z-40 shrink-0 border-t border-border bg-card/80 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-end justify-around px-2 pb-2 pt-2.5">
        {TABS.map((tab) => {
          const isActive = tab.key === active
          return (
            <li key={tab.key} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.key)}
                aria-current={isActive ? "page" : undefined}
                aria-label={tab.label}
                className="flex w-full flex-col items-center gap-1 outline-none"
              >
                <span
                  className={`flex items-center justify-center rounded-2xl transition-all duration-300 ease-out ${
                    isActive
                      ? "h-12 w-12 -translate-y-1 bg-primary/15 text-primary shadow-lg shadow-primary/20 ring-1 ring-primary/30"
                      : "h-10 w-10 text-muted-foreground"
                  }`}
                >
                  {tab.icon === "double-heart" ? (
                    <DoubleHeart active={isActive} />
                  ) : (
                    <tab.icon className={isActive ? "h-7 w-7" : "h-[1.35rem] w-[1.35rem]"} strokeWidth={2} />
                  )}
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wide transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
