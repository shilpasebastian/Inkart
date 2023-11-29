import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import color from '../../Components/Common/colors';
import {useState} from 'react';

const Calculator = () => {
  const [value, setValue] = useState(0);
  const ElementArray = [
    ['C', '7', '4', '1', '.'],
    ['+/-', '8', '5', '2', '0'],
    ['%', '9', '6', '3', '00'],
    ['/', '*', '-', '+', '='],
  ];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePress = text => {
    let str = value;
    if (str !== '0' && str.length >= 1) {
      str = str + text;
    } else {
      str = text;
    }

    setValue(str);
  };

  const result = () => {
    let str = value;
    if (str === '1+3+9') {
      setModalVisible(true);
      console.log(value);
    }
  };

  const RenderElements = (getArray, index) => {
    console.log(getArray);
    if (index !== 3) {
      return (
        <View key={index}>
          {getArray.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(item)}>
              <Text style={{color: color.lightgrey, fontSize: 40}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <View
          key={index}
          style={{backgroundColor: color.darkslategrey, borderRadius: 50}}>
          {getArray.map((item, index) =>
            item !== '=' ? (
              <TouchableOpacity
                key={index}
                style={{paddingLeft: 15, paddingRight: 15}}
                onPress={() => handlePress(item)}>
                <Text style={{color: color.lightgrey, fontSize: 40}}>
                  {item}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={index}
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: color.lemonchiffon,
                  borderRadius: 30,
                }}
                onPress={result}>
                <Text style={{color: color.black, fontSize: 37}}>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: color.darkgrey}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity style={styles.modalContainer} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 25}}>Hello World!</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={{height: 250}}>
        <Text
          style={{
            height: 80,
            fontSize: 45,
            color: color.lightgrey,
            marginTop: 180,
            textAlign: 'right',
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 5,
          }}>
          {value}
        </Text>
        <View
          style={{
            borderBottomColor: color.black,
            borderWidth: 0.3,
            width: 300,
            marginLeft: 30,
          }}
        />
      </View>
      <View style={{backgroundColor: color.darkgrey, flex: 1, marginTop: 50}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {ElementArray.map((item, index) => RenderElements(item, index))}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    height: 220,
    width: 200,
  },
});
export default Calculator;
