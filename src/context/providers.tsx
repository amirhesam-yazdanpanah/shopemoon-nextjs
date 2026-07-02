"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Locale, type LocaleDictionary } from "@/lib/dictionary";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface LocaleContextValue {
  locale: Locale;
  dict: LocaleDictionary;
  selectLocale: (locale: Locale) => void;
}

interface ExperienceModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

interface MembershipModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  // True once the membership popup has either been shown-and-dismissed or
  // determined it won't show this visit (suppressed). ExperienceModal's
  // auto-trigger waits on this so the two popups never race/overlap.
  promptResolved: boolean;
  resolvePrompt: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const LocaleContext = createContext<LocaleContextValue | null>(null);
const ExperienceModalContext = createContext<ExperienceModalContextValue | null>(null);
const MembershipModalContext = createContext<MembershipModalContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppProviders");
  return ctx;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within AppProviders");
  return ctx;
}

export function useExperienceModal() {
  const ctx = useContext(ExperienceModalContext);
  if (!ctx) throw new Error("useExperienceModal must be used within AppProviders");
  return ctx;
}

export function useMembershipModal() {
  const ctx = useContext(MembershipModalContext);
  if (!ctx) throw new Error("useMembershipModal must be used within AppProviders");
  return ctx;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocale] = useState<Locale>("fa");
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [membershipPromptResolved, setMembershipPromptResolved] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("sm-theme") as Theme | null;
    const storedLocale = window.localStorage.getItem("sm-locale") as Locale | null;
    if (storedTheme) setTheme(storedTheme);
    if (storedLocale) setLocale(storedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("sm-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dictionary[locale].dir;
    window.localStorage.setItem("sm-locale", locale);
  }, [locale]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const selectLocale = useCallback((next: Locale) => {
    setLocale(next);
  }, []);

  const openModal = useCallback(() => setIsExperienceModalOpen(true), []);
  const closeModal = useCallback(() => setIsExperienceModalOpen(false), []);

  const openMembershipModal = useCallback(() => setIsMembershipModalOpen(true), []);
  const closeMembershipModal = useCallback(() => setIsMembershipModalOpen(false), []);
  const resolveMembershipPrompt = useCallback(() => setMembershipPromptResolved(true), []);

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const localeValue = useMemo(
    () => ({ locale, dict: dictionary[locale], selectLocale }),
    [locale, selectLocale]
  );
  const experienceModalValue = useMemo(
    () => ({ isOpen: isExperienceModalOpen, openModal, closeModal }),
    [isExperienceModalOpen, openModal, closeModal]
  );
  const membershipModalValue = useMemo(
    () => ({
      isOpen: isMembershipModalOpen,
      openModal: openMembershipModal,
      closeModal: closeMembershipModal,
      promptResolved: membershipPromptResolved,
      resolvePrompt: resolveMembershipPrompt,
    }),
    [isMembershipModalOpen, openMembershipModal, closeMembershipModal, membershipPromptResolved, resolveMembershipPrompt]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <LocaleContext.Provider value={localeValue}>
        <ExperienceModalContext.Provider value={experienceModalValue}>
          <MembershipModalContext.Provider value={membershipModalValue}>
            {children}
          </MembershipModalContext.Provider>
        </ExperienceModalContext.Provider>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
