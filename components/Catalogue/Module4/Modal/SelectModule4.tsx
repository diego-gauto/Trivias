import React, { useState } from 'react'
import { SelectContain, Selected, DropDown, OptionContain, Input, Label, Episodes, Option } from '../../Module3/Modal/Select.styled';

const SelectModule4 = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Temporada")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <DropDown />
      </Selected>
      {
        open == true &&
        <OptionContain>
          <Option onClick={() => { setValue("Temporada 1"); setOpen(false) }}>
            <Input
              type="radio"
              id="Temporada1"
              name="category"
              value="Temporada 1"
            />
            <Label > Temporada 1 <Episodes>(4 episodios) </Episodes></Label>
          </Option>
          <Option onClick={() => { setValue("Temporada 2"); setOpen(false) }}>
            <Input
              type="radio"
              id="Temporada2"
              name="category"
              value="Temporada 2"
            />
            <Label> Temporada 2<Episodes>(8 episodios)</Episodes></Label>
          </Option>
          <Option onClick={() => { setValue("Temporada 3"); setOpen(false) }}>
            <Input
              type="radio"
              id="Temporada3"
              name="category"
              value="Temporada 3"
            />
            <Label> Temporada 3<Episodes>(10 episodios)</Episodes></Label>
          </Option>
        </OptionContain>
      }
    </SelectContain>
  )
}
export default SelectModule4;