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
                        { name: <T id="FACE_SERVICE_1_NAME" />, price: <T id="PRICE_FACE_1" />, duration: <T id="FACE_SERVICE_1_DURATION" />, desc: <T id="FACE_SERVICE_1_DESC" />, image: '/price-list/face/upper-lip.webp' },
                        { name: <T id="FACE_SERVICE_2_NAME" />, price: <T id="PRICE_FACE_2" />, duration: <T id="FACE_SERVICE_2_DURATION" />, desc: <T id="FACE_SERVICE_2_DESC" />, image: '/price-list/face/chin.webp' },
                        { name: <T id="FACE_SERVICE_3_NAME" />, price: <T id="PRICE_FACE_3" />, duration: <T id="FACE_SERVICE_3_DURATION" />, desc: <T id="FACE_SERVICE_3_DESC" />, image: '/price-list/face/nose-pores.webp' },
                        { name: <T id="FACE_SERVICE_4_NAME" />, price: <T id="PRICE_FACE_4" />, duration: <T id="FACE_SERVICE_4_DURATION" />, desc: <T id="FACE_SERVICE_4_DESC" />, image: '/price-list/face/nostrils.webp' },
                        { name: <T id="FACE_SERVICE_6_NAME" />, price: <T id="PRICE_FACE_6" />, duration: <T id="FACE_SERVICE_6_DURATION" />, desc: <T id="FACE_SERVICE_6_DESC" />, image: '/price-list/face/sideburns.webp' },
                        { name: <T id="FACE_SERVICE_5_NAME" />, price: <T id="PRICE_FACE_5" />, duration: <T id="FACE_SERVICE_5_DURATION" />, desc: <T id="FACE_SERVICE_5_DESC" />, image: '/price-list/face/eyebrows.webp' },
                    ]
                },
                {
                    groupName: <T id="FACE_GROUP_NECK" />,
                    items: [
                        { name: <T id="FACE_SERVICE_7_NAME" />, price: <T id="PRICE_FACE_7" />, duration: <T id="FACE_SERVICE_7_DURATION" />, desc: <T id="FACE_SERVICE_7_DESC" />, image: '/price-list/face/neck.webp' },
                        { name: <T id="FACE_SERVICE_8_NAME" />, price: <T id="PRICE_FACE_8" />, duration: <T id="FACE_SERVICE_8_DURATION" />, desc: <T id="FACE_SERVICE_8_DESC" />, image: '/price-list/face/nape-area.webp' },
                        { name: <T id="FACE_SERVICE_9_NAME" />, price: <T id="PRICE_FACE_9" />, duration: <T id="FACE_SERVICE_9_DURATION" />, desc: <T id="FACE_SERVICE_9_DESC" />, image: '/price-list/face/nape-and-neck.webp' },
                    ]
                },
                {
                    groupName: <T id="FACE_GROUP_PACKAGES" />,
                    isPackages: true,
                    items: [
                        { name: <T id="FACE_PACKAGE_1_NAME" />, price: <T id="PRICE_FACE_PKG_1" />, duration: <T id="FACE_PACKAGE_1_DURATION" />, desc: <T id="FACE_PACKAGE_1_DESC" />, saveText: <T id="FACE_PACKAGE_1_SAVE" />, image: '/price-list/face/full-face.webp' },
                        { name: <T id="FACE_PACKAGE_2_NAME" />, price: <T id="PRICE_FACE_PKG_2" />, duration: <T id="FACE_PACKAGE_2_DURATION" />, desc: <T id="FACE_PACKAGE_2_DESC" />, saveText: <T id="FACE_PACKAGE_2_SAVE" />, image: '/price-list/face/full-face-plus-neck-or-nape.webp' },
                        { name: <T id="FACE_PACKAGE_3_NAME" />, price: <T id="PRICE_FACE_PKG_3" />, duration: <T id="FACE_PACKAGE_3_DURATION" />, desc: <T id="FACE_PACKAGE_3_DESC" />, saveText: <T id="FACE_PACKAGE_3_SAVE" />, image: '/price-list/face/lip-chin-and-sideburns.webp' },
                        { name: <T id="FACE_PACKAGE_4_NAME" />, price: <T id="PRICE_FACE_PKG_4" />, duration: <T id="FACE_PACKAGE_4_DURATION" />, desc: <T id="FACE_PACKAGE_4_DESC" />, saveText: <T id="FACE_PACKAGE_4_SAVE" />, image: null },
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
                        { name: <T id="UPPER_SERVICE_5_NAME" />, price: <T id="PRICE_ITEM_36" />, duration: <T id="UPPER_SERVICE_5_DURATION" />, desc: <T id="UPPER_SERVICE_5_DESC" />, image: null },
                        { name: <T id="UPPER_SERVICE_6_NAME" />, price: <T id="PRICE_ITEM_37" />, duration: <T id="UPPER_SERVICE_6_DURATION" />, desc: <T id="UPPER_SERVICE_6_DESC" />, image: null },
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
                        { name: <T id="DOWN_SERVICE_6_NAME" />, price: <T id="PRICE_ITEM_35" />, duration: <T id="DOWN_SERVICE_6_DURATION" />, desc: <T id="DOWN_SERVICE_6_DESC" />, image: null },
                        { name: <T id="DOWN_SERVICE_5_NAME" />, price: <T id="PRICE_ITEM_26" />, badge: <T id="DOWN_SERVICE_5_BADGE" />, duration: <T id="DOWN_SERVICE_5_DURATION" />, desc: <T id="DOWN_SERVICE_5_DESC" />, image: '/price-list/lower-body/lower back and buttocks.png' },
                    ]
                },
            ]
        },
        {
            id: 'body',
            label: <T id="SERVICES_TAB_BODY" />,
            fullLabel: <T id="BODY_TAB_FULL_LABEL" />,
            Icon: Sparkles,
            beforeImage: null,
            afterImage: null,
            tagline: <T id="BODY_TAGLINE" />,
            groups: [
                {
                    groupName: <T id="BODY_GROUP_PACKAGES" />,
                    isPackages: true,
                    note: <T id="BODY_PACKAGE_NOTE" />,
                    items: [
                        { name: <T id="BODY_PACKAGE_1_NAME" />, price: <T id="PRICE_BODY_PKG_1" />, duration: <T id="BODY_PACKAGE_1_DURATION" />, saveText: <T id="BODY_PACKAGE_1_SAVE" />, image: null },
                        { name: <T id="BODY_PACKAGE_2_NAME" />, price: <T id="PRICE_BODY_PKG_2" />, duration: <T id="BODY_PACKAGE_2_DURATION" />, saveText: <T id="BODY_PACKAGE_2_SAVE" />, image: null },
                        { name: <T id="BODY_PACKAGE_3_NAME" />, price: <T id="PRICE_BODY_PKG_3" />, duration: <T id="BODY_PACKAGE_3_DURATION" />, saveText: <T id="BODY_PACKAGE_3_SAVE" />, image: null },
                        { name: <T id="BODY_PACKAGE_4_NAME" />, price: <T id="PRICE_BODY_PKG_4" />, duration: <T id="BODY_PACKAGE_4_DURATION" />, saveText: <T id="BODY_PACKAGE_4_SAVE" />, image: null },
                    ]
                }
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
                {
                    groupName: null,
                    isAddOn: true,
                    items: [
                        { name: <T id="BIKINI_ADDON_NEW_NAME" />, price: <T id="BIKINI_ADDON_NEW_PRICE" />, desc: <T id="BIKINI_ADDON_NEW_DESC" /> }
                    ]
                }
            ]
        }
    ]
});
