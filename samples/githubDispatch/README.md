# /fusebot github-dispatch <user/repo> <workflow_id> <branch/tag name>

This command triggers a github action with workflow_trigger action.

1. Type `/fusebot edit github-dispatch`.
2. Click the _edit_ link.
3. Copy and paste the [command.js](command.js) file content into the command.js file in the web editor.
4. add `"octokit": "1.0.5"` into package.json as a dependency
4. Save.
5. Call `/fusebot github-dispatch` from Slack/Discord.
6. Modify and tinker!
