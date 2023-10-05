import { React, useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from '../../assets/image.png'
import image2 from '../../assets/guide1.png'
import image3 from '../../assets/guide2.png'

const GuideCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 다음 슬라이드로 이동하는 함수
    const goToNextSlide = () => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
    };

    return (
        <div className="flex justify-center items-center py-5 px-3">
            <Carousel
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                selectedItem={currentIndex} // 현재 선택된 슬라이드 설정
                onChange={setCurrentIndex}
                onClickItem={goToNextSlide} // 클릭 시 다음 슬라이드로 이동
                className="w-[300px] h-[200px]">
                <div key={1}>
                    <img className=" h-44" src={image1} alt='사진1' />
                </div>
                <div key={2}>
                    <img src={image2} className=" h-44" alt='사진2' />
                </div>
                <div key={3}>
                    <img src={image3} className=" h-44" alt='사진3' />
                </div>
            </Carousel>
        </div>
    );
};

export default GuideCarousel;
