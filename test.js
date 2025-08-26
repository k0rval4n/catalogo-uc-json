import { CourseDataParser } from "./src/index.mjs";

const SIGLA = "IIC2233";

const showData = async () => {
  const courseDataParser = new CourseDataParser();
  const data = await courseDataParser.getData(SIGLA);
  console.log(data);
};

showData();
