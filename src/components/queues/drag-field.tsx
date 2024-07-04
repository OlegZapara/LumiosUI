import { cn } from "@/lib/utils";
import { QueueUser } from "@/schemas/queue-schema";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { useContext } from "react";
import { QueueContext } from "./queue";
import { UserItem } from "./user-item";

export function DragField() {
  const { users, setUsers, isAdmin } = useContext(QueueContext);

  function onDragEnd(result: any) {
    if (!result.destination) return;
    const usersArray = Array.from(users);
    const [removedUser] = usersArray.splice(result.source.index, 1);
    usersArray.splice(result.destination.index, 0, removedUser);
    setUsers(usersArray);
  }

  function DroppableField(provided: DroppableProvided) {
    return (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {users.map((user, index) => {
          const id = user.username ? user.username : user.name;
          return (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided, snapshot) => DraggableField(provided, snapshot, user)}
            </Draggable>
          );
        })}
        {provided.placeholder}
      </div>
    );
  }

  function DraggableField(
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    user: QueueUser,
  ) {
    const style = provided.draggableProps.style as any;
    if (snapshot.isDragging) {
      style.left = style.offsetLeft;
      style.top = style.offsetTop;
    }
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={cn(
          "select-none rounded-lg px-3 py-1 hover:shadow dark:shadow-muted-foreground",
          snapshot.isDragging ? "bg-muted shadow-lg" : "",
        )}
      >
        <UserItem user={user} />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" isDropDisabled={!isAdmin}>
        {DroppableField}
      </Droppable>
    </DragDropContext>
  );
}
