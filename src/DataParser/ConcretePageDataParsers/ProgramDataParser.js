const { PageDataParser } = require("../PageDataParser.js");
const { PreParser } = require("../../utils/PreParser.js");

const DEFAULT_DATA = {
  Course_name: "Not found",
  Translation: "Not found",
  Sigla: "Not found",
  Credits: "Not found",
  Modules: "Not found",
  Course_nature: "Not found"
};

const BASE_URL =
  "https://catalogo.uc.cl/index.php?tmpl=component&option=com_catalogo";
const PRE_SELECTOR = "body > div.contentpane > div > pre";

const PRE_KEY_PARSER = {
  CURSO: "Course_name",
  TRADUCCION: "Translation",
  SIGLA: "Sigla",
  CRÉDITOS: "Credits",
  MÓDULOS: "Modules",
  CARÁCTER: "Course_nature",
  DISCIPLINA: "Discipline",
};

class ProgramDataParser extends PageDataParser {
  constructor() {
    super(BASE_URL);
  }

  getQueryParams(sigla) {
    return `view=programa&sigla=${sigla}`;
  }

  async getHTML(sigla) {
    return super.getHTML(sigla);
  }

  getDom(html) {
    return super.getDom(html);
  }

  getPre(dom) {
    const pre = dom.window.document.querySelector(PRE_SELECTOR);
    if (!pre) {
      throw new Error(
        `pre element not found, check the selector: ${PRE_SELECTOR}`,
      );
    }

    return pre;
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
    const pre = this.getPre(dom);
    const parsedPre = PreParser.getParsedPre(pre, PRE_KEY_PARSER);

    return parsedPre;
  }
}

module.exports = { ProgramDataParser };
