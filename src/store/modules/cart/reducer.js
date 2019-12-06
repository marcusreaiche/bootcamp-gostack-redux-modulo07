import { produce } from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD_SUCCESS":
      return produce(state, draft => {
        const { product } = action;
        const idx = draft.findIndex(p => p.id === product.id);
        if (idx >= 0) {
          // Product already in basket
          draft[idx].amount += 1;
        }
        else {
          draft.push({
            ...product,
            amount: 1,
          });
        }
      });
    case "@cart/REMOVE":
      return produce(state, draft => {
        const { id } = action;
        draft = draft.filter(p => p.id !== id);
        return draft;
      });
    case "@cart/UPDATE_AMOUNT": {
      if (action.amount <= 0) {
        return state;
      }
      else {
        return produce(state, draft => {
          
          const product = draft.find(p => p.id === action.id);
          if(product) {
            product.amount = Number(action.amount);
          }
          return draft;
        });
      }
    }

    default:
      return state;
  }
}