import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";

import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);
let textAreaOptions = {
  header: false,
  fontStyle: {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    blockQuote: false,
  },
  fontSize: false,
  listHead: false,
  indent: false,
  image: false,
  video: false,
  link: false,
};

function TextArea({
  onKeyDown,
  isInvalid,
  field,
  placeholder,
  //   disabled,
  maxLength,
  readOnly,
  passRef,

  header,
  fontStyle,
  fontSize,
  listHead,
  indent,
  image,
  video,
  link,
}) {
  textAreaOptions = {
    header,
    fontSize,
    fontStyle,
    listHead,
    indent,
    image,
    video,
    link,
  };

  return (
    <div className={cx("wrapper")} lang="vi">
      <ReactQuill
        ref={passRef}
        modules={TextArea.modules}
        formats={TextArea.formats}
        onKeyDown={onKeyDown}
        {...field}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`${isInvalid ? "is-invalid" : ""} ${cx("textarea")}`}
      />
      <span
        className={cx("text-length")}
      >{`${field.value.length}/${maxLength}`}</span>
    </div>
  );
}

function showToolbarElement() {
  const options = [["clean"]];

  if (textAreaOptions.header) {
    options.push([{ header: "1" }, { header: "2" }, { font: [] }]);
  }

  if (textAreaOptions.fontSize) {
    options.push([{ size: [] }]);
  }

  const fontStyles = [];
  if (textAreaOptions.fontStyle.bold) {
    fontStyles.push("bold");
  }
  if (textAreaOptions.fontStyle.italic) {
    fontStyles.push("italic");
  }
  if (textAreaOptions.fontStyle.underline) {
    fontStyles.push("underline");
  }
  if (textAreaOptions.fontStyle.strike) {
    fontStyles.push("strike");
  }
  if (textAreaOptions.fontStyle.blockQuote) {
    fontStyles.push("blockquote");
  }
  options.push(fontStyles);

  const listOptions = [];
  if (textAreaOptions.listHead) {
    listOptions.push({ list: "ordered" }, { list: "bullet" });
  }
  if (textAreaOptions.indent) {
    listOptions.push({ indent: "-1" }, { indent: "+1" });
  }
  options.push(listOptions);

  const media = [];
  if (textAreaOptions.link) {
    media.push("link");
  }
  if (textAreaOptions.image) {
    media.push("image");
  }
  if (textAreaOptions.video) {
    media.push("video");
  }
  options.push(media);

  return options;
}

TextArea.modules = {
  toolbar: showToolbarElement(),
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill TextArea formats
 * See https://quilljs.com/docs/formats/
 */
TextArea.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

TextArea.propTypes = {
  passRef: PropTypes.shape({}),
  onKeyDown: PropTypes.func,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  isInvalid: PropTypes.bool,

  header: PropTypes.bool,
  fontStyle: PropTypes.shape({
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    strike: PropTypes.bool,
    blockQuote: PropTypes.bool,
  }),
  fontSize: PropTypes.bool,
  listHead: PropTypes.bool,
  indent: PropTypes.bool,
  image: PropTypes.bool,
  video: PropTypes.bool,
  link: PropTypes.bool,
};

TextArea.defaultProps = {
  isInvalid: false,
  passRef: {},
  onKeyDown: () => {},
  form: {},
  placeholder: "",
  rows: 10,
  disabled: false,
  autoFocus: false,
  maxLength: 1000,
  readOnly: false,

  header: false,
  fontStyle: {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    blockQuote: false,
  },
  fontSize: false,
  listHead: false,
  indent: false,
  image: false,
  video: false,
  link: false,
};

export default TextArea;
