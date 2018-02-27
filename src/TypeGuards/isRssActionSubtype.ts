import {
  RssActionSubtypes,
} from '../Enums/RssActionSubtypes';

export const isRssActionSubtype = (maybe: any): maybe is RssActionSubtypes => {
  return (Object as any).values(RssActionSubtypes).indexOf(maybe) !== -1;
};

export default isRssActionSubtype;