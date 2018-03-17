import {
  FeedKeys,
} from '../Enums/FeedKeys';

export const isFeedKey = (maybe: any): maybe is FeedKeys => {
  return (Object as any).values(FeedKeys).indexOf(maybe) !== -1;
};

export default isFeedKey;