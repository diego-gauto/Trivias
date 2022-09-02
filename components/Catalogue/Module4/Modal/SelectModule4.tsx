import React, { useState } from 'react'
import { SelectContain, Selected, DropDown, OptionContain, Input, Label, Episodes, Option } from '../../Module3/Modal/Select.styled';

const SelectModule4 = ({ course, handleClick }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Temporada 1")
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value}
        <DropDown />
      </Selected>
      {
        open == true &&
        <OptionContain>
          {course.seasons.map((season: any, index: any) => {
            return (
              <Option onClick={() => { setValue(`Temporada ${index + 1}`); setOpen(false); handleClick(index) }}>
                <Input
                  type="radio"
                  id="Temporada1"
                  name="category"
                  value="Temporada 1"
                />
                <Label > Temporada {index + 1} {season.lessons.length == 1 && <Episodes>({season.lessons.length} episodio)
                </Episodes>}
                  {season.lessons.length > 1 && <Episodes>({season.lessons.length} episodios)
                  </Episodes>}
                </Label>
              </Option>
            )
          })}
        </OptionContain>
      }
    </SelectContain>
  )
}
export default SelectModule4;