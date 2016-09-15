'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDnd = require('react-dnd');
var HTML5Backend = _interopDefault(require('react-dnd-html5-backend'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function HTML5DragDrop(WrappedComponent) {
  var HTML5DragDrop = function (_Component) {
    inherits(HTML5DragDrop, _Component);

    function HTML5DragDrop() {
      classCallCheck(this, HTML5DragDrop);
      return possibleConstructorReturn(this, (HTML5DragDrop.__proto__ || Object.getPrototypeOf(HTML5DragDrop)).apply(this, arguments));
    }

    createClass(HTML5DragDrop, [{
      key: 'render',
      value: function render() {
        return React__default.createElement(WrappedComponent, this.props);
      }
    }]);
    return HTML5DragDrop;
  }(React.Component);

  return reactDnd.DragDropContext(HTML5Backend)(HTML5DragDrop);
}

var DEFAULT_TYPE = '---default---';

var noop = function noop() {};

var DragComponent = function (_Component) {
  inherits(DragComponent, _Component);

  function DragComponent() {
    classCallCheck(this, DragComponent);
    return possibleConstructorReturn(this, (DragComponent.__proto__ || Object.getPrototypeOf(DragComponent)).apply(this, arguments));
  }

  createClass(DragComponent, [{
    key: 'render',
    value: function render() {
      var isDragging = this.props.isDragging;

      var child = void 0;
      if (typeof this.props.children === "function") {
        child = this.props.children(isDragging);
      } else {
        child = React__default.Children.only(this.props.children);
      }
      return this.props.connectDragComponent(child);
    }
  }]);
  return DragComponent;
}(React.Component);

DragComponent.propTypes = {
  children: React__default.PropTypes.oneOfType([React__default.PropTypes.func, React__default.PropTypes.element]).isRequired,
  // Injected by React DnD:
  isDragging: React__default.PropTypes.bool.isRequired,
  connectDragComponent: React__default.PropTypes.func.isRequired
};

var DragSource$1 = function (_Component2) {
  inherits(DragSource$$1, _Component2);

  function DragSource$$1(props) {
    classCallCheck(this, DragSource$$1);

    var _this2 = possibleConstructorReturn(this, (DragSource$$1.__proto__ || Object.getPrototypeOf(DragSource$$1)).call(this, props));

    var dragSourceSpec = {
      beginDrag: function beginDrag(_ref) {
        var children = _ref.children;
        var isDragging = _ref.isDragging;
        var connectDragComponent = _ref.connectDragComponent;
        var ownProps = objectWithoutProperties(_ref, ['children', 'isDragging', 'connectDragComponent']);

        props.onBeginDrag();
        return ownProps;
      },
      endDrag: function endDrag() {
        props.onEndDrag();
      }
    };

    _this2.DecoratedDragComponent = reactDnd.DragSource(props.type, dragSourceSpec, _this2.dragSourceCollect)(DragComponent);
    return _this2;
  }

  createClass(DragSource$$1, [{
    key: 'dragSourceCollect',
    value: function dragSourceCollect(connect, monitor) {
      return {
        connectDragComponent: connect.dragSource(),
        isDragging: monitor.isDragging()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var onBeginDrag = _props.onBeginDrag;
      var onEndDrag = _props.onEndDrag;
      var props = objectWithoutProperties(_props, ['children', 'onBeginDrag', 'onEndDrag']);

      return React__default.createElement(this.DecoratedDragComponent, props, children);
    }
  }]);
  return DragSource$$1;
}(React.Component);

DragSource$1.propTypes = {
  children: React__default.PropTypes.oneOfType([React__default.PropTypes.func, React__default.PropTypes.element]).isRequired,
  type: React__default.PropTypes.string,
  onBeginDrag: React__default.PropTypes.func,
  onEndDrag: React__default.PropTypes.func
};

DragSource$1.defaultProps = {
  type: DEFAULT_TYPE,
  onBeginDrag: noop,
  onEndDrag: noop
};

var noop$1 = function noop$1() {};
var returnTrue = function returnTrue() {
  return true;
};

var DropComponent = function (_Component) {
  inherits(DropComponent, _Component);

  function DropComponent() {
    classCallCheck(this, DropComponent);
    return possibleConstructorReturn(this, (DropComponent.__proto__ || Object.getPrototypeOf(DropComponent)).apply(this, arguments));
  }

  createClass(DropComponent, [{
    key: 'render',
    value: function render() {
      var isOver = this.props.isOver;

      var child = void 0;
      if (typeof this.props.children === "function") {
        child = this.props.children(isOver);
      } else {
        child = React__default.Children.only(this.props.children);
      }
      return this.props.connectDropTarget(child);
    }
  }]);
  return DropComponent;
}(React.Component);

DropComponent.propTypes = {
  children: React__default.PropTypes.oneOfType([React__default.PropTypes.func, React__default.PropTypes.element]).isRequired,
  // Injected by React DnD:
  isOver: React__default.PropTypes.bool.isRequired,
  connectDropTarget: React__default.PropTypes.func.isRequired
};

var DropTarget$1 = function (_Component2) {
  inherits(DropTarget$$1, _Component2);

  function DropTarget$$1(props) {
    classCallCheck(this, DropTarget$$1);

    var _this2 = possibleConstructorReturn(this, (DropTarget$$1.__proto__ || Object.getPrototypeOf(DropTarget$$1)).call(this, props));

    var dropTargetSpec = {
      drop: function drop(ownProps, monitor) {
        props.onDrop(monitor.getItem());
      },
      canDrop: function canDrop(ownProps, monitor) {
        return props.canDrop(monitor.getItem());
      }
    };

    _this2.DecoratedDropComponent = reactDnd.DropTarget(props.types, dropTargetSpec, _this2.dropTargetCollect)(DropComponent);
    return _this2;
  }

  createClass(DropTarget$$1, [{
    key: 'dropTargetCollect',
    value: function dropTargetCollect(connect, monitor) {
      return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return React__default.createElement(this.DecoratedDropComponent, null, children);
    }
  }]);
  return DropTarget$$1;
}(React.Component);

DropTarget$1.propTypes = {
  children: React__default.PropTypes.oneOfType([React__default.PropTypes.func, React__default.PropTypes.element]).isRequired,
  types: React__default.PropTypes.oneOfType([React__default.PropTypes.string, React__default.PropTypes.array]),
  canDrop: React__default.PropTypes.func,
  onDrop: React__default.PropTypes.func
};

DropTarget$1.defaultProps = {
  types: DEFAULT_TYPE,
  canDrop: returnTrue,
  onDrop: noop$1
};

exports.HTML5DragDrop = HTML5DragDrop;
exports.DragSource = DragSource$1;
exports.DropTarget = DropTarget$1;