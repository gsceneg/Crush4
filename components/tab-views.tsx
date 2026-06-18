"use client"

import { useState, useEffect, useRef } from "react"
import { profiles, type Profile } from "@/lib/profiles"
import { Search, Heart, MessageCircle, Star, UserPlus, Settings, MapPin, ChevronLeft, Send } from "lucide-react"

function ViewHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-5 pb-3 pt-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </header>
  )
}

export function SearchView() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-6">
      <ViewHeader title="Search" subtitle="Discover people near you" />
      <div className="px-5">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name or interest"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        {profiles.map((p) => (
          <div key={p.id} className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={p.photos[0] || "/placeholder.svg"}
              alt={`${p.name}'s profile`}
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
              <p className="text-sm font-semibold">
                {p.name}, {p.age}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {p.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NotificationsView() {
  const items = [
    { id: 1, icon: Heart, tint: "text-primary", who: profiles[0], text: "liked your profile" },
    { id: 2, icon: Star, tint: "text-accent", who: profiles[2], text: "super liked you" },
    { id: 3, icon: MessageCircle, tint: "text-primary", who: profiles[1], text: "sent you a message" },
    { id: 4, icon: UserPlus, tint: "text-accent", who: profiles[3], text: "viewed your profile" },
    { id: 5, icon: Heart, tint: "text-primary", who: profiles[4], text: "liked your profile" },
  ]
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-6">
      <ViewHeader title="Notifications" subtitle="Your latest activity" />
      <ul className="space-y-2 px-5">
        {items.map((n) => (
          <li
            key={n.id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
          >
            <img
              src={n.who.photos[0] || "/placeholder.svg"}
              alt={n.who.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="flex-1 text-sm">
              <span className="font-semibold">{n.who.name}</span>{" "}
              <span className="text-muted-foreground">{n.text}</span>
            </p>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <n.icon className={`h-5 w-5 ${n.tint}`} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const PREVIEWS = [
  "Hey! How's your week going?",
  "That hiking spot looks amazing 😍",
  "Haha, I'll hold you to that taco bet",
  "Sunset plans this weekend?",
  "Your dog is the cutest, honestly",
]

export function MessagesView({
  openProfileId,
  onConsumed,
}: {
  openProfileId?: string | null
  onConsumed?: () => void
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  // When the user taps "Write to [name]" on a profile, open that DM directly.
  useEffect(() => {
    if (openProfileId) {
      setActiveId(openProfileId)
      onConsumed?.()
    }
  }, [openProfileId, onConsumed])

  const activeProfile = profiles.find((p) => p.id === activeId)
  if (activeProfile) {
    return <ConversationThread profile={activeProfile} onBack={() => setActiveId(null)} />
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-6">
      <ViewHeader title="Messages" subtitle="Keep the conversation going" />
      <ul className="px-5">
        {profiles.map((p, i) => (
          <li key={p.id}>
            <button
              onClick={() => setActiveId(p.id)}
              className="flex w-full items-center gap-3 border-b border-border/60 py-3 text-left"
            >
              <div className="relative">
                <img
                  src={p.photos[0] || "/placeholder.svg"}
                  alt={p.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                {i < 2 && (
                  <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.name}</p>
                  <span className="text-xs text-muted-foreground">{i + 1}h</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{PREVIEWS[i]}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

type ChatMessage = { id: number; from: "me" | "them"; text: string }

function ConversationThread({ profile, onBack }: { profile: Profile; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "them", text: `Hi! Thanks for reaching out 💫` },
  ])
  const [draft, setDraft] = useState(`Hi ${profile.name}! I saw your profile on Spark and would love to chat.`)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text }])
    setDraft("")
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* thread header */}
      <header className="flex items-center gap-3 border-b border-border px-3 py-3">
        <button
          onClick={onBack}
          aria-label="Back to messages"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground active:scale-90"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <img
          src={profile.photos[0] || "/placeholder.svg"}
          alt={profile.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{profile.name}</p>
          <p className="text-xs text-accent">Online now</p>
        </div>
      </header>

      {/* messages */}
      <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.from === "me"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-card-foreground"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* composer */}
      <div className="flex items-center gap-2 border-t border-border px-3 py-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`Message ${profile.name}`}
          className="h-12 w-full rounded-full border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          onClick={send}
          aria-label="Send message"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 active:scale-90 disabled:opacity-50"
          disabled={!draft.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function ProfileView({ userName }: { userName: string }) {
  const stats = [
    { label: "Likes", value: 128 },
    { label: "Matches", value: 24 },
    { label: "Views", value: 542 },
  ]
  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-6">
      <ViewHeader title="My Profile" />
      <div className="flex flex-col items-center px-5">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-4xl font-bold text-primary-foreground">
          {userName.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 text-xl font-bold">{userName}</h2>
        <p className="text-sm text-muted-foreground">New on Spark</p>

        <div className="mt-6 grid w-full grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-6 w-full space-y-2">
          {[
            { icon: Settings, label: "Account settings" },
            { icon: Heart, label: "Dating preferences" },
            { icon: Star, label: "Get Spark Premium" },
          ].map((row) => (
            <li key={row.label}>
              <button className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                  <row.icon className="h-5 w-5 text-foreground" />
                </span>
                <span className="text-sm font-medium">{row.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
