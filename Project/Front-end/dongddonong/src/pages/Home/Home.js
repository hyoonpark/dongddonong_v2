import { useState, useRef, useEffect } from "react";

import styles from "./Home.module.css";
import Footer from "../../components/Footer";
import image from "../../assets/image.png";
import upArrow from "../../assets/icon/up-arrow.png";
import { useUserContext } from "../../contexts/userContext";
import { path, path1, path2 } from "./Path";

const Home = () => {
  const { user, loggedIn } = useUserContext();
  console.log("context 상태", loggedIn);
  console.log("context user", user);

  const [showButton, setShowButton] = useState(false);
  const content1Ref = useRef();
  const path1Ref = useRef();
  const content2Ref = useRef();
  const path2Ref = useRef();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calcDashoffset = (scrollY, element, length) => {
    const ratio = (scrollY - element.offsetTop) / element.offsetHeight;
    const value = length - length * ratio;

    return value < 0 ? 0 : value > length ? length : value;
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      const scrollY = window.scrollY + window.innerHeight * 0.8;

      if (path1Ref.current) {
        const path1Length = path1Ref.current.getTotalLength();
        path1Ref.current.style.strokeDasharray = path1Length;
        path1Ref.current.style.strokeDashoffset = calcDashoffset(
          scrollY,
          content1Ref.current,
          path1Length
        );
      }

      if (path2Ref.current) {
        const path2Length = path2Ref.current.getTotalLength();
        path2Ref.current.style.strokeDasharray = path2Length;
        path2Ref.current.style.strokeDashoffset = calcDashoffset(
          scrollY,
          content2Ref.current,
          path2Length
        );
      }
    };

    window.addEventListener("scroll", scrollHandler);
    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="mb-10 md:mb-0 md:pt-48">
        <div className="relative ml-4">
          <div className="relative mt-4 left-12 header top-16 max-w-7xl md:absolute md:top-0 md:left-12">
            <div className="w-5/12 md:w-3/5 md:-translate-y-1/4">
              <h1 className="mb-2 text-3xl md:text-4xl font-bold whitespace-nowrap">
                동또농
              </h1>
              <p>
                인공지능 기술이 적절히 적용되었을 때, 불편했던 부분들이 개선되고
                편리해질 수 있는 영역이 많습니다.
              </p>
              <p>
                그 중 저희는 AI 영상처리기술을 이용하여 동네, 동호회에서 또
                농구를 하고 있는 농구인들을 위해 분석 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
        <svg
          className="fill-none md:-translate-y-1/4"
          viewBox="0 0 310.38 136.09"
        >
          <path className={styles.path} d={path} />
        </svg>
      </div>

      <div className={`${styles.content1} relative`} ref={content1Ref}>
        <img
          className="absolute w-full h-full grayscale -scale-x-100 -z-10"
          src={image}
          alt=""
        />
        <svg
          className={`${styles.svg1} fill-none stroke-white stroke-2 absolute`}
          viewBox="0 0 752.37 615.05"
        >
          <g>
            <path className={styles.path1} ref={path1Ref} d={path1} />
          </g>
        </svg>
        <svg className="invisible" viewBox="0 0 752.37 615.05"></svg>
      </div>

      <div className={`${styles.content1} w-screen relative`} ref={content2Ref}>
        <div className={`${styles.practice} px-4 absolute w-3/5 md:w-1/3`}>
          <h2 className="text-2xl font-bold">연습</h2>
          <div className="w-16 my-1 border-t-2 border-black md:my-2"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            libero porro natus, omnis tenetur molestiae quibusdam,
          </p>
        </div>

        <div
          className={`${styles.two_bound} px-4 text-right right-4 absolute w-3/5 md:w-1/3`}
        >
          <div className="relative">
            <h2 className="text-2xl font-bold">투바운드</h2>
            <div className="absolute right-0 w-28 my-1 border-t-2 border-black md:my-2"></div>
            <p className="my-3 md:my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              libero porro natus, omnis tenetur molestiae quibusdam,
            </p>
          </div>
        </div>

        <div className={`${styles.contest} px-4 absolute w-3/5 md:w-1/3`}>
          <h2 className="text-2xl font-bold">경기</h2>
          <div className="w-16 my-1 border-t-2 border-black md:my-2"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            libero porro natus, omnis tenetur molestiae quibusdam,
          </p>
        </div>

        <svg
          className={`${styles.svg2} fill-none relative stroke-black stroke-1`}
          viewBox="0 0 394.2 663.06"
        >
          <g>
            <path className={styles.path2} ref={path2Ref} d={path2} />
          </g>
        </svg>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed p-3 z-50 bg-black border-none rounded-full transition-all duration-300 bottom-4 right-4 ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <img className="w-6" src={upArrow} alt="스크롤상단" />
      </button>

      <Footer></Footer>
    </div>
  );
};

export default Home;
