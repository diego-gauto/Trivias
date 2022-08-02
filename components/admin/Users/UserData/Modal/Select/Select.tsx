import React, { useState } from 'react'
import { Label, Option, OptionContain, SelectContain, Selected, CaretD } from './Select.styled'

const Select = () => {
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
          <Option onClick={() => { setValue("Curso 1"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada1"
              name="category"
              value="Temporada 1"
            />
            <Label > Curso 1</Label>
          </Option>
          <Option onClick={() => { setValue("Curso 2"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada2"
              name="category"
              value="Temporada 2"
            />
            <Label> Curso 2</Label>
          </Option>
        </OptionContain>
      }
    </SelectContain>
  )
}
export default Select;