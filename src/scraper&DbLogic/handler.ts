import latestNewsScraper from "./webscraper";
import { prisma } from "../dbStrategy/dbHandler";

interface INews {
  title: string;
  url: string;
  date: string | null;
}

export default async function saveNews() {
  const savedNews = await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      date: true,
      url: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const latestsNews = await latestNewsScraper();

  if (savedNews.length !== 0) {
    let newNews: INews[] = [];
    let cont = 0;

    while (latestsNews[cont].title !== savedNews[0].title) {
      newNews.push(latestsNews[cont]);
      cont++;
    }
    newNews.reverse();
    await prisma.news.createMany({ data: newNews });
  } else {
    latestsNews.reverse();
    await prisma.news.createMany({ data: latestsNews });
  }
}
