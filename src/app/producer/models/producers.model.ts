import { ListBasic } from './../../shared/models/list-basic.model';
import { Producer, SimpleProducer } from './producer.model';

export class Producers extends ListBasic {
    items: Producer[];
}
export class SimpleProducers extends ListBasic {
    items: SimpleProducer[];
}
