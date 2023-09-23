import styled from "styled-components";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoAtom } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 1rem;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  display: grid;
  min-width: 15rem;
  padding: 2rem;
  min-height: 30rem;
  align-content: baseline;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  height: 5rem;
`;

const App = () => {
  const [todoList, setTodoList] = useRecoilState(todoAtom);
  const onDragEnd = ({ destination, source }: DropResult) => {
    setTodoList((prev) => {
      const newList = [...prev];
      const [item] = newList.splice(source.index, 1);
      if (source.droppableId === destination?.droppableId) {
        newList.splice(destination?.index as number, 0, item);
      }
      return newList;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(magic) => (
            <Boards>
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {todoList.map((item, index) => (
                  <Draggable key={`${item}-${index}`} draggableId={`${item}-${index}`} index={index}>
                    {(magic) => (
                      <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                        {item}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
