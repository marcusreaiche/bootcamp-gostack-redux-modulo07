import { produce } from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "ADD_TO_CART":
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
    default:
      return state;
  }
}