import { prisma } from "../dbStrategy/dbHandler";

export async function getLatestNews() {
  return await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      date: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}
