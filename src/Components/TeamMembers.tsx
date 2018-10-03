import {
  ITeamMember,
} from '../Interfaces/ITeamMember';

import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/TeamMembers.less';
const styles = _styles || {};

export class TeamMembers extends React.PureComponent<{ members: ReadonlyArray<ITeamMember> }> {
  render() {
    const {
      members,
    } = this.props;

    let reactKey = 0;
    return (
      <div className={styles.TeamMembers}>
        {members.map((member) => {
          return (
            <div
              className={styles.TeamMember}
              key={reactKey += 1}
            >
              <strong className={styles.Name}>
                {
                  (member.email ?
                    <a href={`mailto:${member.email}`}>
                      {member.name}
                    </a> :
                    member.name) ||
                  'Name not provided'
                }
              </strong>

              {
                member.title ?
                  <p className={styles.Role}>
                    {member.title}
                  </p> :
                  null
              }

              {
                member.organization ?
                  <p className={styles.Company}>
                    {member.organization}
                  </p> :
                  null
              }

              {
                member.website ?
                  <p className={styles.Website}>
                    <a href={member.website.startsWith('http') ? member.website : 'http://' + member.website}>
                      {member.website}
                    </a>
                  </p> :
                  null
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default TeamMembers;