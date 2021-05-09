import React from "react";
import ReactDOM from "react-dom";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";
import "./styles.css";

function App() {
  const [deletedItems, setDeletedItems] = React.useState([]);
  console.log("di", deletedItems);
  const [items, setItems] = React.useState([
    { id: 7, name: "george" },
    { id: 8, name: "rupert" },
    { id: 9, name: "alice" },
    { id: 10, name: "katherine" },
    { id: 11, name: "pam" },
    { id: 12, name: "katie" }
  ]);

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    console.log(sourceId);
    console.log(sourceIndex);
    console.log(targetIndex);
    console.log(targetId);

    const result = swap(items, sourceIndex, targetIndex);
    return setItems(result);
  }
  const deleteItem = (idx) => {
    const copyOfState = items.slice();
    console.log(copyOfState);
    const deletedElement = copyOfState.splice(idx, 1);
    console.log(deletedElement);
    console.log(copyOfState);
    setDeletedItems([...deletedElement, ...deletedItems]);
    setItems(copyOfState);

    console.log("++deletedItems", deletedItems);
  };
  return (
    <GridContextProvider onChange={onChange}>
      <div className="container">
        <GridDropZone
          className="dropzone left"
          id="left"
          boxesPerRow={2}
          rowHeight={100}
        >
          {items.map((item, idx) => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  <button onClick={() => deleteItem(idx)}>x</button>
                  {item.name}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
