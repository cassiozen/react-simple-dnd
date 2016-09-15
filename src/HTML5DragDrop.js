import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default function HTML5DragDrop(WrappedComponent) {
  class HTML5DragDrop extends Component {
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  return DragDropContext(HTML5Backend)(HTML5DragDrop);
}
