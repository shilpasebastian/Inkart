import React, {createContext, useContext, useState, useEffect} from 'react';
import {useWindowDimensions, Dimensions as dim} from 'react-native';
export const DimensionContext = createContext();
export const useDimensionContext = () => useContext(DimensionContext);
export const DimensionContextProvider = ({children}) => {
  const dimensions = useWindowDimensions();
  const initHeight = dim.get('window').height;
  const initWidth = dim.get('window').width;
  const [windowWidth, setWindowWidth] = useState(initWidth);
  const [windowHeight, setWindowHeight] = useState(initHeight);
  const [isPortrait, setIsPortrait] = useState(false);

  const checkIsPortrait = () => {
    const dims = dim.get('screen');
    return dims.height >= dims.width;
  };
  useEffect(() => {
    setIsPortrait(checkIsPortrait());
    dim.addEventListener('change', () => {
      setIsPortrait(checkIsPortrait());
    });
  }, []);

  useEffect(() => {
    setItem();
  }, [dimensions]);
  const setItem = () => {
    const {height, width} = dimensions;
    setWindowHeight(height);
    setWindowWidth(width);
  };
  return (
    <DimensionContext.Provider value={{windowWidth, windowHeight, isPortrait}}>
      {children}
    </DimensionContext.Provider>
  );
};
