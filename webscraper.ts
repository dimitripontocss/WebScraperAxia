import * as pup from "puppeteer";

const url = "https://www.reuters.com/markets/currencies";

export async function latestNewsScraper() {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(url, { timeout: 10000, waitUntil: "domcontentloaded" });

  await page
    .waitForXPath(
      "/html/body/div[1]/div/div[3]/div[2]/div/div[1]/div/div[1]/h2/a",
      { timeout: 10000 }
    )
    .catch((e) => console.log(e));

  const latestNews = await page.$eval("#fusion-app", (mainElement) => {
    const info =
      mainElement.children[0].children[2].children[1].children[0].children[0]
        .children[0].children[1].children[0].children[0].children[1];

    const url =
      "https://www.reuters.com" + info.children[1].getAttribute("href");
    const title = info.children[1].children[0].innerHTML;
    const date = info.children[2].getAttribute("datetime");
    return {
      title,
      url,
      date,
    };
  });

  await browser.close();

  return latestNews;
}
