module.exports = async (page) => {

  await page.setViewport({
    width: 100,
    height: 100
  });
  
  const description = await page.evaluate(el => el.innerHTML, await page.$('.product-detail-title'));
  const price = await page.evaluate(el => el.innerText, await page.$('.current'));

  return {
    description,
    price
  }
}