"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Bot, Check, ChevronDown, CircleCheck, Code2, Command, Database, FileText, Layers3, Link2, Mail, Menu, MessagesSquare, Play, Repeat2, ScanSearch, Search, Send, Sparkles, Workflow, X, type LucideIcon } from "lucide-react";
import { content } from "@/content/en";

const iconMap: Record<string, LucideIcon> = { layers: Layers3, repeat: Repeat2, link: Link2, "scan-search": ScanSearch, clapperboard: Play, "messages-square": MessagesSquare, "briefcase-business": Command, "database-zap": Database, sparkles: Sparkles, search: Search, "list-checks": CircleCheck, send: Send, "clipboard-list": FileText, "code-xml": Code2, rocket: ArrowUpRight };
function Icon({ name, size = 20 }: { name: string; size?: number }) { const I = iconMap[name] || Workflow; return <I size={size} strokeWidth={1.65} aria-hidden="true" />; }
function Mark({ children }: { children: React.ReactNode }) { return <span className="mark">{children}</span>; }

function HeaderGlass() {
  const steps = 10;
  const step = 100 / steps;

  return <div className="header-glass" aria-hidden="true">{Array.from({ length: steps }, (_, index) => {
    const blur = index + 1;
    const mask = index === 0
      ? `linear-gradient(to top, #000 0%, transparent ${step}%)`
      : index === 1
        ? `linear-gradient(to top, #000 0%, #000 ${step}%, transparent ${step * 2}%)`
        : index === steps - 1
          ? `linear-gradient(to top, transparent ${step * (index - 2)}%, #000 ${step * (index - 1)}%, #000 ${step * index}%, #000 100%)`
        : `linear-gradient(to top, transparent ${step * (index - 2)}%, #000 ${step * (index - 1)}%, #000 ${step * index}%, transparent ${step * (index + 1)}%)`;
    const filter = `blur(${blur.toFixed(2)}px) saturate(1.25)`;
    return <span key={index} className="header-glass-layer" style={{ zIndex: index + 1, maskImage: mask, WebkitMaskImage: mask, backdropFilter: filter, WebkitBackdropFilter: filter }}/>;
  })}<span className="header-glass-tint"/></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (navRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  useEffect(() => {
    let frame = 0;
    const updateContrast = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) return;
        const midline = header.getBoundingClientRect().height / 2;
        const overDarkSection = Array.from(document.querySelectorAll(".section-workflow, .section-contact")).some((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= midline && bounds.bottom > midline;
        });
        header.classList.toggle("header-dark", overDarkSection);
      });
    };
    updateContrast();
    window.addEventListener("scroll", updateContrast, { passive: true });
    window.addEventListener("resize", updateContrast);
    return () => {
      window.removeEventListener("scroll", updateContrast);
      window.removeEventListener("resize", updateContrast);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <header ref={headerRef} className="header"><HeaderGlass/><div className="header-inner"><a href="#top" className="brand" aria-label="Company Name home"><span className="brand-mark"><Workflow size={18}/></span><span>[Company Name]</span></a><button ref={toggleRef} className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><nav ref={navRef} className={open ? "nav nav-open" : "nav"}>{content.nav.map(n => <a key={n.href} onClick={() => setOpen(false)} href={n.href}>{n.label}</a>)}<a onClick={() => setOpen(false)} className="nav-cta" href="#contact">Discuss your project <ArrowUpRight size={15}/></a></nav></div></header>;
}

