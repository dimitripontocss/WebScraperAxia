import * as pup from "puppeteer";

const url = "https://www.reuters.com/markets/currencies";

interface INews {
  title: string;
  url: string;
  date: string | null;
}

export default async function latestNewsScraper() {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const latestNews = await page.$eval("#fusion-app", (mainElement) => {
    let latestsNews: INews[] = [];

    for (let cont = 0; cont < 9; cont++) {
      const news =
        mainElement.children[0].children[2].children[1].children[0].children[0]
          .children[0].children[1].children[cont];

      if (news.children[0].getAttribute("data-testid") === "TextStoryCard") {
        const info = news.children[0];

        const url =
          "https://www.reuters.com" + info.children[1].getAttribute("href");
        const title = info.children[1].innerHTML;
        const date = info.children[3].getAttribute("datetime");

        latestsNews.push({
          title,
          url,
          date,
        });
        continue;
      }

      const info = news.children[0].children[1];

      const url =
        "https://www.reuters.com" + info.children[1].getAttribute("href");
      const title = info.children[1].children[0].innerHTML;
      const date = info.children[2].getAttribute("datetime");

      latestsNews.push({
        title,
        url,
        date,
      });
    }

    return latestsNews;
  });

  await browser.close();

  return latestNews;
}
