import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ImageIcon } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        placeholder: 'Client Review Screenshot #1',
        image: '/testemonials/review-1.jpg',
        text: '"I join all the positive reviews. Mariia is a master of her craft. My teenage daughter goes to her. This is a very difficult age and she was very afraid to go to someone for hair removal, and at home it didn\'t work out well. Mariia found the right approach and my daughter is now 200% satisfied and goes with great pleasure."',
    },
    {
        id: 2,
        placeholder: 'Client Review Screenshot #2',
        image: '/testemonials/review-2.jpg',
        text: '"And I recommend Mariia!! Her technique is flawless and completely unlike other professionals! She works very gently and as a person she is incredibly pleasant. I can say with confidence that you won\'t find a better professional in Bristol than Mariia!"',
    },
    {
        id: 3,
        placeholder: 'Client Review Screenshot #3',
        image: '/testemonials/review-3.jpg',
        text: '"This delicate girl (woman, mom) is a person who masterfully does her job, understands all the nuances of her craft, and loves her work and your skin as if it were her own. And rest assured, if you come to Mariika like a little doll, you will flutter away from her like a true butterfly - a feeling of renewal and fresh air through your whole skin, all your thoughts, and your soul. I could write a lot, but it is better to try it once than to read about it! Thanks to Mariika, I am so glad I met her specifically!🍀❤️"',
    },
    {
        id: 4,
        placeholder: 'Client Review Screenshot #4',
        image: '/testemonials/review-4.jpg',
        text: '"Marichko, I always forget to write. I want to sincerely thank you for the hair removal course 💛 I really liked it — it was easy, clear, and stress-free. You explain everything so well that even complex moments become simple. And the practice was just 🔥 I feel much more confident now! Thank you for your support and the atmosphere you created. And for the video afterwards, I can rewatch the moments you showed ✨🫶"',
    },
    {
        id: 5,
        placeholder: 'Client Review Screenshot #5',
        image: '/testemonials/review-5.jpg',
        text: '"You don\'t even imagine how much you motivate with your blogging and by showing your true self, how you cope with truly difficult hardships, and despite everything, you radiate tenderness, femininity, love, and sincerity 🕊️❤️ , and your girls are a whole separate love 😍😍😍😍😍 Therefore, another huge thank you to you for your blog and for this experience that you allow us to live through together with you 🙏🙏🙏🙏😘"',
    },
    {
        id: 6,
        placeholder: 'Client Review Screenshot #6',
        image: '/testemonials/review-6.JPG',
        text: '"Marichko, I am very grateful to you for the course ❤️ Thanks to the knowledge you passed on—I have no paste sticking, my flicks are confident and high-quality, and now I won\'t throw away paste that has condensation on it 🤭 Today, after a long break, I did the underarm area, and I want to say that thanks to the knowledge, this process was fast(I even managed faster with my left hand than with my right)) 😚 The tip about holding down the edge with a finger at the end helps to make a clean flick without sticking or residues 👌 I\'ll attach a photo of my pulled-out hair bulbs 😃 Grateful to you! You are Mega! You succeeded!"',
    },
    {
        id: 7,
        placeholder: 'Client Review Screenshot #7',
        image: '/testemonials/review-7.JPG',
        text: '"Just wanted to share my journey with Maria. 🌷 It has been a while since my first sugaring session, and my skin is still smooth, soft, and glowing. 🩵 For years, I tried almost every hair removal method out there, but the battle with body hair continued — significantly impacting how I felt about myself..... Till I met Maria. She did not just resolve the hair issue, but transformed completely my view of the issue: body hair felt normal and ordinary, but I felt free will and power of choice to make a change about my body."',
    },
    {
        id: 8,
        placeholder: 'Client Review Screenshot #8',
        image: '/testemonials/review-8.JPG',
        text: '"I have tried all sorts of hair removal products and procedures including "sugaring" with other beauticians but the sugaring I have been having with Maria is on a different level! It\'s the way I felt while she was working on my skin, the way I felt after - days and weeks! The long lasting softness and hair free skin! Amazing! I can\'t go back to my previous waxing and painful hair removal work! High quality and outstanding professionalism! A person with a big ❤️ and magic hands! Truly beautiful experience I had with Maria!"',
    },
    {
        id: 9,
        placeholder: 'Client Review Screenshot #9',
        image: '/testemonials/review-9.JPG',
        text: '"Heya! Thank you very much! ❤️ Skin on the face is soft and pleasant after treatment! I did use all creams as per your suggestion too 🥰 So glad I won the discount in your competition and finally managed to see you! Thank you for your skin care advice! I am glad to see a beauty therapist who genuinely likes what she does ❤️"',
    },
    {
        id: 10,
        placeholder: 'Client Review Screenshot #10',
        image: '/testemonials/review-10.JPG',
        text: '"Mariika, I am very grateful to you for today\'s experience and introduction to sugaring! ❤️🤗 It was incredibly high- quality and professional! I appreciate such an individual approach to the client and all your advice on body skin care! 🫶 I will follow everything 👍 It\'s a pleasure to watch people who are passionate about their work, and this in turn is reflected on us as clients! 🥰 Thank you very much ❤️❤️❤️"',
    },
    {
        id: 11,
        placeholder: 'Client Review Screenshot #11',
        image: '/testemonials/review-11.PNG',
        text: '"Marichko, I am very grateful for the wonderful, super-professional work and the beautifully spent time. I am very satisfied with the result. And also, I really had a good rest. Thank you for your sincerity and kindness 🥰 Extremely satisfied with the procedure. After the second time, the hair became softer. Especially pleased with the bikini area, there is significantly less hair ☺️ Thank you very much for the professional work. I will definitely come again 😻 ❤️"',
    },
    {
        id: 12,
        placeholder: 'Client Review Screenshot #12',
        image: '/testemonials/review-12.PNG',
        text: '"Thank you so much for making me feel like my most confident self! I love how soft my skin feels afterwards! It’s like I’m brand new!! I love your work and I always leave with a big smile on my face!! I also love your unique added pink touch to everything! I always wait for my next sessions with you!! Love youu so much and your talented work! ❤️❤️❤️❤️ Hi, i really like it! I will keep coming , Thankyou for a delightful conversation. You’re an amazing person 💖"',
    },
    {
        id: 13,
        placeholder: 'Client Review Screenshot #13',
        image: '/testemonials/review-13.PNG',
        text: '"Mariiechka. ☺️ 😘 I am very grateful to you for today\'s procedure. Every person who comes to you is incredibly lucky. You always take an individual approach to the needs and characteristics of us girls 😘 ❤️ and also your sincere love for your work adds a "special touch" and uniqueness to this 🥰🥰🥰."',
    },
];

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    return (
        <section id="testimonials" className="py-24 lg:py-32 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">Client Love</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        Kind Words from <span className="font-semibold italic">My Clients</span>
                    </h2>
                </motion.div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden rounded-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="bg-background border border-border/50 rounded-sm p-8 lg:p-12"
                            >
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    {/* Real Image or Placeholder */}
                                    {testimonials[current].image ? (
                                        <div className="aspect-[3/4] rounded-sm overflow-hidden border border-border/30 bg-secondary/10 flex items-center justify-center p-2">
                                            <img src={testimonials[current].image} alt="Client review" className="w-full h-full object-contain rounded-sm" loading="lazy" />
                                        </div>
                                    ) : (
                                        <div className="aspect-[3/4] bg-gradient-to-br from-secondary via-accent to-secondary rounded-sm flex items-center justify-center border border-border/30">
                                            <div className="text-center p-6">
                                                <ImageIcon className="w-8 h-8 text-primary/40 mx-auto mb-3" />
                                                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body">{testimonials[current].placeholder}</p>
                                                <p className="text-[10px] text-muted-foreground/60 mt-1">Replace with real client review image</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Text */}
                                    <div>
                                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                        <p className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed mb-6">
                                            {testimonials[current].text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        <button onClick={prev} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs tracking-[0.2em] text-muted-foreground font-body">
                            {current + 1} / {testimonials.length}
                        </span>
                        <button onClick={next} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Bottom quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16 max-w-2xl mx-auto"
                >
                    <p className="font-display text-lg italic text-foreground/50">
                        "Words like these are more than just a review—they are a true reward."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}