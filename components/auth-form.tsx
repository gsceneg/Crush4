"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Flame, Camera, User, Calendar, Phone, Check } from "lucide-react"

type Mode = "login" | "register"

export function AuthForm({ onComplete }: { onComplete: (name: string) => void }) {
  const [mode, setMode] = useState<Mode>("register")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [photoError, setPhotoError] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const MIN_PHOTOS = 2

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const urls = files.map((f) => URL.createObjectURL(f))
    setPhotos((prev) => [...prev, ...urls])
    setPhotoError(false)
    // allow selecting the same file again later
    e.target.value = ""
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isRegister && photos.length < MIN_PHOTOS) {
      setPhotoError(true)
      return
    }
    onComplete(name.trim() || "there")
  }

  const isRegister = mode === "register"

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-accent/20 blur-[90px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-12">
        {/* brand */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Flame className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance">
            {isRegister ? "Create your Spark" : "Welcome back"}
          </h1>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {isRegister
              ? "Set up your profile and start meeting people near you."
              : "Log in to keep the conversation going."}
          </p>
        </div>

        {/* mode toggle */}
        <div className="mt-7 flex rounded-full bg-secondary p-1">
          {(["register", "login"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "register" ? "Sign up" : "Log in"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-1 flex-col gap-4">
          {isRegister && (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-card transition-colors hover:border-primary"
                aria-label="Upload a profile photo"
              >
                {photo ? (
                  <img src={photo || "/placeholder.svg"} alt="Your profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground transition-colors group-hover:text-primary">
                    <Camera className="h-7 w-7" />
                    <span className="text-xs font-medium">Add photo</span>
                  </div>
                )}
                {photo && (
                  <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </div>
          )}

          {isRegister && (
            <Field icon={<User className="h-5 w-5" />} label="Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </Field>
          )}

          {isRegister && (
            <Field icon={<Calendar className="h-5 w-5" />} label="Date of birth">
              <input
                required
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-transparent text-base text-foreground outline-none [color-scheme:dark] placeholder:text-muted-foreground"
              />
            </Field>
          )}

          <Field icon={<Phone className="h-5 w-5" />} label="WhatsApp number">
            <input
              required
              type="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+1 555 000 0000"
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <div className="mt-auto pt-4">
            <Button type="submit" size="lg" className="h-14 w-full rounded-2xl text-base font-semibold">
              {isRegister ? "Create account" : "Log in"}
            </Button>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              By continuing you agree to our Terms and acknowledge our Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {children}
      </span>
    </label>
  )
}
