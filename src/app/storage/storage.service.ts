import {Injectable} from "@angular/core";
/**
 * Created by Kingsley on 6/24/2017.
 */

export interface IStorage {
  saveToken(token:string);
  getToken();
}

@Injectable()
export class StorageService implements IStorage{
  saveToken(token:string) {
    window.sessionStorage.setItem('_t',token);
  }

  getToken() {
    return window.sessionStorage.getItem('_t')
  }

}

