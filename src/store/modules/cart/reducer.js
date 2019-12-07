import { produce } from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD_SUCCESS":
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });
    case "@cart/REMOVE":
      return produce(state, draft => {
        const { id } = action;
        draft = draft.filter(p => p.id !== id);
        return draft;
      });
    case "@cart/UPDATE_AMOUNT_SUCCESS": {  
      return produce(state, draft => {
        
        const product = draft.find(p => p.id === action.id);
        if(product) {
          product.amount = Number(action.amount);
        }
        return draft;
      });
    }

    default:
      return state;
  }
}