// Single source of truth for the FAQ order. Used by the FAQ section and the chat assistant.
// The English and Ukrainian texts of the older "Experience & Conditions" questions are not
// aligned key by key, so that group is listed per language.
const item = (id, q, a) => ({ id, q, a });

const prep = [
    item('book', 'FAQ2_BOOK_Q', 'FAQ2_BOOK_A'),
    item('hair-length', 'FAQ_CAT1_Q1', 'FAQ_CAT1_A1'),
    item('hair-longer', 'FAQ_CAT1_Q3', 'FAQ_CAT1_A3'),
    item('holiday-short', 'FAQ_CAT1_Q2', 'FAQ_CAT1_A2'),
    item('holiday-book', 'FAQ_CAT1_Q5', 'FAQ_CAT1_A5'),
    item('before', 'FAQ_CAT1_Q4', 'FAQ_CAT1_A4'),
    item('duration', 'FAQ2_DURATION_Q', 'FAQ2_DURATION_A'),
    item('deposit', 'FAQ2_DEPOSIT_Q', 'FAQ2_DEPOSIT_A'),
    item('location', 'FAQ2_LOCATION_Q', 'FAQ2_LOCATION_A'),
];

const aftercare = [
    item('aftercare', 'FAQ_CAT3_Q1', 'FAQ_CAT3_A1'),
    item('ingrown', 'FAQ2_INGROWN_Q', 'FAQ2_INGROWN_A'),
    item('frequency', 'FAQ2_FREQUENCY_Q', 'FAQ2_FREQUENCY_A'),
];

const experienceEn = [
    item('avoid', 'FAQ2_AVOID_Q', 'FAQ2_AVOID_A'),
    item('hurt', 'FAQ_CAT2_Q1', 'FAQ_CAT2_A1'),
    item('period', 'FAQ_CAT2_Q2', 'FAQ_CAT2_A2'),
    item('pregnant', 'FAQ_CAT2_Q3', 'FAQ_CAT2_A3'),
    item('moles', 'FAQ_CAT2_Q4', 'FAQ_CAT2_A4'),
    item('veins', 'FAQ_CAT2_Q5', 'FAQ_CAT2_A5'),
    item('age', 'FAQ_CAT2_Q6', 'FAQ_CAT2_A6'),
    item('shy', 'FAQ_CAT2_Q8', 'FAQ_CAT2_A8'),
    item('vs-waxing', 'FAQ_CAT3_Q2', 'FAQ_CAT3_A2'),
];

const experienceUk = [
    item('avoid', 'FAQ2_AVOID_Q', 'FAQ2_AVOID_A'),
    item('hurt', 'FAQ_CAT2_Q1', 'FAQ_CAT2_A1'),
    item('period', 'FAQ_CAT2_Q2', 'FAQ_CAT2_A2'),
    item('pregnant', 'FAQ_CAT2_Q3', 'FAQ_CAT2_A3'),
    item('moles', 'FAQ_CAT2_Q4', 'FAQ_CAT2_A4'),
    item('veins', 'FAQ_CAT2_Q5', 'FAQ_CAT2_A5'),
    item('stretch', 'FAQ_CAT2_Q6', 'FAQ_CAT2_A6'),
    item('sweat', 'FAQ_CAT2_Q7', 'FAQ_CAT2_A7'),
    item('age', 'FAQ_CAT2_Q8', 'FAQ_CAT2_A8'),
    item('skin-health', 'FAQ_CAT3_Q2', 'FAQ_CAT3_A2'),
];

export function getFaqGroups(lang) {
    return [
        { nameKey: 'FAQ_CAT_1_NAME', items: prep },
        { nameKey: 'FAQ_CAT_3_NAME', items: aftercare },
        { nameKey: 'FAQ_CAT_2_NAME', items: lang === 'uk' ? experienceUk : experienceEn },
    ];
}

export function getFaqItems(lang) {
    return getFaqGroups(lang).flatMap((g) => g.items);
}

// Questions shown first in the chat assistant.
export const POPULAR_IDS = ['book', 'deposit', 'location', 'hair-length', 'before', 'duration'];
