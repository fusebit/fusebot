const Superagent = require("superagent");

/**
* This is the implementation of your Fusebot command.
* You can run it from Slack with `/fusebot bitly ...`.
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
  let [url] = ctx.body.args;

  if (!url || url === "help") {
    return await help(ctx);
  }

  if (!ctx.configuration.ACCESS_TOKEN) {
    return await ctx.client.send(
      "Please edit the command and set the ACCESS_TOKEN configuration property. See https://github.com/fusebit/fusebot/tree/main/samples/bitly for details."
    );
  }

  const result = await Superagent.post("https://api-ssl.bitly.com/v4/shorten")
    .set("Authorization", `Bearer ${ctx.configuration.ACCESS_TOKEN}`)
    .send({ long_url: url });

  await ctx.client.send(`Short link:\n${result.body.link}`);
};

const help = async (ctx) => {
  await ctx.client.send(`This command shortens URLs using bitly. Usage: 
- /fusebot bitly {url} - shorten the URL
- /fusebot bitly help - display this help
e.g.
/fusebot bitly https://fusebit.io/careers`);
};
