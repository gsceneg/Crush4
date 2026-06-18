"use client"

import { profiles, type Profile } from "@/lib/profiles"
import { ProfileCard } from "@/components/profile-card"
import { Flame, ChevronUp } from "lucide-react"

export function ProfileFeed({
  userName,
  onWrite,
}: {
  userName: string
  onWrite: (profile: Profile) => void
}) {
  return (
    <main className="relative h-full w-full overflow-hidden bg-background">
      {/* top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-5">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
            <Flame className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight drop-shadow">Spark</span>
        </div>
        <span className="pointer-events-auto rounded-full bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/90 ring-1 ring-border backdrop-blur-md">
          {`Hi, ${userName}`}
        </span>
      </header>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-muted-foreground">
        <ChevronUp className="h-4 w-4 animate-bounce" />
        <span className="text-[10px] font-medium uppercase tracking-widest">Swipe up</span>
      </div>

      {/* snapping scroll container */}
      <div className="no-scrollbar snap-y-mandatory h-full w-full overflow-y-scroll overscroll-y-contain">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onWrite={onWrite} />
        ))}
      </div>
    </main>
  )
}
