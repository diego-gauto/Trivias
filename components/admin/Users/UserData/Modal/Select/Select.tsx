import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react'
import { Label, Option, OptionContain, SelectContain, Selected, CaretD } from './Select.styled'

const Select = ({ courses, handleClick }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Elegir Curso")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <CaretD />
      </Selected>
      {
        open == true &&
        <OptionContain>
          {courses.map((x: DocumentData) => {
            return (
              <Option onClick={() => { setValue(x.courseTittle); setOpen(false); handleClick(x) }}>
                <input
                  type="radio"
                  id="Temporada1"
                  name="category"
                  value="Temporada 1"
                />
                <Label > Curso {x.courseTittle}</Label>
              </Option>
            )
          })}
        </OptionContain>
      }
    </SelectContain>
  )
}
export default Select;