const defaultOptions = {
  height: "100%",
  autoHeight: false,
};

function useTableStyles(tableProps, options = defaultOptions) {
  const { autoHeight, height } = options;

  if (height) tableProps.sx.height = height;
  if (autoHeight) tableProps.autoHeight = true;
}

export default useTableStyles;
