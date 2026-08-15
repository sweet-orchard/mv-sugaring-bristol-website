import { Heart, Sparkles, ArrowDown, Smile } from 'lucide-react';

export const getServicesData = (t) => ({
    inclusions: [
        { title: t.inclusion1Title, desc: t.inclusion1Desc },
        { title: t.inclusion2Title, desc: t.inclusion2Desc },
        { title: t.inclusion3Title, desc: t.inclusion3Desc },
    ],
    durationNotes: [
        { title: t.durationNote1Title, desc: t.durationNote1Desc },
        { title: t.durationNote2Title, desc: t.durationNote2Desc },
        { title: t.durationNote3Title, desc: t.durationNote3Desc },
        { title: t.durationNote4Title, desc: t.durationNote4Desc },
        { title: t.durationNote5Title, desc: t.durationNote5Desc },
        { title: t.durationNote6Title, desc: t.durationNote6Desc },
    ],
    categories: [
        {
            id: 'bikini',
            label: t.tabBikini,
            fullLabel: t.bikiniFullLabel,
            Icon: Heart,
            beforeImage: null,
            afterImage: null,
            tagline: t.bikiniTagline,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t.bikiniService1Name, price: '£45', badge: t.bikiniService1Badge, duration: t.bikiniService1Duration, desc: t.bikiniService1Desc, image: '/price-list/bikini/hollywood-bikini.jpeg' },
                        { name: t.bikiniService2Name, price: '£45', duration: t.bikiniService2Duration, desc: t.bikiniService2Desc, image: '/price-list/bikini/brazilian-bikini.jpeg' },
                        { name: t.bikiniService3Name, price: '£35', duration: t.bikiniService3Duration, desc: t.bikiniService3Desc, image: '/price-list/bikini/g-string-bikini.jpeg' },
                        { name: t.bikiniService4Name, price: '£25', duration: t.bikiniService4Duration, desc: t.bikiniService4Desc, image: '/price-list/bikini/basic-bikini.jpg' },
                    ]
                },
                {
                    groupName: t.bikiniAddonGroupName,
                    isAddOn: true,
                    items: [
                        { name: t.bikiniAddon1Name, price: '+£5 to £20', desc: t.bikiniAddon1Desc, extendedDesc: t.bikiniAddon1ExtendedDesc, isAddOn: true, placeholderLabel: 'Extra Long Hair Graphic' },
                        { name: t.bikiniAddon2Name, price: '£5', desc: t.bikiniAddon2Desc, extendedDesc: t.bikiniAddon2ExtendedDesc, isAddOn: true, placeholderLabel: 'Extra Patch Graphic' },
                        { name: t.bikiniAddon3Name, price: '£5', desc: t.bikiniAddon3Desc, isAddOn: true, placeholderLabel: 'Belly Line Graphic' },
                    ]
                }
            ]
        },
        {
            id: 'upper',
            label: t.tabUpper,
            fullLabel: t.upperFullLabel,
            Icon: Sparkles,
            beforeImage: null,
            afterImage: null,
            tagline: t.upperTagline,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t.upperService1Name, price: '£20', duration: t.upperService1Duration, desc: t.upperService1Desc, image: '/price-list/upper-body/underarms.png' },
                        { name: t.upperService2Name, price: '£50', duration: t.upperService2Duration, desc: t.upperService2Desc, image: '/price-list/upper-body/full arms.png' },
                        { name: t.upperService3Name, price: '£40', duration: t.upperService3Duration, desc: t.upperService3Desc, image: '/price-list/upper-body/half arms.png' },
                        { name: t.upperService4Name, price: '£30', duration: t.upperService4Duration, desc: t.upperService4Desc, image: '/price-list/upper-body/stomach.png' },
                    ]
                },
                {
                    groupName: t.bikiniAddonGroupName,
                    isAddOn: true,
                    items: [
                        { name: t.upperAddon1Name, price: '£5', duration: t.upperAddon1Duration, desc: t.upperAddon1Desc, isAddOn: true, placeholderLabel: 'Nipple Area Graphic' },
                        { name: t.upperAddon2Name, price: '£10', duration: t.upperAddon2Duration, desc: t.upperAddon2Desc, isAddOn: true, placeholderLabel: 'Fingers Graphic' },
                    ]
                }
            ]
        },
        {
            id: 'down',
            label: t.tabDown,
            fullLabel: t.downFullLabel,
            Icon: ArrowDown,
            beforeImage: null,
            afterImage: null,
            tagline: t.downTagline,
            groups: [
                {
                    groupName: null,
                    items: [
                        { name: t.downService1Name, price: '£60', duration: t.downService1Duration, desc: t.downService1Desc, image: '/price-list/lower-body/full legs.png' },
                        { name: t.downService2Name, price: '£40', duration: t.downService2Duration, desc: t.downService2Desc, image: '/price-list/lower-body/half legs.png' },
                        { name: t.downService3Name, price: '£25', duration: t.downService3Duration, desc: t.downService3Desc, image: '/price-list/lower-body/buttocks.png' },
                        { name: t.downService4Name, price: '£25', duration: t.downService4Duration, desc: t.downService4Desc, image: '/price-list/lower-body/lower back.png' },
                        { name: t.downService5Name, price: '£40', badge: t.downService5Badge, duration: t.downService5Duration, desc: t.downService5Desc, image: '/price-list/lower-body/lower back and buttocks.png' },
                    ]
                },
                {
                    groupName: t.bikiniAddonGroupName,
                    isAddOn: true,
                    items: [
                        { name: t.downAddon1Name, price: '£10', duration: t.downAddon1Duration, desc: t.downAddon1Desc, isAddOn: true, placeholderLabel: 'Toes Graphic' },
                    ]
                }
            ]
        },
        {
            id: 'face',
            label: t.tabFace,
            fullLabel: t.faceFullLabel,
            Icon: Smile,
            beforeImage: null,
            afterImage: null,
            tagline: t.faceTagline,
            groups: [
                {
                    groupName: t.faceGroupIndividual,
                    items: [
                        { name: t.faceService1Name, price: '£15', duration: t.faceService1Duration, desc: t.faceService1Desc, image: '/price-list/face/upper lip.png' },
                        { name: t.faceService2Name, price: '£15', duration: t.faceService2Duration, desc: t.faceService2Desc, image: '/price-list/face/chin.png' },
                        { name: t.faceService3Name, price: '£20', duration: t.faceService3Duration, desc: t.faceService3Desc, image: '/price-list/face/nose pores.png' },
                        { name: t.faceService4Name, price: '£15', duration: t.faceService4Duration, desc: t.faceService4Desc, image: '/price-list/face/nostrils.png' },
                        { name: t.faceService5Name, price: '£30', duration: t.faceService5Duration, desc: t.faceService5Desc, image: '/price-list/face/eyebrows.png' },
                        { name: t.faceService6Name, price: '£20', duration: t.faceService6Duration, desc: t.faceService6Desc, image: '/price-list/face/sideburns.png' },
                        { name: t.faceService7Name, price: '£15', duration: t.faceService7Duration, desc: t.faceService7Desc, image: '/price-list/face/neck.png' },
                        { name: t.faceService8Name, price: '£15', duration: t.faceService8Duration, desc: t.faceService8Desc, image: '/price-list/face/nape.png' },
                    ]
                },
                {
                    groupName: t.faceGroupCombos,
                    isPackages: true,
                    items: [
                        { name: t.faceCombo1Name, price: '£30', duration: t.faceCombo1Duration, badge: t.faceCombo1Badge, desc: t.faceCombo1Desc, image: '/price-list/face/combo1-lower face care.png' },
                        { name: t.faceCombo2Name, price: '£30', duration: t.faceCombo2Duration, desc: t.faceCombo2Desc, image: '/price-list/face/combo2-complete nose care.png' },
                        { name: t.faceCombo3Name, price: '£40', duration: t.faceCombo3Duration, desc: t.faceCombo3Desc, image: '/price-list/face/combo3-t xone tratment.png' },
                        { name: t.faceCombo4Name, price: '£40', duration: t.faceCombo4Duration, badge: t.faceCombo4Badge, desc: t.faceCombo4Desc, image: '/price-list/face/combo4 - perfect facial contour.png' },
                    ]
                },
                {
                    groupName: t.faceGroupPremium,
                    isPackages: true,
                    isPremium: true,
                    items: [
                        { name: t.facePremium1Name, price: '£70', duration: t.facePremium1Duration, desc: t.facePremium1Desc, image: '/price-list/face/premium 1.png' },
                        { name: t.facePremium2Name, price: '£80', duration: t.facePremium2Duration, desc: t.facePremium2Desc, image: '/price-list/face/premium 2.png' },
                        { name: t.facePremium3Name, price: '£80', duration: t.facePremium3Duration, desc: t.facePremium3Desc, image: '/price-list/face/premium 3.png' },
                    ]
                }
            ]
        }
    ]
});
