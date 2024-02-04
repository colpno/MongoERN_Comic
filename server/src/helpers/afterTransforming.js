export const afterEmbedding = (data, embed = []) => {
  if (Array.isArray(data) && data.length > 0 && embed?.length > 0) {
    return data.filter((item) => embed.some((emb) => item[emb.path] !== null));
  }
  return data;
};
