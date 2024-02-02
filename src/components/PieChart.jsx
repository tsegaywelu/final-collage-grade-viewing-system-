import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Male vs. Female Ratio',
      },
    },
  };

// eslint-disable-next-line react/prop-types
function PieChart({male, female}) {

    const data = {
        labels: ['Male', 'female'],
        datasets: [
          {
            // label: '# of Votes',
            data: [male, female],
            backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(160, 32, 240, 0.5)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return (
    <div className=' flex items-center xl:pb-12  md:h-full rounded-lg border shadow-lg w-fit'>
        {/* <p>Male to Female Ratio</p> */}
        <div className='' style={{
            width: '300px', height: '300px', maxHeight: '50vh'
        }}>
            <Pie data={data} options={options}></Pie>
        </div>
    </div>
  )
}

export default PieChart
