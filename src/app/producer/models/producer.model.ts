export class ProducerBasic {
    id: number;
    name: string;
    city: string;
}

export class Producer extends ProducerBasic {
    street: string;
    email: string;
    phoneNumber: string;
    isArchival: boolean;
}
export class SimpleProducer {
    id: number;
    name: string;
}
