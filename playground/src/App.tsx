import React, { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import ImageMapper from '@/ImageMapper';

import JSON from '@playground/data/areas.json';

import type { MapArea, RefProperties } from '@/ImageMapper';
import type { FC } from 'react';

const App: FC = () => {
  const [areas, setAreas] = useState<MapArea[]>(JSON);
  const [parentWidth, setParentWidth] = useState<number>(640);
  const ref = useRef<RefProperties>(null);
  const [, setNatural] = useState(false);
  console.log(ref);

  useEffect(() => {
    // console.log(ref.current.style.width);
    if (ref.current) {
      console.log(ref.current.getRefs());
    }
  }, []);

  const handleClick = () => {
    const area = areas.map((cur: MapArea, i: number) => {
      if (i % 4 === 0) {
        const temp = { ...cur };
        temp.preFillColor = 'red';
        return temp;
      }
      return cur;
    });
    setAreas(area);
  };

  if (!areas.length) return null;

  return (
    <React.Fragment>
      <ImageMapper
        ref={ref}
        src="/assets/example.jpg"
        map={{ name: 'my-map', areas }}
        // onChange={(selectedArea, allAreas) => {
        //   console.log(selectedArea, allAreas);
        //   setAreas(allAreas);
        // }}
        onLoad={(...arg) => console.log('onLoad =>>>>>>>>>>>>', arg)}
        // width={parentWidth}
        // height={480}
        // imgWidth={parentWidth}
        // natural={natural}
      />
      <input
        type="range"
        value={parentWidth}
        onChange={e => setParentWidth(e.target.valueAsNumber)}
        min={100}
        step={40}
        max={1000}
      />
      <button type="button" onClick={handleClick}>
        Highlight
      </button>
      <button type="button" onClick={() => setAreas(JSON)}>
        Clear
      </button>
      <button type="button" onClick={() => setNatural(prev => !prev)}>
        natural
      </button>
      <button type="button" onClick={() => console.log(ref.current?.getRefs())}>
        Get Ref
      </button>
    </React.Fragment>
  );
};

export default App;
