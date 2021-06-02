const Superagent = require('superagent');

const REDDIT_TIMEFRAME = 'hour';    // hour, day, week, month, year, all
const REDDIT_LIMIT = 100            // Number of posts to retrieve
const REDDIT_LISTING = 'new'        // controversial, best, hot, new, random, rising, top
const MAX_RESULTS = 5;              // To prevent going over the Discord 2000 character limit for a single message.

/**
* This is the implementation of your Fusebot command.
* You can run it from Discord with `/fusebot reddit ...`.
* Fusebot is powered by the Fusebit integration platform, https://fusebit.io/
* 
* Docs and samples are at https://github.com/fusebit/fusebot
* You can talk to a fellow developer on Discord at https://fusebit.io/contact
* Or tell us what you think with `/fusebot feedback {your-comments}` 
*
* Now let's build something already. 
*
* @param ctx {FusebotContext}
*/
module.exports = async (ctx) => {
  if (ctx.body.args.length < 2) {
    return await help(ctx);
  }

  // The first arg is the subreddit, and the remaining args are terms that all must be in the post's title for a match.
  const [subreddit] = ctx.body.args;
  const terms = ctx.body.args.slice(1).map(term => term.toLowerCase()); // Convert all to lowercase for case-insensitive search.

  // See: https://www.jcchouinard.com/reddit-api-without-api-credentials/
  const url = `https://www.reddit.com/r/${subreddit}/${REDDIT_LISTING}.json?limit=${REDDIT_LIMIT}&t=${REDDIT_TIMEFRAME}`;
  
  const result = await Superagent.get(url);
  const posts = result.body.data.children;

  let message = 'Results: ';
  let numFound = 0;
  for (const post of posts) {
    let title = post.data.title.toLowerCase();
    let match = true;
    // Check that each term is in the title. (Case insensitive match)
    for (const term of terms) {
      if (!title.includes(term)) {
        match = false;
        break;
      }
    }

    if (match) {
      numFound++;
      message += `\n${numFound}. ${post.data.title}: ${post.data.url}`;
    }

    if (numFound >= MAX_RESULTS) {
      break;
    }
  }

  if (numFound == 0) {
    message += '\nNo results found.'
  }

  await ctx.client.sendEphemeral(message);
};

const help = async (ctx) => {
  await ctx.client.sendEphemeral(`This command searches a specified subreddit for new posts with titles containing the supplied terms. Usage:
\`\`\`
/fusebot reddit <subreddit> <term> [<term> ]+
Example:
/fusebot reddit buildapcsales monitor gaming 
\`\`\`
`)
};
