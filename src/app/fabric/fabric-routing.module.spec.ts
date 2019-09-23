import { FabricRoutingModule } from './fabric-routing.module';

describe('FabricRoutingModule', () => {
  let fabricRoutingModule: FabricRoutingModule;

  beforeEach(() => {
    fabricRoutingModule = new FabricRoutingModule();
  });

  it('should create an instance', () => {
    expect(fabricRoutingModule).toBeTruthy();
  });
});
