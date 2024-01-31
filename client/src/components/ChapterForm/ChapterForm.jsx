import { SortableContext } from "@dnd-kit/sortable";
import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { memo, useMemo, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { Button, DnDSortable, Image, InputImage } from "components";
import { useDragAndDrop, useGetObjectStatuses } from "hooks/index.jsx";
import { FormLabel, InputField, RadioGroup } from "libs/formik";
import InputMultiFile from "./components/InputMultiFile";
import styles from "./styles/ChapterForm.module.scss";

const cx = classNames.bind(styles);

function ChapterForm({ initialValues, validationSchema, handleSubmit }) {
  const [blobs, setBlobs] = useState(initialValues.contents ? [...initialValues.contents] : []);
  const { data: statuses = [] } = useGetObjectStatuses({ _fields: "status code" });
  const formikRef = useRef();

  const costOptions = [
    { value: "false", label: "Miễn phí" },
    { value: "true", label: "Trả phí" },
  ];

  const statusOptions = useMemo(
    () =>
      statuses.map((status) => {
        return { value: status._id, label: status.status };
      }),
    [statuses]
  );

  const handleDragAndDrop = (draggedItem, droppedItem) => {
    if (formikRef) {
      const mutableBlobs = [...blobs];
      const draggedItemIndex = mutableBlobs.findIndex((blob) => blob === draggedItem.id);
      const droppedItemIndex = mutableBlobs.findIndex((blob) => blob === droppedItem.id);

      if (draggedItemIndex !== -1 && droppedItemIndex !== -1) {
        [mutableBlobs[draggedItemIndex], mutableBlobs[droppedItemIndex]] = [
          mutableBlobs[droppedItemIndex],
          mutableBlobs[draggedItemIndex],
        ];
        setBlobs(mutableBlobs);
        formikRef.current.setFieldValue("contents", mutableBlobs);
      }
    }
  };

  const { handleDragEnd, sensors, strategy } = useDragAndDrop(handleDragAndDrop, "swap");

  const handleCloseIconClick = (values, index, setFieldValue) => {
    const blobTemp = [...blobs];
    blobTemp.splice(index, 1);
    setBlobs(blobTemp);

    const dataTemp = [...values.contents];
    dataTemp.splice(index, 1);
    setFieldValue("contents", dataTemp);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        handleSubmit(values, () => {
          resetForm();
          setBlobs([]);
        });
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, errors }) => {
        return (
          <Form>
            <FormLabel name="order" label="Thứ tự chương" />
            <FastField name="order" component={InputField} disabled />

            <FormLabel name="title" label="Tiêu đề chương" />
            <FastField
              name="title"
              component={InputField}
              placeholder="Nhập tiêu đề chương..."
              maxLength={255}
              letterCount
              autoFocus
            />

            {statusOptions.length > 0 && (
              <>
                <FormLabel name="status_id" label="Trạng thái" required />
                <FastField
                  name="status_id"
                  component={RadioGroup}
                  options={statusOptions}
                  col={{ xs: 6 }}
                />
              </>
            )}

            {costOptions.length > 0 && (
              <>
                <FormLabel name="cost" label="Trả phí" required />
                <FastField
                  name="cost"
                  component={RadioGroup}
                  options={costOptions}
                  col={{ xs: 6 }}
                />
              </>
            )}

            <FormLabel name="cover" label="Ảnh bìa" required />
            {!!errors.cover && <Alert variant="danger">{errors.cover}</Alert>}
            <div className={cx("cover-image-field")}>
              <FastField
                name="cover"
                component={InputImage}
                imgSize={{ width: 312, height: 232 }}
                removable
                handleRemove={handleCloseIconClick}
                setFieldValue={setFieldValue}
              />
            </div>

            <FormLabel name="contents" label="Nội dung chương" required />
            {!!errors.contents && <Alert variant="danger">{errors.contents}</Alert>}
            <div className={cx("contents-field")}>
              <FastField
                name="contents"
                component={InputMultiFile}
                blobs={blobs}
                setBlobs={setBlobs}
                setFieldValue={setFieldValue}
                multiple
                imgSize={{ width: 690 }}
                fileSize={3}
              />
            </div>
            <div className={cx("contents-holder")}>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
              >
                <SortableContext items={blobs.map((blob) => blob)} strategy={strategy}>
                  {blobs.map((blob, index) => {
                    return (
                      <DnDSortable id={blob} key={blob}>
                        <div className={cx("content-wrapper")}>
                          <Image
                            src={blob}
                            alt={`Image ${index + 1}`}
                            key={index}
                            className={cx("image-content")}
                          />
                          <IoCloseCircle
                            className={cx("close-icon")}
                            onClick={() => handleCloseIconClick(values, index, setFieldValue)}
                          />
                        </div>
                      </DnDSortable>
                    );
                  })}
                </SortableContext>
              </DndContext>
            </div>

            {/* TODO <FormLabel name="authorNote" label="Lời nhắn của tác giả" />
            <FastField
              name="authorNote"
              component={TextAreaField}
              placeholder="Viết lời nhắn của bạn..."
              maxLength={500}
            /> */}

            {/* TODO <FormLabel name="schedule" label="Đặt lịch đăng chương" />
            <FastField
              name="schedule"
              component={InputField}
              placeholder="dd/mm/yyyy hh:mm:ss"
            /> */}

            <div className={cx("button-group")}>
              <Button outline grey>
                Hủy bỏ
              </Button>
              <div className={cx("button-group__submit-group")}>
                <Button outline type="submit">
                  Lưu bản nháp
                </Button>
                <Button primary type="submit">
                  Lưu & đăng chương
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

ChapterForm.propTypes = {
  initialValues: PropTypes.shape({
    order: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    contents: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(ChapterForm);
