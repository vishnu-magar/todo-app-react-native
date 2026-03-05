/**
 * @format
 */

import { generateId } from '../src/utils/uuid';

it('should generate a non-empty string id',()=>{
  const id = generateId();
  expect(typeof id).toBe('string');
  expect(id.length).toBeGreaterThan(0);
})


