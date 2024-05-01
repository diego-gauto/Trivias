import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ISeason, ISelect, ISeasons } from './ISelectModule';
import {
  SelectContain,
  Selected,
  OptionContain,
  Input,
  Option,
} from './SelectModule.styled';

const SelectModule4 = (props: ISelect) => {
  const { course, handleClick, seasons } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(course.seasons[0]?.name);
  const selectRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      // Click occurred outside of the component
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    course.seasons.forEach((element: ISeason) => {
      seasons.forEach((season: ISeasons) => {
        if (element.seasons == season.season) {
          element.name = season.name;
        }
      });
    });
    setValue(course.seasons[0]?.name);
  }, []);

  return (
    <SelectContain ref={selectRef}>
      <Selected
        onClick={() => {
          setOpen(!open);
        }}
      >
        {value == undefined ? 'Módulo 1' : value}
        <IoIosArrowDown />
      </Selected>
      {open == true && (
        <OptionContain>
          {course.seasons.map((season: any, index: any) => {
            return (
              <Option
                key={index + 'season courses'}
                onClick={() => {
                  season?.name == undefined
                    ? setValue(`Módulo ${index + 1}`)
                    : setValue(`${season.name}`);
                  setOpen(false);
                  handleClick(index);
                }}
              >
                <Input
                  type='radio'
                  id='Temporada1'
                  name='category'
                  value='Temporada 1'
                />
                <p>
                  {' '}
                  {season?.name == undefined
                    ? `Módulo ${index + 1}`
                    : season.name}
                  {season.lessons.length == 1 && (
                    <span>({season.lessons.length} lección)</span>
                  )}
                  {season.lessons.length > 1 && (
                    <span>({season.lessons.length} lecciones)</span>
                  )}
                </p>
              </Option>
            );
          })}
        </OptionContain>
      )}
    </SelectContain>
  );
};
export default SelectModule4;
