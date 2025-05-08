import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./pages/addExpense";
import Summary from "./pages/Summary";

function App() {
  return (
    <div className=" bg-amber-50 h-screen pt-5">
      <Routes>
        
        <Route path="/create" element={<AddExpense />} />
        <Route path="/" element={<Summary />} />
      </Routes>
    </div>
  );
}

export default App;
