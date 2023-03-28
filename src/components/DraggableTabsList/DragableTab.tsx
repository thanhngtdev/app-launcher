import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface DraggableTabI {
  label: React.ReactNode | string;
  value: string;
  index: number;
  child: any;
}

function DraggableTab(props: DraggableTabI) {
  return (
    <Draggable draggableId={`${props.index}`} index={props.index} disableInteractiveElementBlocking>
      {(draggableProvided) => (
        <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
          {React.cloneElement(props.child, {
            ...props,
            ...draggableProvided.dragHandleProps,
            style: { cursor: 'inherit' },
          })}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableTab;
