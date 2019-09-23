import { UserIdRequest, EditPasswordRequest } from './../models/user.model';
import { OrderRequest } from './../../order/models/order-request.model';
import { Page } from './../../shared/models/page.model';
import { Observable } from 'rxjs';
import { RestService } from './../../core/services/rest.service';
import { Injectable } from '@angular/core';
import { ResultDto } from '../../shared/models/request-dto.model';
import { Users } from '../models/users.model';
import { CurrentUserData, EditUserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private restService: RestService
  ) { }

  getUser(userId: string): Observable<ResultDto<CurrentUserData>> {
    return this.restService.get<ResultDto<CurrentUserData>>('/User/' + userId);
  }

  getUsers(pages: Page): Observable<ResultDto<Users>> {
    return this.restService.get<ResultDto<Users>>(
      `/User?page=${pages.page}&pageSize=${pages.pageSize}`
    );
  }
  getSearchUsers(pages: Page, searchBy: string): Observable<ResultDto<Users>> {
    return this.restService.get<ResultDto<Users>>(
      `/User?page=${pages.page}&pageSize=${pages.pageSize}&searchBy=${searchBy}`
    );
  }

  editUser(editUser: EditUserRequest): Observable<void> {
    return this.restService.put<EditUserRequest, void>('/User/' + editUser.id, editUser, false);
  }

  activateUser(activateUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/activate/' + activateUser.id, activateUser, false);
  }

  deactivateUser(deactivateUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/deactivate/' + deactivateUser.id, deactivateUser, false);
  }

  archiveUser(archiveUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/archive/' + archiveUser.id, archiveUser, false);
  }

  dearchiveUser(dearchiveUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/dearchive/' + dearchiveUser.id, dearchiveUser, false);
  }

  grantUser(grantUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/grant/' + grantUser.id, grantUser, false);
  }

  revokeUser(revokeUser: UserIdRequest): Observable<void> {
    return this.restService.patch<UserIdRequest, void>('/User/revoke/' + revokeUser.id, revokeUser, false);
  }
  changePassword(editPassword: EditPasswordRequest): Observable<void> {
    return this.restService.patch<EditPasswordRequest, void>('/User/changepassword', editPassword, false);
  }

  deleteAccount(deleteAccount: UserIdRequest): Observable<string> {
    return this.restService.delete<string>('/User/' + deleteAccount.id);
  }
}
