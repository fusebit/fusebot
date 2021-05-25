const { Octokit } = require('octokit')
// argument format
// /fusebot <user/repo> <workflow_id> <branch/tag name>

// please update this with your own personal access token
const personalAccessToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

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
        return help(ctx)
    }
    const octokit = new Octokit({ auth: personalAccessToken });
    console.log(ctx.body.args)
    const userRepo = ctx.body.args[0]
    const workflowId = ctx.body.args[1]
    const branchTagName = ctx.body.args[2]
    await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
        owner: userRepo.split("/")[0],
        repo: userRepo.split("/")[1],
        workflow_id: workflowId,
        ref: branchTagName
    })
    // Parse arguments? - https://github.com/fusebit/fusebot#programming-model
    // Talk back to Slack/Discord? - https://github.com/fusebit/fusebot#ctxclient
    // Use an NPM module? - https://github.com/fusebit/fusebot#programming-model
    // Need storage? - https://github.com/fusebit/fusebot#ctxstorage

    await ctx.client.sendEphemeral(`workflow ${workflowId} on ${userRepo} with branch/tag ${branchTagName} triggered!`)
};

const help = async(ctx) => {
    await ctx.client.send(`
    - /fusebot github-dispatch <username>/<reponame> <workflow id> or <workflow file name ie: publish.yml> <branch name> or <tag name> 
    - /fusebot github-dispatch help - display this help
    e.g.
    /fusebot github-dispatch fusebit/fusebot publish.yaml master
    `)
}