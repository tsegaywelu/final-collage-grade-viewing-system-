import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'
import Card from '../components/Card'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchDashboard } from '../utils/backend.utils'

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(22000)
  const [passedStudents, setPassedStudents] = useState(20000)
  const [failedStudents, setFailedStudents] = useState(2000)

  const [femaleQuantity, setFemaleQuantity] = useState(1200)
  const [maleQuantity, setMaleQuantity] = useState(500)

  const [passedList, setPassedList] = useState([8000, 10000, 7000, 12000, 15000, 14000, 17000, 20000, 18000])
  const [failedList, setFailedList] = useState([22000 - 8000, 22000 - 10000, 22000 - 7000, 22000 - 12000, 22000 - 15000, 22000 - 14000, 22000 - 17000, 22000 - 20000, 22000 - 18000])
  
  const getDashboard = async() => {
    try {
      const response = await fetchDashboard()
      console.log(response.data)
      setTotalStudents(response.data.totalStudents)
      setPassedStudents(response.data.totalPassed)
      setFailedStudents(response.data.totalFailed)

      setFemaleQuantity(response.data.females)
      setMaleQuantity(response.data.males)

      setPassedList(response.data.passedList)
      setFailedList(response.data.failedList)

    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    getDashboard()
  }, [])
  return (
    <div className='bg-white'>
        <div className=' flex flex-col md:flex-row items-stretch justify-stretch mb-4 shadow-sm border rounded md:rounded-full border-gray-200 py-2 mx-6 '>
            <Card title={'Students'} value={totalStudents}></Card>
            <Card color='green' title={'Passed'} value={passedStudents}></Card>
            <Card color='red' title={'Failed'} value={failedStudents}></Card>
        </div>
      <div className=' flex flex-col md:flex-row justify-center  gap-10 w-[95vw] mx-auto'>
        <div className=' self-center md:self-stretch'>
            <PieChart male={maleQuantity} female={femaleQuantity}></PieChart>
        </div>
        <div className=' flex-1'>
            <BarChart passedList={passedList} failedList={failedList}></BarChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
