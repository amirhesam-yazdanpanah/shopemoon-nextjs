"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useConversation } from "@elevenlabs/react";
import { useExperienceModal } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

const AGENT_ID = "agent_1301kvzjfw9xed4vt4t83qd5md2k";

// This widget's own UI text is always Persian by design, independent of the
// site-wide language switcher (the agent can still reply in whatever
// language the visitor types/speaks in — only these fixed labels stay fa).
const TEXT = {
  pillLabel: "هر سوالی داری از من بپرس",
  brand: "ShopeMoon Assistant",
  subtitle: "دستیار خرید مونا",
  voiceTab: "تماس صوتی",
  chatTab: "گفتگوی متنی",
  startCall: "شروع تماس صوتی",
  endCall: "پایان تماس",
  statusIdle: "آماده‌ام کمکت کنم",
  statusListening: "دارم گوش می‌دم…",
  statusSpeaking: "در حال پاسخ دادن…",
  statusConnecting: "در حال اتصال…",
  micDenied: "اجازه دسترسی به میکروفون داده نشد.",
  chatPlaceholder: "سوالت رو بنویس…",
  send: "ارسال",
};

type Mode = "voice" | "chat";

interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h16v10H9l-4 4v-4H4V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function VoiceWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("voice");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [micError, setMicError] = useState("");
  const messageIdRef = useRef(0);

  // Already-existing, safe project features the agent can be wired to call.
  // Add more entries here once a real tool exists for them — per the brief,
  // nothing speculative (e.g. a "consultation" popup) is wired in yet.
  const { openModal: openExperienceModal } = useExperienceModal();
  const clientTools = {
    open_experience_popup: async () => {
      openExperienceModal();
      return "Experience popup opened.";
    },
    open_whatsapp: async () => {
      window.open(whatsappLink(TEXT.pillLabel), "_blank", "noopener");
      return "WhatsApp opened.";
    },
  };

  const conversation = useConversation({
    clientTools,
    textOnly: mode === "chat",
    onMessage: (msg) => {
      const text: string | undefined = (msg as { message?: string })?.message;
      const source: string | undefined = (msg as { source?: string })?.source;
      if (!text) return;
      messageIdRef.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: String(messageIdRef.current), role: source === "user" ? "user" : "agent", text },
      ]);
    },
  });

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting";

  const requestMic = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicError("");
      return true;
    } catch {
      setMicError(TEXT.micDenied);
      return false;
    }
  }, []);

  async function handleVoiceToggle() {
    if (isConnected) {
      await conversation.endSession();
      return;
    }
    const granted = await requestMic();
    if (!granted) return;
    await conversation.startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
  }

  async function handleChatSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");

    messageIdRef.current += 1;
    setMessages((prev) => [...prev, { id: String(messageIdRef.current), role: "user", text }]);

    if (!isConnected) {
      await conversation.startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
    }
    conversation.sendUserMessage(text);
  }

  function openInMode(nextMode: Mode) {
    setMode(nextMode);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  const orbState = isConnecting ? "connecting" : conversation.isSpeaking ? "speaking" : isConnected ? "listening" : "idle";
  const statusText = isConnecting
    ? TEXT.statusConnecting
    : conversation.isSpeaking
      ? TEXT.statusSpeaking
      : isConnected
        ? TEXT.statusListening
        : TEXT.statusIdle;

  return (
    <div dir="rtl" lang="fa" className="fixed bottom-4 end-4 z-[70] sm:bottom-6 sm:end-6">
      {!open && (
        <div
          role="group"
          className="flex max-w-[min(90vw,22rem)] items-center gap-2 rounded-full border border-gold-soft bg-cream px-2 py-1.5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-navy-soft dark:bg-navy-dark"
        >
          <button
            type="button"
            onClick={() => openInMode("voice")}
            className="flex items-center gap-2 rounded-full py-1 ps-1 pe-2 text-sm font-semibold text-navy transition hover:text-gold dark:text-cream"
          >
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold dark:bg-navy-soft dark:text-gold-light">
              <MicIcon />
            </span>
            <span className="truncate">{TEXT.pillLabel}</span>
          </button>
          <span className="h-5 w-px shrink-0 bg-gold-soft dark:bg-navy-soft" aria-hidden="true" />
          <button
            type="button"
            onClick={() => openInMode("chat")}
            aria-label={TEXT.chatTab}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold transition hover:scale-105 dark:bg-navy-soft dark:text-gold-light"
          >
            <ChatIcon />
          </button>
        </div>
      )}

      {open && (
        <div className="flex h-[min(75vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-xl2 border border-gold-soft/50 bg-cream shadow-soft dark:border-navy-soft dark:bg-navy-dark">
          <div className="flex items-center justify-between gap-2 border-b border-gold-soft/40 px-4 py-3 dark:border-navy-soft">
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-navy dark:text-cream">{TEXT.brand}</p>
              <p className="truncate text-xs text-navy-soft dark:text-cream-dark">{TEXT.subtitle}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <div className="flex items-center gap-0.5 rounded-full bg-cream-dark p-1 dark:bg-navy-soft">
                <button
                  type="button"
                  onClick={() => setMode("voice")}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
                    mode === "voice" ? "bg-gold text-white" : "text-navy/60 dark:text-cream/60"
                  }`}
                >
                  {TEXT.voiceTab}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("chat")}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
                    mode === "chat" ? "bg-gold text-white" : "text-navy/60 dark:text-cream/60"
                  }`}
                >
                  {TEXT.chatTab}
                </button>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="close"
                className="flex h-7 w-7 items-center justify-center rounded-full text-navy/60 transition hover:bg-cream-dark hover:text-gold dark:text-cream/60 dark:hover:bg-navy-soft"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {mode === "voice" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
              <div
                className={`h-28 w-28 rounded-full bg-gradient-to-br from-gold to-gold-light shadow-card transition-transform duration-700 ${
                  orbState === "listening"
                    ? "scale-105 animate-pulse"
                    : orbState === "speaking"
                      ? "scale-110 animate-pulse"
                      : orbState === "connecting"
                        ? "scale-95 opacity-70"
                        : "scale-100 opacity-90"
                }`}
                aria-hidden="true"
              />
              <p className="text-center text-sm font-semibold text-navy-soft dark:text-cream-dark">
                {statusText}
              </p>
              {micError && <p className="text-center text-xs text-red-600">{micError}</p>}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`rounded-full px-8 py-3 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft ${
                  isConnected
                    ? "bg-navy dark:bg-cream-dark dark:text-navy"
                    : "bg-gradient-to-br from-gold to-gold-light"
                }`}
              >
                {isConnected ? TEXT.endCall : TEXT.startCall}
              </button>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl2 px-3 py-2 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-gold to-gold-light text-white"
                          : "bg-cream-dark text-navy dark:bg-navy-soft dark:text-cream"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleChatSubmit}
                className="flex items-center gap-2 border-t border-gold-soft/40 p-3 dark:border-navy-soft"
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={TEXT.chatPlaceholder}
                  className="flex-1 rounded-full border border-gold-soft/60 bg-white px-4 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-br from-gold to-gold-light px-4 py-2 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {TEXT.send}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
