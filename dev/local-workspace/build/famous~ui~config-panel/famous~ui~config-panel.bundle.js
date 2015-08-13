// Copyright 2015 (c) Famous Industries, Inc.
"use strict";
FamousFramework.includes("famous:ui:config-panel", "HEAD", [], function() {
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
        function getFormattedValue(meta, value) {
            switch (meta.type) {
            case 'float':
                return parseFloat(value);
            case 'int':
                return parseInt(value);
            case 'string':
                return value + '';
            }
        }
        function buildLabel(label) {
            return '<label class="famous-ui__config-panel__group-label">' + label + '</label>';
        }
        function buildField(group, field) {
            if (field.range) {
                if (field.type === 'int') {
                    return '\n                <input class="famous-ui__config-panel__control"\n                    type="number"\n                    value="' + field.value + '"\n                    data-group="' + group.label + '"\n                    data-field="' + field.name + '"\n                    data-key="' + field.key + '"\n                    data-type="int"\n                    data-uid="' + field.uid + '">\n                <label class="famous-ui__config-panel__control-label">' + field.name + '</label>\n            ';
                } else {
                    return '\n                <input class="famous-ui__config-panel__control"\n                    type="range"\n                    min="' + field.range[0] + '"\n                    max="' + field.range[1] + '"\n                    step="' + (field.step || '1') + '"\n                    value="' + field.value + '"\n                    data-group="' + group.label + '"\n                    data-field="' + field.name + '"\n                    data-key="' + field.key + '"\n                    data-type="float"\n                    data-uid="' + field.uid + '">\n                <label class="famous-ui__config-panel__control-label">' + field.name + '</label>\n            ';
                }
            } else {
                return '\n            <input class="famous-ui__config-panel__control"\n                type="text"\n                value="' + field.value + '"\n                data-group="' + group.label + '"\n                data-field="' + field.name + '"\n                data-key="' + field.key + '"\n                data-type="string"\n                data-uid="' + field.uid + '">\n            <label class="famous-ui__config-panel__control-label">' + field.name + '</label>\n        ';
            }
        }
        function buildStyle(gutterSize, panelWidth) {
            return '\n        <style type="text/css">\n            .famous-ui__config-panel__group {\n                margin-bottom: ' + gutterSize + 'px;\n            }\n\n            .famous-ui__config-panel__group-label {\n                display: block;\n                font-family: \'Helvetica Neue\', Helvetica, sans-serif;\n                font-weight: 200;\n                overflow: hidden;\n                padding-bottom: 5px;\n                margin-bottom: 10px;\n                text-decoration: underline;\n                text-overflow: ellipsis;\n                text-transform: uppercase;\n                white-space: nowrap;\n                width: ' + (panelWidth - gutterSize * 2) + 'px;\n            }\n\n            .famous-ui__config-panel__control-label {\n                display: block;\n                font-family: \'Helvetica Neue\', Helvetica, sans-serif;\n                font-size: 0.8em;\n                font-weight: 200;\n                margin-bottom: 12px;\n                margin-top: 2px;\n            }\n\n            .famous-ui__config-panel__control {\n                box-sizing: border-box;\n                display: block;\n                outline: none;\n                width: ' + (panelWidth - gutterSize * 2) + 'px;\n            }\n        </style>\n    ';
        }
        FamousFramework.component('famous:ui:config-panel', 'HEAD', {
            'dependencies': {
                'famous:events': 'HEAD',
                'famous:core:node': 'HEAD'
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
                '#panel-container': {
                    'position': function (offsetPosition) {
                        return offsetPosition;
                    }
                },
                '#panel': {
                    'opacity': function (panelOpenness, panelFullOpacity, isPanelHovered) {
                        return panelFullOpacity * panelOpenness;
                    },
                    'position': function (panelOpenness, panelWidth) {
                        return [
                            -panelWidth + panelWidth * panelOpenness,
                            0
                        ];
                    },
                    'style': {
                        'background-color': 'black',
                        'overflow-y': 'scroll',
                        'overflow-x': 'hidden',
                        'z-index': 2
                    },
                    'size': function (panelWidth) {
                        return [
                            panelWidth,
                            undefined
                        ];
                    }
                },
                '#gradient': {
                    'position': function (panelOpenness, panelWidth) {
                        return [
                            -panelWidth + panelWidth * panelOpenness,
                            0
                        ];
                    },
                    'size': function (panelWidth, gutterSize, buttonSize) {
                        return [
                            panelWidth,
                            buttonSize * 1.5 + gutterSize * 2
                        ];
                    },
                    'style': {
                        'z-index': 3,
                        'background': 'linear-gradient(to bottom, rgba(0, 0, 0, 1),  rgba(0, 0, 0, 0))'
                    }
                },
                '#panel-content': {
                    'position-y': function (buttonSize, gutterSize) {
                        return buttonSize + gutterSize * 2;
                    },
                    'style': function (gutterSize) {
                        return {
                            'color': 'white',
                            'padding-left': gutterSize + 'px',
                            'padding-right': gutterSize + 'px'
                        };
                    },
                    'size': [
                        undefined,
                        undefined
                    ],
                    'content': function (statesData, gutterSize, panelWidth) {
                        var out = buildStyle(gutterSize, panelWidth);
                        if (statesData.groups) {
                            for (var i = 0; i < statesData.groups.length; i++) {
                                var group = statesData.groups[i];
                                out = out.concat('<div class="famous-ui__config-panel__group">');
                                out = out.concat(buildLabel(group.label));
                                for (var j = 0; j < group.fields.length; j++) {
                                    out = out.concat(buildField(group, group.fields[j]));
                                }
                                out = out.concat('</div>');
                            }
                        }
                        return out;
                    }
                },
                '#toggle-button': {
                    'origin': [
                        0.5,
                        0.5
                    ],
                    'rotation-z': function (buttonRotation) {
                        return buttonRotation;
                    },
                    'opacity': function (panelOpenness) {
                        return 0.5 + panelOpenness / 2;
                    },
                    'position-y': function (gutterSize) {
                        return gutterSize;
                    },
                    'position-x': function (gutterSize) {
                        return gutterSize;
                    },
                    'size-absolute': function (buttonSize) {
                        return [
                            buttonSize,
                            buttonSize
                        ];
                    },
                    'style': {
                        'z-index': 4,
                        'cursor': 'pointer'
                    },
                    'unselectable': true
                }
            },
            events: {
                '$public': {
                    'open': function ($state) {
                        $state.set('isOpen', true);
                        $state.set('buttonRotation', $state.get('buttonOpenRotation'), {
                            duration: $state.get('openCloseDuration'),
                            curve: $state.get('openCloseCurve')
                        });
                        $state.set('panelOpenness', 1, {
                            duration: $state.get('openCloseDuration'),
                            curve: $state.get('openCloseCurve')
                        });
                    },
                    'close': function ($state) {
                        $state.set('isOpen', false);
                        $state.set('buttonRotation', $state.get('buttonRotation') + Math.PI * 2);
                        $state.set('buttonRotation', $state.get('buttonClosedRotation'), {
                            duration: $state.get('openCloseDuration'),
                            curve: $state.get('openCloseCurve')
                        });
                        $state.set('panelOpenness', 0, {
                            duration: $state.get('openCloseDuration'),
                            curve: $state.get('openCloseCurve')
                        });
                    }
                },
                '#toggle-button': {
                    'famous:events:click': function ($state, $dispatcher) {
                        if ($state.get('isOpen')) {
                            $dispatcher.trigger('close');
                        } else {
                            $dispatcher.trigger('open');
                        }
                    }
                },
                '#panel-content': {
                    'famous:events:input': function ($event, $dispatcher) {
                        var out = {};
                        var target = $event.target;
                        if (target) {
                            out.field = target.getAttribute('data-field');
                            out.key = target.getAttribute('data-key');
                            out.group = target.getAttribute('data-group');
                            out.type = target.getAttribute('data-type');
                            out.uid = target.getAttribute('data-uid');
                        }
                        out.value = getFormattedValue(out, $event.value);
                        $dispatcher.publish('$states-configured', out);
                    }
                },
                '$lifecycle': {
                    'post-load': function ($state, $dispatcher) {
                        var statesData = $state.get('statesData');
                        if (!statesData.groups) {
                            statesData.groups = [];
                        }
                        $dispatcher.subscribe('$states-exposed', function (key, payload) {
                            for (var i = 0; i < payload.fields.length; i++) {
                                payload.fields[i].uid = payload.uid;
                            }
                            statesData.groups.push({
                                uid: payload.uid,
                                label: payload.name,
                                fields: payload.fields
                            });
                            $state.set('statesData', statesData);
                        });
                    }
                }
            },
            states: {
                buttonClosedRotation: 0,
                buttonOpenRotation: Math.PI / 4,
                buttonRotation: 0,
                buttonSize: 40,
                gutterSize: 20,
                statesData: {},
                isOpen: false,
                openCloseCurve: 'inOutBack',
                openCloseDuration: 1000,
                offsetPosition: [
                    0,
                    0
                ],
                panelFullOpacity: 0.8,
                panelOpenness: 0,
                panelWidth: 300
            },
            tree: '<famous:core:node id="panel-container">\n            <famous:core:node id="gradient"></famous:core:node>\n            <famous:core:node id="toggle-button">\n                <img src="famous/ui/config-panel/assets/plus.svg" style="width: 100%; height: 100%;">\n            </famous:core:node>\n            <famous:core:node id="panel">\n                <famous:core:node id="panel-content"></famous:core:node>\n            </famous:core:node>\n        </famous:core:node>\n    '
        });
    }());
    FamousFramework.markComponentAsReady("famous:ui:config-panel", "HEAD");
});