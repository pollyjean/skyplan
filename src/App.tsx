import styled from "styled-components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoAtom } from "./atoms";
import DraggableCard from "./components/DraggableCard";

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
                  <DraggableCard key={`${item}-${index}`} item={item} index={index} />
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
