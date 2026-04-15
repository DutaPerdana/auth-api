import ClientError from '../ClientError.js';
import { describe, it, expect } from 'vitest';
 
describe('ClientError', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class');
  });
});