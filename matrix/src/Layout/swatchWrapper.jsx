import React from 'react';
import { SingleSwatchWrapper } from '../components';

function SwatchWrapper({ activeData, swatchData, handleSwatch }) {
  console.log('swatchData:', swatchData);
  console.log('handleSwatch:', handleSwatch);

  const handleSwatchClicked = (item) => {
    handleSwatch(item);
  };

  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2 lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
      {Array.isArray(swatchData) ? (
        swatchData.map((o) => (
          <SingleSwatchWrapper
            key={o.id}
            item={o}
            handleClick={handleSwatchClicked}
            activeID={activeData.id}
          />
        ))
      ) : (
        <div>Error: swatchData is not an array</div>
      )}
    </div>
  );
}

export default SwatchWrapper;
