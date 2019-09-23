import { Order } from './order.model';
import { ListBasic } from '../../shared/models/list-basic.model';

export class Orders extends ListBasic {
    items: Order[];
}
