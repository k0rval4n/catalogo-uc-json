const { PageDataParser } = require("../PageDataParser.js");
const { TableParser } = require("../../utils/TableParser.js");

const DEFAULT_DATA = {
  Prerequisites: "Not found",
  Prerequisites_and_restrictions_relation: "Not found",
  Restrictions: "Not found",
  Equivalences: "Not found"
};

const BASE_URL =
  "https://catalogo.uc.cl/index.php?tmpl=component&option=com_catalogo";
const PREREQUISITES_AND_RESTRICTIONS_TABLE_SELECTOR =
  "body > div.contentpane > div:nth-child(2) > table";
const EQUIVALENCES_TABLE_SELECTOR =
  "body > div.contentpane > div:nth-child(4) > table";

const TABLES_KEY_PARSER = {
  Prerrequisitos: "Prerequisites",
  "Relación entre prerrequisitos  y restricciones":
    "Prerequisites_and_restrictions_relation",
  Restricciones: "Restrictions",
  Equivalencias: "Equivalences",
};

class RequisitesDataParser extends PageDataParser {
  constructor() {
    super(BASE_URL);
  }

  getQueryParams(sigla) {
    return `view=requisitos&sigla=${sigla}`;
  }

  async getHTML(sigla) {
    return super.getHTML(sigla);
  }

  getDom(html) {
    return super.getDom(html);
  }

  getPreRequisitesAndRestrictionsTable(dom) {
    const table = dom.window.document.querySelector(
      PREREQUISITES_AND_RESTRICTIONS_TABLE_SELECTOR,
    );
    if (!table) {
      throw new Error(
        `Pre-requisites and restrictions table not found, check the selector: ${PREREQUISITES_AND_RESTRICTIONS_TABLE_SELECTOR}`,
      );
    }

    return table;
  }

  getEquivalencesTable(dom) {
    const table = dom.window.document.querySelector(
      EQUIVALENCES_TABLE_SELECTOR,
    );
    if (!table) {
      throw new Error(
        `Equivalences table not found, check the selector: ${EQUIVALENCES_TABLE_SELECTOR}`,
      );
    }

    return table;
  }

  async tryToGetData(sigla) {
    try {
      return await this.getData(sigla);
    } catch (error) {
      return { Error: error.message, ...DEFAULT_DATA };
    }
  }

  async getData(sigla) {
    const html = await this.getHTML(sigla);
    const dom = this.getDom(html);
    const preRequisitesAndRestrictionstable =
      this.getPreRequisitesAndRestrictionsTable(dom);
    const parsedPreRequisitesAndRestrictionsTable = TableParser.getParsedTable(
      preRequisitesAndRestrictionstable,
      TABLES_KEY_PARSER,
    );
    const equivalencesTable = this.getEquivalencesTable(dom);
    const parsedEquivalencesTable = TableParser.getParsedTable(
      equivalencesTable,
      TABLES_KEY_PARSER,
    );
    const allData = {
      ...parsedPreRequisitesAndRestrictionsTable,
      ...parsedEquivalencesTable,
    };

    return allData;
  }
}

module.exports = { RequisitesDataParser };
