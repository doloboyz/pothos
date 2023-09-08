// @ts-nocheck
/* eslint-disable max-classes-per-file */
import { InterfaceParam, ObjectTypeOptions, OutputRef, outputShapeKey, parentShapeKey, SchemaTypes, } from '../types/index.ts';
import BaseTypeRef from './base.ts';
export default class ObjectRef<Types extends SchemaTypes, T, P = T> extends BaseTypeRef<Types> implements OutputRef, PothosSchemaTypes.ObjectRef<Types, T, P> {
    override kind = "Object" as const;
    [outputShapeKey]!: T;
    [parentShapeKey]!: P;
    constructor(name: string) {
        super("Object", name);
    }
}
export class ImplementableObjectRef<Types extends SchemaTypes, Shape, Parent = Shape> extends ObjectRef<Types, Shape, Parent> {
    protected builder: PothosSchemaTypes.SchemaBuilder<Types>;
    constructor(builder: PothosSchemaTypes.SchemaBuilder<Types>, name: string) {
        super(name);
        this.builder = builder;
    }
    implement<Interfaces extends InterfaceParam<Types>[]>(options: Omit<ObjectTypeOptions<Types, ImplementableObjectRef<Types, Shape, Parent>, Parent, Interfaces>, "name">): PothosSchemaTypes.ObjectRef<Types, Shape, Parent> {
        return this.builder.objectType(this, options as ObjectTypeOptions<Types, ImplementableObjectRef<Types, Shape, Parent>, Parent, Interfaces>);
    }
}
