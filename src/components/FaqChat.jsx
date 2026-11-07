import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronRight, Check, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getFaqGroups, getFaqItems, POPULAR_IDS } from '../content/faqItems';
import { buildEntries, rank, suggest } from '../lib/faqSearch';

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

    const live = useMemo(() => suggest(input, entries, 5), [input, entries]);

    useEffect(() => () => clearTimeout(timer.current), []);
    // The chat grows with the page (no scrolling box inside the page, which is hard to use on a phone).
    // When an answer arrives, the page scrolls so the START of the answer sits just below the menu bar.
    useEffect(() => {
        const box = scrollRef.current;
        if (!box || messages.length < 2 || typing) return;
        const last = messages[messages.length - 1];
        if (!(last.kind === 'more' || last.kind === 'answer' || last.kind === 'nomatch')) return;
        const answers = box.querySelectorAll('[data-answer]');
        answers[answers.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [messages, typing]);

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
        setInput('');
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

    // Menu-style row for a suggested question; a tick marks the ones already answered.
    const Row = ({ id }) => (
        <button
            type="button"
            onClick={() => askItem(id)}
            disabled={typing}
            className="group w-full flex items-center gap-3 py-3.5 text-left border-b border-[#EAE0C5]/80 last:border-b-0 transition-colors disabled:opacity-60"
        >
            <span className="flex-1 text-[15px] leading-snug font-body text-foreground/90 group-hover:text-[#8a6a35]">{t(byId[id].q)}</span>
            {askedIds.has(id)
                ? <Check className="w-4 h-4 text-[#B38B4D] shrink-0" />
                : <ChevronRight className="w-4 h-4 text-[#B38B4D]/60 group-hover:text-[#B38B4D] group-hover:translate-x-0.5 transition-transform shrink-0" />}
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
        <div>
            <div className="flex gap-5 overflow-x-auto border-b border-[#EAE0C5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={t('CHAT_PICK')}>
                {tabs.map((x) => (
                    <button
                        key={x.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab.id === x.id}
                        onClick={() => setTab(x.id)}
                        className={`shrink-0 -mb-px pb-3 text-[12px] tracking-[0.14em] uppercase font-body font-medium border-b-2 transition-colors ${
                            activeTab.id === x.id ? 'border-[#B38B4D] text-[#8a6a35]' : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {t(x.label)}
                    </button>
                ))}
            </div>
            <div>
                {activeTab.ids.filter((id) => byId[id]).map((id) => <Row key={id} id={id} />)}
            </div>
        </div>
    );

    const Bubble = ({ role, children }) => (
        <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-[14.5px] leading-[1.65] font-body whitespace-pre-line ${
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
        if (m.kind === 'greeting') return null; // no greeting text: the question list is shown straight away
        if (m.kind === 'question') return <Bubble key={idx} role="user">{t(byId[m.id]?.q)}</Bubble>;
        if (m.kind === 'text') return <Bubble key={idx} role="user">{m.text}</Bubble>;
        if (m.kind === 'answer') {
            const it = byId[m.id];
            if (!it) return null;
            return (
                <div key={idx} data-answer className="space-y-2 scroll-mt-28">
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
                <div key={idx} data-answer className="space-y-2 scroll-mt-28">
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
        <div className="bg-white border border-[#EAE0C5] rounded-2xl shadow-[0_10px_40px_rgba(179,139,77,0.10)] overflow-hidden">
            {/* Header: slim, tinted bar */}
            <div className="flex items-center gap-3 px-5 md:px-7 py-3 bg-[#FAF5EB] border-b border-[#EAE0C5]">
                <img src="/favicon-square.png" alt="" aria-hidden="true" className="w-9 h-9 object-contain shrink-0" />
                <p className="min-w-0 truncate text-[13px] font-body text-foreground/80">
                    <span className="font-semibold text-foreground">{t('CHAT_TITLE')}</span>
                    <span className="hidden sm:inline text-muted-foreground"> · {t('CHAT_SUBTITLE')}</span>
                </p>
            </div>

            {/* Conversation: grows with the page */}
            <div ref={scrollRef} className="px-5 md:px-7 py-5 space-y-4 bg-[#FDFBF7]">
                {messages.map(renderMessage)}
                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#EAE0C5] rounded-2xl rounded-bl-md"><TypingDots /></div>
                    </div>
                )}
                {showSuggestions && (
                    <div className="space-y-3">
                        {afterAnswer && (
                            <p className="text-[13px] text-muted-foreground font-body pt-1">{t('CHAT_ANYTHING_ELSE')}</p>
                        )}
                        {afterAnswer && (
                            <button
                                type="button"
                                onClick={() => setBrowse((v) => !v)}
                                aria-expanded={browse}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EAE0C5] hover:border-[#B38B4D] text-[13px] font-body font-medium text-[#8a6a35] transition-colors"
                            >
                                {t(browse ? 'CHAT_HIDE' : 'CHAT_BROWSE')}
                                <ChevronDown className={`w-4 h-4 transition-transform ${browse ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                        {listOpen && live.length === 0 && <QuestionBrowser />}
                        {last.kind !== 'greeting' && last.kind !== 'nomatch' && <div className="pt-1"><WhatsAppButton /></div>}
                    </div>
                )}
                <div ref={endRef} />
            </div>

            {/* Live suggestions: the matching questions appear while typing */}
            {live.length > 0 && !typing && (
                <div className="border-t border-[#EAE0C5] bg-[#FDFBF7] px-5 md:px-7 pt-2 pb-1" role="listbox" aria-label={t('CHAT_SUGGESTIONS')}>
                    <p className="text-[11px] tracking-[0.14em] uppercase font-body text-muted-foreground pt-1 pb-0.5">{t('CHAT_SUGGESTIONS')}</p>
                    {live.map((r) => byId[r.id] && <Row key={r.id} id={r.id} />)}
                </div>
            )}

            {/* Input */}
            <form onSubmit={submit} className="border-t border-[#EAE0C5] bg-white px-4 md:px-6 py-4">
                <div className="flex items-center gap-2.5">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('CHAT_PLACEHOLDER')}
                        maxLength={200}
                        aria-label={t('CHAT_PLACEHOLDER')}
                        className="flex-1 min-w-0 h-12 px-5 rounded-full bg-[#FAF8F3] border border-[#EAE0C5] text-[16px] font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#B38B4D] transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || typing}
                        aria-label={t('CHAT_SEND')}
                        className="w-12 h-12 shrink-0 rounded-full bg-[#B38B4D] hover:bg-[#9f7a41] text-white flex items-center justify-center transition-colors disabled:opacity-40"
                    >
                        <Send className="w-[18px] h-[18px]" />
                    </button>
                </div>
                <p className="text-[11px] text-muted-foreground/70 font-body text-center mt-3">{t('CHAT_DISCLAIMER')}</p>
            </form>
        </div>
    );
}
