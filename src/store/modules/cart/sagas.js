
import { call, select, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";
import { addToCartSuccess, updateAmountSuccess, productLoadingStatus } from "./actions";
import { formatPrice } from "../../../util/format";
import history from "../../../services/history";

function* addToCart({ id }){
  
  // Change the loading status of the product to true
  yield put(productLoadingStatus(id));

  // Call api to get product stock
  const stock = yield call(api.get, `/stock/${id}`);
  const {amount: stockAmount} = stock.data;
  
  const productExists = yield select(
    state => state.cart.find(p => p.id === id)
  );
    
  const currentAmount = productExists 
    ? productExists.amount + 1
    : 1;
  
  if (currentAmount > stockAmount) {
    toast.error("Desculpe, a quantidade solicitada está fora de estoque");
    yield put(productLoadingStatus(id, false));
    return;
  }
  
  if(productExists) {
    yield put(updateAmountSuccess(id, currentAmount));
  }
  else {
    // Fetch product info
    const response = yield call(api.get, `/products/${id}`);
  
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    
    // Add to cart: invoke action to store
    yield put(addToCartSuccess(data));
    
    // Finally, navigate to /cart
    history.push("/cart");
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;
  // Change the loading status of the product to true
  yield put(productLoadingStatus(id));
  // Get the product stock
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  if (amount > stockAmount) {
    toast.error("Desculpe, a quantidade solicitada está fora de estoque");
    // Change the loading status of the product to false
    yield put(productLoadingStatus(id, false));
    return;
  }
  else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeEvery("@cart/ADD_REQUEST", addToCart),
  takeLatest("@cart/UPDATE_AMOUNT_REQUEST", updateAmount)
]);