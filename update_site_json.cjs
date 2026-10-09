const fs = require('fs');
const path = './src/content/site.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newKeys = {
  "NEW_ABOUT_P1_DROP_CAP": "H",
  "NEW_ABOUT_P1": "i, I'm Mariia. There are three things you should know about me.",
  "NEW_ABOUT_P2_1": "First, I truly love my work",
  "NEW_ABOUT_P2_2": " — it's what makes my eyes light up every single day, and I put my whole heart into it.",
  "NEW_ABOUT_P3_1": "Second, I'm hard-working and persistent.",
  "NEW_ABOUT_P3_2": " I've spent years learning every nuance of how sugar paste behaves, so I can work with it precisely and gently.",
  "NEW_ABOUT_P4_1": "Third, the way I treat every woman.",
  "NEW_ABOUT_P4_2": " I believe in every woman, and I have deep respect for her unique journey — to me, each client is a precious gift. Working with the body is a delicate and trusting space, and it's a real joy to help you feel confident while celebrating your natural beauty.",
  "NEW_ABOUT_P5": "What I treasure most is genuine emotion: when you tell me how good you feel and that you simply don't want to leave. I believe women need women — and care given with real love can work wonders.",
  "NEW_ABOUT_P6": "My studio isn't about high-volume bookings or rushed appointments. It's for women who want a gentle, attentive and warm approach — given with love and sincerity.",
  "NEW_ABOUT_SIGN_1": "With love,",
  "NEW_ABOUT_SIGN_2": "Mariia",
  "NEW_ABOUT_LIST_TITLE": "A few things about me",
  "NEW_ABOUT_LIST_1": "I'm Ukrainian, and proud of my roots and the path I've walked.",
  "NEW_ABOUT_LIST_2": "Mum to Yeva (10) and Yana (4) — my wings and my inspiration.",
  "NEW_ABOUT_LIST_3": "I came to the UK with a one-month-old baby, born during the war in Ukraine. It taught me to treasure every moment of peace and safety.",
  "NEW_ABOUT_LIST_4": "I graduated with honours in finance and economics, and published research articles at university. It taught me precision and high standards in everything.",
  "NEW_ABOUT_LIST_5": "Over 8 years I've completed countless professional and personal development courses — so I know how to explain things simply.",
  "NEW_ABOUT_LIST_6": "Dance has been my passion since childhood: I danced ballroom professionally for 8 years, and I still love it.",
  "NEW_ABOUT_LIST_7": "My biggest achievement? The life I've built — step by step."
};

Object.keys(data).forEach(lang => {
  Object.assign(data[lang], newKeys);
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully updated site.json');
