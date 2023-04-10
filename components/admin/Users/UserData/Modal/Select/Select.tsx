import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react'
import { CaretD2 } from '../../../../Courses/Form/Select/SelectStyles.styled';
import { Label, Option, OptionContain, SelectContain, Selected, CaretD } from './Select.styled'

const Select = ({ courses, handleClick }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Elegir Curso")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <CaretD2 />
      </Selected>
      {
        open == true &&
        <OptionContain>
          {courses.map((x: DocumentData, index: number) => {
            return (
              <Option key={"course-product-" + index} onClick={() => { setValue(x.title); setOpen(false); handleClick(x) }}>
                <input
                  type="radio"
                  id="Temporada1"
                  name="category"
                  value="Temporada 1"
                />
                <Label > Curso {x.title}</Label>
              </Option>
            )
          })}
        </OptionContain>
      }
    </SelectContain>
  )
}
export default Select;