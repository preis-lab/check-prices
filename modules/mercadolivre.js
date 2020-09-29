module.exports = async (page) => {

  await page.setViewport({
    width: 100,
    height: 100
  });
  
  const description = await page.evaluate(el => el.innerHTML, await page.$('.ui-pdp-title'));
  const price = await page.evaluate(el => el.innerHTML, await page.$('.price-tag-fraction'));

  return {
    description,
    price
  }
}