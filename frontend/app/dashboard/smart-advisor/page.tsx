"use client";

import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuButton } from "@/components/menu-button";
import { useDashboard } from "@/contexts/dashboard-context";

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  isHtml?: boolean;
}

export default function SmartAdvisorPage() {
  const { initials } = useDashboard();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const botReply = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('çadır') || q.includes('kamp')) {
      return `Kamp çadırı için 3 seçenek analiz ettim — fiyat/performans odaklı:
      <div class="result-cards">
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">01</span><span class="rcard-icon">⛺</span><div class="rcard-info"><div class="rcard-name">Vanguard Pro 2+1 Kamp Seti</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.6 Gerçek</span><span>%9 İade</span><span>Trendyol</span></div></div><span class="rcard-price">₺1.850</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">02</span><span class="rcard-icon">⛺</span><div class="rcard-info"><div class="rcard-name">Naturehike Cloud-Up 2</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.4 Gerçek</span><span>%11 İade</span><span>Amazon</span></div></div><span class="rcard-price">₺1.990</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">03</span><span class="rcard-icon">⛺</span><div class="rcard-info"><div class="rcard-name">Decathlon MH100 Kamp Seti</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.2 Gerçek</span><span>%7 İade</span><span>Hepsiburada</span></div></div><span class="rcard-price">₺1.650</span></a>
      </div>`;
    }
    if (q.includes('kulaklık') || q.includes('headphone')) {
      return `Spor için en iyi kablosuz kulaklıklar:
      <div class="result-cards">
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">01</span><span class="rcard-icon">🎧</span><div class="rcard-info"><div class="rcard-name">Jabra Elite 8 Active</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.5 Gerçek</span><span>%8 İade</span><span>Amazon</span></div></div><span class="rcard-price">₺4.200</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">02</span><span class="rcard-icon">🎧</span><div class="rcard-info"><div class="rcard-name">Sony WF-1000XM5</div><div class="rcard-meta"><span class="rbadge rb-bk">BEKLE</span><span>⭐ 4.3 Gerçek</span><span>%12 İade</span><span>Trendyol</span></div></div><span class="rcard-price">₺5.499</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">03</span><span class="rcard-icon">🎧</span><div class="rcard-info"><div class="rcard-name">Anker Soundcore Sport X20</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.1 Gerçek</span><span>%6 İade</span><span>Hepsiburada</span></div></div><span class="rcard-price">₺1.850</span></a>
      </div>`;
    }
    if (q.includes('süpürge') || q.includes('robot')) {
      return `Orta bütçe robot süpürgeler — iyi fiyat/performans:
      <div class="result-cards">
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">01</span><span class="rcard-icon">🤖</span><div class="rcard-info"><div class="rcard-name">Xiaomi Robot Vacuum E10</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.2 Gerçek</span><span>%11 İade</span><span>Trendyol</span></div></div><span class="rcard-price">₺4.999</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">02</span><span class="rcard-icon">🤖</span><div class="rcard-info"><div class="rcard-name">Roborock Q5 Pro</div><div class="rcard-meta"><span class="rbadge rb-bk">BEKLE</span><span>⭐ 4.5 Gerçek</span><span>%8 İade</span><span>Amazon</span></div></div><span class="rcard-price">₺8.499</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">03</span><span class="rcard-icon">🤖</span><div class="rcard-info"><div class="rcard-name">Ecovacs Deebot N10</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.0 Gerçek</span><span>%14 İade</span><span>Hepsiburada</span></div></div><span class="rcard-price">₺5.899</span></a>
      </div>`;
    }
    return `Sorgunuzu analiz ettim. İşte önerilerim:
      <div class="result-cards">
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">01</span><span class="rcard-icon">🛍️</span><div class="rcard-info"><div class="rcard-name">En İyi Fiyat/Performans Seçeneği</div><div class="rcard-meta"><span class="rbadge rb-al">AL</span><span>⭐ 4.4 Gerçek</span><span>%10 İade</span><span>Trendyol</span></div></div><span class="rcard-price">₺1.299</span></a>
        <a href="/dashboard/product-analysis" class="rcard"><span class="rcard-num">02</span><span class="rcard-icon">🛍️</span><div class="rcard-info"><div class="rcard-name">Premium Seçenek</div><div class="rcard-meta"><span class="rbadge rb-bk">BEKLE</span><span>⭐ 4.2 Gerçek</span><span>%15 İade</span><span>Amazon</span></div></div><span class="rcard-price">₺2.499</span></a>
      </div>`;
  };

  const sendMsg = (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text) return;
    
    setMessages(prev => [...prev, { id: Math.random().toString(), type: 'user', text }]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Math.random().toString(), 
        type: 'bot', 
        text: botReply(text),
        isHtml: true
      }]);
    }, 1500);
  };

  const clearChat = () => setMessages([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .chat-area { flex: 1; overflow-y: auto; padding: clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem); display: flex; flex-direction: column; gap: 1.125rem; }
        .chat-area::-webkit-scrollbar { width: 4px; }
        .chat-welcome { display: flex; flex-direction: column; align-items: center; text-align: center; margin: auto; padding: 1rem; max-width: 480px; }
        .welcome-icon { width: 60px; height: 60px; border-radius: 18px; background: var(--grad); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; }
        .welcome-icon svg { width: 30px; height: 30px; color: #fff; }
        .chat-welcome h2 { font-family: var(--ff-d); font-size: 1.5rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
        .chat-welcome p { font-size: 0.9rem; color: var(--fg3); line-height: 1.65; margin-bottom: 1.5rem; }
        .suggestions { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        .sug-chip { padding: 0.45em 0.875em; border-radius: var(--r-full); font-size: 0.8125rem; border: 1.5px solid var(--border); color: var(--fg2); cursor: pointer; background: transparent; font-family: var(--ff-b); transition: all 0.2s; }
        .sug-chip:hover { border-color: var(--c4); color: var(--fg); background: rgba(210,96,165,0.07); }
        .msg-row { display: flex; gap: 0.625rem; align-items: flex-end; max-width: 760px; }
        .msg-row.user { flex-direction: row-reverse; margin-left: auto; }
        .msg-av { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; }
        .msg-av.bot { background: var(--grad); color: #fff; }
        .msg-av.usr { background: var(--bg3); color: var(--fg2); font-size: 0.6875rem; }
        .bubble { padding: 0.8rem 1.0625rem; border-radius: 18px; font-size: 0.9rem; line-height: 1.65; max-width: 540px; }
        .bubble.user { background: var(--grad); color: #fff; border-radius: 18px 18px 4px 18px; }
        .bubble.bot { background: var(--bg2); color: var(--fg); border: 1px solid var(--border); border-radius: 18px 18px 18px 4px; }
        .result-cards { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.875rem; }
        .rcard { display: flex; align-items: center; gap: 0.75rem; background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 0.75rem 0.875rem; text-decoration: none; transition: background 0.2s, border-color 0.2s; cursor: pointer; }
        .rcard:hover { background: var(--card); border-color: var(--c5); }
        .rcard-num { font-family: var(--ff-d); font-size: 0.875rem; font-weight: 800; color: var(--fg3); width: 18px; flex-shrink: 0; }
        .rcard-icon { font-size: 1.25rem; flex-shrink: 0; }
        .rcard-info { flex: 1; min-width: 0; }
        .rcard-name { font-size: 0.875rem; font-weight: 600; color: var(--fg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rcard-meta { font-size: 0.6875rem; color: var(--fg3); margin-top: 0.125rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
        .rcard-price { font-size: 0.9rem; font-weight: 700; color: var(--fg); flex-shrink: 0; }
        .rbadge { display: inline-flex; padding: 0.15em 0.5em; border-radius: var(--r-full); font-size: 0.5rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
        .rb-al  { background: rgba(22,163,74,0.15);  color: #16a34a; }
        .rb-bk  { background: rgba(241,118,40,0.15); color: var(--c2); }
        .rb-alt { background: rgba(162,31,101,0.15); color: var(--c6); }
        .typing { display: flex; align-items: center; gap: 4px; padding: 0.8rem 1.0625rem; background: var(--bg2); border: 1px solid var(--border); border-radius: 18px 18px 18px 4px; width: fit-content; }
        .typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--fg3); animation: bounce 1.2s ease infinite; }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        .input-bar { border-top: 1px solid var(--border); padding: 0.875rem clamp(1rem, 3vw, 2rem); background: var(--bg); flex-shrink: 0; }
        .input-inner { display: flex; gap: 0.625rem; align-items: flex-end; max-width: 760px; margin: 0 auto; background: var(--bg2); border: 1.5px solid var(--border); border-radius: 16px; padding: 0.625rem 0.625rem 0.625rem 1.125rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .input-inner:focus-within { border-color: var(--c5); box-shadow: 0 0 0 3px rgba(181,86,144,0.1); }
        .input-inner textarea { flex: 1; background: transparent; border: none; outline: none; font-family: var(--ff-b); font-size: 0.9375rem; color: var(--fg); resize: none; max-height: 120px; line-height: 1.5; padding: 0.25rem 0; }
        .input-inner textarea::placeholder { color: var(--fg3); }
        .send-btn { width: 38px; height: 38px; border-radius: 11px; background: var(--grad); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity 0.2s, transform 0.2s; }
        .send-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .send-btn svg { width: 17px; height: 17px; color: #fff; }
      `}}/>

      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Akıllı Asistan</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <button onClick={clearChat} style={{ fontSize: ".8125rem", color: "var(--fg3)", fontFamily: "var(--ff-b)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Temizle</button>
          <ThemeToggle />
        </div>
      </div>

      <div className="chat-area" ref={chatAreaRef}>
        {messages.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <h2>Ne arıyorsunuz?</h2>
            <p>Bütçenizi, ihtiyacınızı ve tercihlerinizi anlatın — en uygun ürünleri analiz ederek önerelim.</p>
            <div className="suggestions">
              <button className="sug-chip" onClick={() => sendMsg('Hafta sonu kamp için çadır, ~2000₺')}>Hafta sonu kamp için çadır, ~2000₺</button>
              <button className="sug-chip" onClick={() => sendMsg('Sevgilime teknoloji hediyesi, 800₺')}>Sevgilime teknoloji hediyesi, 800₺</button>
              <button className="sug-chip" onClick={() => sendMsg('Spor için kablosuz kulaklık öner')}>Spor için kablosuz kulaklık öner</button>
              <button className="sug-chip" onClick={() => sendMsg('Mutfak için robot süpürge, orta bütçe')}>Mutfak için robot süpürge, orta bütçe</button>
            </div>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`msg-row ${m.type === 'user' ? 'user' : ''}`}>
            <div className={`msg-av ${m.type === 'user' ? 'usr' : 'bot'}`}>
              {m.type === 'user' ? initials : '🪶'}
            </div>
            {m.isHtml ? (
              <div className={`bubble ${m.type}`} dangerouslySetInnerHTML={{ __html: m.text }} />
            ) : (
              <div className={`bubble ${m.type}`}>{m.text}</div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="msg-row">
            <div className="msg-av bot">🪶</div>
            <div className="typing"><span></span><span></span><span></span></div>
          </div>
        )}
      </div>

      <div className="input-bar">
        <div className="input-inner">
          <textarea 
            ref={textareaRef}
            value={input}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            placeholder="İhtiyacınızı ve bütçenizi yazın..." 
            rows={1} 
          />
          <button className="send-btn" onClick={() => sendMsg()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
