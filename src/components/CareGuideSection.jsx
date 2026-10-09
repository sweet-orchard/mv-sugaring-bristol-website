import { Sparkles, Droplet, Ban, Shirt, Flame, GlassWater } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';

const HairIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 2c3 4-3 9 0 13c2 2.5 4 4.5 5 7" />
        <path d="M11 2c3 5-3 10 0 14c2 2.5 4 4.5 5 6" />
        <path d="M17 2c3 4-3 9 0 13c1.5 2 3.5 4 4.5 6" />
    </svg>
);

export default function CareGuideSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    

    const beforeRules = [
        { icon: <HairIcon className="w-5 h-5 text-primary" />, title: <T id="CARE_BEFORE_1_TITLE" />, desc: <T id="CARE_BEFORE_1_DESC" /> },
        { icon: <Sparkles className="w-5 h-5 text-primary" />, title: <T id="CARE_BEFORE_2_TITLE" />, desc: <T id="CARE_BEFORE_2_DESC" /> },
        { icon: <Droplet className="w-5 h-5 text-primary" />,  title: <T id="CARE_BEFORE_3_TITLE" />, desc: <T id="CARE_BEFORE_3_DESC" /> },
        { icon: <Ban className="w-5 h-5 text-primary" />,     title: <T id="CARE_BEFORE_4_TITLE" />, desc: <T id="CARE_BEFORE_4_DESC" /> },
    ];

    const afterRules = [
        { icon: <Shirt className="w-5 h-5 text-primary" />,      title: <T id="CARE_AFTER_1_TITLE" />, desc: <T id="CARE_AFTER_1_DESC" /> },
        { icon: <Flame className="w-5 h-5 text-primary" />,      title: <T id="CARE_AFTER_2_TITLE" />, desc: <T id="CARE_AFTER_2_DESC" /> },
        { icon: <Ban className="w-5 h-5 text-primary" />,        title: <T id="CARE_AFTER_3_TITLE" />, desc: <T id="CARE_AFTER_3_DESC" /> },
        { icon: <GlassWater className="w-5 h-5 text-primary" />, title: <T id="CARE_AFTER_4_TITLE" />, desc: <T id="CARE_AFTER_4_DESC" /> },
    ];

    return (
        <section id="care-guide" className="py-16 lg:py-32 bg-secondary/20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-5 lg:px-10 relative">
                
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium font-body"><T id="CARE_EYEBROW" /></span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display font-light text-foreground mb-4 text-3xl md:text-5xl lg:text-6xl"><T id="CARE_HEADING" /></h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground font-body text-sm md:text-[17px] leading-[1.8]"><T id="CARE_SUBTEXT" /></p>
                </div>

                {/* Symmetrical Grid layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    
                    {/* COLUMN 1: BEFORE THE SESSION */}
                    <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display font-semibold text-foreground text-xl md:text-2xl"><T id="CARE_BEFORE_TITLE" /></h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5"><T id="CARE_BEFORE_SUBTITLE" /></p>
                        </div>

                        <div className="space-y-6">
                            {beforeRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 border border-border/30 group-hover:border-primary/30 transition-colors">
                                        {rule.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground tracking-wide font-body mb-1">{rule.title}</h4>
                                        <p className="text-muted-foreground font-body text-sm md:text-[17px] leading-[1.8]">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: AFTER THE SESSION */}
                    <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display font-semibold text-foreground text-xl md:text-2xl"><T id="CARE_AFTER_TITLE" /></h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5"><T id="CARE_AFTER_SUBTITLE" /></p>
                        </div>

                        <div className="space-y-6">
                            {afterRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 border border-border/30 group-hover:border-primary/30 transition-colors">
                                        {rule.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground tracking-wide font-body mb-1">{rule.title}</h4>
                                        <p className="text-muted-foreground font-body text-sm md:text-[17px] leading-[1.8]">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom luxury reminder */}
                <div className="max-w-2xl mx-auto mt-16 text-center">
                    <p className="font-display italic text-xl md:text-2xl gold-text font-medium leading-relaxed"><T id="CARE_CLOSING_QUOTE" /></p>
                </div>

            </div>
        </section>
    );
}
