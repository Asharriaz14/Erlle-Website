import Banner from './shared/Banner';
import PropTypes from 'prop-types';

function HomeSection ({ songData }) {
  
  return (
    <div className='mt-20 md:px-4 p-4 max-w-screen-2xl mx-auto md:mx-12 2xl:m-auto' id='home'>
      <Banner
        heading={songData ? songData.name : 'Loading...'}
        subheading={songData ? songData.artist : 'Loading...'}
        detail={songData ? songData.description : 'Loading...'}
        img={songData ? songData.picture : 'Loading...'}
      />
    </div>
  );
}
HomeSection.propTypes = {
  songData: PropTypes.shape({
    name: PropTypes.string,
    artist: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string
  })
};
export default HomeSection;
