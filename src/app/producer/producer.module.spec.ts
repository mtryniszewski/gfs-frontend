import { ProducerModule } from './producer.module';

describe('ProducerModule', () => {
  let producerModule: ProducerModule;

  beforeEach(() => {
    producerModule = new ProducerModule();
  });

  it('should create an instance', () => {
    expect(producerModule).toBeTruthy();
  });
});
