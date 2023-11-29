import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const validatePhoneNumber = phoneNumber => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
export const updateProfileImage = async image => {
  return new Promise(async resolve => {
    try {
      const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      const pathForFirebaseStore = await getPathForFirebaseStorage(image.path);
      await storage().ref(filename).putFile(pathForFirebaseStore);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => {
          console.log('RRL-----------------', url);
          resolve(url);
        });
    } catch (error) {
      console.log('image upload error:' + error);
    }
  });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};

//promise is an object that represent an asynchronous operations.

// resolve function is a callback function provided by the Promise system.
// It is used to fulfill or resolve the Promise with a specified result (or value).

// RNFetchBlob: This is a library for handling file operations, including fetching and sending data in React Native applications.

// fs: This stands for "file system," and it's a module within RNFetchBlob that provides functions for interacting with the file system.

// stat(uri): This function is used to retrieve information (statistics) about a file specified by the given URI.
//  The uri parameter is the Uniform Resource Identifier, which points to the location of the file.

// await storage().ref(filename).putFile(pathForFirebaseStore);---------------------------------------------------------------------

// storage(): This likely refers to the Firebase Storage service.

// ref(filename): This creates a reference to a specific location in the storage.

// putFile(pathForFirebaseStore): This is a method used to upload a file to Firebase Storage.

// So, in summary, the code is uploading a file to Firebase Storage.
//  The file is specified by its local path (pathForFirebaseStore),
//  and it will be stored in Firebase Storage with the name specified by the filename variable.
//   The await keyword indicates that this operation is asynchronous, and the code will wait for the upload to complete before proceeding.

//------------------------------------------------------------------------------------------------------------------------------------

// .getDownloadURL(): This is a method that retrieves the download URL for the file.
// The download URL is a unique URL that can be used to directly access and download the file from Firebase Storage.

// .then(url => { resolve(url); }): This part is handling the result of the asynchronous operation.
//  The then method is a promise callback that will be executed once the download URL is successfully obtained.
//  The url parameter contains the download URL, and it is then passed to the resolve function.
