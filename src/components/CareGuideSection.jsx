import MiniIllustration from './MiniIllustrations';
import { useContent, T } from '../context/ContentContext';

export default function CareGuideSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    

    const beforeRules = [
        { icon: 'ruler', title: <T id="CARE_BEFORE_1_TITLE" />, desc: <T id="CARE_BEFORE_1_DESC" /> },
        { icon: 'scrub', title: <T id="CARE_BEFORE_2_TITLE" />, desc: <T id="CARE_BEFORE_2_DESC" /> },
        { icon: 'drop',  title: <T id="CARE_BEFORE_3_TITLE" />, desc: <T id="CARE_BEFORE_3_DESC" /> },
        { icon: 'sun',     title: <T id="CARE_BEFORE_4_TITLE" />, desc: <T id="CARE_BEFORE_4_DESC" /> },
    ];

    const afterRules = [
        { icon: 'tee',      title: <T id="CARE_AFTER_1_TITLE" />, desc: <T id="CARE_AFTER_1_DESC" /> },
        { icon: 'flame',      title: <T id="CARE_AFTER_2_TITLE" />, desc: <T id="CARE_AFTER_2_DESC" /> },
        { icon: 'bottle',        title: <T id="CARE_AFTER_3_TITLE" />, desc: <T id="CARE_AFTER_3_DESC" /> },
        { icon: 'glass', title: <T id="CARE_AFTER_4_TITLE" />, desc: <T id="CARE_AFTER_4_DESC" /> },
    ];

    return (
        <section id="care-guide" className="py-10 md:py-16 lg:py-24 bg-secondary/20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium font-body"><T id="CARE_EYEBROW" /></span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display font-semibold text-foreground mb-4 text-2xl md:text-4xl lg:text-5xl leading-[1.15]"><T id="CARE_HEADING" /></h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground font-body text-[13px] md:text-sm lg:text-[15px] leading-[1.65]"><T id="CARE_SUBTEXT" /></p>
                </div>

                {/* Symmetrical Grid layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    
                    {/* COLUMN 1: BEFORE THE SESSION */}
                    <div className="bg-[#FAF5E6] border border-transparent rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display font-bold text-foreground text-lg md:text-xl lg:text-2xl"><T id="CARE_BEFORE_TITLE" /></h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5"><T id="CARE_BEFORE_SUBTITLE" /></p>
                        </div>

                        <div className="space-y-6">
                            {beforeRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-3 items-start group">
                                    <MiniIllustration name={rule.icon} className="w-16 h-14 md:w-[4.5rem] md:h-16 -mt-2 -ml-2" />
                                    <div>
                                        <h4 className="text-sm md:text-[15px] font-medium text-foreground font-body mb-1">{rule.title}</h4>
                                        <p className="text-muted-foreground font-body text-[13px] md:text-sm lg:text-[15px] leading-[1.65]">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: AFTER THE SESSION */}
                    <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display font-bold text-foreground text-lg md:text-xl lg:text-2xl"><T id="CARE_AFTER_TITLE" /></h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5"><T id="CARE_AFTER_SUBTITLE" /></p>
                        </div>

                        <div className="space-y-6">
                            {afterRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-3 items-start group">
                                    <MiniIllustration name={rule.icon} className="w-16 h-14 md:w-[4.5rem] md:h-16 -mt-2 -ml-2" />
                                    <div>
                                        <h4 className="text-sm md:text-[15px] font-medium text-foreground font-body mb-1">{rule.title}</h4>
                                        <p className="text-muted-foreground font-body text-[13px] md:text-sm lg:text-[15px] leading-[1.65]">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom luxury reminder */}
                <div className="max-w-2xl mx-auto mt-10 md:mt-14 text-center">
                    <p className="font-display italic text-lg md:text-xl lg:text-2xl gold-text-strong font-semibold leading-relaxed"><T id="CARE_CLOSING_QUOTE" /></p>
                </div>

            </div>
        </section>
    );
}