function HeroVisual() {
  return <div className="hero-art" aria-label="Static sample workflow dashboard"><div className="art-glow"/><div className="mini-window"><div className="window-top"><div className="window-brand"><span className="window-logo"><Workflow size={14}/></span><span>workflows</span></div><span className="sample-pill"><i/> DEMO · SAMPLE DATA</span><span className="avatar">A</span></div><div className="window-body"><aside className="mini-sidebar"><span className="side-active"><Layers3 size={15}/></span><span><Command size={15}/></span><span><Database size={15}/></span><span><MessagesSquare size={15}/></span></aside><div className="mini-main"><div className="mini-heading"><div><span className="eyebrow-small">WORKFLOW OVERVIEW</span><h3>Lead Processing</h3></div><span className="status-live"><i/> Completed</span></div><div className="mini-content"><div className="task-list">{["Business discovery", "Website analysis", "Data processing", "Lead qualification", "CRM synchronization"].map((x,i)=><div className="task" key={x}><span className="task-check"><Check size={12}/></span><span>{x}</span><small>{i===4 ? "just now" : `${i+1}m ago`}</small></div>)}</div><div className="result-card"><div className="result-top"><span>Records processed</span><span className="result-icon"><Database size={15}/></span></div><strong>42</strong><span>illustrative sample records</span><div className="bar-row"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="result-foot"><span>Workflow run</span><b>Complete <Check size={12}/></b></div></div></div><div className="mini-footer"><span><span className="tiny-pulse"/> Last run · Sample environment</span><span>View workflow <ArrowUpRight size={12}/></span></div></div></div></div><div className="float-note"><span className="float-icon"><Sparkles size={17}/></span><span><strong>Less routine</strong><small>More time for meaningful work</small></span></div><div className="art-caption">A static product-style illustration · Sample data only</div></div>;
}

