import React from "react";
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from "react-icons/md";

import { Container, ProductTable, Total } from "./styles";


export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img 
                src="https://static.netshoes.com.br/produtos/tenis-asics-gel-court-speed-masculino/76/D18-4528-076/D18-4528-076_zoom1.jpg?ims=120x" 
                alt="Asics"/>
            </td>
            <td>
              <strong>Asics</strong>
              <span>$129.90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={2} />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>$259.80</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete color="#7159c1" size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Place order</button>

        <Total>
          <span>TOTAL</span>
          <strong>$1920.28</strong>
        </Total>
      </footer>
    </Container>
  );
}
