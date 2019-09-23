export class ProducerRequest {
    id: number;
}

export class NewProducerRequest {
    name: string;
    city: string;
    street: string;
    email: string;
    phoneNumber: string;
}

export class EditProducerRequest {
    id: number;
    name: string;
    city: string;
    street: string;
    email: string;
    phoneNumber: string;
}
