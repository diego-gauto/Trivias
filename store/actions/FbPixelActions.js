import ReactPixel from 'react-facebook-pixel';

const advancedMatching = { }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};
ReactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, advancedMatching, options);



export const completeRegistrationEvent = () => {
  return async (dispatch) => {
      dispatch({ type: "COMPLETE_REGISTRATION_EVENT_START" });
      ReactPixel.track('CompleteRegistration');
      dispatch({ type: "COMPLETE_REGISTRATION_EVENT_SUCCESS" });
  };
};