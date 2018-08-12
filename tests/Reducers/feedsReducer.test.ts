import {
  FeedKeys,
} from '../../src/Enums/FeedKeys';
import {
  feedsReducer,
} from '../../src/Reducers/feedsReducer';
import { feedReducer } from '../../src/Reducers/feedReducer';

describe('feedsReducer unit tests.', () => {
  it('Has an entry for FeedKeys.ForumTopics.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.ForumTopics in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.ForumTopics.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.ForumTopics in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.NewsFull.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.NewsFull in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.NewsTeasers.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.NewsTeasers in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.NewsTitles.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.NewsTitles in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.Podcast.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.Podcast in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.Quotes.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.Quotes in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateEnPartA.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateEnPartA in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateEnPartB.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateEnPartB in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateEnPartC.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateEnPartC in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateNoPartA.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateNoPartA in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateNoPartB.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateNoPartB in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateNoPartC.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateNoPartC in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateRuPartA.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateRuPartA in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateRuPartB.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateRuPartB in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.StoryTemplateRuPartC.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.StoryTemplateRuPartC in val).toBe(true);
  });
  
  it('Has an entry for FeedKeys.TeamMembers.', () => {
    // @ts-ignore
    const val = feedsReducer();
    expect(FeedKeys.TeamMembers in val).toBe(true);
  });
});