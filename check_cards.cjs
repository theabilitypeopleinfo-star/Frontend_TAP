const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/');
  
  // Wait for the elements to load
  await page.waitForSelector('.group.h-full');
  
  // scroll a lot down
  await page.evaluate(() => {
    window.scrollTo(0, 2000);
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  const cards = await page.evaluate(() => {
    // Find all FocusAreaCard titles to locate them
    const cards = Array.from(document.querySelectorAll('.group.h-full h4'));
    return cards.map(c => {
      const motionDiv = c.closest('div[style*="opacity"]');
      if (!motionDiv) return { title: c.textContent, error: "No motion div found" };
      return {
        title: c.textContent,
        opacity: window.getComputedStyle(motionDiv).opacity,
        transform: window.getComputedStyle(motionDiv).transform,
        inlineStyle: motionDiv.getAttribute('style')
      };
    });
  });
  
  console.log("CARDS ANIMATION STATE:", JSON.stringify(cards, null, 2));
  
  await browser.close();
})();
