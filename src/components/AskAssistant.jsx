"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { HiOutlineChatBubbleLeftRight, HiOutlineXMark } from "react-icons/hi2";
import { askAgent } from "@/app/actions/ask";

function formatSlot(iso, locale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-AR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function nextId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AskAssistant({ dict, locale }) {
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const titleId = useId();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const wasOpen = useRef(false);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome",
      role: "assistant",
      text: dict.welcome,
      proposedStarts: [],
      bookedStart: null,
    },
  ]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
    if (wasOpen.current) {
      fabRef.current?.focus();
    }
  }, [open]);

  function errorText(code) {
    return dict.errors[code] || dict.errors.upstream;
  }

  async function sendMessage(raw) {
    const text = String(raw ?? "").trim();
    if (!text || pending) return;

    setDraft("");
    setMessages((current) => [
      ...current,
      { id: nextId("user"), role: "user", text },
    ]);
    setPending(true);

    try {
      const result = await askAgent(text);
      if (!result.ok) {
        setMessages((current) => [
          ...current,
          {
            id: nextId("err"),
            role: "error",
            text: errorText(result.error),
          },
        ]);
        return;
      }

      const { reply } = result;
      setMessages((current) => [
        ...current,
        {
          id: nextId("assistant"),
          role: "assistant",
          text: reply.message,
          kind: reply.kind,
          proposedStarts: reply.proposed_starts || [],
          bookedStart: reply.booked_start || null,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextId("err"),
          role: "error",
          text: errorText("network"),
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function bookSlot(iso) {
    void sendMessage(`Book ${iso}`);
  }

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.96 },
        transition: { duration: 0.2, ease: "easeOut" },
      };

  return (
    <div className="ask-assistant">
      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            id={panelId}
            className="ask-assistant__panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            {...panelMotion}
          >
            <header className="ask-assistant__header">
              <h2 id={titleId} className="ask-assistant__title">
                {dict.title}
              </h2>
              <button
                type="button"
                className="ask-assistant__icon-btn"
                onClick={() => setOpen(false)}
                aria-label={dict.close}
              >
                <HiOutlineXMark aria-hidden="true" size={20} />
              </button>
            </header>

            <div
              className="ask-assistant__messages"
              ref={listRef}
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`ask-assistant__bubble ask-assistant__bubble--${item.role}`}
                >
                  <p>{item.text}</p>
                  {item.bookedStart ? (
                    <p className="ask-assistant__booked">
                      {dict.booked}: {formatSlot(item.bookedStart, locale)}
                    </p>
                  ) : null}
                  {item.proposedStarts?.length > 0 ? (
                    <div className="ask-assistant__slots" role="group" aria-label={dict.slotsLabel}>
                      {item.proposedStarts.map((iso) => (
                        <button
                          key={iso}
                          type="button"
                          className="ask-assistant__slot"
                          disabled={pending}
                          onClick={() => bookSlot(iso)}
                        >
                          {formatSlot(iso, locale)}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {pending ? (
                <div
                  className="ask-assistant__bubble ask-assistant__bubble--assistant ask-assistant__bubble--pending"
                  aria-label={dict.thinking}
                >
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
            </div>

            <form className="ask-assistant__composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                {dict.placeholder}
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                type="text"
                name="message"
                autoComplete="off"
                maxLength={2000}
                value={draft}
                disabled={pending}
                placeholder={dict.placeholder}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button type="submit" disabled={pending || !draft.trim()}>
                {dict.send}
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={fabRef}
        type="button"
        className="ask-assistant__fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? dict.close : dict.open}
        onClick={() => setOpen((current) => !current)}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        {open ? (
          <HiOutlineXMark aria-hidden="true" size={20} />
        ) : (
          <HiOutlineChatBubbleLeftRight aria-hidden="true" size={20} />
        )}
      </motion.button>
    </div>
  );
}
