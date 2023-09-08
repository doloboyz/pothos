// @ts-nocheck
import { outputShapeKey, parentShapeKey, SchemaTypes } from '../types/index.ts';
import BaseTypeRef from './base.ts';
export default class OutputTypeRef<Types extends SchemaTypes, T, P = T> extends BaseTypeRef<Types> {
    override kind;
    [outputShapeKey]!: T;
    [parentShapeKey]!: P;
    constructor(kind: "Enum" | "Interface" | "Object" | "Scalar" | "Union", name: string) {
        super(kind, name);
        this.kind = kind;
    }
}
