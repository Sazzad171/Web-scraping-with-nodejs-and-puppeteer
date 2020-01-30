const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://www.pickaboo.com/search/result/?q=mobile+phone'
  await page.goto(url);
  // await page.screenshot({ path: "example.png" });

  // const output = await page.evaluate(
  //   () => document.querySelector("h1").textContent
  // );

  // for headings
  const heading = await page.evaluate( () => 

    Array.from(document.querySelectorAll("div.product-item h2.product-name"))
      .map(partner => partner.innerText.trim())
  )

  // for img
  const img = await page.evaluate( () => 

    Array.from(document.querySelectorAll("div.product-item div.product-shop-top img"))
      .map(img => img.src)
  )

  // shortcut of them
  const partners = await page.evaluate( () => 

    Array.from(document.querySelectorAll("div.product-item"))
      .map(compact => ({
        title: compact.querySelector('h2.product-name').innerText.trim(),
        img: compact.querySelector('div.product-shop-top img').src
      }))
  )
  
  console.log(partners);
  

  await browser.close();
})();