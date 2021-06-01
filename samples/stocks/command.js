const Superagent = require('superagent');

/**
* This is the implementation of your Fusebot command.
* You can run it from Slack with `/fusebot stocks ...`.
* Fusebot is powered by the Fusebit integration platform, https://fusebit.io/
* 
* Docs and samples are at https://github.com/fusebit/fusebot
* You can talk to a fellow developer on Slack at https://fusebit.io/contact
* Or tell us what you think with `/fusebot feedback {your-comments}` 
*
* Now let's build something already. 

* @param ctx {FusebotContext}
*/
module.exports = async (ctx) => {
  if (ctx.body.args.length === 0 || ctx.body.args[0] === 'help') {
    return help(ctx)
  }
  if (!ctx.configuration.API_KEY) {
      await ctx.client.send("API_KEY not found, please refer to https://github.com/fusebit/fusebot/blob/main/samples/stocks/README.md for more information.")
      return
  }
  const stockSymbol = ctx.body.args[0]
  const results = await Superagent.get(`https://www.alphavantage.co/query\?function\=GLOBAL_QUOTE\&symbol\=${stockSymbol}\&apikey\=${ctx.configuration.API_KEY}`)
  await ctx.client.send(`${stockSymbol}'s current price is ${results.body['Global Quote']['05. price']}.`)
};

const help = async (ctx) => {
  await ctx.client.send(`
- /fusebot stocks <ticker>
- /fusebot stocks help - display this help
e.g.
/fusebot stocks AMC`)
}