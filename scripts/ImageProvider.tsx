(""); // ############################ BACKGROUND ################################

(""); // ############################ BG TRANSITION ################################
import white_in_01 from "../theme/images/bg_transition/white_in_01.png";

(""); // ############################ SHAPE ################################
import ink_purple from "../theme/images/shape/ink_purple.png";
import ink_blue from "../theme/images/shape/ink_blue.png";
import ribbon_purple from "../theme/images/shape/ribbon_purple.png";

(""); // ############################ ITEM ################################
import homescreen_01 from "../theme/images/item/homescreen_01.png";
import bag from "../theme/images/item/bag.png";
import face_smiling from "../theme/images/item/face_smiling.png";
import globe_americas from "../theme/images/item/globe_americas.png";
import hand_wave from "../theme/images/item/hand_wave.png";
import person_crop from "../theme/images/item/person_crop.png";
import person_sequence from "../theme/images/item/person_sequence.png";

(""); // ############################ ICON ################################
import arrow from "../theme/images/icon/arrow.png";
import book from "../theme/images/icon/book.png";
import dialogue from "../theme/images/icon/dialogue.png";
import gonvar_logo_white from "../theme/images/icon/gonvar_logo_white.png";
import users from "../theme/images/icon/users.png";

/** An Image Provider object containing all static images and media. */
const ImageProvider = {
  /** Entire background image (usually large images) */
  background: {},

  /** Shapes exclusivelly used for transitioning from a background to another (usually long rectangle-shaped images) */
  bg_transition: {
    white_in_01,
  },

  /** Mini background elements (usually medium images) */
  shape: {
    ink_purple,
    ink_blue,
    ribbon_purple,
  },

  /** Unique and quite specific images only used once or twice per page (usually medium images) */
  item: {
    homescreen_01,
    bag,
    face_smiling,
    globe_americas,
    hand_wave,
    person_crop,
    person_sequence,
  },

  /** Similar to items, but far more common, simple, and not exclusive to this website (usually small images) */
  icon: {
    gonvar_logo_white,
    arrow,
    users,
    dialogue,
    book,
  },
};

export default ImageProvider;
