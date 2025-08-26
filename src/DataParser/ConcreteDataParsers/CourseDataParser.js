const { DataParser } = require("../DataParser.js");
const { RequisitesDataParser } = require("../ConcretePageDataParsers/RequisitesDataParser.js");
const { ProgramDataParser } = require("../ConcretePageDataParsers/ProgramDataParser.js");

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

module.exports = { CourseDataParser };
