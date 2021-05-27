const Superagent = require("superagent");

module.exports = async (ctx) => {
  const systems = [
    { name: "google", url: "https://google.com" },
    { name: "amazon", url: "https://amazon.com" },
    { name: "apple", url: "https://apple.com" },
    { name: "fusebot", url: "https://go.us-west-2.fusebot.io/v1/health" },
  ];

  const status = await Promise.all(
    systems.map((s) => Superagent.get(s.url).ok((r) => true))
  );
  const response = status.map(
    (s, i) =>
      `${s.status === 200 ? ":white_check_mark:" : ":red_circle:"} ${
        s.status
      } ${systems[i].name}`
  );

  await ctx.client.send(response.join("\n"));
};
