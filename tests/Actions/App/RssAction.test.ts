import {
  AppActionTypes,
} from '../../../src/Enums/AppActionTypes';
import {
  isAction,
} from '../../../src/TypeGuards/isAction';
import {
  isRssAction,
} from '../../../src/TypeGuards/isRssAction';
import {
  RssAction,
} from '../../../src/Actions/App/RssAction';

describe('RssAction unit tests.', () => {
  it('Has the correct type.', () => {
    expect(RssAction.type).toBe(AppActionTypes.Rss);
  });

  it('Defaults to a value of null.', () => {
    expect(RssAction.value).toBe(null);
  });

  it('Disallows changing of the type.', () => {
    const func = () => (<any>RssAction.type) = 'foo';
    expect(func).toThrow();
  });

  it('Disallows changing of the value.', () => {
    const func = () => (<any>RssAction.value) = 'foo';
    expect(func).toThrow();
  });
});

describe('DoneAppAction integration tests.', () => {
  it('Meets the isAction type guard.', () => {
    expect(isAction(RssAction)).toBe(true);
  });

  it('Meets the isAppAction type guard.', () => {
    expect(isRssAction(RssAction)).toBe(true);
  });
});