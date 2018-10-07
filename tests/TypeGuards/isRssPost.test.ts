import {
  isRssPost,
} from '../../src/TypeGuards/isRssPost';

describe('isRssPost unit tests.', () => {
  it('Rejects if the argument is not of type object.', () => {
    expect(isRssPost(false)).toBe(false);
  });

  it('Rejects if the argument is null.', () => {
    expect(isRssPost(null)).toBe(false);
  });

  it('Rejects if the argument\'s description property is not of type string.', () => {
    const post = {
      description: false,
      guid: 'foo',
      link: 'bar',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Rejects if the argument\'s description property is an empty string.', () => {
    const post = {
      description: '',
      guid: 'foo',
      link: 'bar',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Rejects if the argument\'s guid property is not of type string.', () => {
    const post = {
      description: 'foo',
      guid: null,
      link: 'bar',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Rejects if the argument\'s guid property is an empty string.', () => {
    const post = {
      description: 'foo',
      guid: '',
      link: 'bar',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Rejects if the argument\'s link property is not of type string.', () => {
    const post = {
      description: 'foo',
      guid: 'bar',
      link: null,
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Rejects if the argument\'s link property is an empty string.', () => {
    const post = {
      description: 'foo',
      guid: 'bar',
      link: '',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(false);
  });

  it('Passes if none of the above rejections occur.', () => {
    const post = {
      description: 'foo',
      guid: 'bar',
      link: 'link',
      pubDate: new Date(),
    };

    expect(isRssPost(post)).toBe(true);
  });
});