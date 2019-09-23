export class Page {
    page: number;
    pageSize: number;
  }
  export class PageWithIdRequest extends Page {
    userId: string;
  }

  export interface IChangePagination {
    pageIndex: number;
    pageSize: number;
  }

  export const DefaultPages: Page = {
    page: 0,
    pageSize: 1000
  };
