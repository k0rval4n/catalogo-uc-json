const { DataParser } = require("./DataParser.js");
const { PageFetcher } = require("../PageFetcher/PageFetcher.js");

class PageDataParser extends DataParser {
  constructor(base_url) {
    super();
    this.pageFetcher = new PageFetcher(base_url);
  }

  getQueryParams(sigla) {
    throw new Error("Not implemented :(");
  }

  async getHTML(sigla) {
    const queryParams = this.getQueryParams(sigla);
    return await this.pageFetcher.fetchWithQueryParams(queryParams);
  }

  getDom(html) {
    return this.pageFetcher.getDom(html);
  }

  async getData(sigla) {
    super.getData(sigla);
  }
}

module.exports = { PageDataParser };
