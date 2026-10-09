const fs = require('fs');
const path = './src/content/site.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newKeys = {
  "NEW_WHY_EYEBROW": "THE METHOD",
  "NEW_WHY_HEADING": "Why Sugaring?",
  "NEW_WHY_SUBTEXT": "Sugaring is a natural hair removal method using sugar paste. To me, it's far more than hair removal — it's a self-care ritual.",
  "NEW_WHY_BENEFIT_1_TITLE": "Less painful",
  "NEW_WHY_BENEFIT_1_DESC": "Clients often tell me it's the most comfortable hair removal they've had. I've spent years studying different sugaring techniques, and I know how to keep discomfort to a minimum through skill — this is one of the things that sets my work apart.",
  "NEW_WHY_BENEFIT_2_TITLE": "Kinder to your skin",
  "NEW_WHY_BENEFIT_2_DESC": "Suitable for every skin type — and especially good for sensitive, thin or mature skin, and for skin with stretch marks or cellulite, whatever your body shape. The soft paste is used at a comfortable body temperature, which helps reduce irritation.",
  "NEW_WHY_BENEFIT_3_TITLE": "Softer skin, every time",
  "NEW_WHY_BENEFIT_3_DESC": "Every session is also a spa for your body: a natural exfoliation that gently lifts away dead skin cells and cleanses your skin. Whatever its condition, your skin will look fresher and healthier, with a natural glow — and feel incredibly soft and silky to the touch.",
  "NEW_WHY_BENEFIT_4_TITLE": "Less hair over time",
  "NEW_WHY_BENEFIT_4_DESC": "In 8 years of sugaring, I've seen it again and again: hair starts to change from the very first session. Most clients see around 30% less hair — often more — and it grows back thinner, lighter and softer, so you can forget about stubble. Over time, some areas stay completely smooth, with no hair growing back at all — this can take anywhere from one year to a few years. Every client's result is her own.",
  "NEW_WHY_CLOSING_QUOTE": "Comfort, lightness and confidence — a feeling of self-love. That's what sugaring gives me, and what I share with my clients."
};

Object.keys(data).forEach(lang => {
  Object.assign(data[lang], newKeys);
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully updated site.json for Why Sugaring');
