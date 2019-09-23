import { ProducerRoutingModule } from './producer-routing.module';

describe('ProducerRoutingModule', () => {
  let producerRoutingModule: ProducerRoutingModule;

  beforeEach(() => {
    producerRoutingModule = new ProducerRoutingModule();
  });

  it('should create an instance', () => {
    expect(producerRoutingModule).toBeTruthy();
  });
});
