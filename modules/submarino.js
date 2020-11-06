module.exports = async (page) => {
  
  const description = await page.evaluate(el => el.innerHTML, await page.$('#product-name-default'));
  const price = await page.evaluate(el => el.innerHTML, await page.$('.sales-price'));

  return {
    description,
    price
  }
}