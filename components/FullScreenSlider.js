import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const styles = {
    container: {
        height: 'calc(100vh - 72px)',
        overflow: 'hidden',
    },
    slider: {
        width: '100%',
        height: '100%',
    },
    slide: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectPosition: 'top',
        objectFit:'cover'
    },
};

const FullScreenSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows:1,
    };


    return (
        <div style={styles.container}>
            <Slider {...settings} style={styles.slider}>
                <div className="item" style={styles.slide}>
                    <img src="https://placekitten.com/1920/1080" alt="Slide 1" style={styles.image} />
                </div>
                <div className="item" style={styles.slide}>
                    <img src="https://placekitten.com/1920/1080" alt="Slide 2" style={styles.image} />
                </div>
                <div className="item" style={styles.slide}>
                    <img src="https://placekitten.com/1920/1080" alt="Slide 3" style={styles.image} />
                </div>
            </Slider>
        </div>
    );
};

export default FullScreenSlider;
