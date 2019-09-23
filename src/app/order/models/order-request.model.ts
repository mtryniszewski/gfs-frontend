export class OrderRequest {
    id: number;
}


export class NewOrderRequest {
    description: string;
    userId: string;
}

export class EditOrderRequest {
    description: string;
    id: number;
}