function Hero() { return <section className="hero section-wrap" id="top"><div className="hero-copy"><div className="overline"><span/> CUSTOM SOFTWARE · AI · AUTOMATION</div><h1>Custom tools for the work your <em>software can't handle.</em></h1><p className="hero-sub">We build custom AI-powered tools, automations, and software integrations that eliminate repetitive work, connect your systems, and simplify complex workflows.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Tell us what you need <ArrowRight size={17}/></a><a className="button button-quiet" href="#solutions">Explore solutions <ArrowDown size={16}/></a></div><p className="hero-note"><span className="note-spark"><Sparkles size={14}/></span> From one automated task to a digital system built around your business.</p></div><HeroVisual/></section>; }


function CardVisual({ visual }: { visual: string }) {
  if (visual === "leads") return <div className="lead-visual"><div className="lead-top"><span className="lead-label"><i/> Discovery active</span><span className="dots">···</span></div><div className="lead-stats"><div><small>Companies found</small><b>128</b><span>this sample run</span></div><div><small>Match score</small><b>86<span className="percent">%</span></b><span>criteria aligned</span></div></div><div className="lead-rows">{[["Northstar Studio","Strong match","92%"],["Fieldwork Digital","Review","78%"],["Forma Works","Strong match","89%"]].map(r=><div className="lead-row" key={r[0]}><span className="lead-favicon">{r[0][0]}</span><b>{r[0]}</b><span>{r[1]}</span><em>{r[2]}</em></div>)}</div><div className="lead-flow">{["Discover","Analyze","Qualify","Deliver"].map((x,i)=><span key={x}>{x}{i<3&&<b>→</b>}</span>)}</div></div>;
  if (visual === "content") return <div className="content-visual"><div className="video-preview"><div className="play-btn"><Play size={16} fill="currentColor"/></div><div className="video-caption">A fresh perspective<br/>on better workflows.</div><span className="video-duration">00:24</span></div><div className="content-toolbar"><span><span className="format-dot"/> Captions ready</span><span><span className="format-dot blue"/> 9:16 format</span></div><div className="platform-row"><span>in</span><span>◎</span><span>▶</span><span>t</span><small>Prepared for your channels</small></div></div>;
  if (visual === "assistant") return <div className="assistant-visual"><div className="chat-head"><div className="bot-avatar"><Bot size={17}/></div><div><b>Studio assistant</b><small><i/> Available</small></div><span>•••</span></div><div className="chat-date">TODAY · SAMPLE CONVERSATION</div><div className="chat-bubble">Hi! How can I help with your project today?</div><div className="chat-bubble user-bubble">Can I connect this to the tools we use?</div><div className="chat-bubble">In many cases, yes. It depends on available integrations and permissions.</div><div className="chat-input">Write a message <ArrowUpRight size={14}/></div></div>;
  if (visual === "documents") return <div className="doc-visual"><div className="doc-main"><div className="doc-page"><span className="doc-type">APPLICATION · 2025</span><div className="doc-lines"><i/><i/><i/><i/></div><div className="doc-divider"/><span className="doc-section">REFERENCE COMPARISON</span><div className="doc-highlight">Similar reference found <ArrowUpRight size={12}/></div><div className="doc-lines short"><i/><i/><i/></div></div><div className="doc-check"><CircleCheck size={15}/><span>Review needed</span></div></div><div className="doc-note">Human verification stays part of the process.</div></div>;
  if (visual === "data") return <div className="data-visual"><div className="data-nodes"><div className="data-source"><span><FileText size={15}/></span><small>Documents</small></div><div className="data-source"><span><Layers3 size={15}/></span><small>CRM</small></div><div className="data-source"><span><Database size={15}/></span><small>Database</small></div><div className="node-lines"><i/><i/><i/></div><div className="data-core"><Workflow size={19}/><small>Organize</small></div><div className="node-right"><i/><i/><i/></div><div className="data-output"><span><FileText size={15}/></span><small>Report</small></div></div><div className="data-sync"><span className="sync-icon"><Check size={13}/></span> Information, in sync <span className="sync-dots">···</span></div></div>;
  return <div className="custom-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="custom-core"><Sparkles size={23}/></div><div className="orbit-chip chip-one"><Workflow size={14}/></div><div className="orbit-chip chip-two"><Database size={14}/></div><div className="orbit-chip chip-three"><MessagesSquare size={14}/></div><span className="custom-hint">Your workflow, connected.</span></div>;
}

function SolutionsSection() { return <section className="section section-solutions" id="solutions"><div className="section-wrap"><div className="section-heading"><Mark>WHAT WE CAN BUILD</Mark><h2>What can we build<br/>for <span>you?</span></h2><p>When software does not fit, routine grows, or systems stay disconnected, we build a practical solution around your workflow.</p></div><div className="bento-grid">{content.solutions.map((s,i)=><article className={`solution-card solution-${s.size} solution-${s.visual}`} key={s.id}><div className="solution-copy"><div className="solution-meta"><span className="icon-box"><Icon name={s.icon}/></span><span className="solution-id">0{i+1} / 06</span></div><div className="solution-text"><h3>{s.headline}</h3><p>{s.text}</p></div></div><CardVisual visual={s.visual}/><div className="solution-foot"><span className="card-category">{s.title}</span>{"cta" in s && s.cta ? <a href="#contact">{s.cta} <ArrowRight size={14}/></a> : <span className="more-link">Explore capability <ArrowUpRight size={14}/></span>}</div></article>)}</div><p className="platform-note">Integrations and publishing capabilities depend on platform APIs, account permissions, and project requirements.</p></div></section>; }


function HowWeWork() { return <section className="section section-process" id="how-it-works"><div className="section-wrap"><div className="section-heading"><Mark>A CLEAR PATH</Mark><h2>From your problem<br/>to a <span>working solution.</span></h2><p>We understand your workflow, then build the simplest practical solution for the job.</p></div><div className="process-grid">{content.steps.map((s,i)=><article className="process-card" key={s.title}><div className="process-top"><span className="process-icon"><Icon name={s.icon}/></span><span className="index">0{i+1}</span></div><h3>{s.title}</h3><p>{s.text}</p><ul>{s.list.map(x=><li key={x}><Check size={13}/>{x}</li>)}</ul></article>)}</div><div className="mvp-note"><span className="mvp-icon"><Sparkles size={18}/></span><div><b>Start with an MVP. Expand when you need more.</b><span>Scope, deliverables, cost, and timing are agreed after understanding the project.</span></div><ArrowRight size={18}/></div></div></section>; }



function FAQ() { const [open,setOpen]=useState<number|null>(0); return <section className="section section-faq" id="faq"><div className="section-wrap faq-layout"><div className="section-heading"><Mark>GOOD TO KNOW</Mark><h2>Frequently<br/>asked <span>questions.</span></h2><p>A few useful details before we start a conversation.</p><a className="button button-outline" href="#contact">Ask us directly <ArrowRight size={15}/></a></div><div className="faq-list">{content.faqs.map(([q,a],i)=><article key={q} className={open===i?"faq-item faq-open":"faq-item"}><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><span className="faq-plus"><ChevronDown size={17}/></span></button><div className="faq-answer"><p>{a}</p></div></article>)}</div></div></section>; }

function WhatsAppMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.438-9.884 9.893-9.884 2.64.001 5.122 1.03 6.987 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.44 9.884-9.89 9.884M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.334.157 11.89c0 2.096.547 4.142 1.588 5.946L.05 24l6.312-1.656a11.9 11.9 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.334 11.893-11.89a11.82 11.82 0 0 0-3.425-8.422z"/></svg>;
}

