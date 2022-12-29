/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import Feedback from "react-bootstrap/esm/Feedback";
import { useEffect } from "react";

import styles from "./QuillArea.module.scss";

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

function TextAreaQuill({
  name,
  value,
  onChange,
  error,

  placeholder,
  maxLength,

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

  useEffect(() => {
    document.querySelector(".ql-editor").setAttribute("name", name);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <ReactQuill
        // ref={passRef}
        modules={TextAreaQuill.modules}
        formats={TextAreaQuill.formats}
        // onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        // as="textarea"
        name={name}
        // value={value}
        // onChange={onChange}
        // onBlur={onBlur}
        // rows={rows}
        // placeholder={placeholder}
        // readOnly={readOnly}
        // isInvalid={touched && !!error}
        // className={cx("textarea")}
        // maxLength={maxLength}
      />
      <span
        className={cx("text-length")}
      >{`${value.length}/${maxLength}`}</span>
      <Feedback type="invalid">{error}</Feedback>
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

TextAreaQuill.modules = {
  toolbar: [
    // [{ header: "1" }, { header: "2" }, { font: [] }],
    // [{ size: [] }],
    // ["bold", "italic", "underline", "strike", "blockquote"],
    ["bold", "italic", "underline", "strike"],
    // [
    //   { list: "ordered" },
    //   { list: "bullet" },
    //   { indent: "-1" },
    //   { indent: "+1" },
    // ],
    // ["link", "image", "video"],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
// // REMOVE: Quill Quill formats
// // REMOVE: See https:quilljs.com/docs/formats/

TextAreaQuill.formats = [
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

TextAreaQuill.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  // onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  error: PropTypes.string,
  // touched: PropTypes.bool,

  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  // readOnly: PropTypes.bool,
  // rows: PropTypes.number,

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

TextAreaQuill.defaultProps = {
  // onBlur: () => {},
  form: {},
  error: "",
  // touched: false,

  placeholder: "",
  maxLength: 1000,
  // readOnly: false,
  // rows: 5,

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

export default TextAreaQuill;
