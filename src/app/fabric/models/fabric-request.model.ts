export class FabricRequest {
    id: number;
}

export class NewFabricRequest {
    name: string;
    thickness: number;
    producerCode: string;
    imageUrl: string;
    producerId: number;
}

export class EditFabricRequest {
    id: number;
    name: string;
    thickness: number;
    producerCode: string;
    imageUrl: string;
    producerId: number;

}
