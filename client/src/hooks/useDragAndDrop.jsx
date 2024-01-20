import { KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { rectSortingStrategy, rectSwappingStrategy } from "@dnd-kit/sortable";

import { moveItemInArray } from "utils/moveItemInArray.js";

export const useDragAndDrop = (handleDragAndDrop, droppedItem, mode) => {
  const strategy = mode === "insert" ? rectSortingStrategy : rectSwappingStrategy;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      handleDragAndDrop(active, over);
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return {
    sensors,
    strategy,
    handleDragEnd,
    moveItemInArray,
  };
};
