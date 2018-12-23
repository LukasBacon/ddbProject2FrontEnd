import { HttpHeaders } from '@angular/common/http';

export class Settings {

  public static backendUri = 'http://localhost:8080/ddbProject2BackEnd/rest/';

  public static jsonHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

}
