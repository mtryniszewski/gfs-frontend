import { FurnitureDetails } from './furniture.model';
import { User } from './../../user/models/user.model';
export class OrderBasic {
    id: number;
    date: string;
    userId: string;
    isConfirmed: boolean;
    isArchival: boolean;
    user: User;
}

export class Order extends OrderBasic {
    description: string;
}

export class OrderDetails extends Order {
    furnituresDetailsDtos: FurnitureDetails[];
}

