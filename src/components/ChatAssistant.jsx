import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getFaqItems, POPULAR_IDS } from '../content/faqItems';

const WHATSAPP_URL = 'https://wa.me/447448611080';

// Small words that carry no meaning for matching (English + Ukrainian).
const STOP = new Set((
    'the and for with you your are have has not but can does did how what when where why who which will would should could from that this there their them they ' +
    'about into just also very some any all get got too out our its was were been being then than only once much many more most still even ever every ' +
    'що як чи для мені мене мій моя моє можна можу буде була були було який яка яке які якщо коли де чому хто або але для при від про над під між без ' +
    'так ще вже тільки дуже також треба потрібно мені тобі вам вас нас ваш ваша наш наша це цей ця ці'
).split(/\s+/));

const stem = (w) => w.slice(0, 5);

function tokens(text) {
    return (text || '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3 && !STOP.has(w))
        .map(stem);
}

// Scores every FAQ item against the visitor's text: matches in the question count more than matches in the answer.
function rank(query, entries) {
    const qt = [...new Set(tokens(query))];
    if (!qt.length) return [];
    return entries
        .map((e) => {
            let score = 0;
            qt.forEach((w) => {
                if (e.qStems.has(w)) score += 3;
                if (e.aStems.has(w)) score += 1;
            });
            return { id: e.id, score };
        })
        .filter((r) => r.score >= 3)
        .sort((a, b) => b.score - a.score);
}

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

export default function ChatAssistant() {
    const { t, lang } = useContent();
    const [open, setOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    // Messages hold ids/keys (not text) so the conversation re-renders in the other language when the site language changes.
    const [messages, setMessages] = useState([{ role: 'bot', kind: 'greeting' }]);
    const endRef = useRef(null);
    const inputRef = useRef(null);
    const timer = useRef(null);

    const items = useMemo(() => getFaqItems(lang), [lang]);
    const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
    const entries = useMemo(
        () => items.map((i) => ({ id: i.id, qStems: new Set(tokens(t(i.q))), aStems: new Set(tokens(t(i.a))) })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, lang]
    );

    useEffect(() => () => clearTimeout(timer.current), []);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages, typing, open, showAll]);
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

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
        setMessages((m) => [...m, { role: 'user', kind: 'question', id }]);
        const others = items.filter((i) => i.id !== id && !askedIds.has(i.id));
        reply([{ role: 'bot', kind: 'answer', id }, { role: 'bot', kind: 'more', exclude: [id], others: others.length }]);
    };

    const submit = (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || typing) return;
        setInput('');
        const results = rank(text, entries);
        setMessages((m) => [...m, { role: 'user', kind: 'text', text }]);
        if (results.length) {
            const best = results[0].id;
            const related = results.slice(1, 3).map((r) => r.id);
            reply([{ role: 'bot', kind: 'answer', id: best, related }]);
        } else {
            reply([{ role: 'bot', kind: 'nomatch' }]);
        }
    };

    const popular = POPULAR_IDS.map((id) => byId[id]).filter(Boolean);
    const chipItems = (exclude = []) => {
        const pool = showAll ? items : popular;
        return pool.filter((i) => !exclude.includes(i.id) && !askedIds.has(i.id));
    };

    const Chip = ({ id }) => (
        <button
            type="button"
            onClick={() => askItem(id)}
            disabled={typing}
            className="text-left text-[13px] leading-snug font-body text-foreground/85 bg-white border border-[#EAE0C5] hover:border-[#B38B4D] hover:text-[#8a6a35] rounded-2xl px-3.5 py-2 transition-colors disabled:opacity-50"
        >
            {t(byId[id].q)}
        </button>
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
                <div key={idx} className="space-y-2">
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
                <div key={idx} className="space-y-2">
                    <Bubble role="bot">{t('CHAT_NO_MATCH')}</Bubble>
                    <WhatsAppButton />
                </div>
            );
        }
        return null;
    };

    // The suggestion chips are shown under the latest bot message only.
    const last = messages[messages.length - 1];
    const showChips = !typing && (last.kind === 'greeting' || last.kind === 'more' || last.kind === 'nomatch' || last.kind === 'answer');
    const chips = chipItems(last.kind === 'answer' ? [last.id] : []);

    return (
        <>
            <AnimatePresence>
                {!open && (
                    <motion.button
                        key="launcher"
                        type="button"
                        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 350); }}
                        aria-label={t('CHAT_OPEN_LABEL')}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-5 right-5 z-[1000] flex items-center gap-2 h-14 pl-4 pr-4 md:pr-5 rounded-full bg-[#B38B4D] text-white shadow-[0_8px_24px_rgba(179,139,77,0.45)] hover:bg-[#9f7a41] transition-colors"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="hidden md:inline text-[11px] tracking-[0.18em] uppercase font-medium">{t('CHAT_OPEN_LABEL')}</span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        role="dialog"
                        aria-label={t('CHAT_TITLE')}
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="fixed z-[1001] bottom-0 right-0 left-0 sm:left-auto sm:bottom-5 sm:right-5 sm:w-[390px] h-[82vh] sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] flex flex-col bg-[#FAF8F3] border border-[#EAE0C5] rounded-t-2xl sm:rounded-2xl shadow-[0_20px_60px_rgba(43,38,34,0.25)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3.5 bg-foreground text-background shrink-0">
                            <div className="w-9 h-9 rounded-full bg-[#B38B4D] flex items-center justify-center font-display font-semibold text-lg text-white">M</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-display font-semibold text-[17px] leading-tight">{t('CHAT_TITLE')}</p>
                                <p className="text-[11px] text-background/60 font-body truncate">{t('CHAT_SUBTITLE')}</p>
                            </div>
                            <button type="button" onClick={() => setOpen(false)} aria-label={t('CHAT_CLOSE')} className="p-2 -mr-1 text-background/70 hover:text-background transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Conversation */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {messages.map(renderMessage)}
                            {typing && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-[#EAE0C5] rounded-2xl rounded-bl-md"><TypingDots /></div>
                                </div>
                            )}
                            {showChips && (
                                <div className="space-y-2 pt-1">
                                    {(last.kind === 'more' || last.kind === 'answer') && (
                                        <p className="text-[12px] text-muted-foreground font-body px-1">{t('CHAT_ANYTHING_ELSE')}</p>
                                    )}
                                    <div className="flex flex-col items-start gap-1.5">
                                        {chips.map((i) => <Chip key={i.id} id={i.id} />)}
                                    </div>
                                    <div className="flex items-center gap-3 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowAll((v) => !v)}
                                            className="text-[12px] font-body font-medium text-[#8a6a35] underline underline-offset-4 decoration-[#B38B4D]/50"
                                        >
                                            {t(showAll ? 'CHAT_SHOW_LESS' : 'CHAT_SHOW_ALL')}
                                        </button>
                                    </div>
                                    {last.kind !== 'nomatch' && last.kind !== 'greeting' && <div className="pt-1"><WhatsAppButton /></div>}
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={submit} className="shrink-0 border-t border-[#EAE0C5] bg-white px-3 pt-3 pb-2">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t('CHAT_PLACEHOLDER')}
                                    maxLength={200}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
