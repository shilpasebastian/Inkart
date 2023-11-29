//import useDimensionContext from '../../../context';
import {useState} from 'react';

import style from '../style';
import {View, Text} from 'react-native';
import color from '../../../Components/Common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDimensionContext} from '../../../context';
import Accordion from 'react-native-collapsible/Accordion';

const ExtraInfo = prop => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [curActiveSections, setActiveSections] = useState([0]);
  const DetailsArray = [
    {
      title: 'Manufacture Details',
      content:
        'The Collapse component in ReactJS is a versatile UI element that enables you to toggle the visibility of content, making it expandable or collapsible. Its commonly used to create accordions, collapsible menus, or any other sections that need to be hidden or shown based on user interaction',
    },
    {
      title: 'Product Details',
      content:
        'The Collapse component in ReactJS is a versatile UI element that enables you to toggle the visibility of content, making it expandable or collapsible. Its commonly used to create accordions, collapsible menus, or any other sections that need to be hidden or shown based on user interaction',
    },
    {
      title: 'Fearure Details',
      content:
        'The Collapse component in ReactJS is a versatile UI element that enables you to toggle the visibility of content, making it expandable or collapsible. Its commonly used to create accordions, collapsible menus, or any other sections that need to be hidden or shown based on user interaction',
    },
  ];

  const _renserHeader = sections => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={responsiveStyle.descriptionHead}>{sections.title}</Text>
        <AntDesign name="down" size={25} color={color.gery} />
      </View>
    );
  };

  const _renserContent = sections => {
    return (
      <View>
        <Text style={responsiveStyle.description}>{sections.content}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <>
      {/* <Accordion
        activeSections={curActiveSections}
        sections={DetailsArray}
        renderSectionTitle={_renserHeader}
        renderHeader={_renserContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          paddingVertical: 10,
          borderBottomColor: color.gery,
          borderBottomWidth: 1,
        }}
      /> */}
      <Accordion
        activeSections={curActiveSections}
        sections={DetailsArray}
        renderHeader={_renserHeader}
        renderContent={_renserContent} // Add this line
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          paddingVertical: 10,
          borderBottomColor: color.gery,
          borderBottomWidth: 1,
        }}
      />
    </>
  );
};

export default ExtraInfo;
