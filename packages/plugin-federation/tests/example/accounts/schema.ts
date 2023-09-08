import SchemaBuilder from '@pothos/core';
import DirectivesPlugin from '@pothos/plugin-directives';
import FederationPlugin from '../../../src';

const builder = new SchemaBuilder<{
  DefaultFieldNullability: true;
}>({
  plugins: [DirectivesPlugin, FederationPlugin],
  directives: {
    useGraphQLToolsUnorderedDirectives: true,
  },
  defaultFieldNullability: true,
});

interface User {
  id: string;
  name: string;
  birthDate: string;
  username: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    birthDate: '1815-12-10',
    username: '@ada',
  },
  {
    id: '2',
    name: 'Alan Turing',
    birthDate: '1912-06-23',
    username: '@complete',
  },
];

const UserType = builder.objectRef<User>('User').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    username: t.exposeString('username', {
      shareable: true,
    }),
  }),
});

builder.asEntity(UserType, {
  key: builder.selection<{ id: string }>('id'),
  resolveReference: (user) => users.find(({ id }) => user.id === id),
});

builder.queryType({
  fields: (t) => ({
    me: t.field({
      type: UserType,
      resolve: () => users[0],
    }),
  }),
});

const Media = builder.objectRef<{ id: string }>('Media').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    test: t.string({
      resolve: (media) => 'test field from interfaceObject',
    }),
  }),
});

builder.asEntity(Media, {
  interfaceObject: true,
  key: builder.selection<{ id: string }>('id'),
  resolveReference: (ref) => ref,
});

export const schema = builder.toSubGraphSchema({});
