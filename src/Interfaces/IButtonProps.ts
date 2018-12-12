import {
  ReactNode,
} from 'react';

export interface IButtonProps {
  children: ReactNode;
  func: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default IButtonProps;
