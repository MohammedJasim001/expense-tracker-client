import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Expense = {
  _id: string;
  amount: number;
  category: string;
  description: string;
};

type Category = {
  _id: string;
  totalAmount: number;
};

const Summary = () => {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get("http://localhost:3000/totalamount");
        setTotalAmount(res.data);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchTotal();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getexpenses");
        setExpenses(res.data);
      } catch (error) {
        console.log("Error fetching expenses", error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:3000/category");
        setCategory(res.data);
      } catch (error) {
        console.log("Error fetching category", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="pl-4 flex flex-col gap-6 md:flex-row md:gap-12">
      <div className="h-32 w-80 bg-blue-400 flex items-center justify-center flex-col rounded-xl shadow-lg p-4">
        <h1 className="text-lg text-white">Total Amount Spent</h1>
        <p className="font-bold text-2xl text-white">{totalAmount}</p>
      </div>

      <div className="bg-indigo-500 p-6 flex flex-col h-[670px] w-96 rounded-lg shadow-xl overflow-y-auto">
        <h2 className="text-white text-2xl font-bold mb-4">All Expenses</h2>
        <div className="space-y-6">
          {expenses.map((ele) => (
            <ul
              key={ele._id}
              className="bg-amber-300 text-gray-800 px-6 py-4 rounded-lg shadow-md flex flex-col items-start"
            >
              <li className=" ">
                <span className="font-semibold">Category: </span>
                {ele.category}
              </li>
              <li className="">
                <span className="font-semibold">Amount: </span>
                {ele.amount}
              </li>
              <li className="">
                <span className="font-semibold">Description: </span>
                {ele.description}
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className="bg-indigo-500 p-6 flex flex-col h-[670px] w-96 rounded-lg shadow-xl overflow-y-auto">
        <h1 className="text-white text-2xl font-bold mb-4">Expenses by Category</h1>
        <div className="space-y-6">
          {category.map((ele) => (
            <ul key={ele._id} className="bg-amber-300 text-gray-800 px-6 py-4 rounded-lg shadow-md flex flex-col items-start">
              <li className="font-medium">
                <span className="font-semibold">Category: </span>
                {ele._id}
              </li>
              <li>
                <span className="font-semibold">Total Amount: </span>
                {ele.totalAmount}
              </li>
            </ul>
          ))}
        </div>
      </div>

      <h2
        className="p-2 h-10 bg-blue-500 text-white rounded-lg cursor-pointer text-center"
        onClick={() => navigate("/create")}
      >
        Add New Expense
      </h2>
    </div>
  );
};

export default Summary;
