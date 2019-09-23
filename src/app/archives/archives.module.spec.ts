import { ArchivesModule } from './archives.module';

describe('ArchivesModule', () => {
  let archivesModule: ArchivesModule;

  beforeEach(() => {
    archivesModule = new ArchivesModule();
  });

  it('should create an instance', () => {
    expect(archivesModule).toBeTruthy();
  });
});
