import { Paper, Popper } from "@mui/material";
import { GRID_STRING_COL_DEF, useGridApiContext } from "@mui/x-data-grid-pro";
import TextAreaQuill from "components/QuillArea/QuillArea";
import PropTypes from "prop-types";
import { useCallback, useLayoutEffect, useState } from "react";

function EditTextarea(props) {
  const { id, field, value, colDef, hasFocus } = props;
  const [valueState, setValueState] = useState(value);
  const [anchorEl, setAnchorEl] = useState();
  const [expanded, setShouldExpand] = useState(false);
  const [inputRef, setInputRef] = useState(null);
  const apiRef = useGridApiContext();

  useLayoutEffect(() => {
    if (hasFocus && inputRef) {
      inputRef.focus();
    }
  }, [hasFocus, inputRef]);

  const handleRef = useCallback((el) => {
    setAnchorEl(el);
  }, []);

  const handleChange = useCallback(
    (event) => {
      // const newValue = event.target.value;
      const newValue = event;
      setValueState(newValue);
      apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 200 });
    },
    [apiRef, field, id]
  );

  return (
    <div
      style={{ position: "relative", alignSelf: "flex-start" }}
      onBlur={() => setShouldExpand(false)}
      onFocus={() => setShouldExpand(true)}
    >
      {expanded ? (
        <>
          <div
            ref={handleRef}
            style={{
              height: 1,
              width: colDef.computedWidth,
              display: "block",
              position: "absolute",
              top: 0,
            }}
          />
          {anchorEl && (
            <Popper open anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 100 }}>
              <Paper elevation={1} sx={{ p: 1 }}>
                <TextAreaQuill
                  name={id}
                  value={valueState}
                  onChange={handleChange}
                  innerRef={(ref) => setInputRef(ref)}
                  style={{ width: colDef.width }}
                />
              </Paper>
            </Popper>
          )}
        </>
      ) : (
        GRID_STRING_COL_DEF.renderEditCell(props)
      )}
    </div>
  );
}

export const renderEditTextarea = (params) => <EditTextarea {...params} />;

EditTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  colDef: PropTypes.shape({
    computedWidth: PropTypes.number.isRequired,
    width: PropTypes.number,
  }).isRequired,
  api: PropTypes.shape({
    setEditCellValue: PropTypes.func.isRequired,
  }).isRequired,
  hasFocus: PropTypes.bool.isRequired,
};
