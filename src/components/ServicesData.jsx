import { T } from '../context/ContentContext';
import { Heart, Sparkles, ArrowDown, Smile } from 'lucide-react';

export const getServicesData = (t) => ({
    inclusions: [
        { title: <T id="SERVICES_INCLUSION_1_TITLE" />, desc: <T id="SERVICES_INCLUSION_1_DESC" /> },
        { title: <T id="SERVICES_INCLUSION_2_TITLE" />, desc: <T id="SERVICES_INCLUSION_2_DESC" /> },
        { title: <T id="SERVICES_INCLUSION_3_TITLE" />, desc: <T id="SERVICES_INCLUSION_3_DESC" /> },
    ],
    durationNotes: [
        { title: <T id="DURATION_NOTE_1_TITLE" />, desc: <T id="DURATION_NOTE_1_DESC" /> },
        { title: <T id="DURATION_NOTE_2_TITLE" />, desc: <T id="DURATION_NOTE_2_DESC" /> },
        { title: <T id="DURATION_NOTE_3_TITLE" />, desc: <T id="DURATION_NOTE_3_DESC" /> },
        { title: <T id="DURATION_NOTE_4_TITLE" />, desc: <T id="DURATION_NOTE_4_DESC" /> },
        { title: <T id="DURATION_NOTE_5_TITLE" />, desc: <T id="DURATION_NOTE_5_DESC" /> },
        { title: <T id="DURATION_NOTE_6_TITLE" />, desc: <T id="DURATION_NOTE_6_DESC" /> },
    ],
    categories: [
        {
            id: 'face',
            label: <T id="SERVICES_TAB_FACE" />,
            fullLabel: <T id="FACE_TAB_FULL_LABEL" />,
            Icon: Smile,
            beforeImage: null,
            afterImage: null,
            tagline: <T id="FACE_TAGLINE" />,
            groups: [
                {
                    groupName: <T id="FACE_GROUP_INDIVIDUAL" />,
                    items: [
                        { name: <T id="FACE_SERVICE_1_NAME" />, price: <T id="PRICE_ITEM_1" />, duration: <T id="FACE_SERVICE_1_DURATION" />, desc: <T id="FACE_SERVICE_1_DESC" />, image: '/price-list/face/upper lip.webp' },
                        { name: <T id="FACE_SERVICE_2_NAME" />, price: <T id="PRICE_ITEM_2" />, duration: <T id="FACE_SERVICE_2_DURATION" />, desc: <T id="FACE_SERVICE_2_DESC" />, image: '/price-list/face/chin.webp' },
                        { name: <T id="FACE_SERVICE_3_NAME" />, price: <T id="PRICE_ITEM_3" />, duration: <T id="FACE_SERVICE_3_DURATION" />, desc: <T id="FACE_SERVICE_3_DESC" />, image: '/price-list/face/nose pores.webp' },
                        { name: <T id="FACE_SERVICE_4_NAME" />, price: <T id="PRICE_ITEM_4" />, duration: <T id="FACE_SERVICE_4_DURATION" />, desc: <T id="FACE_SERVICE_4_DESC" />, image: '/price-list/face/nostrils.webp' },
                        { name: <T id="FACE_SERVICE_5_NAME" />, price: <T id="PRICE_ITEM_5" />, duration: <T id="FACE_SERVICE_5_DURATION" />, desc: <T id="FACE_SERVICE_5_DESC" />, image: '/price-list/face/eyebrows.webp' },
                        { name: <T id="FACE_SERVICE_6_NAME" />, price: <T id="PRICE_ITEM_6" />, duration: <T id="FACE_SERVICE_6_DURATION" />, desc: <T id="FACE_SERVICE_6_DESC" />, image: '/price-list/face/sideburns.webp' },
                        { name: <T id="FACE_SERVICE_7_NAME" />, price: <T id="PRICE_ITEM_7" />, duration: <T id="FACE_SERVICE_7_DURATION" />, desc: <T id="FACE_SERVICE_7_DESC" />, image: '/price-list/face/neck.webp' },
                        { name: <T id="FACE_SERVICE_8_NAME" />, price: <T id="PRICE_ITEM_8" />, duration: <T id="FACE_SERVICE_8_DURATION" />, desc: <T id="FACE_SERVICE_8_DESC" />, image: '/price-list/face/nape.webp' },
                    ]
                },
                {
                    groupName: <T id="FACE_GROUP_COMBOS" />,
                    isPackages: true,
                    items: [
                        { name: <T id="FACE_COMBO_1_NAME" />, price: <T id="PRICE_ITEM_9" />, duration: <T id="FACE_COMBO_1_DURATION" />, badge: <T id="FACE_COMBO_1_BADGE" />, desc: <T id="FACE_COMBO_1_DESC" />, image: '/price-list/face/combo1-lower face care.webp' },
                        { name: <T id="FACE_COMBO_2_NAME" />, price: <T id="PRICE_ITEM_10" />, duration: <T id="FACE_COMBO_2_DURATION" />, desc: <T id="FACE_COMBO_2_DESC" />, image: '/price-list/face/combo2-complete nose care.webp' },
                        { name: <T id="FACE_COMBO_3_NAME" />, price: <T id="PRICE_ITEM_11" />, duration: <T id="FACE_COMBO_3_DURATION" />, desc: <T id="FACE_COMBO_3_DESC" />, image: '/price-list/face/combo3-t xone tratment.webp' },
                        { name: <T id="FACE_COMBO_4_NAME" />, price: <T id="PRICE_ITEM_12" />, duration: <T id="FACE_COMBO_4_DURATION" />, badge: <T id="FACE_COMBO_4_BADGE" />, desc: <T id="FACE_COMBO_4_DESC" />, image: '/price-list/face/combo4 - perfect facial contour.webp' },
                    ]
                },
                {
                    groupName: <T id="FACE_GROUP_PREMIUM" />,
                    isPackages: true,
                    isPremium: true,
                    items: [
                        { name: <T id="FACE_PREMIUM_1_NAME" />, price: <T id="PRICE_ITEM_13" />, duration: <T id="FACE_PREMIUM_1_DURATION" />, desc: <T id="FACE_PREMIUM_1_DESC" />, image: '/price-list/face/premium 1.webp' },
                        { name: <T id="FACE_PREMIUM_2_NAME" />, price: <T id="PRICE_ITEM_14" />, duration: <T id="FACE_PREMIUM_2_DURATION" />, desc: <T id="FACE_PREMIUM_2_DESC" />, image: '/price-list/face/premium 2.webp' },
                        { name: <T id="FACE_PREMIUM_3_NAME" />, price: <T id="PRICE_ITEM_15" />, duration: <T id="FACE_PREMIUM_3_DURATION" />, desc: <T id="FACE_PREMIUM_3_DESC" />, image: '/price-list/face/premium 3.webp' },
                    ]
                }
            ]
        },
        {
            id: 'upper',
            label: <T id="SERVICES_TAB_UPPER" />,
            fullLabel: <T id="UPPER_TAB_FULL_LABEL" />,
            Icon: Sparkles,
            beforeImage: null,
            afterImage: null,
            tagline: <T id="UPPER_TAGLINE" />,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: <T id="UPPER_SERVICE_1_NAME" />, price: <T id="PRICE_ITEM_16" />, duration: <T id="UPPER_SERVICE_1_DURATION" />, desc: <T id="UPPER_SERVICE_1_DESC" />, image: '/price-list/upper-body/underarms.png' },
                        { name: <T id="UPPER_SERVICE_2_NAME" />, price: <T id="PRICE_ITEM_17" />, duration: <T id="UPPER_SERVICE_2_DURATION" />, desc: <T id="UPPER_SERVICE_2_DESC" />, image: '/price-list/upper-body/full arms.png' },
                        { name: <T id="UPPER_SERVICE_3_NAME" />, price: <T id="PRICE_ITEM_18" />, duration: <T id="UPPER_SERVICE_3_DURATION" />, desc: <T id="UPPER_SERVICE_3_DESC" />, image: '/price-list/upper-body/half arms.png' },
                        { name: <T id="UPPER_SERVICE_4_NAME" />, price: <T id="PRICE_ITEM_19" />, duration: <T id="UPPER_SERVICE_4_DURATION" />, desc: <T id="UPPER_SERVICE_4_DESC" />, image: '/price-list/upper-body/stomach.png' },
                    ]
                },
            ]
        },
        {
            id: 'down',
            label: <T id="SERVICES_TAB_DOWN" />,
            fullLabel: <T id="DOWN_TAB_FULL_LABEL" />,
            Icon: ArrowDown,
            beforeImage: null,
            afterImage: null,
            tagline: <T id="DOWN_TAGLINE" />,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: <T id="DOWN_SERVICE_1_NAME" />, price: <T id="PRICE_ITEM_22" />, duration: <T id="DOWN_SERVICE_1_DURATION" />, desc: <T id="DOWN_SERVICE_1_DESC" />, image: '/price-list/lower-body/full legs.png' },
                        { name: <T id="DOWN_SERVICE_2_NAME" />, price: <T id="PRICE_ITEM_23" />, duration: <T id="DOWN_SERVICE_2_DURATION" />, desc: <T id="DOWN_SERVICE_2_DESC" />, image: '/price-list/lower-body/half legs.png' },
                        { name: <T id="DOWN_SERVICE_3_NAME" />, price: <T id="PRICE_ITEM_24" />, duration: <T id="DOWN_SERVICE_3_DURATION" />, desc: <T id="DOWN_SERVICE_3_DESC" />, image: '/price-list/lower-body/buttocks.png' },
                        { name: <T id="DOWN_SERVICE_4_NAME" />, price: <T id="PRICE_ITEM_25" />, duration: <T id="DOWN_SERVICE_4_DURATION" />, desc: <T id="DOWN_SERVICE_4_DESC" />, image: '/price-list/lower-body/lower back.png' },
                        { name: <T id="DOWN_SERVICE_5_NAME" />, price: <T id="PRICE_ITEM_26" />, badge: <T id="DOWN_SERVICE_5_BADGE" />, duration: <T id="DOWN_SERVICE_5_DURATION" />, desc: <T id="DOWN_SERVICE_5_DESC" />, image: '/price-list/lower-body/lower back and buttocks.png' },
                    ]
                },
            ]
        },
        {
            id: 'bikini',
            label: <T id="SERVICES_TAB_BIKINI" />,
            fullLabel: <T id="BIKINI_TAB_FULL_LABEL" />,
            Icon: Heart,
            beforeImage: null,
            afterImage: null,
            tagline: <T id="BIKINI_TAGLINE" />,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: <T id="BIKINI_SERVICE_1_NAME" />, price: <T id="PRICE_ITEM_28" />, badge: <T id="BIKINI_SERVICE_1_BADGE" />, duration: <T id="BIKINI_SERVICE_1_DURATION" />, desc: <T id="BIKINI_SERVICE_1_DESC" />, image: '/price-list/bikini/hollywood-bikini.jpeg' },
                        { name: <T id="BIKINI_SERVICE_2_NAME" />, price: <T id="PRICE_ITEM_29" />, duration: <T id="BIKINI_SERVICE_2_DURATION" />, desc: <T id="BIKINI_SERVICE_2_DESC" />, image: '/price-list/bikini/brazilian-bikini.jpeg' },
                        { name: <T id="BIKINI_SERVICE_3_NAME" />, price: <T id="PRICE_ITEM_30" />, duration: <T id="BIKINI_SERVICE_3_DURATION" />, desc: <T id="BIKINI_SERVICE_3_DESC" />, image: '/price-list/bikini/g-string-bikini.jpeg' },
                        { name: <T id="BIKINI_SERVICE_4_NAME" />, price: <T id="PRICE_ITEM_31" />, duration: <T id="BIKINI_SERVICE_4_DURATION" />, desc: <T id="BIKINI_SERVICE_4_DESC" />, image: '/price-list/bikini/basic-bikini.jpg' },
                    ]
                },
            ]
        }
    ]
});
