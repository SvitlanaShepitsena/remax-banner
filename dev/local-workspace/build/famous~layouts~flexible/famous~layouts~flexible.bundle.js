// Copyright 2015 (c) Famous Industries, Inc.
"use strict";
FamousFramework.includes("famous:layouts:flexible", "HEAD", ["famous/layouts/flexible/_constructor.js"], function() {
    (function(){
        'use strict';
        FamousFramework.module('famous:core:node', 'HEAD', {
            'dependencies': {},
            'famousNodeConstructorName': '',
            'extensions': [],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            behaviors: { '$self': { '$yield': true } },
            events: {
                '$public': {
                    'add-class': function ($DOMElement, $payload) {
                        $DOMElement.addClass($payload);
                    },
                    'align': function ($famousNode, $payload) {
                        $famousNode.setAlign($payload[0], $payload[1], $payload[2]);
                    },
                    'align-x': function ($famousNode, $payload) {
                        $famousNode.setAlign($payload, null, null);
                    },
                    'align-y': function ($famousNode, $payload) {
                        $famousNode.setAlign(null, $payload, null);
                    },
                    'align-z': function ($famousNode, $payload) {
                        $famousNode.setAlign(null, null, $payload);
                    },
                    'attach': function ($payload, $famousNode) {
                        $payload($famousNode);
                    },
                    'attributes': function ($DOMElement, $payload) {
                        for (var attributeName in $payload) {
                            $DOMElement.setAttribute(attributeName, $payload[attributeName]);
                        }
                    },
                    'backface-visible': function ($state, $payload, $dispatcher) {
                        var style = $state.get('style') || {};
                        style['-webkit-backface-visibility'] = $payload ? 'visible' : 'hidden';
                        style['backface-visibility'] = $payload ? 'visible' : 'hidden';
                        $dispatcher.trigger('style', style);
                    },
                    'base-color': function ($mesh, $payload, $state) {
                        if (Object.prototype.toString.call($payload) === '[object Object]') {
                            var Material = FamousFramework.FamousEngine.webglMaterials.Material;
                            Material.registerExpression($payload.name, {
                                glsl: $payload.glsl,
                                output: $payload.output
                            });
                            $mesh.setBaseColor(new Material[$payload.name]());
                        } else {
                            $mesh.setBaseColor(new FamousFramework.FamousEngine.utilities.Color($payload));
                        }
                        if (!$state.get('hasGeometry')) {
                            $mesh.setGeometry(new FamousFramework.FamousEngine.webglGeometries.Plane());
                            $state.set('hasGeometry', true);
                        }
                    },
                    'box-shadow': function ($state, $payload, $dispatcher) {
                        var style = $state.get('style') || {};
                        style['-webkit-box-shadow'] = $payload;
                        style['-moz-box-shadow'] = $payload;
                        style['box-shadow'] = $payload;
                        $dispatcher.trigger('style', style);
                    },
                    'camera': function ($camera, $payload) {
                        $camera.set($payload[0], $payload[1]);
                    },
                    'content': function ($DOMElement, $payload) {
                        $DOMElement.setContent($payload);
                    },
                    'flat-shading': function ($mesh, $payload) {
                        $mesh.setFlatShading($payload);
                    },
                    'geometry': function ($mesh, $payload, $state) {
                        var webglGeometries = FamousFramework.FamousEngine.webglGeometries;
                        var geometry;
                        if ($payload.dynamic) {
                            var geometry = new webglGeometries.DynamicGeometry().fromGeometry(new webglGeometries[$payload.shape]($payload.options));
                        } else {
                            var geometry = new webglGeometries[$payload.shape]($payload.options);
                        }
                        $mesh.setGeometry(geometry);
                        $state.set('hasGeometry', true);
                    },
                    'glossiness': function ($mesh, $payload) {
                        $mesh.setGlossiness($payload.glossiness, $payload.strength);
                    },
                    'id': function ($DOMElement, $payload) {
                        $DOMElement.setId($payload);
                    },
                    'light': function ($famousNode, $payload) {
                        var webglRenderables = FamousFramework.FamousEngine.webglRenderables;
                        var Color = FamousFramework.FamousEngine.utilities.Color;
                        if ($payload.type === 'point') {
                            new webglRenderables.PointLight($famousNode).setColor(new Color($payload.color));
                        } else {
                            new webglRenderables.AmbientLight($famousNode).setColor(new Color($payload.color));
                        }
                    },
                    'mount-point': function ($famousNode, $payload) {
                        $famousNode.setMountPoint($payload[0], $payload[1], $payload[2]);
                    },
                    'mount-point-x': function ($famousNode, $payload) {
                        $famousNode.setMountPoint($payload, null, null);
                    },
                    'mount-point-y': function ($famousNode, $payload) {
                        $famousNode.setMountPoint(null, $payload, null);
                    },
                    'mount-point-z': function ($famousNode, $payload) {
                        $famousNode.setMountPoint(null, null, $payload);
                    },
                    'normals': function ($mesh, $payload) {
                        $mesh.setNormals($payload);
                    },
                    'offset-position': function ($famousNode, $payload) {
                        var currentPos = $famousNode.getPosition();
                        $famousNode.setPosition(currentPos[0] + $payload[0] || 0, currentPos[1] + $payload[1] || 0, currentPos[2] + $payload[2] || 0);
                    },
                    'opacity': function ($famousNode, $payload) {
                        $famousNode.setOpacity($payload);
                    },
                    'origin': function ($famousNode, $payload) {
                        $famousNode.setOrigin($payload[0], $payload[1], $payload[2]);
                    },
                    'origin-x': function ($famousNode, $payload) {
                        $famousNode.setOrigin($payload, null, null);
                    },
                    'origin-y': function ($famousNode, $payload) {
                        $famousNode.setOrigin(null, $payload, null);
                    },
                    'origin-z': function ($famousNode, $payload) {
                        $famousNode.setOrigin(null, null, $payload);
                    },
                    'position': function ($famousNode, $payload) {
                        $famousNode.setPosition($payload[0], $payload[1], $payload[2]);
                    },
                    'position-offset': function ($mesh, $payload, $state) {
                        var Material = FamousFramework.FamousEngine.webglMaterials.Material;
                        Material.registerExpression($payload.name, {
                            glsl: $payload.glsl,
                            output: $payload.output
                        });
                        var vertexShader = Material[$payload.name](null, $payload.defaults);
                        $state.set($payload.name, vertexShader);
                        $mesh.setPositionOffset(vertexShader);
                    },
                    'position-x': function ($famousNode, $payload) {
                        $famousNode.setPosition($payload, null, null);
                    },
                    'position-y': function ($famousNode, $payload) {
                        $famousNode.setPosition(null, $payload, null);
                    },
                    'position-z': function ($famousNode, $payload) {
                        $famousNode.setPosition(null, null, $payload);
                    },
                    'remove-class': function ($DOMElement, $payload) {
                        $DOMElement.removeClass($payload);
                    },
                    'rotation': function ($famousNode, $payload) {
                        $famousNode.setRotation($payload[0], $payload[1], $payload[2], $payload[3]);
                    },
                    'rotation-x': function ($famousNode, $payload) {
                        $famousNode.setRotation($payload, null, null);
                    },
                    'rotation-y': function ($famousNode, $payload) {
                        $famousNode.setRotation(null, $payload, null);
                    },
                    'rotation-z': function ($famousNode, $payload) {
                        $famousNode.setRotation(null, null, $payload);
                    },
                    'scale': function ($famousNode, $payload) {
                        $famousNode.setScale($payload[0], $payload[1], $payload[2]);
                    },
                    'scale-x': function ($famousNode, $payload) {
                        $famousNode.setScale($payload, null, null);
                    },
                    'scale-y': function ($famousNode, $payload) {
                        $famousNode.setScale(null, $payload, null);
                    },
                    'scale-z': function ($famousNode, $payload) {
                        $famousNode.setScale(null, null, $payload);
                    },
                    'size': function ($payload, $dispatcher) {
                        var xSize = $payload[0];
                        var ySize = $payload[1];
                        var zSize = $payload[2];
                        if (xSize === true)
                            $dispatcher.trigger('size-true-x');
                        else if (xSize !== undefined)
                            $dispatcher.trigger('size-absolute-x', xSize);
                        if (ySize === true)
                            $dispatcher.trigger('size-true-y');
                        else if (ySize !== undefined)
                            $dispatcher.trigger('size-absolute-y', ySize);
                        if (zSize === true)
                            $dispatcher.trigger('size-true-z');
                        else if (zSize !== undefined)
                            $dispatcher.trigger('size-absolute-z', zSize);
                    },
                    'size-mode': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0], $payload[1], $payload[2]);
                    },
                    'size-mode-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload, null, null);
                    },
                    'size-mode-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload, null);
                    },
                    'size-mode-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload);
                    },
                    'size-true': function ($famousNode) {
                        $famousNode.setSizeMode(2, 2, 2);
                    },
                    'size-true-x': function ($famousNode) {
                        $famousNode.setSizeMode(2, null, null);
                    },
                    'size-true-y': function ($famousNode) {
                        $famousNode.setSizeMode(null, 2, null);
                    },
                    'size-true-z': function ($famousNode) {
                        $famousNode.setSizeMode(null, null, 2);
                    },
                    'size-absolute': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 1, $payload[1] === null ? null : 1, $payload[2] === null ? null : 1);
                        $famousNode.setAbsoluteSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-absolute-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 1, null, null);
                        $famousNode.setAbsoluteSize($payload, null, null);
                    },
                    'size-absolute-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 1, null);
                        $famousNode.setAbsoluteSize(null, $payload, null);
                    },
                    'size-absolute-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 1);
                        $famousNode.setAbsoluteSize(null, null, $payload);
                    },
                    'size-differential': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 0, $payload[1] === null ? null : 0, $payload[2] === null ? null : 0);
                        $famousNode.setDifferentialSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-differential-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 0, null, null);
                        $famousNode.setDifferentialSize($payload, null, null);
                    },
                    'size-differential-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 0, null);
                        $famousNode.setDifferentialSize(null, $payload, null);
                    },
                    'size-differential-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 0);
                        $famousNode.setDifferentialSize(null, null, $payload);
                    },
                    'size-proportional': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload[0] === null ? null : 0, $payload[1] === null ? null : 0, $payload[2] === null ? null : 0);
                        $famousNode.setProportionalSize($payload[0], $payload[1], $payload[2]);
                    },
                    'size-proportional-x': function ($famousNode, $payload) {
                        $famousNode.setSizeMode($payload === null ? null : 0, null, null);
                        $famousNode.setProportionalSize($payload, null, null);
                    },
                    'size-proportional-y': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, $payload === null ? null : 0, null);
                        $famousNode.setProportionalSize(null, $payload, null);
                    },
                    'size-proportional-z': function ($famousNode, $payload) {
                        $famousNode.setSizeMode(null, null, $payload === null ? null : 0);
                        $famousNode.setProportionalSize(null, null, $payload);
                    },
                    'style': function ($DOMElement, $payload) {
                        for (var styleName in $payload) {
                            $DOMElement.setProperty(styleName, $payload[styleName]);
                        }
                    },
                    'uniform': function ($state, $payload) {
                        $state.get($payload.vertexName).setUniform($payload.variableName, $payload.value);
                    },
                    'unselectable': function ($state, $payload, $dispatcher) {
                        if ($payload) {
                            var style = $state.get('style') || {};
                            style['-moz-user-select'] = '-moz-none';
                            style['-khtml-user-select'] = 'none';
                            style['-webkit-user-select'] = 'none';
                            style['-o-user-select'] = 'none';
                            style['user-select'] = 'none';
                            $dispatcher.trigger('style', style);
                        }
                    }
                }
            },
            states: {
                'didTemplate': false,
                'initialContent': '',
                'hasGeometry': false
            }
        }).config({
            'extends': [],
            imports: {}
        });
    }());
    (function(){
        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ('value' in descriptor)
                        descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function (Constructor, protoProps, staticProps) {
                if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                if (staticProps)
                    defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(_x, _x2, _x3) {
            var _again = true;
            _function:
                while (_again) {
                    var object = _x, property = _x2, receiver = _x3;
                    desc = parent = getter = undefined;
                    _again = false;
                    if (object === null)
                        object = Function.prototype;
                    var desc = Object.getOwnPropertyDescriptor(object, property);
                    if (desc === undefined) {
                        var parent = Object.getPrototypeOf(object);
                        if (parent === null) {
                            return undefined;
                        } else {
                            _x = parent;
                            _x2 = property;
                            _x3 = receiver;
                            _again = true;
                            continue _function;
                        }
                    } else if ('value' in desc) {
                        return desc.value;
                    } else {
                        var getter = desc.get;
                        if (getter === undefined) {
                            return undefined;
                        }
                        return getter.call(receiver);
                    }
                }
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== 'function' && superClass !== null) {
                throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Node = FamousFramework.FamousEngine.core.Node;
        var Position = FamousFramework.FamousEngine.components.Position;
        var Size = FamousFramework.FamousEngine.components.Size;
        var FlexibleLayout = function (_Node) {
            _inherits(FlexibleLayout, _Node);
            function FlexibleLayout() {
                var _this = this;
                _classCallCheck(this, FlexibleLayout);
                _get(Object.getPrototypeOf(FlexibleLayout.prototype), 'constructor', this).call(this);
                this._sizeSet = false;
                this._direction = FlexibleLayout.Direction.X;
                this._proportions = [];
                this._ratios = [];
                this._transition = null;
                this.addComponent({
                    onSizeChange: function () {
                        _this._sizeSet = true;
                        _this.updateLayout();
                    }
                });
            }
            _createClass(FlexibleLayout, [
                {
                    key: '_getDirectionIndex',
                    value: function _getDirectionIndex() {
                        if (this._direction === FlexibleLayout.Direction.X) {
                            return 0;
                        } else if (this._direction === FlexibleLayout.Direction.Y) {
                            return 1;
                        } else if (this._direction === FlexibleLayout.Direction.Z) {
                            return 2;
                        }
                        throw new Error('Unknown direction - ' + this._direction);
                    }
                },
                {
                    key: '_createArrayWithValueAtDirectionIndex',
                    value: function _createArrayWithValueAtDirectionIndex(array, value) {
                        var result = Array.prototype.slice.call(array, 0);
                        var directionIndex = this._getDirectionIndex();
                        result[directionIndex] = value;
                        return result;
                    }
                },
                {
                    key: '_createSizeArrayWithTrueSizesPopulated',
                    value: function _createSizeArrayWithTrueSizesPopulated(nodes, directionIndex) {
                        return this._proportions.map(function (proportion, idx) {
                            if (idx < nodes.length && proportion === true) {
                                var contentNode = nodes[idx].getChildren()[0];
                                return contentNode.getAbsoluteSize()[directionIndex];
                            }
                            return null;
                        });
                    }
                },
                {
                    key: '_calculateSumOfTrueSizes',
                    value: function _calculateSumOfTrueSizes(sizes) {
                        return sizes.filter(function (size) {
                            return typeof size === 'number';
                        }).reduce(function (sum, size) {
                            return sum + size;
                        }, 0);
                    }
                },
                {
                    key: '_fillUnknownSizes',
                    value: function _fillUnknownSizes(sizes, parentSize, sumTrueSizes) {
                        var _this2 = this;
                        sizes.forEach(function (size, idx) {
                            if (typeof size === 'number') {
                                return;
                            }
                            var proportion = _this2._proportions[idx];
                            if (typeof proportion === 'number') {
                                sizes[idx] = proportion * (parentSize - sumTrueSizes);
                            } else {
                                sizes[idx] = 0;
                            }
                        });
                    }
                },
                {
                    key: '_getNodeSizes',
                    value: function _getNodeSizes(nodes, parentSize) {
                        var directionIndex = this._getDirectionIndex();
                        var sizes = this._createSizeArrayWithTrueSizesPopulated(nodes, directionIndex);
                        var sumTrueSizes = this._calculateSumOfTrueSizes(sizes);
                        this._fillUnknownSizes(sizes, parentSize[directionIndex], sumTrueSizes);
                        return sizes;
                    }
                },
                {
                    key: '_getNodePosition',
                    value: function _getNodePosition(node) {
                        if (!node._layoutPosition) {
                            node._nodePosition = new Position(node);
                        }
                        return node._nodePosition;
                    }
                },
                {
                    key: '_getNodeSize',
                    value: function _getNodeSize(node) {
                        if (!node._layoutSize) {
                            node._nodeSize = new Size(node);
                        }
                        return node._nodeSize;
                    }
                },
                {
                    key: 'updateLayout',
                    value: function updateLayout() {
                        var _this3 = this;
                        if (!this._sizeSet) {
                            return;
                        }
                        var createArray = this._createArrayWithValueAtDirectionIndex.bind(this);
                        var childNodes = this.getChildren()[0].getChildren();
                        var parentSize = this.getSize();
                        var sizes = this._getNodeSizes(childNodes, parentSize);
                        var position = 0;
                        childNodes.forEach(function (childNode, idx) {
                            var size = sizes[idx];
                            var transition = _this3._transition;
                            var nodePosition = _this3._getNodePosition(childNode);
                            nodePosition.halt();
                            nodePosition.set.apply(nodePosition, createArray([
                                0,
                                0,
                                0
                            ], position).concat(transition));
                            var nodeSize = _this3._getNodeSize(childNode);
                            nodeSize.halt();
                            nodeSize.setMode.apply(nodeSize, [
                                1,
                                1,
                                1
                            ]);
                            nodeSize.setAbsolute.apply(nodeSize, createArray(parentSize, size).concat(transition));
                            position += size;
                        });
                    }
                },
                {
                    key: 'direction',
                    set: function (direction) {
                        for (var key in FlexibleLayout.Direction) {
                            if (FlexibleLayout.Direction[key] === direction) {
                                this._direction = direction;
                                this.updateLayout();
                                return;
                            }
                        }
                        throw new Error('Invalid direction - ' + direction);
                    }
                },
                {
                    key: 'ratios',
                    set: function (ratios) {
                        if (ratios === null) {
                            return;
                        }
                        if (!(ratios instanceof Array)) {
                            throw new Error('ratios must be an array - ' + ratios);
                        }
                        var sumRatios = ratios.reduce(function (sum, ratio) {
                            return sum + (typeof ratio === 'number' ? ratio : 0);
                        }, 0);
                        this._ratios = ratios;
                        this._proportions = ratios.map(function (ratio) {
                            return typeof ratio === 'number' ? ratio / sumRatios : ratio;
                        });
                        this.updateLayout();
                    }
                },
                {
                    key: 'transition',
                    set: function (transition) {
                        this._transition = transition;
                    }
                }
            ]);
            return FlexibleLayout;
        }(Node);
        FlexibleLayout.Direction = {
            X: Symbol('FlexibleLayout.Direction.X'),
            Y: Symbol('FlexibleLayout.Direction.Y'),
            Z: Symbol('FlexibleLayout.Direction.Z')
        };
        FamousFramework.registerCustomFamousNodeConstructors({ FlexibleLayout: FlexibleLayout });
        'use strict';
        FamousFramework.component('famous:layouts:flexible', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': 'FlexibleLayout',
            'extensions': [{
                    'name': 'famous:core:node',
                    'version': 'HEAD'
                }],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            behaviors: {
                '$self': {
                    'direction': function (direction) {
                        return direction;
                    },
                    'ratios': function (ratios) {
                        return ratios;
                    },
                    'transition': function (transition) {
                        return transition;
                    }
                },
                '.flexible-layout': { 'style': {} },
                '.flexible-layout-item': { '$yield': true }
            },
            events: {
                '$public': {
                    'direction': function ($state, $payload) {
                        $state.set('direction', $payload);
                    },
                    'ratios': function ($state, $payload) {
                        $state.set('ratios', $payload);
                    },
                    'transition': function ($state, $payload) {
                        $state.set('transition', $payload);
                    },
                    'update-layout': function ($famousNode) {
                        $famousNode.updateLayout();
                    }
                },
                '$private': {
                    'direction': function ($famousNode, $payload) {
                        if ($payload === 0) {
                            $famousNode.direction = FlexibleLayout.Direction.X;
                        } else if ($payload === 1) {
                            $famousNode.direction = FlexibleLayout.Direction.Y;
                        } else if ($payload === 2) {
                            $famousNode.direction = FlexibleLayout.Direction.Z;
                        }
                    },
                    'ratios': function ($famousNode, $payload) {
                        $famousNode.ratios = $payload;
                    },
                    'transition': function ($famousNode, $payload) {
                        $famousNode.transition = $payload;
                    }
                }
            },
            states: {
                direction: 0,
                ratios: [],
                transition: null
            },
            tree: '<famous:core:node class="flexible-layout">\n            <famous:core:node class="flexible-layout-item"></famous:core:node>\n        </famous:core:node>\n    '
        }).config({
            famousNodeConstructorName: 'FlexibleLayout',
            includes: ['_constructor.js']
        });
    }());
    FamousFramework.markComponentAsReady("famous:layouts:flexible", "HEAD");
});