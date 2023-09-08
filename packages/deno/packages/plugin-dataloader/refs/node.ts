// @ts-nocheck
import { GraphQLResolveInfo } from 'https://cdn.skypack.dev/graphql?dts';
import { completeValue, FieldRef, InterfaceRef, PothosObjectTypeConfig, SchemaTypes, } from '../../core/index.ts';
import { DataLoaderOptions, LoadableNodeId } from '../types.ts';
import { ImplementableLoadableObjectRef } from './object.ts';
export class ImplementableLoadableNodeRef<Types extends SchemaTypes, RefShape, Shape extends object, IDShape extends bigint | number | string = string, Key extends bigint | number | string = IDShape, CacheKey = Key> extends ImplementableLoadableObjectRef<Types, RefShape, Shape, Key, CacheKey> {
    parseId: ((id: string, ctx: object) => IDShape) | undefined;
    private idOptions;
    constructor(builder: PothosSchemaTypes.SchemaBuilder<Types>, name: string, { id, ...options }: DataLoaderOptions<Types, Shape, Key, CacheKey> & LoadableNodeId<Types, Shape, IDShape>) {
        super(builder, name, options);
        this.idOptions = id;
        this.parseId = id.parse;
        this.builder.configStore.onTypeConfig(this, (config) => {
            const nodeInterface = (this.builder as PothosSchemaTypes.SchemaBuilder<Types> & {
                nodeInterfaceRef: () => InterfaceRef<Types, unknown>;
            }).nodeInterfaceRef();
            // eslint-disable-next-line no-param-reassign
            (config.pothosOptions as {
                loadManyWithoutCache: unknown;
            }).loadManyWithoutCache = (ids: Key[], context: SchemaTypes["Context"]) => this.getDataloader(context).loadMany(ids);
            const { interfaces } = config as PothosObjectTypeConfig;
            if (!interfaces.includes(nodeInterface)) {
                interfaces.push(nodeInterface);
            }
            this.builder.objectField(this, (this.builder.options as {
                relayOptions?: {
                    idFieldName?: string;
                };
            }).relayOptions
                ?.idFieldName ?? "id", (t) => (t as unknown as {
                globalID: (options: Record<string, unknown>) => FieldRef<Types, unknown>;
            }).globalID({
                ...(this.builder.options as {
                    relayOptions?: {
                        idFieldOptions?: {};
                    };
                }).relayOptions
                    ?.idFieldOptions,
                ...this.idOptions,
                nullable: false,
                args: {},
                resolve: (parent: Shape, args: object, context: object, info: GraphQLResolveInfo) => completeValue(this.idOptions.resolve(parent, args, context, info), (globalId) => ({
                    type: config.name,
                    id: globalId,
                })),
            }));
        });
    }
}
