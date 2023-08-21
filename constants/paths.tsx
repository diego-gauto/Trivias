export const RECOVERY_PATH = "/recuperar-contrasena";
export const LOGIN_PATH = "/auth/login"
export const SIGNIN_PATH = "/iniciar-sesion";
export const SIGNUP_PATH = "/auth/register";
export const REWARDS_PATH = "/rewards";
export const PROFILE_PATH = "/profile";
export const PREVIEW_PATH = "/preview";
export const LESSON_PATH = "/lesson";
export const PURCHASE_PATH = "/purchase";
export const CERTIFICATES_PATH = "/certificates"
export const BLOGS_PATH = "/Blogs"
export const PLAN_PATH = "/planes";
export const SIGNUP_PAST_USER_PATH = "/auth/RegisterPastUser";
export const NAILS_LANDING_REDIRECT = "/nails-master";
export const ANUAL_SUSCRIPTION_REDIRECT = "/suscripcion-anual";
//images
export const DEFAULT_USER_IMG = "/images/profile/default_img.png";
// temporary paths
export const ANUAL_FORM = `https://www.gonvar.io${PURCHASE_PATH}?type=subscription&frequency=anual`;
export const NAILS_FORM = `https://www.gonvar.io${PURCHASE_PATH}?type=course&id=${localStorage.getItem("course")}`;