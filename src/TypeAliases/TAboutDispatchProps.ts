import {
  IRssAction,
} from '../Actions/App/IRssAction';

export type TAboutDispatchProps = {
  getTeamMembersFeed(): Promise<IRssAction>;
};

export default TAboutDispatchProps;