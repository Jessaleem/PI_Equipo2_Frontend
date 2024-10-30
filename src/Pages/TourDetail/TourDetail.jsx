import { useParams } from 'react-router-dom';
import TourDetailSection from '../../Components/TourDetailSection';

const TourDetail = () => {
  const { id } = useParams();
  return (
    <div className=''>
      <TourDetailSection id={id} />
    </div>
  );
};

export default TourDetail;
