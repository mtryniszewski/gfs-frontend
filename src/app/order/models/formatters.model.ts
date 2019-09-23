import { Milling } from 'src/app/core/enums/milling.enum';


export class BasicFormatter {
    id: number;
    name: string;
    count: number;
    isMilling: boolean;
    milling?: Milling;
    cutterLength?: number;
    cutterWidth?: number;
    cutterDepth?: number;
    topSpace?: number;
    leftSpace?: number;
    thickness: number;
    furnitureId: number;
    fabricId: number;
}
export class RectangularFormatter extends BasicFormatter {
    width: number;
    length: number;

    isBottomBorder: boolean;
    isTopBorder: boolean;
    isRightBorder: boolean;
    isLeftBorder: boolean;

    bottomBorderThickness?: number;
    leftBorderThickness?: number;
    topBorderThickness?: number;
    rightBorderThickness?: number;

}
export class TriangularFormatter extends BasicFormatter {
    width: number;
    length: number;
    hypotenuseLength: number;

    isBottomBorder: boolean;
    isHypotenuseBorder: boolean;
    isLeftBorder: boolean;

    bottomBorderThickness?: number;
    hypotenuseBorderThickness?: number;
    leftBorderThickness?: number;
}

export class PentagonFormatter extends BasicFormatter {
    width1: number;
    width2: number;
    depth1: number;
    depth2: number;

    isBottomBorder: boolean;
    isHypotenuseBorder: boolean;
    isLeftBorder: boolean;
    isTopBorder: boolean;
    isRightBorder: boolean;

    bottomBorderThickness?: number;
    hypotenuseBorderThickness?: number;
    leftBorderThickness?: number;
    topBorderThickness?: number;
    rightBorderThickness?: number;
}
export class LFormatter extends BasicFormatter {
    width1: number;
    width2: number;
    depth1: number;
    depth2: number;
    indentation1: number;
    indentation2: number;

    isWidth1Border: boolean;
    isWidth2Border: boolean;
    isDepth1Border: boolean;
    isDepth2Border: boolean;
    isIndentation1Border: boolean;
    isIndentation2Border: boolean;

    width1BorderThickness?: number;
    width2BorderThickness?: number;
    depth1BorderThickness?: number;
    depth2BorderThickness?: number;
    indentation1BorderThickness?: number;
    indentation2BorderThickness?: number;

}
