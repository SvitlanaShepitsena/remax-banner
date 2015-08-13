'use strict';

FamousFramework.component('famous:layouts:sequential', {
    behaviors: {
        '$self': {
            'direction': '[[identity]]',
            'transition': '[[identity]]'
        },
        '.sequential-layout': {
            // HACK: force creating a layout wrapper container
            'style': {}
        },
        '.sequential-layout-item': {
            '$yield': true
        }
    },
    events: {
        '$public': {
            'direction': '[[setter]]',
            'transition': '[[setter]]',
            'update-layout': function ($famousNode) {
                $famousNode.updateLayout();
            }
        },
        '$private': {
            'direction': function ($famousNode, $payload) {
                if ($payload === 0) {
                    $famousNode.direction = SequentialLayout.Direction.X;
                } else if ($payload === 1) {
                    $famousNode.direction = SequentialLayout.Direction.Y;
                } else if ($payload === 2) {
                    $famousNode.direction = SequentialLayout.Direction.Z;
                }
            },
            'transition': function ($famousNode, $payload) {
                $famousNode.transition = $payload;
            }
        }
    },
    states: {
        direction: 0,
        transition: null
    },
    tree: '\n        <node class="sequential-layout">\n            <node class="sequential-layout-item"></node>\n        </node>\n    '
}).config({
    famousNodeConstructorName: 'SequentialLayout',
    includes: ['_constructor.js']
});