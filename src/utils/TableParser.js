class TableParser {
  static getParsedTable(table, table_key_parser) {
    let result = {};
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length > 0) {
        const key = cells[0].textContent.trim();
        if (key in table_key_parser) {
          const parsedKey = table_key_parser[key] || key;
          const value = cells[1].textContent.trim();
          result[parsedKey] = value;
        }
      }
    });

    return result;
  }
}

module.exports = { TableParser };
