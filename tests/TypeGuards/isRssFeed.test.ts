import {
  isRssFeed,
} from '../../src/TypeGuards/isRssFeed';

describe('isRssFeed unit tests.', () => {
  it('Rejects if the argument is not of type object.', () => {
    expect(isRssFeed(false)).toBe(false);
  });

  it('Rejects if the argument is null.', () => {
    expect(isRssFeed(null)).toBe(false);
  });

  it('Rejects if the argument\'s rss property is not \'rss\'.', () => {
    expect(isRssFeed({ type: 'foobar', })).toBe(false);
  });

  it('Rejects if the argument\'s title property is not of type string.', () => {
    expect(isRssFeed({ type: 'rss', title: null, })).toBe(false);
  });

  it('Rejects if the argument\'s title property is an empty string.', () => {
    expect(isRssFeed({ type: 'rss', title: '', })).toBe(false);
  });
  
  it('Rejects if the argument\'s items property is not an array.', () => {
    expect(isRssFeed({ type: 'rss', title: 'foo', items: null, })).toBe(false);
  });

  it('Passes if none of the above rejections occur.', () => {
    const rssFeed = {
      type: 'rss',
      title: 'foobar',
      items: [],
    };

    expect(isRssFeed(rssFeed)).toBe(true);
  });
});