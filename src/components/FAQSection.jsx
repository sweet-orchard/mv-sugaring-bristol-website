import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
    {
        category: "Preparation & Booking",
        items: [
            {
                q: 'How long does my hair need to be for sugaring?',
                a: 'For the best results, your hair should be about the length of a grain of rice (around 5-7mm). If you are switching from shaving, here is the ideal growth time required for each area:\nUnderarms: 10–14 days of growth.\nBikini / Hollywood: 12–16 days of growth.\nLegs: 2–3 weeks (2 weeks is plenty for lower legs, but thighs grow back much slower after shaving, so 3 weeks is best for full legs)',
            },
            {
                q: "I have a holiday planned and don't have enough time to grow my hair. Can I still get sugared?",
                a: "Yes, absolutely! We can still do the treatment. The absolute minimum growth times required for an emergency or holiday booking are:\nUnderarms: 7 days.\nBikini: 12 days.\nLegs: 8-12 days.\n\nIn these cases, I will always do my absolute best to give you the cleanest finish possible. It is still a much better option than shaving for your holiday! However, please keep in mind that some tiny hairs might just be starting to break through the skin, which means I physically won't be able to catch them. I have extensive experience working with short hair—even managing underarms with just 5 days of growth post-shave or legs with 7 days. It will be perfect for your holiday, but to experience the full, flawless benefit of sugaring, I highly recommend sticking to the standard guidelines above next time!",
            },
            {
                q: 'What if my hair is much longer than 2–3 weeks? Can I still book a session?',
                a: 'Yes, you can. I regularly work with clients who have longer hair growth. Please note that the treatment may feel slightly more intense because more hairs will be removed at once. However, the result will exceed your expectations because we will catch a larger volume of hair, meaning your smooth results will last even longer!\n\nImportant Note: If your hair is significantly longer, please let me know in advance. I will need to allocate extra time for your appointment, and a surcharge of +£5 to £30 will apply depending on the time and complexity. Please do not trim the hair yourself at home, as it is very easy to cut it too short (especially in the bikini area). If you feel you must tidy it up, you can use a trimmer gently to leave a consistent length of 5–7mm.',
            },
            {
                q: 'What should I do before my appointment?',
                a: "You can gently exfoliate the area 5 days before your scheduled appointment. On the day of your treatment, please make sure to take a shower. If you are coming straight from work, don’t worry at all—intimate wet wipes will be available for you to use right before we begin.\n\nKey recommendations based on the area:\n\nFacial Sugaring: Please do not wear any makeup or cosmetic products on the day of your visit, as this directly impacts the overall quality of the treatment. If you do happen to be wearing makeup, please don’t worry—I will thoroughly cleanse your skin before we start and do everything I can to ensure a beautiful result. However, these small details do make a difference, so it is always best to prepare in advance.\n\nGeneral Rule: Please avoid applying any thick lotions, body oils, or deodorants to the areas being treated on the day of your appointment.\n\nI also highly recommend wearing or bringing comfortable, loose-fitting clothing, preferably made from natural fabrics. This allows your skin to breathe and minimises any post-treatment friction or irritation.",
            },
            {
                q: 'I’m going on holiday soon. When should I book my sugaring appointment?',
                a: "Booking your session 2 to 3 days before you travel is ideal. Your skin needs 24 to 48 hours to fully recover before any sun exposure, swimming, or sauna use.\n\nImportant note for facial treatments: The face is a highly delicate zone and requires more time to recover. If it is your very first time getting facial sugaring, I highly recommend booking it 5 to 7 days before your important event or holiday. For regular clients, booking 3 days in advance is perfect!",
            },
        ]
    },
    {
        category: "The Experience & Conditions",
        items: [
            {
                q: 'Does sugaring hurt?',
                a: "Because the sugar paste only sticks to the hair and dead skin cells—not live skin—it is significantly less painful than traditional waxing.\n\nAs women, we all experience pain very differently; some of us have a high pain threshold, while others are more sensitive. My signature technique ensures that any slight discomfort is felt only at the exact second the hair is removed—lasting just a brief moment.\n\nMany of my clients are genuinely surprised by how different and incredibly comfortable my method is compared to past experiences. This is because I have studied the mechanics of hair removal deeply and master all the technical nuances that lower skin sensitivity. Simply put, I know how to make the process as painless as humanly possible.\n\nOf course, your individuality plays a major role too. Every client responds differently: some find it so relaxing they want to sleep, while others just need a brief moment to focus. Rest assured, it gets easier with every single session as the hair becomes much thinner and softer!\n\nTop tips to help you schedule your visit for maximum comfort:\n\nTrack your menstrual cycle. Generally, women tend to be more sensitive right before their period and during ovulation. The absolute best, most comfortable time to get treated is usually right after your period ends. However, practice shows that every body operates on its own unique rhythm. Some of my clients actually report feeling the least amount of sensitivity right before or during their cycle. It is all about tuning into your body to see what works best for you.",
            },
            {
                q: 'Can I get sugared if I am on my period?',
                a: 'Yes, absolutely. Having your period is not a reason to cancel your appointment. I regularly treat clients during this time. All you need to do is wear a fresh tampon or menstrual cup before your session. Please keep in mind that your skin may be slightly more sensitive to pain just before and during your cycle, but the treatment can still be done flawlessly!',
            },
            {
                q: 'I am pregnant. Can I still book a session?',
                a: "Yes, absolutely! Sugaring is a 100% natural, organic, and completely safe method for both you and your baby, as the paste contains zero chemicals or toxins. Many of my clients continue their treatments right up until their due date, as it offers incredible comfort, convenience, and a feeling of lightness—especially during those final months.\n\nAs a mother of two daughters myself, I completely understand the unique needs of expectant mums, making pregnant clients a deeply special category for me. The main condition is that your pregnancy is progressing smoothly and your doctor approves.\n\nHowever, here are a few key details to keep in mind:\n\n• If you are already used to sugaring: You can confidently continue your regular monthly sessions without any breaks. It is entirely safe and will not affect your pregnancy in any negative way.\n\n• If it is your first time sugaring: You can still absolutely have the treatment. However, during the first trimester, anything brand new can cause minor stress simply because you don’t know what to expect. In these cases, I highly recommend waiting until your 12th week to start. We can begin with smaller areas, like the underarms or a basic bikini line, to ease you into the sensation.\n\nPregnancy hormones can initially make your skin a bit more sensitive, so I will take extra care to ensure you are as relaxed and comfortable as possible. Interestingly, practice shows that the closer you get to your due date, the less sensitivity you will feel. Your body is already naturally preparing for childbirth, making your pain threshold much higher!",
            },
            {
                q: 'I have a lot of moles. Is it safe to have a sugaring treatment?',
                a: "Yes, it is perfectly safe! The presence of moles is by no means a contraindication for a sugaring treatment.\n\nAny flat moles that do not protrude above the skin and do not have hair growing from them are completely safe to be treated—the sugar paste glides over them smoothly and painlessly.\n\nImportant note about hairs on moles: If there is hair growing directly from a mole, it must never be plucked or pulled out with paste. It can only be carefully trimmed with scissors, or the area can simply be left untouched.\n\nTherefore, if a mole is raised, large, sensitive, or has hair growing from it, I will simply work carefully nearby. Even if it is located in a highly delicate or intimate area (such as the labia in a Hollywood bikini), you can rest completely assured.\n\nI frequently work with clients who have moles, so if you have this specific feature, please be sure to let me know beforehand. My technique and years of expertise allow me to navigate these areas flawlessly, ensuring 100% skin safety, protection, and an immaculate, high-quality finish.",
            },
            {
                q: 'Can I get sugared if I have varicose veins?',
                a: "Yes, absolutely! In fact, sugaring is truly the best and safest hair removal method if you have varicose veins. Unlike hot wax, sugar paste is applied at a comfortable body temperature, meaning there is absolutely no heat to dilate your blood vessels or irritate your legs.\n\nThe treatment is incredibly gentle and kind to your skin. If you do have varicose veins, just let me know before your visit. If you have any doubts or worries at all, you are always welcome to send me a photo in a private message, and I will gladly give you a consultation before you book!",
            },
            {
                q: 'I have stretch marks. Can I still have the treatment?',
                a: "Yes, absolutely! Having stretch marks is not a barrier at all for a sugaring treatment. However, it is important to know that skin with stretch marks is incredibly delicate, thinner, and carries a higher risk of skin trauma or heightened sensitivity.\n\nBecause of this, these areas require a specialised technique and exceptional care. I am highly trained in working meticulously with sugar paste on delicate skin, ensuring your skin remains completely protected. It is vital to choose your therapist carefully, especially if you have stretch marks in the bikini area.\n\nIn fact, because the sugar paste acts as a gentle spa exfoliation, it leaves the skin looking much smoother, softer, and beautifully hydrated. I am always so proud when my clients with stretch marks mention how light, comfortable, and easy their session felt. You can feel 100% confident knowing you are in safe, expert hands!",
            },
            {
                q: 'My skin sweats heavily. Is sugaring suitable for me?',
                a: "Yes, absolutely! Heavy sweating is not a barrier at all. Sugar paste handles this brilliantly and ensures a perfectly smooth finish.\n\nThe treatment might take a little longer, so please make sure to let me know before your visit—I will allocate more time for your appointment to carefully prepare your skin and make everything as comfortable and high-quality as possible for you!",
            },
            {
                q: 'How old do I have to be for sugaring?',
                a: "Sugaring is 100% organic and completely safe for teenagers. It is a wonderful option from the moment a young girl feels ready and develops a personal wish to remove unwanted hair. First and foremost, it is incredibly important to me that this is entirely her own choice, as her comfort and confidence come first.\n\nIf you are under 18, we just follow a few gentle guidelines to ensure everything is perfect:\n\n• Parental Support: For anyone under the age of 18, a parent or guardian needs to accompany her to the first appointment so we can all chat together, answer any questions, and sign a basic consent form.\n\n• Intimate Care: For teenagers under 18, we focus on a very gentle, basic bikini line treatment (along the underwear line). An extended bikini option is only recommended once her menstrual cycle has naturally regulated and stabilised. Please note that 18 is the minimum age for a full Hollywood or Brazilian treatment.",
            },
        ]
    },
    {
        category: "Aftercare & Maintenance",
        items: [
            {
                q: 'Post-Treatment Aftercare Advice',
                a: "Hair removal is naturally a minor trauma for your hair follicles, which means every action you take after your session is incredibly important.\n\nTo keep your skin beautifully smooth, calm, and healthy, please follow these guidelines for 48 hours after your first appointment or 24 hours if you are a regular client (adjusting to your individual skin recovery time).\n\nWhat to avoid (For 24 to 48 hours):\n\n• Direct sunlight and sunbeds: Avoid exposing the treated area to the sun, as fresh skin is highly vulnerable to UV rays and can easily develop uneven pigmentation. If the sun is active and you need to go outdoors, you must apply a high-factor SPF 50 sunscreen to protect the newly treated areas.\n\n• Heat and friction: Avoid saunas, steam rooms, swimming pools, hot baths, intense workouts, and sex—essentially anything that causes heavy sweating or friction on your delicate skin.\n\n• Harsh products and soaps: Do not apply scented lotions, deodorants, self-tanners, or chemical peels. If needed, you can take a light, lukewarm shower no earlier than 4 hours after your session (this allows the professional aftercare products I applied to fully work their magic). Wash the area with water only—no shower gels or soaps.\n\n• Synthetics and bacteria: Minimise touching the treated area with your hands (if you must, ensure they are thoroughly clean). Opt for loose clothing and underwear made strictly from natural fabrics like cotton.\n\n• For facial areas: If we performed facial sugaring, please ensure you sleep on a fresh, clean pillowcase on the night of your treatment.",
            },
            {
                q: 'What should you do for long-term skin health?',
                a: 'It is no secret that home care makes up 80% of how your skin looks and feels. After all, you spend just one hour a month with me, but you live with your skin every single day.\n\nI provide comprehensive, tailored advice based entirely on your specific skin type during your appointment. I am always here to teach you which products to choose and the correct order to use them in, ensuring you can confidently maintain healthy, radiant skin between your visits.',
            },
            {
                q: 'How often should I book my appointments?',
                a: 'As a general guide, I recommend booking your treatments every 4 to 5 weeks to achieve that beautiful "natural laser effect" and reduce hair growth quickly.\n\nHowever, every body is beautifully unique. Hair growth cycles depend on many internal factors, including hormonal balance, medications, contraception, pregnancy, or breastfeeding, which can cause hair to grow much slower. Depending on the specific area and your body\'s rhythm, your intervals could easily be longer—around 6 to 8 weeks. I am always here to guide you and personalise your schedule so you get the absolute best, longest-lasting results for your skin.',
            },
        ]
    }
];

export default function FAQSection() {
    return (
        <section id="faq" className="py-16 lg:py-32 bg-secondary/30">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">FAQ</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
                        Frequently Asked <span className="font-semibold italic">Questions</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Accordion type="single" collapsible className="space-y-10">
                        {faqCategories.map((cat, catIdx) => (
                            <div key={catIdx}>
                                <h3 className="font-display text-xl text-primary font-semibold mb-4 italic px-2">{cat.category}</h3>
                                <div className="space-y-3">
                                    {cat.items.map((faq, i) => (
                                        <AccordionItem key={i} value={`faq-${catIdx}-${i}`} className="bg-background border border-border/50 rounded-sm px-6 data-[state=open]:border-primary/30 transition-colors">
                                            <AccordionTrigger className="text-sm font-body font-medium text-foreground hover:text-primary text-left py-5 hover:no-underline">
                                                {faq.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 whitespace-pre-line">
                                                {faq.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}