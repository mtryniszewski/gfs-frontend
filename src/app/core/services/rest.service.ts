import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  private endcodeHeader = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  get<T1>(
    endpoint: string
  ): Observable<T1> {
    return this.http.get<T1>(`${environment.api}${endpoint}`);
  }

  getBlob(
    endpoint: string
  ): Observable<Blob> {
    return this.http.get(`${environment.api}${endpoint}`, {
      responseType: 'blob'
    });
  }

  post<T1, T2>(
    endpoint: string,
    params: T1,
    encodeParams = false
  ): Observable<T2> {
    return this.http.post<T2>(
      `${environment.api}${endpoint}`,
      encodeParams ? this.encodeParams<T1>(params) : params,
      encodeParams ? { headers: this.endcodeHeader } : {}
    );
  }

  delete<T1>(
    endpoint: string,
  ): Observable<T1> {
    return this.http.delete<T1>(`${environment.api}${endpoint}`);
  }

  put<T1, T2>(
    endpoint: string,
    params: T1,
    encodeParams: boolean
  ): Observable<T2> {
    return this.http.put<T2>(
      `${environment.api}${endpoint}`,
      encodeParams ? this.encodeParams<T1>(params) : params,
      encodeParams ? { headers: this.endcodeHeader } : {}
    );
  }

  patch<T1, T2>(
    endpoint: string,
    params: T1,
    encodeParams: boolean
  ): Observable<T2> {
    return this.http.patch<T2>(
      `${environment.api}${endpoint}`,
      encodeParams ? this.encodeParams<T1>(params) : params,
      encodeParams ? { headers: this.endcodeHeader } : {}
    );
  }

  private encodeParams<T1>(params) {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
}
