import { FabricModule } from './fabric.module';

describe('FabricModule', () => {
  let fabricModule: FabricModule;

  beforeEach(() => {
    fabricModule = new FabricModule();
  });

  it('should create an instance', () => {
    expect(fabricModule).toBeTruthy();
  });
});
