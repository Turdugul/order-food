import React from "react";
import { styled } from "styled-components";

const TotalAmount = ({totalamount = 0}) => {
  return (
    <Container>
      <h3>TotalAmount</h3>
      <b>${Number(totalamount).toFixed(2)}</b>
    </Container>
  );
};
const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
  & h3 {
    font-size: 20px;
    font-weight: 700;
    color: #222222;
  }
  & b {
    font-size: 22px;
    font-weight: 600;
    color: #8a2b06;
  }
`;
export default TotalAmount;
