import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  height: 5rem;
`;

interface DraggableCardProps {
  item: string;
  index: number;
}

const DraggableCard = memo(({ item, index }: DraggableCardProps) => {
  return (
    <Draggable draggableId={`${item}+${index}`} index={index}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {item}
        </Card>
      )}
    </Draggable>
  );
});

export default DraggableCard;
