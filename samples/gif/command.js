module.exports = async (ctx) => {
  const [cmd, ...rest] = ctx.body.args;

  if (cmd === "add" && rest && rest[0] && rest[1]) {
    // add image
    const name = rest[0];
    const image = rest[1];
    const item = (await ctx.storage.get()) || { data: { images: {} } };
    item.data.images[name.toLowerCase()] = image;
    await ctx.storage.put(item);
    await ctx.client.send(`Image ${name} added`);
    return await ctx.client.send(image);
  }
  if (cmd === "ls") {
    // get image list
    const item = await ctx.storage.get();
    let message;
    if (!item || !item.data || !item.data.images) {
      message = `No images registered yet`;
    } else {
      console.log(item.data.images);
      message = Object.keys(item.data.images)
        .map((k) => `:frame_with_picture:  ${k} => \`${item.data.images[k]}\``)
        .join("\n");
    }
    return await ctx.client.send(
      `${message}\n\nCall \`/fusebot gif\` for help`
    );
  }
  if (cmd === "rm" && rest && rest[0]) {
    // remove image
    const name = rest[0].toLowerCase();
    const item = await ctx.storage.get();
    if (!item || !item.data || !item.data.images || !item.data.images[name]) {
      return await ctx.client.send(`Image ${name} doesn't exist`);
    }
    delete item.data.images[name];
    await ctx.storage.put(item);
    return await ctx.client.send(`Image ${name} removed`);
  }
  if (cmd && rest.length === 0) {
    // display an image
    const name = cmd.toLowerCase();
    const item = await ctx.storage.get();
    if (!item || !item.data || !item.data.images || !item.data.images[name]) {
      return await ctx.client.send(`Image ${name} doesn't exist`);
    }
    return await ctx.client.send(`${item.data.images[name]}`);
  }
  return await help(ctx);
};

const help = async (ctx) => {
  await ctx.client.send(`Usage: 
- \`/fusebot gif {name}\` - display that image
- \`/fusebot gif add {name} {url}\` - add a new named image
- \`/fusebot gif rm {name}\` - remove an image
- \`/fusebot gif ls\` - list all images`);
};
