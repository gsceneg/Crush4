"use client"

import { useState } from "react"
import type { Profile } from "@/lib/profiles"
import { Button } from "@/components/ui/button"
import { Heart, Info, MessageCircle, MapPin, X, Send } from "lucide-react"

export function ProfileCard({
  profile,
  onWrite,
}: {
  profile: Profile
  onWrite: (profile: Profile) => void
}) {
  const [liked, setLiked] = useState(false)
  const [likeBurst, setLikeBurst] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const [floatHeart, setFloatHeart] = useState(false)

  function toggleLike() {
    setLiked((prev) => {
      if (!prev) {
        setLikeBurst(true)
        setTimeout(() => setLikeBurst(false), 350)
      }
      return !prev
    })
  }

  function handleDoubleTap() {
    if (!liked) toggleLike()
    setFloatHeart(true)
    setTimeout(() => setFloatHeart(false), 800)
  }

  function handleWrite() {
    setBioOpen(false)
    onWrite(profile)
  }

  return (
    <section className="snap-start-always relative h-full w-full shrink-0 overflow-hidden bg-background">
      {/* photo */}
      <img
        src={profile.photos[0] || "/placeholder.svg"}
        alt={`${profile.name}'s profile`}
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
        onDoubleClick={handleDoubleTap}
      />

      {/* gradient scrims for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent"
      />

      {/* floating heart on double tap */}
      {floatHeart && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Heart className="h-28 w-28 animate-float-up fill-primary text-primary drop-shadow-lg" />
        </div>
      )}

      {/* right-side actions */}
      <div className="absolute bottom-44 right-3 z-20 flex flex-col items-center gap-5">
        <ActionButton
          onClick={toggleLike}
          label={liked ? "Liked" : "Like"}
          active={liked}
        >
          <Heart
            className={`h-7 w-7 transition-colors ${likeBurst ? "animate-heart-pop" : ""} ${
              liked ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </ActionButton>

        <ActionButton onClick={() => setBioOpen(true)} label="Bio">
          <Info className="h-7 w-7 text-foreground" />
        </ActionButton>
      </div>

      {/* bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8">
        <div className="mb-4 pr-20">
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold leading-none tracking-tight text-balance">{profile.name}</h2>
            <span className="text-2xl font-light leading-none text-foreground/90">{profile.age}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.location}</span>
          </div>
          <p className="mt-3 line-clamp-2 text-pretty text-sm leading-relaxed text-foreground/85">{profile.bio}</p>
        </div>

        <Button
          onClick={handleWrite}
          size="lg"
          className="h-14 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/30"
        >
          <MessageCircle className="mr-1 h-5 w-5" />
          {`Write to ${profile.name}`}
        </Button>
      </div>

      {/* bio sheet */}
      <BioSheet open={bioOpen} onClose={() => setBioOpen(false)} profile={profile} onWrite={handleWrite} />
    </section>
  )
}

function ActionButton({
  onClick,
  label,
  active,
  children,
}: {
  onClick: () => void
  label: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1" aria-pressed={active} aria-label={label}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/70 backdrop-blur-md ring-1 ring-border transition-transform active:scale-90">
        {children}
      </span>
      <span className="text-xs font-medium text-foreground/90 drop-shadow">{label}</span>
    </button>
  )
}

function BioSheet({
  open,
  onClose,
  profile,
  onWrite,
}: {
  open: boolean
  onClose: () => void
  profile: Profile
  onWrite: () => void
}) {
  return (
    <div
      className={`absolute inset-0 z-30 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        onClick={onClose}
        aria-label="Close bio"
        className={`absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border bg-popover p-6 transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted" />
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              {profile.name}, {profile.age}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{profile.location}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">{profile.bio}</p>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Interests</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Button onClick={onWrite} size="lg" className="mt-7 h-14 w-full rounded-2xl text-base font-semibold">
          <Send className="mr-1 h-5 w-5" />
          {`Write to ${profile.name}`}
        </Button>
      </div>
    </div>
  )
}
