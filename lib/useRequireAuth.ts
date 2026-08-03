"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../supabase"

// Drop this into any protected page. It checks for a logged-in Supabase user;
// if there isn't one, it redirects to /login. While checking, `checking` is
// true — use it to avoid flashing real content before the check completes.
export function useRequireAuth() {
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
      } else {
        setAuthorized(true)
        setChecking(false)
      }
    }
    check()
  }, [router])

  return { checking, authorized }
}
