

import { IUser } from "../../../interfaces/IUserData";
import Anual from "./Anual";
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
  console.log(selected);
  return (
    <PlanStyles className="w-100">
      <div className="planes">
        <div className="row colors" style={{ justifyContent: "space-around" }}>
          {/* {(selected === 0 || selected === 1) &&
            <div className="col-sm-6 col-lg-3 my-3 month">
              <Mensual user={user} />
            </div>} */}
          {(selected === 0 || selected === 2) &&
            <div className="col-sm-6 col-lg-3 my-3 year">
              <Anual user={user} />
            </div>}

          {(selected === 0 || selected === 3) &&
            <div className="col-sm-6 col-lg-3 my-3 ind">
              <Individual user={user} />
            </div>}

          {(selected === 0 || selected === 4) &&
            ''}
          {/* <div className="col-sm-6 col-lg-3 my-3 ind-y">
            <Ind_Anual />
          </div> */}
        </div>
      </div>
    </PlanStyles>
  )
}
