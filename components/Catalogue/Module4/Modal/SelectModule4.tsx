import React, { useState } from 'react'
import { SelectContain, Selected, DropDown, OptionContain, Input, Label, Episodes, Option } from '../../Module3/Modal/Select.styled';

const SelectModule4 = ({ course, handleClick, seasons }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(seasons[0]?.name)
  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value == undefined ? "Temporada 1" : value}
        <DropDown />
      </Selected>
      {
        open == true &&
        <OptionContain>
          {course.seasons.map((season: any, index: any) => {
            return (
              <Option key={index + "season courses"} onClick={() => {
                seasons[index]?.name == undefined
                  ? setValue(`Temporada ${index + 1}`)
                  : setValue(`${seasons[index].name}`)
                  ;
                setOpen(false);
                handleClick(index)
              }}>
                <Input
                  type="radio"
                  id="Temporada1"
                  name="category"
                  value="Temporada 1"
                />
                <Label > {seasons[index]?.name == undefined ? `Temporada ${index + 1}` : seasons[index].name} {season.lessons.length == 1 && <Episodes>({season.lessons.length} episodio)
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