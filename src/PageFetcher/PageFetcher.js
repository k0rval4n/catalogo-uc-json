const jsdom = require("jsdom");

class PageFetcher {
  constructor(base_url) {
    this.base_url = base_url;
  }

  async fetchWithQueryParams(queryParams) {
    const url = `${this.base_url}&${queryParams}`;
    const response = await fetch(url);
    const html = await response.text();

    return html;
  }

  getDom(html) {
    const dom = new jsdom.JSDOM(html);

    return dom;
  }
}

module.exports = { PageFetcher };
