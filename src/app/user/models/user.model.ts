import { UserRole } from './../../core/enums/user-role.enum';
import { UserBasic } from '../../shared/models/user-basic.model';

export class User extends UserBasic {
    permissions: UserRole;
    isActive: boolean;
    isArchival: boolean;
}
export class CurrentUserData extends UserBasic {
    id: string;
    permissions: UserRole;
    isActive: boolean;
    isArchival: boolean;
    email: string;
}

export class EditUserRequest {
    id: string;
    name: string;
    surname: string;
}

export class UserIdRequest {
    id: string;
}
export class EditPasswordRequest {
    id: string;
    newPassword: string;
    oldPassword: string;
  }
