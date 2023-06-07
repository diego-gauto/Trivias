

import Anual from "./Anual";
import Ind_Anual from "./Ind_Anual";
import Individual from "./Individual";
import Mensual from "./Mensual";
import { PlanStyles } from "./Plans.styled";

const gPlus = "/images/pay_plans/G+.png"
const gStar = "/images/pay_plans/star green.png"
const pStar = "/images/pay_plans/star purple.png"

export const Plans = () => {

  return (
    <PlanStyles className="w-100">
      <div className="plans">
        <div className="row colors">
          <div className="col-sm-6 col-lg-3 my-3">
            {/* 1ero */}
            <Mensual />
          </div>
          {/* Blue */}
          <div className="col-sm-6 col-lg-3 my-3">
            <Anual />
          </div>
          {/* Green */}
          <div className="col-sm-6 col-lg-3 my-3">
            <Individual />
          </div>
          {/* Ultimo */}
          <div className="col-sm-6 col-lg-3 my-3">
            <Ind_Anual />
          </div>
        </div>
      </div>
    </PlanStyles>
  )
}
