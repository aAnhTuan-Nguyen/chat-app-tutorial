import type { ThemeState } from "@/types/themeState"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const userThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggleTheme: () => {
        set((state) => ({ isDark: !state.isDark }))
        if (get().isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },
      setTheme: (isDark) => {
        set({ isDark })
        if (isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
)
