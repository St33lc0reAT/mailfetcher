import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { stringify } from 'querystring';
import { environment } from "src/environments/environment";


export interface ListEntry {
  name: string;
  checked: boolean;
  display: string;
}

export interface User {
  vorname: string;
  nachname: string;
  mail: string;
  tel: string;
  birth: string;
  lists: Array<string>;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  constructor(private http:HttpClient){}

  title = 'Newsletter Anmeldung Kuchler-Fischer';
  name = "test";
  lastname = "";
  mail = "";
  tel = "";
  birth = new Date();
  agb = false;
  newsList: ListEntry[] = [
    {
      name: "allgemein",
      checked: false,
      display: "Allgemeine Infos (Veranstaltungen, Versammlungen etc.)"
    },
    {
      name: "balcke",
      checked: false,
      display: "Balcketeich"
    },
    {
      name: "buergerau",
      checked: false,
      display: "Bürgerausee"
    },
    {
      name: "wiestal",
      checked: false,
      display: "Wiestalstausee"
    }
  ];
  valueChange($event:any) {
    //set the two-way binding here for the specific unit with the event
    this.agb = $event.checked;
  }

  submitUser()
  {
    /*console.log("Test");
    let result = document.querySelector('.result');
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:6444/adduser";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200 && result)
      {
        console.log(this.responseText);
      }
    };*/
    let data:User = {
      "vorname": this.name,
      "nachname": this.lastname,
      "mail": this.mail,
      "tel": this.tel,
      "birth": this.birth.toLocaleString(),
      "lists":  this.newsList.map((entry:ListEntry) => {
          if(entry.checked === true){
            return entry.name;
          }
          return "";
        })
    }
    //xhr.send(data);
    this.sendUser(data).subscribe(data => console.log(data));
  }

  sendUser(user: User):Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/adduser`, user, httpOptions)
    .pipe();
  }

}