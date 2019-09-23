import { ArchivesRoutingModule } from './archives-routing.module';

describe('ArchivesRoutingModule', () => {
  let archivesRoutingModule: ArchivesRoutingModule;

  beforeEach(() => {
    archivesRoutingModule = new ArchivesRoutingModule();
  });

  it('should create an instance', () => {
    expect(archivesRoutingModule).toBeTruthy();
  });
});
