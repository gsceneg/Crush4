"use client"

import { useState } from "react"
import { AuthForm } from "@/components/auth-form"
import { AppShell } from "@/components/app-shell"

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null)

  if (!userName) {
    return <AuthForm onComplete={setUserName} />
  }

  return <AppShell userName={userName} />
}
