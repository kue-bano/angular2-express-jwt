/**
 * Created by Kingsley on 6/23/2017.
 */

import {Injectable} from "@angular/core";
import {UserModel} from "../login/login.component";
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {Endpoints} from "../properties/endpoint.prop";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import {AuthHttp, JwtHelper, tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {StorageService} from "../storage/storage.service";


@Injectable()
export class AuthService {

  constructor(private authHttp:AuthHttp, private ss:StorageService) {}


    jwtHelper: JwtHelper = new JwtHelper();

  headers = new Headers({
    'Content-Type': 'application/json',
  }); // ... Set content type to JSON
  options = new RequestOptions({headers: this.headers});

  authenticate(user:UserModel):Observable<any> {
    let body = JSON.stringify(user)

    //noinspection TypeScriptValidateTypes
    return this.authHttp.post(Endpoints.AUTHENTICATE, body, this.options)
      .timeout(50000)
      .map((response:Response) => {
        let res = response.json();

        if(res.success == true) {
          this.ss.saveToken(res.token);
          return true;
        }else {
          return false;
        }

      })
      .catch((e) => {
        return Observable.throw(
          new Error(`${e.status}`)
        )
      });
  }

  posts():Observable<any> {

    //noinspection TypeScriptValidateTypes
    return this.authHttp.get("/api/posts",this.options)
      .map((response:Response) => {
        this.useJwtHelper();
      })
  }

  useJwtHelper() {
    var token = sessionStorage.getItem('_t');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
