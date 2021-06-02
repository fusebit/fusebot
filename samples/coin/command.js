const Superagent = require("superagent");

/**
* This is the implementation of your Fusebot command.
* You can run it from Slack with `/fusebot coin ...`.
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
  // Get the coin symbol provided by the caller
  let [coin] = ctx.body.args;

  // If no coin symbol was provided by the caller, show help
  if (!coin) {
    return await help(ctx);
  }

  coin = coin.toUpperCase();

  // Get current prices. See sochain.com API docs at https://sochain.com/api#get-prices
  const r = await Superagent.get(
    `https://sochain.com/api/v2/get_price/${coin}/USD`
  );

  // Format response
  const message = r.body.data.prices
    .map(
      (p) =>
        `:moneybag: ${coin} price is ${p.price} USD on the ${p.exchange} exchange.`
    )
    .join("\n");

  // And send it
  await ctx.client.send(message);
};

async function help(ctx) {
  await ctx.client
    .send(`:information_source: This command gets the current trading value of a digital currency on multiple exchanges.
Usage: \`/fusebot coin {coin-symbol}\`
e.g.
\`/fusebot coin DOGE\`
\`/fusebot coin BTY\`
Enjoy!`);
}
