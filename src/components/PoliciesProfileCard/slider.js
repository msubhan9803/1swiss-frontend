import React, { useState, useRef, useEffect } from 'react';
import Shoe from 'assets/images/shoe.svg';

const Slider = ({ slider }) => {
  const [selected, setSelected] = useState(1);
  const previousSelected = useRef();
  useEffect(() => {
    //assign the ref's current value to the count Hook
    previousSelected.current = selected;
  }, [selected]);
  return (
    <>
      <div className="flex flex-col items-center py-8 relative">
        <>
          {slider &&
            slider.map((value, index) => (
              <>
                <div
                  className={`w-full bg-transparent rounded  flex snap-x md:h-16 h-14 relative left-0  ${
                    selected === value ? 'flex  ' : 'hidden'
                  } ${
                    previousSelected.current > selected
                      ? ' slider-out slider '
                      : ' slider-in slider '
                  }`}
                >
                  <div
                    className={`snap-start w-full h-full  items-center justify-center text-white   flex-shrink-0  absolute -top-28 sm:-top-40 md:-top-28   `}
                  >
                    <img src={Shoe} alt="shoes" className="mx-auto "></img>
                  </div>
                </div>
              </>
            ))}
          <div className="flex pt-8 gap-1">
            {slider &&
              slider.map((value, index) => (
                <a
                  className={` mr-1 h-1 text-gray-700 rounded-full bg-gray-400 flex justify-center items-center cursor-pointer transform  transition hover:translate-700   ${
                    selected === value
                      ? 'w-10 delay-1000 duration-100  ease-linear  '
                      : 'w-1'
                  }`}
                  onClick={() => setSelected(value)}
                ></a>
              ))}
          </div>
        </>
      </div>
    </>
  );
};
export default Slider;
