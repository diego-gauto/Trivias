

import { IUser } from "../../../interfaces/IUserData";
import Anual from "./Anual";
import Ind_Anual from "./Ind_Anual";
import Individual from "./Individual";
import Mensual from "./Mensual";
import { PlanStyles } from "./Plans.styled";

const gPlus = "/images/pay_plans/G+.png"
const gStar = "/images/pay_plans/star green.png"
const pStar = "/images/pay_plans/star purple.png"

interface IData {
  user: IUser;
  selected: any;
}
export const Plans = (props: IData) => {
  const { user, selected } = props;

  return (
    <PlanStyles className="w-100">
      <div className="planes">
        <div className="row colors">
          {(selected === 1 || selected === 0) && <div className="col-sm-6 col-lg-3 my-3">
            {/* 1ero */}
            <Mensual user={user} />
          </div>}
          {/* Blue */}
          {(selected === 2 || selected === 0) && <div className="col-sm-6 col-lg-3 my-3">
            <Anual user={user} />
          </div>}
          {/* Green */}
          {(selected === 3 || selected === 0) && <div className="col-sm-6 col-lg-3 my-3">
            <Individual user={user} />
          </div>}
          {/* Ultimo */}
          {/* <div className="col-sm-6 col-lg-3 my-3">
            <Ind_Anual user={user} />
          </div> */}
        </div>
      </div>
    </PlanStyles>
  )
}
