import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';

/// IMAGE REWARD
const uploadBlogImage = (image: string, id: number) => {
  const storage = getStorage();
  const storageRef = ref(storage, `blog/${id}/${id}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      });
    });
  });
};
export const updateBlogImage = async (image: string, id: number) => {
  const url = await uploadBlogImage(image, id);
  return url;
};

const uploadSubTopicImage = (image: string, blog_id: number, id: number) => {
  const storage = getStorage();
  const storageRef = ref(storage, `blog/${blog_id}/subTopic/${id}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      });
    });
  });
};
export const updateSubTopicImage = async (
  image: string,
  blog_id: number,
  id: number,
) => {
  const url = await uploadSubTopicImage(image, blog_id, id);
  return url;
};
