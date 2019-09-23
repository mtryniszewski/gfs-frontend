import { HttpErrorResponse } from '@angular/common/http';

import { ResultDto } from '../../shared/models/request-dto.model';

export function parseErrorResponse(response: HttpErrorResponse): ResultDto<object> {
  return response.error as ResultDto<object>;
}
