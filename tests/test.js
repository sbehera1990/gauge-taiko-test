const { openBrowser, goto, write, press, text, below, toRightOf, click, screenshot, highlight } = require('taiko');
const assert = require('assert');

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
  await screenshot({ path: screenshotFilePath });
  return path.basename(screenshotFilePath);
};

step("Navigate to <url>", async (url) => {
    await openBrowser();
    await goto(url);
});

step("Search for <query>", async (query) => {
    await write(query);
    await press('Enter');
});

step("Validate if page contains <content1> to right of <content2>", async (content1, content2) => {
  await highlight(content1);
  await highlight(content2);
  assert.ok(await text(content1, toRightOf(content2)).exists());
});