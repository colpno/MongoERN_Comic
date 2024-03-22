export function showToolbarElement(options = {}) {
  const elements = [["clean"]];

  if (options.header) {
    elements.push([{ header: "1" }, { header: "2" }, { font: [] }]);
  }

  if (options.fontSize) {
    elements.push([{ size: [] }]);
  }

  const fontStyles = [];
  if (options.bold) {
    fontStyles.push("bold");
  }
  if (options.italic) {
    fontStyles.push("italic");
  }
  if (options.underline) {
    fontStyles.push("underline");
  }
  if (options.strike) {
    fontStyles.push("strike");
  }
  if (options.blockquote) {
    fontStyles.push("blockquote");
  }
  elements.push(fontStyles);

  const listOptions = [];
  if (options.listHead) {
    listOptions.push({ list: "ordered" }, { list: "bullet" });
  }
  if (options.indent) {
    listOptions.push({ indent: "-1" }, { indent: "+1" });
  }
  elements.push(listOptions);

  const media = [];
  if (options.link) {
    media.push("link");
  }
  if (options.image) {
    media.push("image");
  }
  if (options.video) {
    media.push("video");
  }
  elements.push(media);

  return elements;
}
