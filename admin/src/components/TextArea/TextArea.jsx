import PropTypes from "prop-types";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import Feedback from "react-bootstrap/esm/Feedback";
import { FormControl } from "react-bootstrap";
// import { useEffect } from "react";

import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);
// let textAreaOptions = {
//   header: false,
//   fontStyle: {
//     bold: false,
//     italic: false,
//     underline: false,
//     strike: false,
//     blockQuote: false,
//   },
//   fontSize: false,
//   listHead: false,
//   indent: false,
//   image: false,
//   video: false,
//   link: false,
// };

function TextArea({
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,

  placeholder,
  maxLength,
  readOnly,
  rows,

  // header,
  // fontStyle,
  // fontSize,
  // listHead,
  // indent,
  // image,
  // video,
  // link,
}) {
  // textAreaOptions = {
  //   header,
  //   fontSize,
  //   fontStyle,
  //   listHead,
  //   indent,
  //   image,
  //   video,
  //   link,
  // };

  // useEffect(() => {
  //   document.querySelector(".ql-editor").setAttribute("name", name);
  // }, []);

  return (
    <div className={cx("wrapper")}>
      <FormControl
        as="textarea"
        // ref={passRef}
        // modules={TextArea.modules}
        // formats={TextArea.formats}
        // onKeyDown={onKeyDown}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        readOnly={readOnly}
        isInvalid={touched && !!error}
        className={cx("textarea")}
        maxLength={maxLength}
      />
      <span
        className={cx("text-length")}
      >{`${value.length}/${maxLength}`}</span>
      <Feedback type="invalid">{error}</Feedback>
    </div>
  );
}

// function showToolbarElement() {
//   const options = [["clean"]];

//   if (textAreaOptions.header) {
//     options.push([{ header: "1" }, { header: "2" }, { font: [] }]);
//   }

//   if (textAreaOptions.fontSize) {
//     options.push([{ size: [] }]);
//   }

//   const fontStyles = [];
//   if (textAreaOptions.fontStyle.bold) {
//     fontStyles.push("bold");
//   }
//   if (textAreaOptions.fontStyle.italic) {
//     fontStyles.push("italic");
//   }
//   if (textAreaOptions.fontStyle.underline) {
//     fontStyles.push("underline");
//   }
//   if (textAreaOptions.fontStyle.strike) {
//     fontStyles.push("strike");
//   }
//   if (textAreaOptions.fontStyle.blockQuote) {
//     fontStyles.push("blockquote");
//   }
//   options.push(fontStyles);

//   const listOptions = [];
//   if (textAreaOptions.listHead) {
//     listOptions.push({ list: "ordered" }, { list: "bullet" });
//   }
//   if (textAreaOptions.indent) {
//     listOptions.push({ indent: "-1" }, { indent: "+1" });
//   }
//   options.push(listOptions);

//   const media = [];
//   if (textAreaOptions.link) {
//     media.push("link");
//   }
//   if (textAreaOptions.image) {
//     media.push("image");
//   }
//   if (textAreaOptions.video) {
//     media.push("video");
//   }
//   options.push(media);

//   return options;
// }

// TextArea.modules = {
//   toolbar: showToolbarElement(),
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };
// /*
//  * Quill TextArea formats
//  * See https://quilljs.com/docs/formats/
//  */
// TextArea.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
// ];

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  error: PropTypes.string,
  touched: PropTypes.bool,

  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,

  // header: PropTypes.bool,
  // fontStyle: PropTypes.shape({
  //   bold: PropTypes.bool,
  //   italic: PropTypes.bool,
  //   underline: PropTypes.bool,
  //   strike: PropTypes.bool,
  //   blockQuote: PropTypes.bool,
  // }),
  // fontSize: PropTypes.bool,
  // listHead: PropTypes.bool,
  // indent: PropTypes.bool,
  // image: PropTypes.bool,
  // video: PropTypes.bool,
  // link: PropTypes.bool,
};

TextArea.defaultProps = {
  onBlur: () => {},
  form: {},
  error: "",
  touched: false,

  placeholder: "",
  maxLength: 1000,
  readOnly: false,
  rows: 5,

  // header: false,
  // fontStyle: {
  //   bold: false,
  //   italic: false,
  //   underline: false,
  //   strike: false,
  //   blockQuote: false,
  // },
  // fontSize: false,
  // listHead: false,
  // indent: false,
  // image: false,
  // video: false,
  // link: false,
};

export default TextArea;
