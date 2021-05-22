# Welcome to Fusebot!

[Get Fusebot for Discord and Slack](https://fusebot.io)

Fusebot is the simplest way to quickly develop custom slash commands for Discord and Slack. Fusebot gives you a Node.js and NPM development environment and takes care of running, scaling, and securing your slash commands. All you need to bring is your code and imagination.

```
module.exports = async (ctx) => {
  const r = await Superagent.get("https://sochain.com/api/v2/get_price/DOGE/USD");
  await ctx.client.send(`:moneybag: DOGE price is ${r.body.data.prices[0].price} USD`);
};
```

You interact with Fusebot using the `/fusebot` slash command from Discord or Slack. It enables you to open a browser-based Node.js and NPM development environment to implement any number of custom commands. Once created, the commands can be invoked by anyone in your Slack workspace or Discord guild.

Fusebit was created for developers by developers at [fusebit.io](https://fusebit.io/?utm_source=fusebot&utm_medium=referral&utm_campaign=slack-marketplace) and is free to use. We hope you enjoy it!

## Programming model

The function exported from `command.js` is the entry point to your slash command implementation.
The `ctx` parameter contains the details of the event generated by Slack or Discord and a few useful methods
described below.

At the time your executes, we have already done the Slack or Discord signature validation for you, so you can
focus on the task at hand. Also, we have responded to Slack, so you are not subject to the
3 second execution limit Slack imposes.

```javascript
module.export = async (ctx) => {
  await ctx.client.send(`Hello ${ctx.body.userName}!`);
};
```

Using `package.json` you can specify a dependency on any public NPM module and then use
it code.

```json
{
  "engines": {
    "node": ">= 14"
  },
  "dependencies": {
    "superagent": "6.1.0"
  }
}
```

## Samples

- [/fusebot coin](samples/coin) - get current value of a digital currency

### ctx.body

The `ctx.body` contains the payload describing the event received from Slack or Discord. It is normalized
between the two systems to facilite reusing the same code.

```javascript
{
  "teamId": "TDFBLCJV9",
  "channelId": "DFNE1FG2E",
  "userId": "UFN96HN1J",
  "userName": "tomek",
  "text": "hello arg2 arg2 arg3",
  "args": ["arg2", "arg2", "arg3"],
  "native": {
    /* native event received from Slack or Discord */
  }
}
```

The `ctx.body.args` contains tokenized arguments the caller passed to your slash command. For example,
if the command name is `hello`, calling `/fusebot hello arg1 arg2 arg3` would result in the `ctx.body.args`
value shown above.

The `ctx.body.native` represents the native event received from Slack or Discord. Check the [Slack event schema](https://api.slack.com/interactivity/slash-commands#command_payload_descriptions) or the [Discord event schema](https://discord.com/developers/docs/interactions/slash-commands#data-models-and-types) for details.

### ctx.configuration

The `ctx.configuration` property provides access to the key/value pairs you define in the _Configuration_ section of the editor. These values are stored encrypted at rest and are a convenient way of providing any secrets or API keys to your code.

```javascript
// In Configuration:
// MY_KEY=SOME_VALUE
const key = ctx.configuration.MY_KEY;
// key is "SOME_VALUE"
```

### ctx.client

The `ctx.client` provides a way to send messages back to Slack or Discord. You can send multiple messages during
a single invocation of your slash command.

#### ctx.client.send

The `ctx.client.send` asynchronous method sends a text message back to Slack or Discord. The message
is visible to anyone in the channel the slash command was invoked in. You can use [Slack markup](https://api.slack.com/messaging/composing#text_formatting), or [Discord markup](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-) to format the message, respectively:

Remember to wait for the asynchronous method to complete:

```javascript
await ctx.client.send(`Hello, ${ctx.body.userName}!`);
```

#### ctx.client.sendEphemeral

Works similarly to `ctx.client.send`, but the message will only be visible to the person who invoked
the slash command.

### ctx.storage

The `ctx.storage` offers access to a simple persistent storage solution. Think about it as local storage,
only in the cloud.

#### ctx.storage.get

Returns a named document or undefined if no document is stored under the specified name:

```javascript
const item = await ctx.storage.get("my_data");
// item is:
// {
//    data: { ...object you previously stored... },
//    etag: "{etag}"
// }
```

The `etag` property describes the version of the item in storage which can be used in the call to `ctx.storage.put`
to detect and prevent conflicting, concurrent writes.

You can omit the document name to read the default document.

#### ctx.storage.put

Upserts a named document:

```javascript
const item = {
    data: { ...whatever object you want to store... },
    etag: "{etag}"  // optional
};
await ctx.storage.put(item, "my_data")
```

If you specify the `etag` property (usually by obtaining it from a prior `ctx.storage.get` call), and the
document in storage has chanegd since then, the call will fail with an exception indicating a conflict.
If you don't specify the `etag` property, any data in storage will be forcefuly overwritten.

You can omit the document name to write to the default document.

#### ctx.storage.list

The `ctx.storage.list` returns the list of existing documents:

```javascript
const result = await ctx.storage.list();
// result is
// {
//   items: [ { storageKey: "{storageKey1}" }, ... ],
//   next: "{continuation-token}" // optional
// }
```

If you organize your documents in a hierarchy using the `/` character as segment delimiter, you can also
list only the documents underneath a particular segment of the hierarchy:

```javascript
const result = await ctx.storage.list("/a/b");
```

If the `result.next` property is present, there are more results which can be obtained with a subsequent call
to the API:

```javascript
const next;
const result = await ctx.storage.list("/a/b", { next });
```

You can limit the maximum number of results returned using the `limit` parameter:

```javascript
const result = await ctx.storage.list("/a/b", { limit: 10 });
```

#### ctx.storage.delete

The `ctx.storage.delete` deletes an item from storage:

```javascript
await ctx.storage.delete("my_data");
```

If you organize your documents in a hierarchy using the `/` character as segment delimiter, you can also
delete an entire branch of documents with a single call:

```javascript
// Existing documents:
// /a/b/c/d
// /a/b/e/f
// /a/b/
// /a/g/h/i
await ctx.storage.delete("/a/b", true, true);
// Documents after delete:
// /a/b/
// /a/g/h/i
```

**NOTE** Deleteing `/a/b` recursively deletes all documents _underneath_ `/a/b` but not `/a/b` itself.

**NOTE** The two `true` parameters are not a typo - they are intended to prevent accidental deletion of the entire storage.

## Support

You can share your thoughts or ask questions using `/fusebot feedback` command, or by going to
https://fusebit.io/contact.
