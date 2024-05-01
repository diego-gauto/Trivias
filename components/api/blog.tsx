import axios from 'axios';

export const getBlogsApi = async () => {
  return axios
    .get('https://gonvar.inowu.dev/' + 'blogs/getBlogs')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const createBlogsApi = async (blog: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'blogs/createBlog', blog)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateBlogsApi = async (blog: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'blogs/updateBlog', blog)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateBlogImageApi = async (blog: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'blogs/updateBlogImage', blog)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateSubTopicImageApi = async (blog: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'blogs/updateSubTopicImage', blog)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const getSingleBlogApi = async (blogId: any) => {
  return axios
    .get('https://gonvar.inowu.dev/' + 'blogs/' + blogId, blogId)
    .then((res) => {
      res.data.data[0].subTopic = res.data.subTopic;
      return res.data.data[0];
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const getBlogWithTitle = async (blogTitle: any) => {
  return axios
    .get(
      'https://gonvar.inowu.dev/' + 'blogs/blogtitle/' + blogTitle,
      blogTitle,
    )
    .then((res) => {
      res.data.data[0].subTopic = res.data.subTopic;
      return res.data.data[0];
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const deleteBlogsApi = async (blog: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'blogs/deleteBlog', blog)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
