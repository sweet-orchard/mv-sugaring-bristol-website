// Keyword search over the FAQ (English and Ukrainian). No external service: it only matches words in the FAQ texts.

// Small words that carry no meaning for matching.
const STOP = new Set((
    'the and for with you your are have has not but can does did how what when where why who which will would should could from that this there their them they ' +
    'about into just also very some any all get got too out our its was were been being then than only once much many more most still even ever every ' +
    'що як чи для мені мене мій моя моє можна можу буде була були було який яка яке які якщо коли де чому хто або але при від про над під між без ' +
    'так ще вже тільки дуже також треба потрібно тобі вам вас нас ваш ваша наш наша це цей ця ці'
).split(/\s+/));

const stem = (w) => w.slice(0, 5);

export function tokens(text) {
    return (text || '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3 && !STOP.has(w))
        .map(stem);
}

const words = (text) =>
    (text || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length >= 2);

export function buildEntries(items, t) {
    return items.map((i) => ({
        id: i.id,
        qStems: new Set(tokens(t(i.q))),
        aStems: new Set(tokens(t(i.a))),
        qWords: words(t(i.q)),
        aWords: [...new Set(words(t(i.a)))],
    }));
}

// Live suggestions while typing: every typed word (even half a word) is matched against the start of
// the words in the question (3 points) and in the answer (1 point). Words must all be typed meaningfully
// (2+ letters, not filler words); returns the best questions first.
export function suggest(query, entries, limit = 5) {
    const qw = words(query).filter((w) => !STOP.has(w));
    if (!qw.length) return [];
    return entries
        .map((e) => {
            let score = 0;
            let questionHits = 0;
            qw.forEach((w) => {
                if (e.qWords.some((x) => x.startsWith(w))) { score += 3; questionHits += 1; }
                else if (e.aWords.some((x) => x.startsWith(w))) score += 1;
            });
            return { id: e.id, score, questionHits };
        })
        .filter((r) => r.questionHits > 0 || r.score >= 2)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

// Matches in the question count three times more than matches in the answer.
export function rank(query, entries) {
    const qt = [...new Set(tokens(query))];
    if (!qt.length) return null; // nothing searchable typed yet
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
