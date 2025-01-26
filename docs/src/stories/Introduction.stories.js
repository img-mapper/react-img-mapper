import React from 'react';

const SimpleApp = {
  title: 'Introduction',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Introduction = () => (
  <div>
    <h1>React Img Mapper</h1>
    <p>
      Hello Guys, Welcome to React Img Mapper Library. This library is used to highlight interactive
      zones in images
    </p>
    <br />
    <b>Introduction</b>
    <br />
    <br />
    <p>In this mapper library, I have tried to create a few functionalities to map the images.</p>
    <br />
    <p className="tag-block">
      1) You can assign different colors (static/dynamic) to highlight a different area of the image
      <br />
      2) You can freeze (single/multiple) areas of the image and still work with other areas of the
      image & you can toggle the freezing functionality as well
      <br />
      3) You can dynamically give width/height to the image (but it will be hard to make it
      responsive), so I have created another functionality where if you set the responsive property
      to true and assign the parent width, then the function will automatically make the image
      responsive.
      <br />
      4) I have also created an all properties window where I have merged all the functionalities so
      that everything gets covered in a single place.
    </p>
    <br />
    <p className="big-font">So go ahead and please give it a try. Learn, Use and have fun 🤪🤪</p>
    <p className="big-font">Cheers!!</p>
  </div>
);

export default SimpleApp;
