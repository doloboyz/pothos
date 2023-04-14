// @ts-nocheck
import './global-types.ts';
import SchemaBuilder, { BasePlugin, FieldMap, InterfaceFieldsShape, InterfaceParam, InterfaceRef, Normalize, ObjectFieldsShape, ObjectRef, ParentShape, SchemaTypes, } from '../core/index.ts';
import { OutputShapeFromFields } from './types.ts';
const pluginName = "simpleObjects" as const;
export default pluginName;
export class PothosSimpleObjectsPlugin<Types extends SchemaTypes> extends BasePlugin<Types> {
}
SchemaBuilder.registerPlugin(pluginName, PothosSimpleObjectsPlugin);
const proto: PothosSchemaTypes.SchemaBuilder<SchemaTypes> = SchemaBuilder.prototype as PothosSchemaTypes.SchemaBuilder<SchemaTypes>;
<<<<<<< HEAD
proto.simpleObject = function simpleObject<Interfaces extends InterfaceParam<SchemaTypes>[], Fields extends FieldMap, Shape extends Normalize<OutputShapeFromFields<Fields> & ParentShape<SchemaTypes, Interfaces[number]>>>(name: string, options: PothosSchemaTypes.SimpleObjectTypeOptions<SchemaTypes, Interfaces, Fields, Shape>, extraFields?: ObjectFieldsShape<SchemaTypes, Shape>) {
    const ref = new ObjectRef<Shape>(name);
=======
proto.simpleObject = function simpleObject<Interfaces extends InterfaceParam<SchemaTypes>[], Fields extends FieldMap, Shape extends Normalize<OutputShapeFromFields<Fields> & ParentShape<SchemaTypes, Interfaces[number]>>>(name: string, options: PothosSchemaTypes.SimpleObjectTypeOptions<SchemaTypes, Interfaces, Fields, Shape>) {
    const ref = new ObjectRef<SchemaTypes, Shape>(name);
<<<<<<< HEAD
>>>>>>> 6f53ee9c (Add builder and SchemaTypes to field and type refs)
    if (options.fields) {
        const originalFields = options.fields;
        // eslint-disable-next-line no-param-reassign
        options.fields = (t) => {
            const fields = originalFields(t);
            Object.keys(fields).forEach((key) => {
                this.configStore.onFieldUse(fields[key], (config) => {
                    if (config.kind === "Object") {
                        // eslint-disable-next-line no-param-reassign
                        config.resolve = (parent) => (parent as Record<string, unknown>)[key] as Readonly<unknown>;
                    }
                });
            });
            return fields;
        };
    }
=======
>>>>>>> 6d6a3d23 (Refactor refs so configs and fields are stored on refs)
    this.objectType(ref, options as PothosSchemaTypes.ObjectTypeOptions);
    if (extraFields) {
        this.objectFields(ref, extraFields);
    }
    return ref;
};
<<<<<<< HEAD
proto.simpleInterface = function simpleInterface<Fields extends FieldMap, Shape extends OutputShapeFromFields<Fields>, Interfaces extends InterfaceParam<SchemaTypes>[]>(name: string, options: PothosSchemaTypes.SimpleInterfaceTypeOptions<SchemaTypes, Fields, Shape, Interfaces>, extraFields?: InterfaceFieldsShape<SchemaTypes, Shape>) {
    const ref = new InterfaceRef<Shape>(name);
=======
proto.simpleInterface = function simpleInterface<Fields extends FieldMap, Shape extends OutputShapeFromFields<Fields>, Interfaces extends InterfaceParam<SchemaTypes>[]>(name: string, options: PothosSchemaTypes.SimpleInterfaceTypeOptions<SchemaTypes, Fields, Shape, Interfaces>) {
    const ref = new InterfaceRef<SchemaTypes, Shape>(name);
<<<<<<< HEAD
>>>>>>> 6f53ee9c (Add builder and SchemaTypes to field and type refs)
    if (options.fields) {
        const originalFields = options.fields;
        // eslint-disable-next-line no-param-reassign
        options.fields = (t) => {
            const fields = originalFields(t);
            Object.keys(fields).forEach((key) => {
                this.configStore.onFieldUse(fields[key], (config) => {
                    if (config.kind === "Interface") {
                        // eslint-disable-next-line no-param-reassign
                        config.resolve = (parent) => (parent as Record<string, unknown>)[key] as Readonly<unknown>;
                    }
                });
            });
            return fields;
        };
    }
=======
>>>>>>> 6d6a3d23 (Refactor refs so configs and fields are stored on refs)
    this.interfaceType(ref, options as {});
    if (extraFields) {
        this.interfaceFields(ref, extraFields);
    }
    return ref;
};
