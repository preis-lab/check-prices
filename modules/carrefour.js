module.exports = async (page) => {
  await page.setViewport({
    width: 600,
    height: 800
  });

  const description = await page.evaluate(el => el.innerHTML, await page.$('.vtex-store-components-3-x-productBrand'));
  const price = await page.evaluate(el => el.innerHTML, await page.$('.carrefourbr-carrefour-components-0-x-currencySellingPrice'));

  return {
    description,
    price
  }
}