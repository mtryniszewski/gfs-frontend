import { OrderRoutingModule } from './order-routing.module';

describe('OrderRoutingModule', () => {
  let orderRoutingModule: OrderRoutingModule;

  beforeEach(() => {
    orderRoutingModule = new OrderRoutingModule();
  });

  it('should create an instance', () => {
    expect(orderRoutingModule).toBeTruthy();
  });
});
