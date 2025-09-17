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
    const requisitesData = await this.requisitesDataParser.tryToGetData(sigla);
    const programData = await this.programDataParser.tryToGetData(sigla);

    const data = {
      ...requisitesData,
      ...programData,
    };

    if (requisitesData.Error && programData.Error) {
      data.Error = `${requisitesData.Error} | ${programData.Error}`;
    }

    return data;
  }
}

module.exports = { CourseDataParser };
