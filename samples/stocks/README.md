# /fusebot stock <stock tag>

This command triggers a github action through a workflow_trigger.

1. Type `/fusebot edit stock`.
2. Click the _edit_ link.
3. Copy and paste the [command.js](command.js) file content into the command.js file in the web editor.
5. In the Configuration section of the editor, set the API_KEY={alphavantage.co API KEY} property. You can obtain your Alphavantage.co API key at (alphavantageco-website)[https://www.alphavantage.co/].
6. Save.
7. Call `/fusebot stock` from Slack/Discord.
8. Modify and tinker!

## Note:

The Github personal access token for this function requires the permission of `repo:*` and `action:write` to function.