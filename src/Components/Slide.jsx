import { motion } from "framer-motion";


// eslint-disable-next-line react/prop-types
const Slide = ({ image, text , text1 }) => {
 
  return (
    <div
      className='w-full '
    >
      <div  className=' relative '>
        <img className=' w-full ' src={image} alt="" />
        <div className=' top-14 md:top-[350px] bg-black/10  absolute flex items-center  justify-center w-full '>
        <div className='text-center w-full h-full'>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
          <h1 className='text-xs md:text-4xl my-5 font-extrabold text-[#40E0D0] lg:text-4xl'>
            {text}
          </h1>
            </motion.div>
            <h2 className='text-xs md:text-2xl font-semibold text-[#008B8B]'>
              {
                text1
              }
            </h2>
        </div>
      </div>
      </div>
      
      
    </div>
  )
}

export default Slide