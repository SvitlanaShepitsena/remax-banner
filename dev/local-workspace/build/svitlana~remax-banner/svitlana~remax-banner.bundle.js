// Copyright 2015 (c) Famous Industries, Inc.
"use strict";
FamousFramework.includes("svitlana:remax-banner", "HEAD", ["svitlana/remax-banner/galleryData.js","svitlana/remax-banner/remax-banner.css"], function() {
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
        'use strict';
        function addGesture($famousNode, $GestureHandler, $payload, eventName) {
            new $GestureHandler($famousNode, [{
                    event: eventName,
                    callback: function (event) {
                        $payload.listener(event);
                    }
                }]);
        }
        var lastNaturalDOMEvent = {
            timeStamp: null,
            eventName: null
        };
        var naturalDOMListenersFor = {};
        var EVENTS_WHICH_REALLY_NEED_DOM_INFO = {
            'input': true,
            'change': true,
            'click': true,
            'focus': true,
            'blur': true,
            'select': true,
            'keydown': true,
            'keyup': true
        };
        FamousFramework.module('famous:events', 'HEAD', {
            'dependencies': {},
            'famousNodeConstructorName': '',
            'extensions': [],
            'expose': {
                'type': 'ObjectExpression',
                'properties': []
            }
        }, {
            events: {
                '$public': {
                    'size-change': function ($famousNode, $payload) {
                        $famousNode.addComponent({
                            onSizeChange: function (sizeX, sizeY, sizeZ) {
                                $payload.listener({
                                    eventName: 'onSizeChange',
                                    value: [
                                        sizeX,
                                        sizeY,
                                        sizeZ
                                    ]
                                });
                            }
                        });
                    },
                    'parent-size-change': function ($famousNode, $payload) {
                        var parentFamousNode = $famousNode.getParent();
                        if (parentFamousNode) {
                            parentFamousNode.addComponent({
                                onSizeChange: function (sizeX, sizeY, sizeZ) {
                                    $payload.listener({
                                        eventName: 'onParentSizeChange',
                                        value: [
                                            sizeX,
                                            sizeY,
                                            sizeZ
                                        ]
                                    });
                                }
                            });
                        }
                    },
                    'drag': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'drag');
                    },
                    'tap': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'tap');
                    },
                    'rotate': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'rotate');
                    },
                    'pinch': function ($famousNode, $GestureHandler, $payload) {
                        addGesture($famousNode, $GestureHandler, $payload, 'pinch');
                    },
                    '$miss': function ($DOMElement, $famousNode, $payload) {
                        var eventName = $payload.eventName;
                        var listener = $payload.listener;
                        if (eventName in EVENTS_WHICH_REALLY_NEED_DOM_INFO) {
                            if (!naturalDOMListenersFor[eventName]) {
                                naturalDOMListenersFor[eventName] = true;
                                document.addEventListener(eventName, function (event) {
                                    lastNaturalDOMEvent.timeStamp = event.timeStamp;
                                    lastNaturalDOMEvent.eventName = eventName;
                                    lastNaturalDOMEvent.eventObject = event;
                                });
                            }
                        }
                        $famousNode.addUIEvent(eventName);
                        $DOMElement.on(eventName, function (event) {
                            if (naturalDOMListenersFor[eventName]) {
                                if (lastNaturalDOMEvent.eventName === eventName && lastNaturalDOMEvent.timeStamp === event.timeStamp) {
                                    var naturalEvent = lastNaturalDOMEvent.eventObject;
                                    var target = naturalEvent.target || naturalEvent.srcElement;
                                    if (target) {
                                        var nodeLocation = $famousNode.getLocation();
                                        var currentElement = target;
                                        while (currentElement) {
                                            if (currentElement.getAttribute('data-fa-path') === nodeLocation) {
                                                event.target = naturalEvent.target;
                                                event.relatedTarget = naturalEvent.relatedTarget;
                                                break;
                                            }
                                            currentElement = currentElement.parentNode;
                                        }
                                    }
                                }
                            }
                            listener(event);
                        });
                    }
                }
            }
        }).config({
            imports: { 'famous:events': [] },
            'extends': []
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:header-remax', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#headerRemax': {
                    'size': [
                        undefined,
                        46
                    ],
                    'align': [
                        0.5,
                        0
                    ],
                    'origin': [
                        0.5,
                        0
                    ],
                    'mount-point': [
                        0.5,
                        0
                    ],
                    'style': { 'background-color': 'red' },
                    'position-x': '10',
                    'position-y': '0',
                    'position-z': '150'
                }
            },
            events: {},
            states: {},
            tree: '<famous:core:node id="headerRemax">\n    </famous:core:node>'
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:header-content', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#headerContent': {
                    'size': [
                        undefined,
                        16
                    ],
                    'content': '<div>YOU NEED ONLY ONE COMPANY FOR ALL YOUR REAL ESTATE NEEDS!</div>',
                    'position-z': '152',
                    'position-y': '24',
                    'style': {
                        'font-family': 'Lucida Sans, Verdana, sans-serif',
                        'color': 'white',
                        'text-align': 'center',
                        'font-size': '14px',
                        'text-shadow': 'rgba(0, 0, 0, 0.298039) 0px -1px 0px, rgba(255, 255, 255, 0.4) 0px 1px 0px'
                    }
                }
            },
            events: {},
            states: {},
            tree: '<famous:core:node id="headerContent">\n    </famous:core:node>'
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:logo', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#logo': {
                    'position-z': '20',
                    'position-x': '10',
                    'position-y': '32',
                    'size': [
                        100,
                        100
                    ],
                    'style': {
                        'width': '100px',
                        'height': '100px'
                    }
                },
                'img': { 'src': 'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/balloon-no-shade.png' }
            },
            events: {},
            states: { imgSrc: null },
            tree: '<famous:core:node id="logo">\n    <img>\n    </famous:core:node>'
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:house', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#house': {
                    'align': [
                        0.5,
                        0.5
                    ],
                    'mount-point': [
                        0.5,
                        0.5
                    ],
                    'origin': [
                        0.5,
                        0.5
                    ]
                },
                'img': {
                    'align': [
                        0.5,
                        0.5
                    ],
                    'mount-point': [
                        0.5,
                        0.5
                    ],
                    'origin': [
                        0.5,
                        0.5
                    ],
                    'src': function (src) {
                        return src;
                    },
                    'style': {
                        'width': '160px',
                        'height': '160px'
                    }
                }
            },
            events: {
                '$public': {
                    'src': function ($state, $payload) {
                        $state.set('src', $payload);
                    }
                }
            },
            states: { imgSrc: null },
            tree: '<famous:core:node id="house">\n    <img>\n    </famous:core:node>'
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:footer-remax', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#footerRemax': {
                    'size': [
                        730,
                        50
                    ],
                    'align': [
                        0,
                        1
                    ],
                    'origin': [
                        0,
                        1
                    ],
                    'mount-point': [
                        0,
                        1
                    ],
                    'style': {
                        'background-color': 'rgb(0, 93, 153)',
                        'box-shadow': 'rgba(13, 16, 81, 0.639216) 0px 0px 10px 0px inset',
                        'background-image': '-webkit-radial-gradient(50% -375px, circle cover, rgb(0, 161, 228) 0px, rgb(0, 93, 153) 750px'
                    },
                    'position-x': '10',
                    'position-y': '0',
                    'position-z': '150'
                }
            },
            events: {},
            states: {},
            tree: '<famous:core:node id="footerRemax"> </famous:core:node>'
        });
    }());
    (function(){
        'use strict';
        FamousFramework.component('svitlana:remax-banner:slogan', 'HEAD', {
            'dependencies': { 'famous:core:node': 'HEAD' },
            'famousNodeConstructorName': '',
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
                '#slogan': {
                    'align': [
                        0.95,
                        0.89
                    ],
                    'origin': [
                        0.95,
                        0.89
                    ],
                    'mount-point': [
                        0.95,
                        0.89
                    ],
                    'size': [
                        160,
                        16
                    ],
                    'content': '<div>Let us guide you!</div>',
                    'position-y': '0',
                    'position-z': '150',
                    'style': {
                        'font-family': 'Lucida Sans, Verdana, sans-serif',
                        'color': 'white',
                        'font-size': '14px',
                        'text-shadow': 'rgba(0, 22, 43, 0.901961) 0px -1px 0px'
                    }
                }
            },
            events: {},
            states: {},
            tree: '<famous:core:node id="slogan">\n    </famous:core:node>'
        });
    }());
    (function(){
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        function randomCoordinates(imageData) {
            var result = [];
            for (var i = 0; i < imageData.length; i++) {
                result.push(Math.floor(windowHeight / 2 + Math.random() * windowHeight * 2) - 500);
            }
            return result;
        }
        var imageData = [
            'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1115-bradford-ln-shaumburg.jpg',
            'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-1222-calibou-ln-hoffman-estates.jpg',
            'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-2110-laramie-chicago.jpg',
            'https://s3-us-west-2.amazonaws.com/svet.com/ad/remax1stclass/arliyn-tratt-8910-knox-ave-skokie.jpg'
        ];
        'use strict';
        FamousFramework.component('svitlana:remax-banner', 'HEAD', {
            'dependencies': {
                'famous:events': 'HEAD',
                'famous:core:node': 'HEAD',
                'svitlana:remax-banner:header-remax': 'HEAD',
                'svitlana:remax-banner:header-content': 'HEAD',
                'svitlana:remax-banner:logo': 'HEAD',
                'svitlana:remax-banner:house': 'HEAD',
                'svitlana:remax-banner:footer-remax': 'HEAD',
                'svitlana:remax-banner:slogan': 'HEAD'
            },
            'famousNodeConstructorName': '',
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
                '#root': { 'style': { 'perspective': '1000px' } },
                '#rotator-node': {
                    'align': [
                        0.12,
                        0.12
                    ],
                    'mount-point': [
                        0,
                        0
                    ],
                    'origin': [
                        0.5,
                        0.5
                    ],
                    'position-z': function (rootZ) {
                        return rootZ;
                    },
                    'size': function (windowWidth, windowHeight) {
                        return [
                            windowWidth * 0.85,
                            windowHeight
                        ];
                    },
                    'rotation': function (rotationValue) {
                        return [
                            -Math.PI / 2.1,
                            0,
                            rotationValue
                        ];
                    },
                    'style': { 'backgroundColor': 'red' }
                },
                '.gallery-item': {
                    '$repeat': function (srcs) {
                        return srcs;
                    },
                    'position-x': function ($index, windowHeight, windowWidth) {
                        console.log(windowWidth);
                        return $index * 130;
                    },
                    'position-y': function ($index, windowHeight) {
                        return Math.random() * windowHeight;
                    },
                    'position-z': function ($index, positionZ) {
                        return positionZ[$index];
                    },
                    'rotation': [
                        Math.PI / 2,
                        0,
                        0
                    ],
                    'src': function ($index, srcs) {
                        return srcs[$index];
                    }
                }
            },
            events: {
                '$lifecycle': {
                    'post-load': function ($state, $famousNode) {
                        var id = $famousNode.addComponent({
                            onUpdate: function (time) {
                                for (var i = 0; i < $state.get('srcs').length; i++) {
                                    var currentZ = $state.get([
                                        'positionZ',
                                        i
                                    ]);
                                    if (currentZ < -1.2 * $state.get('windowHeight')) {
                                        currentZ = $state.get('windowHeight') / 1.5 + 100;
                                    }
                                    $state.set([
                                        'positionZ',
                                        i
                                    ], currentZ - 1);
                                }
                                $famousNode.requestUpdateOnNextTick(id);
                            }
                        });
                        $famousNode.requestUpdateOnNextTick(id);
                    }
                },
                '.gallery-item': {
                    'famous:events:click': function ($state) {
                        $state.set('rotationValue', $state.get('rotationValue') - Math.PI / 2, {
                            duration: 1000,
                            curve: 'easeIn'
                        }).thenSet('rotationValue', $state.get('rotationValue') - Math.PI * 2, {
                            duration: 2000,
                            curve: 'easeOut'
                        });
                        $state.set('rootZ', -500, {
                            duration: 1000,
                            curve: 'easeOut'
                        }).thenSet('rootZ', 0, {
                            duration: 2000,
                            curve: 'easeInOut'
                        });
                    }
                }
            },
            states: {
                windowHeight: windowHeight,
                windowWidth: windowWidth,
                rotationValue: 0,
                srcs: imageData,
                positionZ: randomCoordinates(imageData),
                rootZ: 0
            },
            tree: '<famous:core:node id="root">\n    <svitlana:remax-banner:header-remax id="headerRemax"></svitlana:remax-banner:header-remax>\n    <svitlana:remax-banner:header-content id="headerContent"></svitlana:remax-banner:header-content>\n    <svitlana:remax-banner:logo id="logo"></svitlana:remax-banner:logo>\n    <famous:core:node id="rotator-node">\n        <svitlana:remax-banner:house class="gallery-item"></svitlana:remax-banner:house>\n    </famous:core:node>\n    <svitlana:remax-banner:footer-remax id="footerRemax"></svitlana:remax-banner:footer-remax>\n    <svitlana:remax-banner:slogan id="slogan"></svitlana:remax-banner:slogan>\n</famous:core:node>'
        }).config({
            includes: [
                'galleryData.js',
                'remax-banner.css'
            ],
            imports: {
                'svitlana:remax-banner': [
                    'header-remax',
                    'header-content',
                    'house',
                    'logo',
                    'footer-remax',
                    'slogan'
                ]
            }
        });
    }());
    FamousFramework.markComponentAsReady("svitlana:remax-banner", "HEAD");
});