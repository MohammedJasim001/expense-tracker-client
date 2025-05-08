import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-blue-600 cursor-pointer' onClick={()=>navigate("/create")}>
        Create Expense
      </div>
  )
}

export default Home