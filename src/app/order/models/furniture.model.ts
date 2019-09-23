import { FurnitureType } from './../../core/enums/furniture-type.enum';
import { LFormatter, PentagonFormatter, RectangularFormatter, TriangularFormatter } from './formatters.model';
export class Furniture {
    id: number;
    name: string;
    furnitureType: FurnitureType;
    orderId: number;
    collapsed = true;
}

export class FurnitureDetails extends Furniture {
    lFormatterDtos: LFormatter[];
    pentagonFormatterDtos: PentagonFormatter[];
    rectangularFormatterDtos: RectangularFormatter[];
    triangularFormatterDtos: TriangularFormatter[];
}

export class FurnitureIdRequest {
    id: number;
}
