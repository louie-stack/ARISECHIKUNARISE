"use client";

import { useState } from "react";
import Marquee from "@/components/sections/Marquee";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "GENERAL", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "GENERAL", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="pt-20">
        <Marquee variant="mint" items={["CONTACT", "SEND A SIGNAL", "TRANSMISSION OPEN"]} />
      </div>

      <section className="bg-blue text-bone py-20 md:py-28 px-4 md:px-8 text-center">
        <h1 className="font-black leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}>
          Send a{" "}
          <span className="relative inline-block">
            <span>signal</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{ transform: "rotate(-3deg)", color: "#2EE862", fontSize: "inherit" }}
            >
              BAWK
            </span>
          </span>
        </h1>
      </section>

      <section className="bg-bone text-ink py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {status === "sent" ? (
            <div className="bg-glow border-4 border-ink rounded-3xl p-12 text-center shadow-[8px_8px_0_#0A0A0F]">
              <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight mb-4">
                Signal received.
              </h2>
              <p className="prose-normal text-lg">Chikun reads every message. He does not always reply. But he always reads.</p>
              <button onClick={() => setStatus("idle")} className="btn-pill mt-8">
                Send Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-ink text-bone border-4 border-ink rounded-3xl p-8 md:p-12 space-y-6 shadow-[8px_8px_0_#2EE862]">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-xs tracking-[0.3em] text-glow mb-2">NAME / ALIAS</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bone text-ink border-2 border-ink rounded-full px-5 py-3 font-black focus:outline-none focus:shadow-[4px_4px_0_#2EE862]"
                  />
                </div>
                <div>
                  <label className="block font-black text-xs tracking-[0.3em] text-glow mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bone text-ink border-2 border-ink rounded-full px-5 py-3 font-black focus:outline-none focus:shadow-[4px_4px_0_#2EE862]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-black text-xs tracking-[0.3em] text-glow mb-2">TYPE</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-bone text-ink border-2 border-ink rounded-full px-5 py-3 font-black focus:outline-none"
                >
                  <option value="GENERAL">General</option>
                  <option value="PRESS">Press / Interview</option>
                  <option value="COLLAB">Collaboration</option>
                  <option value="LORE">Lore Submission</option>
                </select>
              </div>
              <div>
                <label className="block font-black text-xs tracking-[0.3em] text-glow mb-2">MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bone text-ink border-2 border-ink rounded-3xl px-5 py-3 font-bold focus:outline-none resize-none prose-normal"
                  style={{ textTransform: "none" }}
                />
              </div>
              {status === "error" && <p className="font-black text-blood text-sm">TRANSMISSION FAILED. TRY AGAIN.</p>}
              <button type="submit" disabled={status === "sending"} className="btn-pill btn-pill-glow w-full disabled:opacity-40">
                {status === "sending" ? "TRANSMITTING..." : "SEND SIGNAL →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
