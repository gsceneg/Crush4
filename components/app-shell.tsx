"use client"

import { useState } from "react"
import { BottomNav, type TabKey } from "@/components/bottom-nav"
import { ProfileFeed } from "@/components/profile-feed"
import { SearchView, NotificationsView, MessagesView, ProfileView } from "@/components/tab-views"
import type { Profile } from "@/lib/profiles"

export function AppShell({ userName }: { userName: string }) {
  const [tab, setTab] = useState<TabKey>("meet")
  const [chatProfileId, setChatProfileId] = useState<string | null>(null)

  function handleWrite(profile: Profile) {
    setChatProfileId(profile.id)
    setTab("messages")
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <div className="relative min-h-0 flex-1">
        {tab === "meet" && <ProfileFeed userName={userName} onWrite={handleWrite} />}
        {tab === "search" && <SearchView />}
        {tab === "notifications" && <NotificationsView />}
        {tab === "messages" && (
          <MessagesView openProfileId={chatProfileId} onConsumed={() => setChatProfileId(null)} />
        )}
        {tab === "profile" && <ProfileView userName={userName} />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
