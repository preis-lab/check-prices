module.exports = async (page) => {
  await page.setViewport({
    width: 800,
    height: 600
  });

  const description = await page.evaluate(el => el.innerHTML, await page.$('.vtex-store-components-3-x-productBrand'));
  const price = await page.evaluate(() => {
    const spans = []
    document.querySelector('.carrefourbr-carrefour-components-0-x-currencyContainer').childNodes.forEach(span => spans.push(span.innerHTML))
    return spans.reduce((acc, a) => acc += a)
  });

  return {
    description,
    price
  }
}