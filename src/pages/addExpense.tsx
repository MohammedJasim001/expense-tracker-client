import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      if (
        input.amount.trim() &&
        input.category.trim() &&
        input.description.trim()
      ) {
        const res = await axios.post("https://expense-tracker-server-6hc3.onrender.com/add", input);
        console.log(res);
        navigate("/");
        setInput({
          amount: "",
          category: "",
          description: "",
        });
      } else {
        alert("please fill the fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col w-80 h-72 rounded items-center justify-center mx-auto bg-red-300 ">
      <div className="flex flex-col gap-3 ">
        <input
          type="number"
          name="amount"
          id=""
          value={input.amount}
          placeholder="Amount"
          className="h-10 w-64 border pl-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          id=""
          value={input.category}
          placeholder="Category"
          className="h-10 w-64 border pl-2 rounded"
          onChange={handleChange}
        />
        <textarea
          name="description"
          id=""
          value={input.description}
          rows={3}
          placeholder="Description"
          className=" w-64 border pl-2 rounded"
          onChange={handleChange}
        />
      </div>
      <button className="p-2 bg-blue-500 w-64 mt-3 rounded" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default AddExpense;
