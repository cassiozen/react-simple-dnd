import React, { Component } from 'react';
import { DropTarget, DragSource, HTML5DragDrop } from 'react-simple-dnd';
import './App.css';


class App extends Component {
  handleDrop(draggedProps) {
    console.log('You Dropped', draggedProps.name);
  }

  render() {
    return (
      <div>
        <DragSource type="a" name="item A">
          <div className="drag">
            Drag (Type “A”)
          </div>
        </DragSource>

        <DragSource type="b" name="item B">
          <div className="drag">
            Drag (Type “B”)
          </div>
        </DragSource>

        <div className="targets">
          <DropTarget types="a" onDrop={this.handleDrop}>
            {(isOver) => (
              <div className={isOver ? "drop-target over" : "drop-target"}>
                Only Drops type “A”
              </div>
            )}
          </DropTarget>

          <DropTarget types="b" onDrop={this.handleDrop}>
            {(isOver) => (
              <div className={isOver ? "drop-target over" : "drop-target"}>
                Only Drops type “B”
              </div>
            )}
          </DropTarget>

          <DropTarget types={["a", "b"]} onDrop={this.handleDrop}>
            {(isOver) => (
              <div className={isOver ? "drop-target over" : "drop-target"}>
                Drop anything on Me
              </div>
            )}
          </DropTarget>
        </div>
      </div>
    );
  }
}

export default HTML5DragDrop(App);
