"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-new */
const tsd_1 = require("tsd");
const source_1 = require("../source");
const conf = new source_1.default({ accessPropertiesByDotNotation: true });
new source_1.default({
    defaults: {
        foo: 'bar',
        unicorn: false
    }
});
new source_1.default({ configName: '' });
new source_1.default({ projectName: 'foo' });
new source_1.default({ cwd: '' });
new source_1.default({ encryptionKey: '' });
new source_1.default({ encryptionKey: Buffer.from('') });
new source_1.default({ encryptionKey: new Uint8Array([1]) });
new source_1.default({ encryptionKey: new DataView(new ArrayBuffer(2)) });
new source_1.default({ fileExtension: '.foo' });
new source_1.default({ clearInvalidConfig: false });
new source_1.default({ serialize: () => 'foo' });
new source_1.default({ deserialize: () => ({ foo: 'foo', unicorn: true }) });
new source_1.default({ projectSuffix: 'foo' });
new source_1.default({ watch: true });
new source_1.default({
    schema: {
        foo: {
            type: 'string',
            default: 'foobar'
        },
        unicorn: {
            type: 'boolean'
        },
        hello: {
            type: 'number'
        },
        nested: {
            type: 'object',
            properties: {
                prop: {
                    type: 'number'
                }
            }
        }
    }
});
conf.set('hello', 1);
conf.set('unicorn', false);
conf.set({ foo: 'nope' });
conf.set('nested.prop', 3);
conf.set({
    nested: {
        prop: 3
    }
});
tsd_1.expectType(conf.get('foo'));
tsd_1.expectType(conf.get('foo', 'bar'));
conf.delete('foo');
tsd_1.expectType(conf.has('foo'));
conf.clear();
const off = conf.onDidChange('foo', (oldValue, newValue) => {
    tsd_1.expectAssignable(oldValue);
    tsd_1.expectAssignable(newValue);
});
tsd_1.expectType(off);
off();
conf.store = {
    foo: 'bar',
    unicorn: false
};
tsd_1.expectType(conf.path);
tsd_1.expectType(conf.size);
tsd_1.expectType(conf[Symbol.iterator]());
for (const [key, value] of conf) {
    tsd_1.expectType(key);
    tsd_1.expectType(value);
}
const config = new source_1.default({
    defaults: {
        isRainbow: true
    }
});
config.get('isRainbow');
//=> true
tsd_1.expectType(conf.get('foo', 'bar'));
config.set('unicorn', '🦄');
console.log(config.get('unicorn'));
//=> '🦄'
config.delete('unicorn');
console.log(config.get('unicorn'));
//=> undefined
// Should be stored type or default
tsd_1.expectType(config.get('isRainbow'));
tsd_1.expectType(config.get('isRainbow', false));
tsd_1.expectType(config.get('unicorn'));
tsd_1.expectType(config.get('unicorn', 'rainbow'));
// @ts-expect-error
tsd_1.expectError(config.get('unicorn', 1));
// --
// -- Migrations --
new source_1.default({
    migrations: {
        '0.0.1': store => {
            store.set('debug phase', true);
        },
        '1.0.0': store => {
            store.delete('debug phase');
            store.set('phase', '1.0');
        },
        '1.0.2': store => {
            store.set('phase', '>1.0');
        }
    }
});
// --
