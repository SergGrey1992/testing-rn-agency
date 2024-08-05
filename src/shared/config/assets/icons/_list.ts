import done from './Done.svg';
import arrowRight from './Arrow Right.svg';
import close from './Close.svg';
import remove from './Delete.svg';
import edit from './Edit.svg';
import add from './add-line.svg';

export const list = {
  done,
  arrowRight,
  close,
  remove,
  edit,
  add,
};

export type IconName = keyof typeof list;
