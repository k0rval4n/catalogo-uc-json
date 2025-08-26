import { CourseDataParser } from "./src/index.js";
import readline from "node:readline";

const showData = async (sigla) => {
  const courseDataParser = new CourseDataParser();
  const data = await courseDataParser.getData(sigla);
  console.log(data);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Introduce la sigla deseada: `, (sigla) => {
  showData(sigla);
  rl.close();
});
