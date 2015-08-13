'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = FamousFramework.FamousEngine.core.Node;
var Position = FamousFramework.FamousEngine.components.Position;
var Size = FamousFramework.FamousEngine.components.Size;

var SequentialLayout = (function (_Node) {
    _inherits(SequentialLayout, _Node);

    function SequentialLayout() {
        var _this = this;

        _classCallCheck(this, SequentialLayout);

        _get(Object.getPrototypeOf(SequentialLayout.prototype), 'constructor', this).call(this);

        this._sizeSet = false;
        this._direction = SequentialLayout.Direction.X;
        this._transition = null;

        this.addComponent({
            onSizeChange: function () {
                _this._sizeSet = true;
                _this.updateLayout();
            }
        });
    }

    _createClass(SequentialLayout, [{
        key: '_getDirectionIndex',
        value: function _getDirectionIndex() {
            if (this._direction === SequentialLayout.Direction.X) {
                return 0;
            } else if (this._direction === SequentialLayout.Direction.Y) {
                return 1;
            } else if (this._direction === SequentialLayout.Direction.Z) {
                return 2;
            }
            throw new Error('Unknown direction - ' + this._direction);
        }
    }, {
        key: '_createArrayWithValueAtDirectionIndex',
        value: function _createArrayWithValueAtDirectionIndex(array, value) {
            var result = Array.prototype.slice.call(array, 0);
            var directionIndex = this._getDirectionIndex();
            result[directionIndex] = value;
            return result;
        }
    }, {
        key: '_getNodeSizes',
        value: function _getNodeSizes(nodes) {
            var directionIndex = this._getDirectionIndex();
            return nodes.map(function (node, idx) {
                var contentNode = nodes[idx].getChildren()[0];
                return contentNode.getAbsoluteSize()[directionIndex];
            });
        }
    }, {
        key: '_getNodePosition',
        value: function _getNodePosition(node) {
            if (!node._layoutPosition) {
                node._nodePosition = new Position(node);
            }
            return node._nodePosition;
        }
    }, {
        key: '_getNodeSize',
        value: function _getNodeSize(node) {
            if (!node._layoutSize) {
                node._nodeSize = new Size(node);
            }
            return node._nodeSize;
        }
    }, {
        key: 'updateLayout',
        value: function updateLayout() {
            var _this2 = this;

            if (!this._sizeSet) {
                return;
            }

            var createArray = this._createArrayWithValueAtDirectionIndex.bind(this);
            var childNodes = this.getChildren()[0].getChildren();
            var sizes = this._getNodeSizes(childNodes);
            var position = 0;

            childNodes.forEach(function (childNode, idx) {
                var size = sizes[idx];
                var transition = _this2._transition;

                var nodePosition = _this2._getNodePosition(childNode);
                nodePosition.halt();
                nodePosition.set.apply(nodePosition, createArray([0, 0, 0], position).concat(transition));

                position += size;
            });
        }
    }, {
        key: 'direction',
        set: function (direction) {
            for (var key in SequentialLayout.Direction) {
                if (SequentialLayout.Direction[key] === direction) {
                    this._direction = direction;
                    this.updateLayout();
                    return;
                }
            }
            throw new Error('Invalid direction - ' + direction);
        }
    }, {
        key: 'transition',
        set: function (transition) {
            this._transition = transition;
        }
    }]);

    return SequentialLayout;
})(Node);

SequentialLayout.Direction = {
    X: Symbol('SequentialLayout.Direction.X'),
    Y: Symbol('SequentialLayout.Direction.Y'),
    Z: Symbol('SequentialLayout.Direction.Z')
};

FamousFramework.registerCustomFamousNodeConstructors({ SequentialLayout: SequentialLayout });