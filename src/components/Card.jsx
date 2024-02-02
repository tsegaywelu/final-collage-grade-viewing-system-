
// eslint-disable-next-line react/prop-types
function Card({title, value, color='blue'}) {
  return (
    <div className={`relative mx-auto w-56 md:w-80 mb-2 rounded-lg bg-gradient-to-tr from-${color}-300 to-${color}-800 p-0.5 shadow-lg`}>
      <div className="bg-white xl:p-7  rounded-md text-center">
          <h4 className=" text-xl mb-2 text-gray-600">{title}</h4>
          <p className='  font-bold text-4xl text-gray-700'>{value}</p>
      </div>
  </div>
  )
}

Card.propTypes = {

}

export default Card

