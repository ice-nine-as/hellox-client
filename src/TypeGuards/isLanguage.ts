import {
  Languages,
} from '../Enums/Languages';

export const isLanguage = (maybe: any): maybe is Languages => {
  return (Object as any).values(Languages).indexOf(maybe) !== -1;
};

export default isLanguage;