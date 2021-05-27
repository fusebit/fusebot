const Superagent = require('superagent');
const mysql = require('promise-mysql');
/**
* This is the implementation of your Fusebot command.
* You can run it from Slack with `/fusebot run-query ...`.
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
    if (ctx.body.args.length === 0 || ctx.body.args[0] === "help") {
        return help(ctx)
    }
    if (!ctx.configuration.HOST || !ctx.configuration.PORT || !ctx.configuration.USERNAME || !ctx.configuration.PASSWORD) {
        return ctx.client.sendEphemeral("Unable to detect SQL connection settings from configuration. For more information, please check https://github.com/fusebit/fusebot/tree/main/samples/dataQuery")
    }
    const sqlStatement = ctx.body.args.join(" ")
    try {
        const conn = await mysql.createConnection({
            host: ctx.configuration.HOST,
            port: ctx.configuration.PORT,
            user: ctx.configuration.USERNAME,
            password: ctx.configuration.PASSWORD
        })
        const results = await conn.query(sqlStatement)
        let totalRows = 0;
        for (const row of results) {
            if (totalRows >= 20) {
                await ctx.client.send("Please limit your SQL query to 20 rows.")
            }
            await ctx.client.send(JSON.stringify(row))
            totalRows++
        }
        return
    } catch (e) {
        await ctx.client.send("Something went wrong when trying to execute the queries.")
        await ctx.client.sendEphemeral(e.message)
    }
};

const help = (ctx, optionalMessages) => {
    let messagesToSend = [];
    if (optionalMessages) {
        messagesToSend = messagesToSend.concat(optionalMessages)
    }
    messagesToSend.push(`
- /fusebot run-query <SQL Query>
- /fusebot run-query help - display this help
e.g.
/fusebot run-query SELECT * FROM fusebot WHERE sample_name="dataQuery";`)
    await ctx.client.send(messagesToSend.join("\n"))
}