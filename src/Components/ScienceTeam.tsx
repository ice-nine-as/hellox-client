import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/Collaborators.less';
const _styles = styles || {};

export const collaborators = Object.freeze([
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

export class ScienceTeam extends React.PureComponent {
  render() {
    return (
      <div className={_styles.Collaborators}>
        {collaborators.map((member) => {
          return (
            <div
              className={_styles.Collaborator}
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

export default ScienceTeam;