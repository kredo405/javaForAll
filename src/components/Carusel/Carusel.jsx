import Carousel from 'react-bootstrap/Carousel';
import fon from '../../img/fon.jpg';
import slide2 from '../../img/slide2.png';

const Carusel = () => {

    return (
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 max-h-80"
            src={fon}
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 className='text-slate-50 text-5xl'>Тренажёр</h2>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 max-h-80"
            src={fon}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h2 className='text-slate-50 text-5xl'>Справочная литература</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
};

export default Carusel;