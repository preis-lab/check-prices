module.exports = async (page) => {

  await page.setViewport({
    width: 800,
    height: 600
  });

  await page.waitFor('#new-face')
  
  const description = await page.evaluate(el => el.innerHTML, await page.$('.css-1pnb2jm'));
  const price = await page.evaluate(el => el.innerText, await page.$('#product-price'));

  return {
    description,
    price
  }
}