const puppeteer = require("puppeteer");
const sites = require('./sites')
const modules = require('./modules')
const Datastore = require('nedb'), db = new Datastore();
const axios = require('axios')

const botToken = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID

puppeteer.launch({
  headless: true,
  ignoreHTTPSErrors: true,
  executablePath: "/opt/google/chrome-unstable/google-chrome",
  args: [
    "--no-sandbox",
    '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
  ]
}).then(async browser => {

  let index = 0
  while (true) {
    const site = sites[index].split('.')[0].split('//')[1]
      
    const context = await browser.createIncognitoBrowserContext(); 
    const page = await context.newPage();

    await page.goto(sites[index]);
  
    const { price, description } = await modules[site](page)

    await page.close();

    const url = sites[index]
    
    db.find({ url }, async function (err, docs) {
    
      const item = docs[0]
      
      if (!item) {        
        db.insert({
          url,
          price,
          description
        })
        
      } else if(item.price !== price) {        
        const message = `Mudança de preço! ${item.description} foi de ${item.price} para ${price} no link: ${url}`
        const telegramUri = encodeURI(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`)        
        await axios.get(telegramUri)
        
        db.update({
          _id: item._id
        },
        {
          $set: {
            price,
            description
          }
        })
      }
      
    });
  
    console.log('====================================');
    console.log('Descrição:', description);
    console.log('Preço:', price);
    console.log('Link:', url);
    console.log('====================================');        
    index++
    if (index === sites.length) index = 0
  }
  
})
