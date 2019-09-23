import { UserRoutingModule } from './user-routing.module';

describe('UserRoutingModule', () => {
  let userRoutingModule: UserRoutingModule;

  beforeEach(() => {
    userRoutingModule = new UserRoutingModule();
  });

  it('should create an instance', () => {
    expect(userRoutingModule).toBeTruthy();
  });
});
