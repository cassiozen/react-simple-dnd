import React, { Component } from 'react';
import { DEFAULT_TYPE } from './constants';
import { DragSource as reactDndDragSource } from 'react-dnd';

const noop = function() {};

class DragComponent extends Component {
  render() {
    const { isDragging } = this.props;
    let child;
    if (typeof this.props.children === "function") {
      child = this.props.children(isDragging);
    } else {
      child = React.Children.only(this.props.children);
    }
    return this.props.connectDragComponent(child);
  }
}
DragComponent.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]).isRequired,
  // Injected by React DnD:
  isDragging: React.PropTypes.bool.isRequired,
  connectDragComponent: React.PropTypes.func.isRequired
};


export default class DragSource extends Component {
  constructor(props) {
    super(props);

    const dragSourceSpec = {
      beginDrag({ children, isDragging, connectDragComponent, ...ownProps }) {
        props.onBeginDrag();
        return ownProps;
      },
      endDrag() {
        props.onEndDrag();
      }
    };

    this.DecoratedDragComponent = reactDndDragSource(props.type, dragSourceSpec, this.dragSourceCollect)(DragComponent);
  }

  dragSourceCollect(connect, monitor) {
    return {
      connectDragComponent: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  }

  render() {
    const { children, onBeginDrag, onEndDrag, ...props } = this.props;
    return React.createElement(this.DecoratedDragComponent, props, children);
  }
}

DragSource.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]).isRequired,
  type: React.PropTypes.string,
  onBeginDrag: React.PropTypes.func,
  onEndDrag: React.PropTypes.func,
};

DragSource.defaultProps = {
  type: DEFAULT_TYPE,
  onBeginDrag: noop,
  onEndDrag: noop
};
