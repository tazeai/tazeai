import { describe, expect, it } from 'vitest';
import { Builder } from '.';
import { db, schemas } from '../index';

describe('Builder', () => {
  it('should paginate', async () => {
    const userBuilder = new Builder(db, schemas.user);
    const result = await userBuilder.paginate(1, {
      perPage: 10,
    });
    expect(result).toBeDefined();
  });
});
