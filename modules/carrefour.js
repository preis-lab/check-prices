module.exports = async (page) => {
  await page.setViewport({
    width: 100,
    height: 100
  });

  const description = await page.evaluate(el => el.innerText, await page.$('.title-product'));
  const price = await page.evaluate(el => el.innerText, await page.$('.priceBig'));

  return {
    description,
    price
  }
}