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
        <DragSource name="item 1">
          {(isDragging) => (
            <div className={isDragging ? "drag invisible" : "drag"}>
              Drag Item 1
            </div>
          )}
        </DragSource>

        <DragSource name="item 2">
          {(isDragging) => (
            <div className={isDragging ? "drag invisible" : "drag"}>
              Drag Item 2
            </div>
          )}
        </DragSource>

        <DropTarget onDrop={this.handleDrop}>
          {(isOver) => (
            <div className={isOver ? "drop-target over" : "drop-target"}>
              Drop on Me
            </div>
          )}
        </DropTarget>
      </div>
    );
  }
}

export default HTML5DragDrop(App);
