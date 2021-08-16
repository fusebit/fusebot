# Welcome to Fusebot! <a href="https://fusebit.io/careers?utm_source=github.com&utm_medium=referral&utm_campaign=fusebot-readme&utm_content=careers"><img src="https://cdn.fusebit.io/assets/images/fusebot-we-are-hiring-button.png" align="right" height=50em></a>

<a href="https://www.producthunt.com/posts/fusebot?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fusebot" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=307836&theme=light" alt="Fusebot - Integrate & automate anything on Slack/Discord in seconds | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

[Fusebot](https://fusebot.io?utm_source=github.com&utm_medium=referral&utm_campaign=fusebot-readme&utm_content=intro) is the simplest way to quickly develop custom Slash Commands for Discord and Slack. Fusebot gives you a Node.js and npm development environment and takes care of running, scaling, and securing your Slash Commands. All you need to bring is your code and imagination.

![Fusebot for Slack and Discord](https://user-images.githubusercontent.com/822369/126600208-ec9c129c-9bc1-4ed4-92b2-141951b16e34.png)

You interact with Fusebot using the `/fusebot` Slash Command from Discord or Slack. It enables you to open a browser-based Node.js and npm development environment to implement any number of custom commands. Once created, the commands can be invoked by anyone in your Slack workspace or Discord guild.

Fusebot was created for developers by developers at [fusebit.io](https://fusebit.io/?utm_source=github.com&utm_medium=referral&utm_campaign=fusebot-readme&utm_content=company) and is free to use. We hope you enjoy it!

## Table of contents

[Installing Fusebot](#installing-fusebot)  
[Code your first command](#code-your-first-command)  
[Interacting with Fusebot](#interacting-with-fusebot)  
[Command code samples](#command-samples)  
[Programming model](#programming-model)  
&nbsp;&nbsp;[Receiving data from Slack or Discord](#ctxbody)  
&nbsp;&nbsp;[Managing secrets and configuration](#ctxconfiguration)  
&nbsp;&nbsp;[Sending messages back to Slack or Discord](#ctxclient)  
&nbsp;&nbsp;[Using storage](#ctxstorage)  
[Support](#support)

## Installing Fusebot

1. [Download Fusebot on Discord or Slack](https://fusebot.io?utm_source=github.com&utm_medium=referral&utm_campaign=fusebot-readme&utm_content=install#lp-pom-block-135)
2. Run ```/fusebot coin DOGE``` to test command

If you see the current value of dogecoin, then Fusebot is successfully installed! Let's move on to coding our first command.

## Code your first command

Now that you have Fusebot installed and you tested the ```/fusebot coin``` command, let's get started on building your first custom command. Let's build a command to search reddit. It is best to do development on a desktop browser as you will have more room to work with tabs and copy/paste code.

1. Type ```/fusebot edit reddit``` and hit enter

![image](https://user-images.githubusercontent.com/751491/126013119-033caee3-d6bd-4dcf-be6b-8025fe655261.png)

2. Click the "click here" link

![image](https://user-images.githubusercontent.com/751491/126013074-30368c7a-e5e2-4c86-a83d-979c2453c906.png)

Your browser will open a window like this:

![image](https://user-images.githubusercontent.com/751491/126013397-720bfe76-1909-4f9e-8a3a-2ccd554e835f.png)

You are looking at the Fusebot command editor that allows you to implement the logic behind the reddit command or any command you build. You can write any Node.js code here and use all public npm modules by declaring them in package.json. After you save the code, you can invoke it from Slack or Discord using the ```/fusebot reddit``` Slash Command.

3. Open this [command.js file](https://github.com/fusebit/fusebot/blob/main/samples/reddit/command.js) in another tab

![image](https://user-images.githubusercontent.com/751491/126013219-d0f5169b-ae65-4a63-b8d0-afda9dc04369.png)

4. Copy and paste the entire [command.js file](https://github.com/fusebit/fusebot/blob/main/samples/reddit/command.js) file content into the command.js file in the web editor.

Copy:

![image](https://user-images.githubusercontent.com/751491/126013286-b83c9435-9341-472b-8f74-4cd156f0d5c7.png)

Paste:

![image](https://user-images.githubusercontent.com/751491/126013734-9bce2ed1-deea-4ab1-bc12-4cca12f703e1.png)


5. Click the save icon in the top left of the web editor

![image](https://user-images.githubusercontent.com/751491/126013817-19d128d4-c271-4380-a821-fa67699e1631.png)


6. Return back to Slack or Discord to test out your new reddit command

```/fusebot reddit node API```

This command will search for "API" in the node subreddit. 

![image](https://user-images.githubusercontent.com/751491/126014245-03fcebcb-038c-4329-830f-42d14b261c40.png)

BOOM! You've built your first custom command with Fusebot. Check out other examples below and start coding today.

## Interacting with Fusebot

If you are wondering about all of the ways to interact with manage your custom slash commands, just run:

```/fusebot help```

This is what you can do with Fusebot:

```/fusebot ls``` list custom commands in your workspace

```/fusebot edit {command}``` create or edit a custom command

```/fusebot rm {command}``` remove a command

```/fusebot feedback {your-feedback}``` tell us what you think (leave contact if expecting response)

```/fusebot {command} [arguments]``` run a custom command

Note: replace {command} and/or [arguments] with the specific command you are creating or editing. { } denotes an argument you decide.

## Command samples

With the power of Node.js and npm, the sky is the limit. What are you going to build today?

- [/fusebot kudos](samples/kudos) - leave kudos for your team members, check ranking, and more
- [/fusebot status](samples/status) - check and report the status of your systems
- [/fusebot bitly](samples/bitly) - shorten URLs using bit.ly
- [/fusebot coin](samples/coin) - get current value of a digital currency
- [/fusebot github-dispatch](samples/githubDispatch) - trigger a github action
- [/fusebot run-query](samples/dataQuery) - run SQL queries against MySQL compatible databases
- [/fusebot stocks](samples/stocks) - get current value of a stock
- [/fusebot gif](samples/gif) - display your favorite meme by name
- [/fusebot reddit](samples/reddit) - search a subreddit for posts

## Programming model

The function exported from `command.js` is the entry point to your Slash Command implementation.
The `ctx` parameter contains the details of the event generated by Slack or Discord and a few useful methods
described below.

At the time your code executes, we have already done the Slack or Discord signature validation for you, so you can
focus on the task at hand. Also, we have responded to Slack, so you are not subject to the
3 second execution limit those platforms impose.

```javascript
module.export = async (ctx) => {
  await ctx.client.send(`Hello ${ctx.body.userName}!`);
};
```

Using `package.json` you can specify a dependency on any public npm module and then use
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

### ctx.body

The `ctx.body` contains the payload describing the event received from Slack or Discord. It is normalized
between the two systems to facilite reusing the same code.

```javascript
{
  "teamId": "TDFBLCJV9",
  "channelId": "DFNE1FG2E",
  "userId": "UFN96HN1J",
  "userName": "tomek",
  "text": "hello arg1 arg2 arg3",
  "args": ["arg1", "arg2", "arg3"],
  "native": {
    /* native event received from Slack or Discord */
  }
}
```

The `ctx.body.args` contains tokenized arguments the caller passed to your Slash Command. For example,
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
a single invocation of your Slash Command.

#### ctx.client.send

The `ctx.client.send` asynchronous method sends a text message back to Slack or Discord. The message
is visible to anyone in the channel the Slash Command was invoked in. You can use [Slack markup](https://api.slack.com/messaging/composing#text_formatting), or [Discord markup](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-) to format the message, respectively:

Remember to wait for the asynchronous method to complete:

```javascript
await ctx.client.send(`Hello, ${ctx.body.userName}!`);
```

#### ctx.client.sendEphemeral

Works similarly to `ctx.client.send`, but the message will only be visible to the person who invoked
the Slash Command.

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
document in storage has changed since then, the call will fail with an exception indicating a conflict.
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

You can share your thoughts or ask questions using `/fusebot feedback` command, [contacting the Fusebit team](https://fusebit.io/contact?utm_source=github.com&utm_medium=referral&utm_campaign=fusebot-readme&utm_content=support).
