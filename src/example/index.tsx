import React, { useEffect, useRef, useState } from 'react';

import JSON from '@/example/area.json';
import ImageMapper from '@/ImageMapper';

import type { MapArea, RefProperties } from '@/ImageMapper';
import type { FC } from 'react';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';

// const JSON =
//   'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json';

const Example: FC = () => {
  const [areas, setAreas] = useState<MapArea[]>(JSON);
  const [parentWidth, setParentWidth] = useState<number>(500);
  const ref = useRef<RefProperties>(null);
  console.log(ref);

  useEffect(() => {
    // console.log(ref.current.style.width);
    // console.log(ref);
  });

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
        src={URL}
        map={{ name: 'my-map', areas }}
        onChange={(selectedArea, allAreas) => {
          console.log(selectedArea, allAreas);
          setAreas(allAreas);
        }}
        onLoad={(...arg) => console.log('onLoad =>>>>>>>>>>>>', arg)}
        highlighted={{ isMulti: false, toggle: false }}
        responsive
        parentWidth={parentWidth}
      />
      <input
        type="range"
        value={parentWidth}
        onChange={e => setParentWidth(e.target.valueAsNumber)}
        min={100}
        step={100}
        max={1000}
      />
      <button type="button" onClick={handleClick}>
        Highlight
      </button>
      <button type="button" onClick={() => setAreas(JSON)}>
        Clear
      </button>
      <button type="button" onClick={() => console.log(ref.current?.getRefs())}>
        Get Ref
      </button>
    </React.Fragment>
  );
};

export default Example;