import React, { useState } from 'react'
import { Label, Option, OptionContain, SelectContain, Selected, CaretD } from './SelectStyles.styled'

const CategorySelect = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Uñas de salón")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <CaretD />
      </Selected>
      {
        open == true &&
        <OptionContain>
          <Option onClick={() => { setValue("Uñas de salón"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada1"
              name="category"
              value="Temporada 1"
            />
            <Label > Uñas de salón</Label>
          </Option>
          <Option onClick={() => { setValue("Uñas francesas"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada2"
              name="category"
              value="Temporada 2"
            />
            <Label> Uñas francesas</Label>
          </Option>
        </OptionContain>
      }
    </SelectContain>
  )
}
export default CategorySelect;