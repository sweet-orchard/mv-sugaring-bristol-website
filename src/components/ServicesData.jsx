import { Heart, Sparkles, ArrowDown, Smile } from 'lucide-react';

export const getServicesData = (t) => ({
    inclusions: [
        { title: t("SERVICES_INCLUSION_1_TITLE"), desc: t("SERVICES_INCLUSION_1_DESC") },
        { title: t("SERVICES_INCLUSION_2_TITLE"), desc: t("SERVICES_INCLUSION_2_DESC") },
        { title: t("SERVICES_INCLUSION_3_TITLE"), desc: t("SERVICES_INCLUSION_3_DESC") },
    ],
    durationNotes: [
        { title: t("DURATION_NOTE_1_TITLE"), desc: t("DURATION_NOTE_1_DESC") },
        { title: t("DURATION_NOTE_2_TITLE"), desc: t("DURATION_NOTE_2_DESC") },
        { title: t("DURATION_NOTE_3_TITLE"), desc: t("DURATION_NOTE_3_DESC") },
        { title: t("DURATION_NOTE_4_TITLE"), desc: t("DURATION_NOTE_4_DESC") },
        { title: t("DURATION_NOTE_5_TITLE"), desc: t("DURATION_NOTE_5_DESC") },
        { title: t("DURATION_NOTE_6_TITLE"), desc: t("DURATION_NOTE_6_DESC") },
    ],
    categories: [
        {
            id: 'face',
            label: t("SERVICES_TAB_FACE"),
            fullLabel: t("CONTACT_FORM_OPTGROUP_FACE"),
            Icon: Smile,
            beforeImage: null,
            afterImage: null,
            tagline: t("FACE_TAGLINE"),
            groups: [
                {
                    groupName: t("FACE_GROUP_INDIVIDUAL"),
                    items: [
                        { name: t("FACE_SERVICE_1_NAME"), price: t("PRICE_ITEM_1"), duration: t("FACE_SERVICE_1_DURATION"), desc: t("FACE_SERVICE_1_DESC"), image: '/price-list/face/upper lip.webp' },
                        { name: t("FACE_SERVICE_2_NAME"), price: t("PRICE_ITEM_2"), duration: t("FACE_SERVICE_2_DURATION"), desc: t("FACE_SERVICE_2_DESC"), image: '/price-list/face/chin.webp' },
                        { name: t("FACE_SERVICE_3_NAME"), price: t("PRICE_ITEM_3"), duration: t("FACE_SERVICE_8_DURATION"), desc: t("FACE_SERVICE_3_DESC"), image: '/price-list/face/nose pores.webp' },
                        { name: t("FACE_SERVICE_4_NAME"), price: t("PRICE_ITEM_4"), duration: t("FACE_SERVICE_8_DURATION"), desc: t("FACE_SERVICE_4_DESC"), image: '/price-list/face/nostrils.webp' },
                        { name: t("FACE_SERVICE_5_NAME"), price: t("PRICE_ITEM_5"), duration: t("FACE_SERVICE_5_DURATION"), desc: t("FACE_SERVICE_5_DESC"), image: '/price-list/face/eyebrows.webp' },
                        { name: t("FACE_SERVICE_6_NAME"), price: t("PRICE_ITEM_6"), duration: t("FACE_SERVICE_6_DURATION"), desc: t("FACE_SERVICE_6_DESC"), image: '/price-list/face/sideburns.webp' },
                        { name: t("FACE_SERVICE_7_NAME"), price: t("PRICE_ITEM_7"), duration: t("FACE_SERVICE_8_DURATION"), desc: t("FACE_SERVICE_7_DESC"), image: '/price-list/face/neck.webp' },
                        { name: t("FACE_SERVICE_8_NAME"), price: t("PRICE_ITEM_8"), duration: t("FACE_SERVICE_8_DURATION"), desc: t("FACE_SERVICE_8_DESC"), image: '/price-list/face/nape.webp' },
                    ]
                },
                {
                    groupName: t("FACE_GROUP_COMBOS"),
                    isPackages: true,
                    items: [
                        { name: t("FACE_COMBO_1_NAME"), price: t("PRICE_ITEM_9"), duration: t("FACE_COMBO_1_DURATION"), badge: t("FACE_COMBO_1_BADGE"), desc: t("FACE_COMBO_1_DESC"), image: '/price-list/face/combo1-lower face care.webp' },
                        { name: t("FACE_COMBO_2_NAME"), price: t("PRICE_ITEM_10"), duration: t("FACE_COMBO_2_DURATION"), desc: t("FACE_COMBO_2_DESC"), image: '/price-list/face/combo2-complete nose care.webp' },
                        { name: t("FACE_COMBO_3_NAME"), price: t("PRICE_ITEM_11"), duration: t("FACE_COMBO_3_DURATION"), desc: t("FACE_COMBO_3_DESC"), image: '/price-list/face/combo3-t xone tratment.webp' },
                        { name: t("FACE_COMBO_4_NAME"), price: t("PRICE_ITEM_12"), duration: t("FACE_COMBO_4_DURATION"), badge: t("FACE_COMBO_4_BADGE"), desc: t("FACE_COMBO_4_DESC"), image: '/price-list/face/combo4 - perfect facial contour.webp' },
                    ]
                },
                {
                    groupName: t("FACE_GROUP_PREMIUM"),
                    isPackages: true,
                    isPremium: true,
                    items: [
                        { name: t("FACE_PREMIUM_1_NAME"), price: t("PRICE_ITEM_13"), duration: t("FACE_PREMIUM_1_DURATION"), desc: t("FACE_PREMIUM_1_DESC"), image: '/price-list/face/premium 1.webp' },
                        { name: t("FACE_PREMIUM_2_NAME"), price: t("PRICE_ITEM_14"), duration: t("FACE_PREMIUM_3_DURATION"), desc: t("FACE_PREMIUM_2_DESC"), image: '/price-list/face/premium 2.webp' },
                        { name: t("FACE_PREMIUM_3_NAME"), price: t("PRICE_ITEM_15"), duration: t("FACE_PREMIUM_3_DURATION"), desc: t("FACE_PREMIUM_3_DESC"), image: '/price-list/face/premium 3.webp' },
                    ]
                }
            ]
        },
        {
            id: 'upper',
            label: t("SERVICES_TAB_UPPER"),
            fullLabel: t("CONTACT_FORM_OPTGROUP_UPPER"),
            Icon: Sparkles,
            beforeImage: null,
            afterImage: null,
            tagline: t("UPPER_TAGLINE"),
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t("CONTACT_FORM_OPTION_UNDERARMS"), price: t("PRICE_ITEM_16"), duration: t("UPPER_SERVICE_1_DURATION"), desc: t("UPPER_SERVICE_1_DESC"), image: '/price-list/upper-body/underarms.png' },
                        { name: t("UPPER_SERVICE_2_NAME"), price: t("PRICE_ITEM_17"), duration: t("UPPER_SERVICE_2_DURATION"), desc: t("UPPER_SERVICE_2_DESC"), image: '/price-list/upper-body/full arms.png' },
                        { name: t("UPPER_SERVICE_3_NAME"), price: t("PRICE_ITEM_18"), duration: t("DOWN_SERVICE_5_DURATION"), desc: t("UPPER_SERVICE_3_DESC"), image: '/price-list/upper-body/half arms.png' },
                        { name: t("CONTACT_FORM_OPTION_STOMACH"), price: t("PRICE_ITEM_19"), duration: t("DOWN_SERVICE_4_DURATION"), desc: t("UPPER_SERVICE_4_DESC"), image: '/price-list/upper-body/stomach.png' },
                    ]
                },
                {
                    groupName: t("BIKINI_ADDON_GROUP_NAME"),
                    isAddOn: true,
                    items: [
                        { name: t("UPPER_ADDON_1_NAME"), price: t("PRICE_ITEM_20"), duration: t("UPPER_ADDON_2_DURATION"), desc: t("UPPER_ADDON_1_DESC"), isAddOn: true, placeholderLabel: 'Nipple Area Graphic' },
                        { name: t("UPPER_ADDON_2_NAME"), price: t("PRICE_ITEM_21"), duration: t("UPPER_ADDON_2_DURATION"), desc: t("UPPER_ADDON_2_DESC"), isAddOn: true, placeholderLabel: 'Fingers Graphic' },
                    ]
                }
            ]
        },
        {
            id: 'down',
            label: t("SERVICES_TAB_DOWN"),
            fullLabel: t("CONTACT_FORM_OPTGROUP_DOWN"),
            Icon: ArrowDown,
            beforeImage: null,
            afterImage: null,
            tagline: t("DOWN_TAGLINE"),
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t("DOWN_SERVICE_1_NAME"), price: t("PRICE_ITEM_22"), duration: t("DOWN_SERVICE_1_DURATION"), desc: t("DOWN_SERVICE_1_DESC"), image: '/price-list/lower-body/full legs.png' },
                        { name: t("DOWN_SERVICE_2_NAME"), price: t("PRICE_ITEM_23"), duration: t("DOWN_SERVICE_2_DURATION"), desc: t("DOWN_SERVICE_2_DESC"), image: '/price-list/lower-body/half legs.png' },
                        { name: t("DOWN_SERVICE_3_NAME"), price: t("PRICE_ITEM_24"), duration: t("DOWN_SERVICE_4_DURATION"), desc: t("DOWN_SERVICE_3_DESC"), image: '/price-list/lower-body/buttocks.png' },
                        { name: t("DOWN_SERVICE_4_NAME"), price: t("PRICE_ITEM_25"), duration: t("DOWN_SERVICE_4_DURATION"), desc: t("DOWN_SERVICE_4_DESC"), image: '/price-list/lower-body/lower back.png' },
                        { name: t("DOWN_SERVICE_5_NAME"), price: t("PRICE_ITEM_26"), badge: t("DOWN_SERVICE_5_BADGE"), duration: t("DOWN_SERVICE_5_DURATION"), desc: t("DOWN_SERVICE_5_DESC"), image: '/price-list/lower-body/lower back and buttocks.png' },
                    ]
                },
                {
                    groupName: t("BIKINI_ADDON_GROUP_NAME"),
                    isAddOn: true,
                    items: [
                        { name: t("DOWN_ADDON_1_NAME"), price: t("PRICE_ITEM_27"), duration: t("DOWN_ADDON_1_DURATION"), desc: t("DOWN_ADDON_1_DESC"), isAddOn: true, placeholderLabel: 'Toes Graphic' },
                    ]
                }
            ]
        },
        {
            id: 'bikini',
            label: t("SERVICES_TAB_BIKINI"),
            fullLabel: t("CONTACT_FORM_OPTGROUP_BIKINI"),
            Icon: Heart,
            beforeImage: null,
            afterImage: null,
            tagline: t("BIKINI_TAGLINE"),
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t("BIKINI_SERVICE_1_NAME"), price: t("PRICE_ITEM_28"), badge: t("FACE_COMBO_1_BADGE"), duration: t("BIKINI_SERVICE_2_DURATION"), desc: t("BIKINI_SERVICE_1_DESC"), image: '/price-list/bikini/hollywood-bikini.jpeg' },
                        { name: t("BIKINI_SERVICE_2_NAME"), price: t("PRICE_ITEM_29"), duration: t("BIKINI_SERVICE_2_DURATION"), desc: t("BIKINI_SERVICE_2_DESC"), image: '/price-list/bikini/brazilian-bikini.jpeg' },
                        { name: t("CONTACT_FORM_OPTION_GSTRING"), price: t("PRICE_ITEM_30"), duration: t("DOWN_SERVICE_5_DURATION"), desc: t("BIKINI_SERVICE_3_DESC"), image: '/price-list/bikini/g-string-bikini.jpeg' },
                        { name: t("CONTACT_FORM_OPTION_BASIC_BIKINI"), price: t("PRICE_ITEM_31"), duration: t("BIKINI_SERVICE_4_DURATION"), desc: t("BIKINI_SERVICE_4_DESC"), image: '/price-list/bikini/basic-bikini.jpg' },
                    ]
                },
                {
                    groupName: t("BIKINI_ADDON_GROUP_NAME"),
                    isAddOn: true,
                    items: [
                        { name: t("BIKINI_ADDON_1_NAME"), price: t("PRICE_ITEM_32"), desc: t("BIKINI_ADDON_1_DESC"), extendedDesc: t("BIKINI_ADDON_1_EXTENDED_DESC"), isAddOn: true, placeholderLabel: 'Extra Long Hair Graphic' },
                        { name: t("BIKINI_ADDON_2_NAME"), price: t("PRICE_ITEM_33"), desc: t("BIKINI_ADDON_2_DESC"), extendedDesc: t("BIKINI_ADDON_2_EXTENDED_DESC"), isAddOn: true, placeholderLabel: 'Extra Patch Graphic' },
                        { name: t("BIKINI_ADDON_3_NAME"), price: t("PRICE_ITEM_34"), desc: t("BIKINI_ADDON_3_DESC"), isAddOn: true, placeholderLabel: 'Belly Line Graphic' },
                    ]
                }
            ]
        }
    ]
});
