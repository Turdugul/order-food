import React from "react";
import { Header } from "./components/header/Header";
import { MealsSummary } from "./components/meals-summary/MealsSummary";

function App() {
  return (
    <div>
      <Header />
      <MealsSummary/>
      {/* <MealsSummary />
      <Meals />
      <MealItem /> */}
    </div>
  );
}

export default App;
