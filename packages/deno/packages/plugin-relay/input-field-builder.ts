// @ts-nocheck
import { FieldRequiredness, InputFieldBuilder, InputFieldRef, InputShapeFromTypeParam, ObjectRef, SchemaTypes, } from '../core/index.ts';
import { GlobalIDInputFieldOptions, GlobalIDInputShape, GlobalIDListInputFieldOptions, } from './types.ts';
type DefaultSchemaTypes = PothosSchemaTypes.ExtendDefaultTypes<{}>;
const inputFieldBuilder = InputFieldBuilder.prototype as PothosSchemaTypes.InputFieldBuilder<DefaultSchemaTypes, "Arg" | "InputObject">;
inputFieldBuilder.globalIDList = function globalIDList<Req extends FieldRequiredness<[
    "ID"
]>>({ for: forTypes, ...options }: GlobalIDListInputFieldOptions<DefaultSchemaTypes, Req, "Arg" | "InputObject"> = {} as never) {
    return this.idList({
        ...options,
        extensions: {
            ...options.extensions,
            isRelayGlobalID: true,
            relayGlobalIDFor: ((forTypes &&
                (Array.isArray(forTypes) ? forTypes : [forTypes])) as ObjectRef<SchemaTypes>[])?.map((type: ObjectRef<SchemaTypes>) => ({
                typename: this.builder.configStore.getTypeConfig(type).name,
                parseId: "parseId" in type ? type.parseId : undefined,
            })) ?? null,
        },
    }) as never;
};
inputFieldBuilder.globalID = function globalID<Req extends boolean>({ for: forTypes, ...options }: GlobalIDInputFieldOptions<DefaultSchemaTypes, Req, "Arg" | "InputObject"> = {} as never) {
    return this.id({
        ...options,
        extensions: {
            ...options.extensions,
            isRelayGlobalID: true,
            relayGlobalIDFor: ((forTypes &&
                (Array.isArray(forTypes) ? forTypes : [forTypes])) as ObjectRef<SchemaTypes>[])?.map((type: ObjectRef<SchemaTypes>) => ({
                typename: this.builder.configStore.getTypeConfig(type).name,
                parseId: "parseId" in type ? type.parseId : undefined,
            })) ?? null,
        },
    }) as unknown as InputFieldRef<InputShapeFromTypeParam<DefaultSchemaTypes, GlobalIDInputShape, Req>> as never;
};
inputFieldBuilder.connectionArgs = function connectionArgs() {
    const { cursorType = "String", beforeArgOptions = {} as never, afterArgOptions = {} as never, firstArgOptions = {} as never, lastArgOptions = {} as never, } = this.builder.options.relay ?? {};
    return {
        before: this.field({ ...beforeArgOptions, type: cursorType, required: false }) as InputFieldRef<string | null>,
        after: this.field({ ...afterArgOptions, type: cursorType, required: false }) as InputFieldRef<string | null>,
        first: this.int({ ...firstArgOptions, required: false }),
        last: this.int({ ...lastArgOptions, required: false }),
    };
};
