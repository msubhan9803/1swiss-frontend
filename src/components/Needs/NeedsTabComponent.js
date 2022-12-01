import { useEffect, useRef, useState } from 'react';

const tabsData = [
  {
    label: 'Min.',
    value: 'Minimum'
  },
  {
    label: 'Moyen',
    value: 'Moyen'
  },
  {
    label: 'Fort',
    value: 'Fort'
  },
  {
    label: 'Max.',
    value: 'Maximum'
  },
];

export default function NeedsTabComponent({ icon, title, state, fieldName, handleState }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);

      handleState(fieldName, tabsData[activeTabIndex].value)
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <div>
      <div className='my-8'>
        <div className='flex flex-row items-center gap-2 my-2'>
          {icon}
          <p className='text-lg font-normal'>{title}</p>
        </div>
        <div className="relative bg-slate-100 border border-slate-300 rounded shadow-md">
          <div className="flex space-x-3 border-b w-full">
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  ref={(el) => (tabsRef.current[idx] = el)}
                  className={`pt-2 pb-3 grow ${activeTabIndex === idx && "text-blue-600 font-medium"}`}
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <span
            className="absolute bottom-0 block h-1 bg-blue-500 transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </div>
      </div>
    </div>
  );
}
