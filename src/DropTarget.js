import React, { Component } from 'react';
import { DEFAULT_TYPE } from './constants';
import { DropTarget as reactDndDropTarget } from 'react-dnd';

const noop = function() {};
const returnTrue = function() { return true; };

class DropComponent extends Component {
  render() {
    const { isOver } = this.props;
    let child;
    if (typeof this.props.children === "function") {
      child = this.props.children(isOver);
    } else {
      child = React.Children.only(this.props.children);
    }
    return this.props.connectDropTarget(child);
  }
}
DropComponent.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]).isRequired,
  // Injected by React DnD:
  isOver: React.PropTypes.bool.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired
};

export default class DropTarget extends Component {
  constructor(props) {
    super(props);

    const dropTargetSpec = {
      drop(ownProps, monitor) {
        props.onDrop(monitor.getItem());
      },
      canDrop(ownProps, monitor) {
        return props.canDrop(monitor.getItem());
      }
    };

    this.DecoratedDropComponent = reactDndDropTarget(props.types, dropTargetSpec, this.dropTargetCollect)(DropComponent);
  }

  dropTargetCollect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }

  render() {
    const { children } = this.props;
    return React.createElement(this.DecoratedDropComponent, null, children);
  }
}

DropTarget.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.element
  ]).isRequired,
  types: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  canDrop: React.PropTypes.func,
  onDrop: React.PropTypes.func,
};

DropTarget.defaultProps = {
  types: DEFAULT_TYPE,
  canDrop: returnTrue,
  onDrop: noop
};
