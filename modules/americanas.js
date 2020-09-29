module.exports = async (page) => {

  await page.setViewport({
    width: 100,
    height: 100
  });
  
  const description = await page.evaluate(el => el.innerText, await page.$('#product-name-default'));
  const price = await page.evaluate(el => el.innerText, await page.$('.price__SalesPrice-ej7lo8-2'));

  return {
    description,
    price
  }
}