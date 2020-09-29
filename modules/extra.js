module.exports = async (page) => {

  await page.setViewport({
    width: 100,
    height: 100
  });
  
  const description = await page.evaluate(el => el.innerText, await page.$('.name'));
  const price = await page.evaluate(el => el.innerHTML, await page.$('#ctl00_Conteudo_ctl00_precoPorValue'));

  return {
    description,
    price
  }
}