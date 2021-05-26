const { Octokit } = require("octokit");
/**
* This is the implementation of your Fusebot command.
* You can run it from Slack with `/fusebot trigger-fusebit-pipeline ...`.
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
    return help(ctx);
  }
  if (!ctx.configuration.PAT) {
    await ctx.client.send(
      "unable to find github PAT in configuration, please set a PAT in configuration with the scope of * on repo and write on action."
    );
  }
  const octokit = new Octokit({ auth: ctx.configuration.PAT });
  const [userRepo, workflowId, branchTagName] = ctx.body.args;
  let isError = false;
  if (!userRepo) {
    isError = true;
    await ctx.client.send("Username/repository was not found.");
  }
  if (!workflowId) {
    isError = true;
    await ctx.client.send("WorkflowId/workflowFileName was not found.");
  }
  if (!branchTagName) {
    isError = true;
    await ctx.client.send("Branch name or tag name was not found.");
  }
  if (isError) {
    return;
  }
  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: userRepo.split("/")[0],
      repo: userRepo.split("/")[1],
      workflow_id: workflowId,
      ref: branchTagName,
    }
  );
  await ctx.client.send(
    `workflow ${workflowId} on ${userRepo} triggered with branch/tag ${branchTagName}!`
  );
};

const help = async (ctx) => {
  await ctx.client.send(`
- /fusebot github-dispatch <username>/<reponame> <workflow id> or <workflow file name ie: publish.yml> <branch name> or <tag name> 
- /fusebot github-dispatch help - display this help
e.g.
/fusebot github-dispatch fusebit/fusebot publish.yaml master`);
};
