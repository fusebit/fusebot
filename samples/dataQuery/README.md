# /fusebot run-query SELECT samples FROM fusebot WHERE sample_name="dataQuery";

This command triggers a SQL query against a MySQL compatible database.

1. Type `/fusebot edit run-query`.
2. Click the _edit_ link.
3. Copy and paste the [command.js](command.js) file content into the command.js file in the web editor.
4. Add `"promise-mysql": "5.0.3"` into package.json as a dependency.
5. In the Configuration section of the editor, set the HOST, PORT, USERNAME, PASSWORD property.
6. Save.
7. Call `/fusebot run-query` from Slack/Discord.
8. Modify and tinker!
