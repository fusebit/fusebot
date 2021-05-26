# /fusebot github-dispatch <user/repo> <workflow_id> <branch/tag name>

This command triggers a github action through a workflow_trigger.

1. Type `/fusebot edit github-dispatch`.
2. Click the _edit_ link.
3. Copy and paste the [command.js](command.js) file content into the command.js file in the web editor.
4. Add `"octokit": "1.0.5"` into package.json as a dependency.
5. In the Configuration section of the editor, set the PAT={github-personal-access-token} property. You can obtain your GitHub personal access token from [github_pat_tutorial](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
6. Save.
7. Call `/fusebot github-dispatch` from Slack/Discord.
8. Modify and tinker!

## Note:

The Github personal access token for this function requires the permission of `repo:*` and `action:write` to function.