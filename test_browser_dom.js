import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  console.log('HTML length:', content.length);
  
  const rootHtml = await page.$eval('#root', el => el.innerHTML);
  console.log('Root HTML length:', rootHtml.length);
  if (rootHtml.length < 100) {
      console.log('Root HTML:', rootHtml);
  }
  
  await browser.close();
})();
