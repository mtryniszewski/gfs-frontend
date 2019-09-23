import { DrawerConfiguration } from './../../core/enums/drawer-configuration.enum';
import { DrawerType } from './../../core/enums/drawer-type.enum';
import { FurnitureType } from './../../core/enums/furniture-type.enum';

export class FabricIds {
    corpusFabricId: number;
    frontFabricId: number;
    backFabricId: number;
}

export class FurnitureInfos {
    orderId: number;
    furnitureType: FurnitureType;
    name: string;
    count: number;
    drawerConfiguration: DrawerConfiguration;
    drawerType: DrawerType;
}

export class Dimensions {
    height: number;
    width: number;
    depth: number;
    shelfCount: number;
    frontCount: number;
    frameThickness: number;
    width1: number;
    width2: number;
    depth1: number;
    depth2: number;
    bottomFrontHeight: number;
    topFrontHeight: number;
    frontWidth: number;
}
// export class BasicFurnitureData {
//     name: string;
//     orderId: number;
//     furnitureType: FurnitureType;
//     count: number;

//     corpusFabricId: number;
//     frontFabricId: number;
//     backFabricId: number;

//     height: number;
//     width: number;
//     depth: number;

//     shelfCount: number;
//     frontCount: number;

// }
// export class WithGlass extends BasicFurnitureData {
//     frameThickness: number;
// }

// export class WithDrawers extends BasicFurnitureData {
//     drawerType: DrawerType;
//     drawerConfiguration: DrawerConfiguration;
// }

// export class CutFinalBottom extends BasicFurnitureData {
//     depth2: number;
// }

// export class LCornerBottom extends BasicFurnitureData {
//     width2: number;
// }

// export class PentagonCorner extends BasicFurnitureData {
//     width2: number;
//     depth2: number;
// }

// export class TwoPartsHigh extends BasicFurnitureData {
//     bottomFrontHeight: number;
// }

// export class ThreePartsHigh extends TwoPartsHigh {
//     topFrontHeight: number;
// }

export class EveryFurniture {
    name: string;
    orderId: number;
    furnitureType: FurnitureType;

    corpusFabricId: number;
    frontFabricId: number;
    backFabricId: number;

    height: number;
    width: number;
    depth: number;

    shelfCount: number;
    frontCount: number;

    frameThickness: number;

    drawerType: DrawerType;
    drawerConfiguration: DrawerConfiguration;

    width1: number;
    width2: number;

    depth1: number;
    depth2: number;

    bottomFrontHeight: number;
    topFrontHeight: number;

    frontWidth: number;

    clear() {
        this.name = '';
        this.orderId = 0;
        this.furnitureType = null;

        this.corpusFabricId = 0;
        this.frontFabricId = 0;
        this.backFabricId = 0;

        this.height = 0;
        this.width = 0;
        this.depth = 0;

        this.shelfCount = 0;
        this.frontCount = 0;

        this.frameThickness = 0;

        this.drawerType = null;
        this.drawerConfiguration = null;

        this.width1 = 0;
        this.width2 = 0;

        this.depth1 = 0;
        this.depth2 = 0;

        this.bottomFrontHeight = 0;
        this.topFrontHeight = 0;

        this.frontWidth = 0;
    }
}
