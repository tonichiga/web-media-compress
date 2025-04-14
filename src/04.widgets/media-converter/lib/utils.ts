export function getFileNameFromContentDisposition(contentDisposition) {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(contentDisposition);
  if (matches !== null && matches[1]) {
    console.log("Filename found:", matches[1]);
    return matches[1].replace(/['"]/g, "");
  }
  return "converted-file";
}
