const fs = require('fs');

let code = fs.readFileSync('src/components/ServicesSection.jsx', 'utf8');

// Replace the end of inclusions and start of duration notes
let searchString = `                        </div>
                    </div>
                </motion.div>
                {/* ── Collapsible Duration Notes ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >`;

let replacementString = `                        </div>
                    </div>

                    {/* ── Collapsible Duration Notes ── */}
                    <div>`;

code = code.replace(searchString, replacementString);

// Remove the closing motion.div of Duration Notes
let searchString2 = `                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Tab Navigation ── */}`;

let replacementString2 = `                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Tab Navigation ── */}`;
// Wait, I need to adjust border radius and border.
// Let's just do precise replacements.

code = code.replace('className="bg-background border border-border/40 rounded-sm p-6 lg:p-8"', 'className="bg-background border border-border/40 rounded-t-sm p-6 lg:p-8 border-b-0"');
code = code.replace('className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-sm hover:border-primary/30 transition-colors"', 'className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-b-sm hover:bg-muted/10 transition-colors"');
// And the opened duration notes content has: className="bg-background border border-t-0 border-border/40 rounded-b-sm px-6 py-6" (This is already good)

// Let's modify the wrapper. It currently has two motion.divs.
// We can just keep them as separate motion.divs but remove the margin between them!
// First one has: className="mb-14"
// Second one has: className="mt-8" -> change to className="mb-14 -mt-1" (to overlap borders if needed, or just remove margin)
code = code.replace('className="mb-14"\n                >\n                    <div className="bg-background border border-border/40 rounded-t-sm p-6 lg:p-8 border-b-0">', 'className=""\n                >\n                    <div className="bg-background border border-border/40 rounded-t-sm p-6 lg:p-8 border-b-0">');

code = code.replace('className="mt-8"\n                >\n                    <button', 'className="mb-14"\n                >\n                    <button');

fs.writeFileSync('src/components/ServicesSection.jsx', code);
console.log('Done connecting blocks');
