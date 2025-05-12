import { Injectable } from '@angular/core';
import { BaseService, PathParameters } from '../base.service';
import { Observable } from 'rxjs';
import { API_URLS } from '../utility/constants/api.urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    http: HttpClient) {
    super(http);
  }

  public fetchProfileData(urlSearchParams: Map<any, any>): Observable<any> {
    return super.get(API_URLS.FETCH_PROFILE, urlSearchParams);
  }

  public createRegisterUser(body: any): Observable<any> {
    return super.post(API_URLS.CREATE_REGISTER_USER, body);
  }

  public fetchProfileById(pathParams: PathParameters): Observable<any> {
    const url = this.createUrl(API_URLS.FETCH_PROFILE_BY_ID, pathParams);
    return super.get(url);
  }

  public updateProfile(body: any): Observable<any> {
    return super.put(API_URLS.UPDATE_PROFILE, body);
  }

  // public deleteProfileById(pathParams: PathParameters): Observable<any> {
  //   return super.deleteById(API_URLS.FETCH_PROFILE, pathParams);
  // }

  // public deleteProfileByObject(body: any): Observable<any> {
  //   return super.deleteByObject(API_URLS.FETCH_PROFILE, body);
  // }
}
