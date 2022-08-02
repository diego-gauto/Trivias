import React, { useState } from 'react'
import { Label, Option, OptionContain, SelectContain, Selected, CaretD } from './SelectStyles.styled'

const ProfessorSelect = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Darth Vader, Grand Moff Tarkin")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <CaretD />
      </Selected>
      {
        open == true &&
        <OptionContain>
          <Option onClick={() => { setValue("Darth Vader, Grand Moff Tarkin"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada1"
              name="category"
              value="Temporada 1"
            />
            <Label > Darth Vader, Grand Moff Tarkin</Label>
          </Option>
          <Option onClick={() => { setValue("Yoda"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada2"
              name="category"
              value="Temporada 2"
            />
            <Label> Yoda</Label>
          </Option>
        </OptionContain>
      }
    </SelectContain>
  )
}
export default ProfessorSelect;