import {
  calculateIncompleteTime,
} from './utils';

describe('calculateIncompleteTime', () => {
  it('Should return 0 if there are no tasks', async () => {
    const res = calculateIncompleteTime([]);
    expect(res).toEqual(0);
  });
});
