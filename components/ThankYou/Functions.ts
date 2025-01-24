export const redirectInfoToLesson = () => {
  const key = localStorage.getItem('lesson-redirect-info');
  return key;
};
