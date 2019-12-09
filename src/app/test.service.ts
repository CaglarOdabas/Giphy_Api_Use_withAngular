import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TestService {

  constructor(private http: HttpClient) {
  }

  getValue(id: number) {
    return this.http.get('http://localhost:49883/api/values/' + id);
  }

  getValues() {
    return this.http.get('http://localhost:49883/api/values/');
  }

  getCategories() {
    let apiUrl = 'http://localhost:63037/api/values';
    return this.http.get(apiUrl);
  }
  getGifs(searchWord: string, limit: string, offSet: number) {
    let apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=Fj89z6XjUoYvxQHJdC6AIY5DQZrLcB5V&q=' + searchWord + '&limit=' + limit + '&offset=' + offSet +'&rating=G&lang=en';
    return this.http.get<IGifs>(apiUrl);
  }


}
interface IGifs {
  data: Array<object>;
}
