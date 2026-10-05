const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesSection.jsx', 'utf8');

const bikiniPricingGuideCode = `
function BikiniPricingGuide() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
        >
            <div className="bg-background border-l-2 border-primary/60 rounded-r-sm p-6 md:p-8 space-y-8 text-[15px] font-body leading-relaxed text-muted-foreground shadow-sm">
                
                {/* Intro */}
                <div>
                    <h4 className="text-2xl font-display text-primary mb-4">Hair length & pricing</h4>
                    <p className="text-foreground/80">Longer hair takes more time and care to remove gently, so bikini prices depend on when you last removed your hair.</p>
                </div>

                {/* Pricing table equivalents */}
                <div className="space-y-8">
                    <div>
                        <h5 className="text-[11px] tracking-[0.2em] font-semibold text-primary uppercase mb-4">After waxing or sugaring</h5>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-border/50 border-dotted pb-3">
                                <span>Up to 6 weeks</span>
                                <span className="font-semibold text-primary">Standard price</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-border/50 border-dotted pb-3">
                                <span>7–11 weeks</span>
                                <span className="font-semibold text-primary">Up to +£10</span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <span>12+ weeks</span>
                                <span className="font-semibold text-primary">Up to +£20</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-[11px] tracking-[0.2em] font-semibold text-primary uppercase mb-4">After shaving</h5>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-border/50 border-dotted pb-3">
                                <span>2–4 weeks <i className="font-normal opacity-90">(2–3 weeks is ideal)</i></span>
                                <span className="font-semibold text-primary">Standard price</span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <span>Over 4 weeks</span>
                                <span className="font-semibold text-primary">Up to +£15</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explanations */}
                <div className="space-y-5 pt-2">
                    <p>
                        <strong className="text-foreground font-semibold">Why "up to"?</strong> Every visit is different. If your treatment takes less time, you pay less. After years of regular sugaring — or after laser — hair often grows back finer and sparser, so many clients pay no extra at all, even after a longer break.
                    </p>
                    <p>
                        <strong className="text-foreground font-semibold">Long hair?</strong> You can trim it before your visit — just not too short, as very short hair is harder to remove and can affect your results.
                    </p>
                    <p>
                        <strong className="text-foreground font-semibold">Not sure, or several months of growth? Message me on WhatsApp</strong> — I'll advise what's best for you and give you a guide price.
                    </p>
                </div>

            </div>
        </motion.div>
    );
}
`;

// Insert the component function right before FaceCareGuide
code = code.replace('function FaceCareGuide() {', bikiniPricingGuideCode + '\nfunction FaceCareGuide() {');

// Insert the render block right before FaceCareGuide render
const renderBlock = `
                            {/* Bikini Pricing Guide specifically for Bikini tab */}
                            {active.id === 'bikini' && (
                                <BikiniPricingGuide />
                            )}

                            {/* Face Care Guide specifically for Face tab */}`;
code = code.replace('{/* Face Care Guide specifically for Face tab */}', renderBlock);

fs.writeFileSync('src/components/ServicesSection.jsx', code);
console.log('Added BikiniPricingGuide.');
