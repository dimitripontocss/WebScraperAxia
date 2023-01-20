import { latestNewsScraper } from "./webscraper";

async function aa() {
  const a = await latestNewsScraper();
  console.log(a);
}

aa();
