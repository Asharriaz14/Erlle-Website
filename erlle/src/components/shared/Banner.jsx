import PropTypes from 'prop-types';

const Banner = ({  heading, subheading, detail , img}) => {
  return (
    <div className=' md:pt-9 px-4 pt-9'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
      
      <div className='max-w-[400px] lg:h-[250px] lg:w-[250px]'>
          <img src={img} alt="Banner Image" className='object-inherit h-full w-full rounded-lg' />
        </div>
        <div className="w-full md:w-2/5">
  <div className="flex flex-row justify-between md:flex-col md:justify-start">
    <h2 className='md:text-4xl text-3xl font-bold text-white mb-3 leading-relaxed'>{heading}</h2>
    <p className='text-[#757575] text-xl mb-2 font-medium'>{subheading}</p>
  </div>
  <p className='text-[#757575] text-lg mb-2'>{detail}</p>
</div>
      
      </div>
    </div>
  );
};

Banner.propTypes = {
  banner: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
 
};

export default Banner;
