import { Component, OnInit } from '@angular/core';

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
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {  

title= 'GitHub Repositories';
repos: data;

constructor(private apollo: Apollo){}

ngOnInit(): void{
  this.apollo.query<data>({
    query: GET_REPOS
  })
  .subscribe(result=>{ this.repos = result.data;
  console.log(result.data );
  console.log(this.repos );
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