import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


interface edges{
    nodes: node;
    __typename: string 
}

interface node{
  name: string;
  url: string;
  description: string;
  __typename: string;
}

interface search{
  repos: edges[];  
  repositoryCount: string;  
}

interface data{
  search: search;
  
}

@Component({
  selector: 'app-product-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {  

title= 'GitHub Repositories';
repos: data;

constructor(private apollo: Apollo){}

ngOnInit(): void{
  this.apollo.query<data>({
    query: GET_REPOS
  })
  .subscribe(result=>{ this.repos = result.data;  
  });
  
}  
}

const GET_REPOS = gql`{
  search(query: "is:public", type: REPOSITORY, first: 15) {    
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          description
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