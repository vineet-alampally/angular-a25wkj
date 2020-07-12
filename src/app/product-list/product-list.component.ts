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
  __typename: string;
}

interface search{
  repos: edges[];  
}

interface data{
  search: search;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {  

title= 'GitHub Repositories'; 54
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