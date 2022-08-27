import React, { useState } from "react";

import { CaretD, Label, Option, OptionContain, Selected, SelectContain } from "./Select.styled";

const Select = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Seleccionar Semana")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <CaretD />
      </Selected>
      {
        open == true &&
        <OptionContain>
          <Option onClick={() => { setValue("Semana 1"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada1"
              name="category"
              value="Temporada 1"
            />
            <Label > Semana 1</Label>
          </Option>
          <Option onClick={() => { setValue("Semana 2"); setOpen(false) }}>
            <input
              type="radio"
              id="Temporada2"
              name="category"
              value="Temporada 2"
            />
            <Label> Semana 2</Label>
          </Option>
        </OptionContain>
      }
    </SelectContain>
  )
}
export default Select;