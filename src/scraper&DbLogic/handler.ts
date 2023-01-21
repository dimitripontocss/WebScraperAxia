import latestNewsScraper from "./webscraper";
import { prisma } from "../dbStrategy/dbHandler";

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

  const latestNews = await latestNewsScraper();

  console.log(savedNews);

  if (savedNews.length === 0) {
    await prisma.news.create({ data: latestNews });
    return;
  }
  if (savedNews[0].title !== latestNews.title) {
    await prisma.news.create({ data: latestNews });
  }
}
