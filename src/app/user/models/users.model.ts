import { ListBasic } from '../../shared/models/list-basic.model';
import { User } from './user.model';

export class Users extends ListBasic {
    items: User[];
  }
