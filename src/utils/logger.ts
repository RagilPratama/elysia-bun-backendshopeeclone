// Helper untuk format SQL query agar lebih readable
export function formatSqlQuery(sqlQuery: { sql: string; params: any[] }): string {
  let formattedSql = sqlQuery.sql;

  // Replace escaped quotes
  formattedSql = formattedSql.replace(/"/g, "");

  // Add newlines untuk readability
  formattedSql = formattedSql
    .replace(/SELECT/gi, "\nSELECT")
    .replace(/FROM/gi, "\nFROM")
    .replace(/WHERE/gi, "\nWHERE")
    .replace(/ORDER BY/gi, "\nORDER BY")
    .replace(/JOIN/gi, "\nJOIN")
    .replace(/LEFT JOIN/gi, "\nLEFT JOIN")
    .replace(/INNER JOIN/gi, "\nINNER JOIN");

  return formattedSql.trim();
}

export function dumpQuery(sqlQuery: { sql: string; params: any[] }): void {
  console.log("\n📝 === SQL QUERY ===");
  console.log(formatSqlQuery(sqlQuery));
  if (sqlQuery.params && sqlQuery.params.length > 0) {
    console.log("\n📌 Parameters:", sqlQuery.params);
  }
  console.log("===================\n");
}

export function dumpResult(data: any, label: string = "Result"): void {
  console.log(`\n✅ === ${label} ===`);
  console.table(data);
  console.log("==================\n");
}
