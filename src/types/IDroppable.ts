import { DraggableChildrenFn, DroppableId, TypeId } from "react-beautiful-dnd";
type DroppableMode = "standard" | "virtual";
type Direction = "horizontal" | "vertical";
export type Props = {
  droppableId: DroppableId;
  type?: TypeId;
  mode?: DroppableMode;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  direction?: Direction;
  ignoreContainerClipping?: boolean;
  renderClone?: DraggableChildrenFn;
  getContainerForClone?: () => HTMLElement;
  children: (DroppableProvided: any, DroppableStateSnapshot: any) => Node;
};
