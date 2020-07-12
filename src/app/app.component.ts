import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


interface edges{
    nodes: node;
}

interface node{
  name: string;
  url: string;
  __typename: string;
}

interface search{
  repos: edges[];
  __typename: string 
}

interface data{
  search: search;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

title= 'GitHub Repositories';
repos: data;
repository: edges[];
constructor(private apollo: Apollo){}

ngOnInit(): void{
  this.apollo.query<data>({
    query: GET_REPOS
  })
  .subscribe(result=> this.repos = result.data);

  //this.repository = this.repos.search.repos;
}
}

const GET_REPOS = gql`{
  search(query: "is:public", type: REPOSITORY, first: 5) {    
    edges {
      node {
        ... on Repository {
          name
          url          
        }
      }
    }
  }
}
`

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/