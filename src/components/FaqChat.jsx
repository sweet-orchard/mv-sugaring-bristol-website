import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronRight, Check, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getFaqGroups, getFaqItems, POPULAR_IDS } from '../content/faqItems';
import { buildEntries, rank } from '../lib/faqSearch';

const WHATSAPP_URL = 'https://wa.me/447448611080';

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#B38B4D]/70"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </div>
    );
}

// FAQ shown as a chat: pick a topic and a question, or type your own. Lives inside the FAQ section.
export default function FaqChat() {
    const { t, lang } = useContent();
    const [tab, setTab] = useState('popular');
    const [browse, setBrowse] = useState(false);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    // Messages hold ids/keys (not text) so the conversation re-renders in the other language when the site language changes.
    const [messages, setMessages] = useState([{ role: 'bot', kind: 'greeting' }]);
    const endRef = useRef(null);
    const scrollRef = useRef(null);
    const timer = useRef(null);

    const items = useMemo(() => getFaqItems(lang), [lang]);
    const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
    const entries = useMemo(
        () => buildEntries(items, t),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, lang]
    );

    useEffect(() => () => clearTimeout(timer.current), []);
    // Scrolls only the chat box, never the page. When an answer arrives its START is brought into view,
    // so long answers can be read from the first line; otherwise the chat follows the conversation.
    useEffect(() => {
        const box = scrollRef.current;
        if (!box || messages.length < 2) return;
        const last = messages[messages.length - 1];
        const answers = box.querySelectorAll('[data-answer]');
        const target = !typing && (last.kind === 'more' || last.kind === 'answer' || last.kind === 'nomatch')
            ? answers[answers.length - 1]
            : null;
        box.scrollTo({ top: target ? Math.max(0, target.offsetTop - 12) : box.scrollHeight, behavior: 'smooth' });
    }, [messages, typing]);
    useEffect(() => {
        const box = scrollRef.current;
        if (browse && box) setTimeout(() => box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' }), 60);
    }, [browse]);

    const askedIds = new Set(messages.filter((m) => m.kind === 'answer').map((m) => m.id));

    const reply = (botMessages) => {
        setTyping(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setTyping(false);
            setMessages((m) => [...m, ...botMessages]);
        }, 650);
    };

    const askItem = (id) => {
        if (typing) return;
        setBrowse(false);
        setMessages((m) => [...m, { role: 'user', kind: 'question', id }]);
        const others = items.filter((i) => i.id !== id && !askedIds.has(i.id));
        reply([{ role: 'bot', kind: 'answer', id }, { role: 'bot', kind: 'more', exclude: [id], others: others.length }]);
    };

    const submit = (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || typing) return;
        setInput('');
        setBrowse(false);
        const results = rank(text, entries);
        setMessages((m) => [...m, { role: 'user', kind: 'text', text }]);
        if (results && results.length) {
            const best = results[0].id;
            const related = results.slice(1, 3).map((r) => r.id);
            reply([{ role: 'bot', kind: 'answer', id: best, related }]);
        } else {
            reply([{ role: 'bot', kind: 'nomatch' }]);
        }
    };

    const groups = getFaqGroups(lang);
    const tabs = [
        { id: 'popular', label: 'CHAT_TAB_POPULAR', ids: POPULAR_IDS },
        { id: 'booking', label: 'CHAT_TAB_BOOKING', ids: groups[0].items.map((i) => i.id) },
        { id: 'aftercare', label: 'CHAT_TAB_AFTERCARE', ids: groups[1].items.map((i) => i.id) },
        { id: 'good', label: 'CHAT_TAB_GOOD', ids: groups[2].items.map((i) => i.id) },
    ];
    const activeTab = tabs.find((x) => x.id === tab) || tabs[0];

    // Compact, menu-style row for a suggested question; a tick marks the ones already answered.
    const Row = ({ id }) => (
        <button
            type="button"
            onClick={() => askItem(id)}
            disabled={typing}
            className="group w-full flex items-center gap-3 px-4 py-3 text-left bg-white hover:bg-[#FBF6EA] transition-colors disabled:opacity-60"
        >
            <span className="flex-1 text-[13.5px] leading-snug font-body text-foreground/90 group-hover:text-[#7a5c2a]">{t(byId[id].q)}</span>
            {askedIds.has(id)
                ? <Check className="w-4 h-4 text-[#B38B4D] shrink-0" />
                : <ChevronRight className="w-4 h-4 text-[#B38B4D]/60 group-hover:text-[#B38B4D] shrink-0" />}
        </button>
    );

    const Chip = ({ id }) => (
        <button
            type="button"
            onClick={() => askItem(id)}
            disabled={typing}
            className="text-left text-[13px] leading-snug font-body text-foreground/85 bg-white border border-[#EAE0C5] hover:border-[#B38B4D] hover:text-[#7a5c2a] rounded-full px-3.5 py-2 transition-colors disabled:opacity-50"
        >
            {t(byId[id].q)}
        </button>
    );

    const QuestionBrowser = () => (
        <div className="rounded-2xl border border-[#EAE0C5] bg-white overflow-hidden shadow-[0_2px_10px_rgba(179,139,77,0.08)]">
            <div className="flex gap-1.5 overflow-x-auto px-3 pt-3 pb-2 border-b border-[#EAE0C5]/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={t('CHAT_PICK')}>
                {tabs.map((x) => (
                    <button
                        key={x.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab.id === x.id}
                        onClick={() => setTab(x.id)}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase font-body font-medium transition-colors ${
                            activeTab.id === x.id ? 'bg-[#B38B4D] text-white' : 'bg-[#FAF5EB] text-[#7a5c2a] hover:bg-[#F1E7D0]'
                        }`}
                    >
                        {t(x.label)}
                    </button>
                ))}
            </div>
            <div className="divide-y divide-[#EAE0C5]/60">
                {activeTab.ids.filter((id) => byId[id]).map((id) => <Row key={id} id={id} />)}
            </div>
        </div>
    );

    const Bubble = ({ role, children }) => (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-[1.6] font-body whitespace-pre-line ${
                    role === 'user'
                        ? 'bg-[#B38B4D] text-white rounded-br-md'
                        : 'bg-white text-foreground/85 border border-[#EAE0C5] rounded-bl-md'
                }`}
            >
                {children}
            </div>
        </div>
    );

    const WhatsAppButton = () => (
        <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B38B4D] hover:bg-[#9f7a41] text-white text-[11px] tracking-[0.15em] uppercase font-medium rounded-full transition-colors"
        >
            {t('CHAT_WHATSAPP_BUTTON')}
        </a>
    );

    const renderMessage = (m, idx) => {
        if (m.kind === 'greeting') return <Bubble key={idx} role="bot">{t('CHAT_GREETING')}</Bubble>;
        if (m.kind === 'question') return <Bubble key={idx} role="user">{t(byId[m.id]?.q)}</Bubble>;
        if (m.kind === 'text') return <Bubble key={idx} role="user">{m.text}</Bubble>;
        if (m.kind === 'answer') {
            const it = byId[m.id];
            if (!it) return null;
            return (
                <div key={idx} data-answer className="space-y-2">
                    <Bubble role="bot">
                        <span className="block font-semibold text-foreground mb-1">{t(it.q)}</span>
                        {t(it.a)}
                    </Bubble>
                    {m.related?.length > 0 && (
                        <div className="space-y-1.5">
                            <p className="text-[11px] text-muted-foreground font-body px-1">{t('CHAT_RELATED')}</p>
                            <div className="flex flex-col items-start gap-1.5">
                                {m.related.map((id) => byId[id] && <Chip key={id} id={id} />)}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        if (m.kind === 'nomatch') {
            return (
                <div key={idx} data-answer className="space-y-2">
                    <Bubble role="bot">{t('CHAT_NO_MATCH')}</Bubble>
                    <WhatsAppButton />
                </div>
            );
        }
        return null;
    };

    // The suggestion chips are shown under the latest bot message only.
    const last = messages[messages.length - 1];
    const afterAnswer = last.kind === 'more' || last.kind === 'answer';
    const showSuggestions = !typing && (afterAnswer || last.kind === 'greeting' || last.kind === 'nomatch');
    // After an answer the question list is collapsed, so the answer stays the focus; the visitor opens it on demand.
    const listOpen = !afterAnswer || browse;

    return (
        <div className="flex flex-col h-[600px] md:h-[640px] bg-[#FAF8F3] border border-[#EAE0C5] rounded-2xl shadow-[0_12px_40px_rgba(43,38,34,0.08)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-foreground text-background shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#B38B4D] flex items-center justify-center font-display font-semibold text-lg text-white">M</div>
                <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-[17px] leading-tight">{t('CHAT_TITLE')}</p>
                    <p className="text-[11px] text-background/60 font-body truncate">{t('CHAT_SUBTITLE')}</p>
                </div>
            </div>

            {/* Conversation */}
            <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
                {messages.map(renderMessage)}
                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#EAE0C5] rounded-2xl rounded-bl-md"><TypingDots /></div>
                    </div>
                )}
                {showSuggestions && (
                    <div className="space-y-3 pt-1">
                        {afterAnswer && (
                            <p className="text-[12px] text-muted-foreground font-body px-1">{t('CHAT_ANYTHING_ELSE')}</p>
                        )}
                        {afterAnswer && (
                            <button
                                type="button"
                                onClick={() => setBrowse((v) => !v)}
                                aria-expanded={browse}
                                className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-white border border-[#EAE0C5] hover:border-[#B38B4D] text-[13px] font-body font-medium text-[#7a5c2a] transition-colors"
                            >
                                {t(browse ? 'CHAT_HIDE' : 'CHAT_BROWSE')}
                                <ChevronDown className={`w-4 h-4 transition-transform ${browse ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                        {listOpen && <QuestionBrowser />}
                        {last.kind !== 'greeting' && last.kind !== 'nomatch' && <div className="pt-1"><WhatsAppButton /></div>}
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={submit} className="shrink-0 border-t border-[#EAE0C5] bg-white px-3 pt-3 pb-2">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('CHAT_PLACEHOLDER')}
                        maxLength={200}
                        aria-label={t('CHAT_PLACEHOLDER')}
                        className="flex-1 min-w-0 h-11 px-4 rounded-full bg-[#FAF8F3] border border-[#EAE0C5] text-[16px] sm:text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#B38B4D]"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || typing}
                        aria-label={t('CHAT_SEND')}
                        className="w-11 h-11 shrink-0 rounded-full bg-[#B38B4D] hover:bg-[#9f7a41] text-white flex items-center justify-center transition-colors disabled:opacity-40"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-muted-foreground/70 font-body text-center mt-2">{t('CHAT_DISCLAIMER')}</p>
            </form>
        </div>
    );
}
