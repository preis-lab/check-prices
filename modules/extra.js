module.exports = async (page) => {

  await page.setViewport({
    width: 800,
    height: 600
  });
  
  const description = await page.evaluate(el => el.innerText, await page.$('.css-rfo7gs'));
  const price = await page.evaluate(el => el.innerText, await page.$('#product-price'));

  return {
    description,
    price
  }
}