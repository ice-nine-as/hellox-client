import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/TeamMembers.less';
const _styles = styles || {};

export const teamMembers = Object.freeze([
  {
    name: 'Vincent Snyder',
    role: 'sometimes the text will be long',
    company: 'Company',
    email: 'vincent@ice-9.no',
  },

  {
    name: 'Vincent Snyder',
    role: 'and sometimes short',
    company: 'Company',
    email: 'vincent@ice-9.no',
  },

  {
    name: 'Vincent Snyder',
    role: 'Role',
    company: 'Company',
    email: 'vincent@ice-9.no',
  },

  {
    name: 'Vincent Snyder',
    role: 'Role',
    company: 'Company',
    email: 'vincent@ice-9.no',
  },
]);

let reactKey = 0;

export class TeamMembers extends React.PureComponent {
  render() {
    return (
      <div className={_styles.TeamMembers}>
        {teamMembers.map((member) => {
          return (
            <div
              className={_styles.TeamMember}
              key={reactKey += 1}
            >
              <strong className={_styles.Name}>
                {member.name}
              </strong>

              <p className={_styles.Role}>
                {member.role}
              </p>

              <p className={_styles.Company}>
                {member.company}
              </p>

              <p className={_styles.Email}>
                <a href={`mailto:${member.email}`}>
                  {member.email}
                </a>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TeamMembers;