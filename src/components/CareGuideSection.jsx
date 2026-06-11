import { Sparkles, Droplet, Ban, Shirt, Flame, GlassWater } from 'lucide-react';

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
    const beforeRules = [
        {
            icon: <HairIcon className="w-5 h-5 text-primary" />,
            title: "Ideal Hair Length",
            desc: "For the most comfortable treatment, hair should be about 5-7 mm long (typically 2-3 weeks after your last shave)."
        },
        {
            icon: <Sparkles className="w-5 h-5 text-primary" />,
            title: "Gentle Exfoliation",
            desc: "Exfoliate the area gently 24 hours before your session. This lifts flat hairs and removes dead skin cells for easier removal."
        },
        {
            icon: <Droplet className="w-5 h-5 text-primary" />,
            title: "Clean, Bare Skin",
            desc: "Arrive with clean skin. Please do not apply rich body creams, lotions, or oils on the treatment day as they block the paste."
        },
        {
            icon: <Ban className="w-5 h-5 text-primary" />,
            title: "Avoid Tanning",
            desc: "Avoid sunbathing, tanning beds, and fake tan application for at least 24-48 hours prior to your treatment."
        }
    ];

    const afterRules = [
        {
            icon: <Shirt className="w-5 h-5 text-primary" />,
            title: "Breathable Clothing",
            desc: "Wear loose-fitting, soft cotton underwear and clothing. Tight synthetic fabrics trap friction and sweat, leading to irritation."
        },
        {
            icon: <Flame className="w-5 h-5 text-primary" />,
            title: "Avoid Heat & Exercise",
            desc: "For the first 24-48 hours, skip heavy gym workouts, hot baths, steam rooms, saunas, and swimming pools."
        },
        {
            icon: <Ban className="w-5 h-5 text-primary" />,
            title: "No Harsh Products",
            desc: "Do not apply perfumed lotions, deodorants, self-tans, makeup, or active chemical skin treatments on the treated area."
        },
        {
            icon: <GlassWater className="w-5 h-5 text-primary" />,
            title: "Hydration & Exfoliation",
            desc: "Start moisturizing daily after 24 hours. Begin gentle skin exfoliation 3-4 days post-treatment to prevent ingrown hairs."
        }
    ];

    return (
        <section id="care-guide" className="py-24 lg:py-32 bg-secondary/20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-5 lg:px-10 relative">
                
                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium font-body">Skin Care</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
                        The <span className="font-semibold italic text-primary">Care Guide</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed font-body">
                        To guarantee baby-smooth skin, minimal discomfort, and a luxurious spa result, follow these simple preparation and aftercare recommendations.
                    </p>
                </div>

                {/* Symmetrical Grid layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    
                    {/* COLUMN 1: BEFORE THE SESSION */}
                    <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display text-2xl font-semibold text-foreground">Before Sugaring</h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Preparation Rules</p>
                        </div>

                        <div className="space-y-6">
                            {beforeRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 border border-border/30 group-hover:border-primary/30 transition-colors">
                                        {rule.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground tracking-wide font-body mb-1">{rule.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-body">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: AFTER THE SESSION */}
                    <div className="bg-background/80 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-8 pb-4 border-b border-border/30">
                            <h3 className="font-display text-2xl font-semibold text-foreground">After Sugaring</h3>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Aftercare Rules</p>
                        </div>

                        <div className="space-y-6">
                            {afterRules.map((rule, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 border border-border/30 group-hover:border-primary/30 transition-colors">
                                        {rule.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground tracking-wide font-body mb-1">{rule.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-body">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom luxury reminder */}
                <div className="max-w-2xl mx-auto mt-16 text-center">
                    <p className="font-display italic text-lg text-primary/80 leading-relaxed">
                        "Your skin is your body's shield and your signature accessory. Treat it with kindness, love, and professional care."
                    </p>
                </div>

            </div>
        </section>
    );
}