function Contact() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formStatus === "sending") return;
    const website = new FormData(event.currentTarget).get("website");
    setFormStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: senderEmail, message, website }),
      });
      if (!response.ok) throw new Error("Inquiry delivery failed");
      setFormStatus("success");
      setSenderEmail("");
      setMessage("");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section className="section section-contact" id="contact">
      <div className="section-wrap">
        <div className="contact-simple">
          <Mark>CONTACT</Mark>
          <h2>Let's talk.</h2>
          <p>Tell us what you need. We'll take it from there.</p>
          <div className="contact-actions">
            <a
              className={whatsapp ? "contact-action whatsapp-action" : "contact-action whatsapp-action unavailable"}
              href={whatsapp ? `https://wa.me/${whatsapp}` : undefined}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              aria-disabled={!whatsapp}
            >
              <span className="contact-action-icon whatsapp-icon"><WhatsAppMark /></span>
              <span><b>WhatsApp</b><small>{whatsapp ? "Open a chat" : "Add number in .env.local"}</small></span>
              <ArrowUpRight size={17} />
            </a>
            <button
              className="contact-action email-action"
              type="button"
              aria-expanded={emailFormOpen}
              onClick={() => { setEmailFormOpen(!emailFormOpen); setFormStatus("idle"); }}
            >
              <span className="contact-action-icon email-icon"><Mail size={18} strokeWidth={2} /></span>
              <span><b>Email</b><small>{emailFormOpen ? "Write a message here" : "Send an inquiry"}</small></span>
              <ArrowUpRight size={17} />
            </button>
          </div>
          {emailFormOpen && (
            <form className="contact-email-form" onSubmit={submitInquiry}>
              <input className="contact-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label>
                Email address
                <input type="email" name="email" autoComplete="email" required maxLength={254} value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} placeholder="you@example.com" />
              </label>
              <label>
                Your message
                <textarea name="message" required minLength={10} maxLength={5000} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What would you like to improve?" />
              </label>
              <button className="button button-primary" type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending…" : "Send message"}<ArrowRight size={16} />
              </button>
              <p className={`contact-form-status ${formStatus}`} aria-live="polite">
                {formStatus === "success" ? "Thank you. Your message has been sent." : formStatus === "error" ? "We couldn't send your message. Please try again or use WhatsApp." : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() { return <footer className="footer"><div className="section-wrap"><div className="footer-main"><div className="footer-brand"><a href="#top" className="brand"><span className="brand-mark"><Workflow size={17}/></span><span>[Company Name]</span></a><p>Custom digital tools, AI solutions, and workflow automation built around your business.</p><span className="footer-region"><span/> Working remotely across Europe</span></div><div className="footer-links"><div><b>Explore</b>{content.nav.map(n=><a key={n.href} href={n.href}>{n.label}</a>)}</div><div><b>Information</b><a href="/privacy-policy">Privacy policy</a><a href="/legal-notice">Legal notice</a><a href="#contact">Send an inquiry</a></div></div></div><div className="footer-bottom"><span>© 2026 [Company Name]. All rights reserved.</span><span className="footer-note">Custom tools. Smarter work. Less routine. <span>✳</span></span></div></div></footer>; }

export default function Home() { return <><Header/><main><Hero/><SolutionsSection/><HowWeWork/><FAQ/><Contact/></main><Footer/></>; }
