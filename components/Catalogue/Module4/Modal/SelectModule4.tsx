import React, { useEffect, useState } from 'react'
import { SelectContain, Selected, DropDown, OptionContain, Input, Label, Episodes, Option } from '../../Module3/Modal/Select.styled';
import { IoIosArrowDown } from "react-icons/io";

const SelectModule4 = ({ course, handleClick, seasons }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(course.seasons[0]?.name)
  useEffect(() => {
    course.seasons.forEach((element: any) => {
      seasons.forEach((season: any) => {
        if (element.seasons == season.season) {
          element.name = season.name
        }
      });
    });
    setValue(course.seasons[0]?.name);
  }, [])

  return (
    <SelectContain>
      <Selected onClick={() => { setOpen(!open) }}>
        {value == undefined ? "Módulo 1" : value}
        <IoIosArrowDown />
      </Selected>
      {
        open == true &&
        <OptionContain>
          {course.seasons.map((season: any, index: any) => {
            return (
              <Option key={index + "season courses"} onClick={() => {
                season?.name == undefined
                  ? setValue(`Módulo ${index + 1}`)
                  : setValue(`${season.name}`)
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
                <p> {season?.name == undefined ? `Módulo ${index + 1}` : season.name}
                  {season.lessons.length == 1 &&
                    <span>
                      ({season.lessons.length} lección)
                    </span>
                  }
                  {
                    season.lessons.length > 1 &&
                    <span>
                      ({season.lessons.length} lecciónes)
                    </span>
                  }
                </p>
              </Option>
            )
          })}
        </OptionContain>
      }
    </SelectContain>
  )
}
export default SelectModule4;