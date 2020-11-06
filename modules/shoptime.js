module.exports = async (page) => {

  await page.setViewport({
    width: 800,
    height: 600
  });
  
  const description = await page.evaluate(el => el.innerHTML, await page.$('#product-name-default'));
  const price = await page.evaluate(el => el.innerHTML, await page.$('.price__SalesPrice-sc-1l92kl5-2'));

  return {
    description,
    price
  }
}