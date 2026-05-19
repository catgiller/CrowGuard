"use client";

import { useState, useRef, useEffect } from "react";
import { MenuButton } from "@/components/menu-button";
import { useDashboard } from "@/contexts/dashboard-context";
import { apiFetch } from "@/lib/api";

interface RecommendedProduct {
  name: string;
  price: number;
  reason: string;
  confidence: number;
  trendyol_url: string;
  akakce_url: string;
  google_shopping_url: string;
  trend_direction: string;
  trend_score: number;
  youtube_video_count: number;
  youtube_latest_url: string;
}

interface AdvisorResponse {
  recommendations: RecommendedProduct[];
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  text?: string;
  recommendations?: RecommendedProduct[];
  error?: string;
}

function confidenceBadge(confidence: number) {
  if (confidence >= 80) return { cls: 'rb-al', label: 'AL' };
  if (confidence >= 55) return { cls: 'rb-bk', label: 'BEKLE' };
  return { cls: 'rb-alt', label: 'ARAŞTIR' };
}

function trendLabel(direction: string) {
  if (direction === 'YUKSELIYOR') return '↑ Trend Yüksek';
  if (direction === 'DUSUYOR') return '↓ Trend Düşük';
  return '→ Stabil';
}

function RecommendationCards({ recs }: { recs: RecommendedProduct[] }) {
  const icons = ['🛍️','💡','⭐'];
  return (
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', marginBottom: '0.75rem' }}>
        {recs.length} öneri bulundu — AI destekli analiz:
      </p>
      <div className="result-cards">
        {recs.map((r, i) => {
          const badge = confidenceBadge(r.confidence);
          return (
            <div key={i} className="rcard rcard-real">
              <span className="rcard-num">0{i + 1}</span>
              <span className="rcard-icon">{icons[i] || '🛍️'}</span>
              <div className="rcard-info">
                <div className="rcard-name">{r.name}</div>
                <div className="rcard-meta">
                  <span className={`rbadge ${badge.cls}`}>{badge.label}</span>
                  <span>%{r.confidence} güven</span>
                  {r.trend_score > 0 && <span>{trendLabel(r.trend_direction)}</span>}
                  {r.youtube_video_count > 0 && <span>▶ {r.youtube_video_count} video</span>}
                </div>
                <div className="rcard-reason">{r.reason}</div>
                <div className="rcard-links">
                  {r.trendyol_url && <a href={r.trendyol_url} target="_blank" rel="noopener noreferrer" className="rcard-link">Trendyol</a>}
                  {r.akakce_url && <a href={r.akakce_url} target="_blank" rel="noopener noreferrer" className="rcard-link">Akakçe</a>}
                  {r.google_shopping_url && <a href={r.google_shopping_url} target="_blank" rel="noopener noreferrer" className="rcard-link">Google</a>}
                  {r.youtube_latest_url && <a href={r.youtube_latest_url} target="_blank" rel="noopener noreferrer" className="rcard-link">YouTube</a>}
                </div>
              </div>
              <span className="rcard-price">₺{r.price.toLocaleString('tr-TR')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SmartAdvisorPage() {
  const { initials, isPro } = useDashboard();
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

  const sendMsg = async (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { id: Math.random().toString(), type: 'user', text }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setIsTyping(true);
    try {
      const data = await apiFetch<AdvisorResponse>("/smart-advisor", {
        method: "POST",
        body: JSON.stringify({ query: text }),
      });
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        type: 'bot',
        recommendations: data.recommendations,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        type: 'bot',
        error: 'Asistan şu an çok yoğun, lütfen biraz sonra tekrar deneyin.',
      }]);
    } finally {
      setIsTyping(false);
    }
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
        .rcard { display: flex; align-items: flex-start; gap: 0.75rem; background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 0.75rem 0.875rem; text-decoration: none; transition: background 0.2s, border-color 0.2s; }
        .rcard:hover { background: var(--card); border-color: var(--c5); }
        .rcard-num { font-family: var(--ff-d); font-size: 0.875rem; font-weight: 800; color: var(--fg3); width: 18px; flex-shrink: 0; padding-top: 2px; }
        .rcard-icon { font-size: 1.25rem; flex-shrink: 0; padding-top: 2px; }
        .rcard-info { flex: 1; min-width: 0; }
        .rcard-name { font-size: 0.875rem; font-weight: 600; color: var(--fg); }
        .rcard-meta { font-size: 0.6875rem; color: var(--fg3); margin-top: 0.25rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
        .rcard-reason { font-size: 0.775rem; color: var(--fg2); margin-top: 0.375rem; line-height: 1.5; }
        .rcard-links { display: flex; gap: 0.375rem; margin-top: 0.5rem; flex-wrap: wrap; }
        .rcard-link { font-size: 0.7rem; font-weight: 600; color: var(--c5); text-decoration: none; padding: 0.2em 0.6em; border: 1px solid var(--c5); border-radius: var(--r-full); opacity: 0.8; transition: opacity 0.15s; }
        .rcard-link:hover { opacity: 1; }
        .rcard-price { font-size: 0.9rem; font-weight: 700; color: var(--fg); flex-shrink: 0; white-space: nowrap; }
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
        </div>
      </div>

      {!isPro && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", background: "rgba(241,118,40,0.07)", borderBottom: "1px solid rgba(241,118,40,0.15)", fontSize: "0.75rem", color: "var(--c2)", fontWeight: 600 }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "14px", height: "14px", flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Ücretsiz planda günlük <strong style={{ margin: "0 0.2em" }}>3 sorgu</strong> hakkınız bulunmaktadır. Sınırsız kullanım için Pro&apos;ya geçin.
        </div>
      )}

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
            <div className={`bubble ${m.type}`}>
              {m.type === 'user' && m.text}
              {m.type === 'bot' && m.recommendations && <RecommendationCards recs={m.recommendations} />}
              {m.type === 'bot' && m.error && <span style={{ color: 'var(--c2)' }}>{m.error}</span>}
            </div>
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
