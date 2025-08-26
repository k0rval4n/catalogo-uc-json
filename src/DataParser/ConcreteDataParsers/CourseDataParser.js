import { DataParser } from "../DataParser.js";
import { RequisitesDataParser } from "../ConcretePageDataParsers/RequisitesDataParser.js";
import { ProgramDataParser } from "../ConcretePageDataParsers/ProgramDataParser.js";

class CourseDataParser extends DataParser {
  constructor() {
    super();
    this.requisitesDataParser = new RequisitesDataParser();
    this.programDataParser = new ProgramDataParser();
  }

  async getData(sigla) {
    const requisitesData = await this.requisitesDataParser.getData(sigla);
    const programData = await this.programDataParser.getData(sigla);

    if (programData.error) {
      return {
        sigla: sigla,
        error: programData.error,
      };
    }

    return {
      ...requisitesData,
      ...programData,
    };
  }
}

export { CourseDataParser };
