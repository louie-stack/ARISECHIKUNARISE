"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "GENERAL",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Placeholder — wire this up to your actual form handler
    // (Formspree, Resend, Vercel serverless function, etc.)
    try {
      // Simulated delay — replace with real POST request
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "GENERAL", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
            ━━ CONTACT / TRANSMISSION ━━
          </p>
          <h1 className="font-display text-5xl md:text-8xl font-black leading-[0.9] text-bone-100 mb-8">
            Send a
            <br />
            <span className="glow-text text-glow-400">signal.</span>
          </h1>
          <p className="text-bone-100/70 text-lg max-w-2xl leading-relaxed">
            Press inquiries. Collaboration offers. Lore submissions. The
            transmission stays open.
          </p>
        </div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-12 bg-ink-800 border border-glow-500/50 text-center"
          >
            <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
              ━━ TRANSMISSION RECEIVED ━━
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-bone-100 mb-4 glow-text">
              The signal reached him.
            </h2>
            <p className="text-bone-100/60 text-sm max-w-md mx-auto">
              Chikun reads every message. He does not always reply. But he
              always reads.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="spray-btn mt-10"
            >
              SEND ANOTHER →
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 md:p-12 bg-ink-800 border border-ink-600"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs tracking-[0.3em] text-glow-500 mb-3"
                >
                  NAME / ALIAS
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-ink-900 border border-ink-600 focus:border-glow-500 text-bone-100 px-4 py-3 outline-none transition-colors"
                  placeholder="Who are you?"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs tracking-[0.3em] text-glow-500 mb-3"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-ink-900 border border-ink-600 focus:border-glow-500 text-bone-100 px-4 py-3 outline-none transition-colors"
                  placeholder="how do we reach you?"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block font-mono text-xs tracking-[0.3em] text-glow-500 mb-3"
              >
                TRANSMISSION TYPE
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="w-full bg-ink-900 border border-ink-600 focus:border-glow-500 text-bone-100 px-4 py-3 outline-none transition-colors"
              >
                <option value="GENERAL">General inquiry</option>
                <option value="PRESS">Press / interview</option>
                <option value="COLLAB">Collaboration</option>
                <option value="LORE">Lore submission</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs tracking-[0.3em] text-glow-500 mb-3"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full bg-ink-900 border border-ink-600 focus:border-glow-500 text-bone-100 px-4 py-3 outline-none transition-colors resize-none"
                placeholder="Speak. He&apos;s listening."
              />
            </div>

            {status === "error" && (
              <p className="font-mono text-xs tracking-[0.2em] text-blood-500">
                TRANSMISSION FAILED. TRY AGAIN.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="spray-btn w-full justify-center disabled:opacity-40"
            >
              {status === "sending" ? "TRANSMITTING..." : "SEND TRANSMISSION →"}
            </button>
          </form>
        )}

        {/* Alternate contact */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-bone-100/40 mb-2">
            OR SPEAK IN THE OPEN CHANNEL
          </p>
          <p className="font-graffiti text-2xl text-glow-500 glow-text">
            @chikun
          </p>
        </div>
      </div>
    </div>
  );
}
