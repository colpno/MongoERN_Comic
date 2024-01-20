import { useSortable } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { CSS } from "@dnd-kit/utilities";

function DnDSortable({ children, id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
}

DnDSortable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  id: PropTypes.string.isRequired,
};

export default DnDSortable;
