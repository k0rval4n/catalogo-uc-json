class PreParser {
  static getParsedPre(pre, pre_key_parser) {
    const preText = pre.textContent;
    const preLines = preText.split("\n");
    const dataLines = preLines.slice(0, 7);

    let result = {};
    dataLines.forEach((dataLine) => {
      const splittedDataLine = dataLine.split(":");
      const key = splittedDataLine[0].trim();
      if (key in pre_key_parser) {
        const parsedKey = pre_key_parser[key];
        const value = splittedDataLine[1].trim();
        result[parsedKey] = value;
      }
    });

    if (!("Sigla" in result)) {
      return {
        error: "Sigla not found",
      };
    }

    return result;
  }
}

export { PreParser };
