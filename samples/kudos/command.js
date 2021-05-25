const Superagent = require("superagent");

/**
 * This is the implementation of your Fusebot command.
 * You can run it from Slack with `/fusebot kudos ...`.
 * Fusebot is powered by the Fusebit integration platform, https://fusebit.io/
 *
 * Docs and samples are at https://github.com/fusebit/fusebot
 * You can talk to a fellow developer on Slack at https://fusebit.io/contact
 * Or tell us what you think with `/fusebot feedback {your-comments}`
 *
 * Now let's build something already.
 *
 * @param ctx {FusebotContext}
 */
module.exports = async (ctx) => {
  const [cmd, ...rest] = ctx.body.args;
  if (cmd === "help") {
    return await help(ctx);
  }
  if (cmd && cmd[0] === "@") {
    // leave feedback
    const username = cmd;
    const feedback = rest.join(" ").trim() || undefined;
    const item = (await ctx.storage.get()) || { data: { users: {} } };
    item.data.users[username] = item.data.users[username] || { kudos: 0 };
    item.data.users[username].kudos++;
    if (feedback) {
      item.data.users[username].feedback =
        item.data.users[username].feedback || [];
      item.data.users[username].feedback.unshift(feedback);
      item.data.users[username].feedback.splice(20);
    }
    await ctx.storage.put(item);
    return await ctx.client.send(
      `Hey ${ctx.body.userName}, thank you for leaving kudos for ${username}!`
    );
  }
  if (cmd === undefined) {
    // get ranking
    const item = await ctx.storage.get();
    let message;
    if (!item) {
      message = `Nobody left kudos yet, be the first!`;
    } else {
      const ranking = [];
      for (var username in item.data.users) {
        ranking.push({ username, ...item.data.users[username] });
      }
      ranking.sort((a, b) =>
        a.kudos > b.kudos ? -1 : a.kudos < b.kudos ? 1 : 0
      );
      message = ranking
        .map((u) => `:trophy: ${u.username} (${u.kudos})`)
        .join("\n");
    }
    return await ctx.client.send(
      `${message}\n\nCall \`/fusebot kudos help\` for help`
    );
  }
  if (cmd === "get") {
    // get feedback for user
    const [username] = rest;
    if (username && username[0] === "@") {
      const item = await ctx.storage.get();
      if (!item || !item.data.users[username]) {
        return await ctx.client.send(
          `User ${username} has not received any kudos yet. Leave them some!`
        );
      } else {
        const u = item.data.users[username];
        return await ctx.client.send(
          `User ${username} has ${u.kudos} kudos!${
            u.feedback
              ? `\nMost recent comments:\n${u.feedback
                  .map((f) => `:trophy: ${f}`)
                  .join("\n")}`
              : ""
          }`
        );
      }
    }
  }
  return await help(ctx);
};

const help = async (ctx) => {
  await ctx.client.send(`Usage: 
- /fusebot kudos @{username} [{feedback}] - to give kudos
- /fusebot kudos - get kudos ranking for everybody
- /fusebot kudos get @{username} - get kudos feedback for a person
- /fusebot kudos help - display this help

e.g.

/fusebot kudos @mark You did a great job!
/fusebit kudos
/fusebot kudos @jane`);
};
