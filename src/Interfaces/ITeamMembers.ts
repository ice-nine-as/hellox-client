import {
  ITeamMember,
} from './ITeamMember';

export interface ITeamMembers {
  creativeTeam?: ReadonlyArray<ITeamMember>,
  ice9?:         ReadonlyArray<ITeamMember>,
  scienceTeam?:  ReadonlyArray<ITeamMember>,
}

export default ITeamMembers;