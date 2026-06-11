import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImageIcon } from 'lucide-react';

const posts = [
    {
        title: 'What is Sugaring & Why Exactly Sugaring?',
        excerpt: 'Sugaring is a 100% natural, organic hair removal method using sugar paste. To me, it is far more than just hair removal—it is a luxurious self-care spa ritual.',
        tag: 'Education',
    },
    {
        title: 'Arm Sugaring is Having a Moment!',
        excerpt: "It's just as highly requested as the bikini line. The post-treatment feeling is second to none—lightness, silkiness, and femininity right down to your fingertips.",
        tag: 'Trending',
    },
];

export default function BlogSection() {
    return (
        <section id="blog" className="py-24 lg:py-32 bg-background">
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
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">Journal</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        Beauty <span className="font-semibold italic">Insights</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            {/* Image placeholder */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-secondary via-accent to-secondary rounded-sm mb-5 overflow-hidden flex items-center justify-center relative">
                                <div className="text-center p-6">
                                    <ImageIcon className="w-6 h-6 text-primary/30 mx-auto mb-2" />
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Blog Photo #{i + 1}</p>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase text-primary font-medium rounded-sm">
                                        {post.tag}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                            <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary font-medium group-hover:gap-3 transition-all">
                                Read More <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}