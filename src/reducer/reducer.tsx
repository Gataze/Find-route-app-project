import { Action } from "../models/actionModel"


export function reducer(searches: any, action: any){
    switch(action.type){
      case Action.Add:
        return [...searches, newSearch(action.payload)]
      case Action.Delete:
        return searches.filter((searchItem: any) => searchItem.id !== action.payload)
      default:
        return searches
    }
  }


  function newSearch(places: any){
    return {id: Date.now(), ...places, loaded: true}
  }