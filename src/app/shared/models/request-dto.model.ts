import { ErrorCodes } from '../../core/enums/error-code.enum';

export class ResultDto<T> {
  error: {
    errorCode: ErrorCodes;
    message: string;
  };
  data: T;
}
