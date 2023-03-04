export default function handleMongoProjection(projection = '', init = '') {
  if (!!!projection) return init;

  const projectionChunk = projection.split(' ');

  const hasIncludeProjection = projectionChunk.some((proj) => {
    const excludePattern = /^-/;
    return !excludePattern.test(proj);
  });

  if (hasIncludeProjection) return projection;
  return `${projection} ${init}`;
}
