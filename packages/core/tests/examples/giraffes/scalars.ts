import { DateResolver } from 'graphql-scalars';
import builder from './builder';

builder.addScalarType('Date', DateResolver, {});

builder.scalarType('PositiveInt', {
  serialize: (n) => n,
  parseValue: (n) => {
    if (typeof n !== 'number') {
      throw new TypeError('Value must be a number');
    }

    if (n >= 0) {
      return n;
    }

    throw new TypeError('Value must be positive');
  },
});

builder.queryFields((t) => ({
  date: t.field({
    type: 'Date',
    resolve: () => new Date(Date.UTC(2012, 11, 12)),
  }),

  positive: t.field({
    type: 'PositiveInt',
    resolve: () => 5,
  }),
}));
