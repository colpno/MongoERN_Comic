import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import { memo, useEffect } from "react";

import styles from "./QuillArea.module.scss";

const cx = classNames.bind(styles);

function TextAreaQuill({
  name,
  value,
  onChange,

  placeholder,

  header,
  bold,
  italic,
  underline,
  strike,
  blockquote,
  fontSize,
  listHead,
  indent,
  image,
  video,
  link,
}) {
  const textAreaOptions = {
    header,
    bold,
    italic,
    underline,
    strike,
    blockquote,
    fontSize,
    listHead,
    indent,
    image,
    video,
    link,
  };

  function showToolbarElement() {
    const options = [["clean"]];

    if (textAreaOptions.header) {
      options.push([{ header: "1" }, { header: "2" }, { font: [] }]);
    }

    if (textAreaOptions.fontSize) {
      options.push([{ size: [] }]);
    }

    const fontStyles = [];
    if (textAreaOptions.bold) {
      fontStyles.push("bold");
    }
    if (textAreaOptions.italic) {
      fontStyles.push("italic");
    }
    if (textAreaOptions.underline) {
      fontStyles.push("underline");
    }
    if (textAreaOptions.strike) {
      fontStyles.push("strike");
    }
    if (textAreaOptions.blockquote) {
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

  const getModules = () => {
    const modules = {
      toolbar: showToolbarElement(),
      clipboard: { matchVisual: false },
    };

    TextAreaQuill.modules = modules;
  };
  getModules();

  useEffect(() => {
    document.querySelector(".ql-editor").setAttribute("name", name);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <ReactQuill
        modules={TextAreaQuill.modules}
        formats={TextAreaQuill.formats}
        onChange={onChange(name)}
        value={value}
        placeholder={placeholder}
      />
      {/* <span
        className={cx("text-length")}
      >{`${value.length}/${maxLength}`}</span>
      <Feedback type="invalid">{error}</Feedback> */}
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
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
  onChange: PropTypes.func.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),

  placeholder: PropTypes.string,

  header: PropTypes.bool,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  strike: PropTypes.bool,
  blockquote: PropTypes.bool,
  fontSize: PropTypes.bool,
  listHead: PropTypes.bool,
  indent: PropTypes.bool,
  image: PropTypes.bool,
  video: PropTypes.bool,
  link: PropTypes.bool,
};

TextAreaQuill.defaultProps = {
  form: {},

  placeholder: "",

  header: false,
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  blockquote: false,
  fontSize: false,
  listHead: false,
  indent: false,
  image: false,
  video: false,
  link: false,
};

export default memo(TextAreaQuill);
