import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { IProps } from "./IProps";
import { Button } from "../Lessons.styled";
import { Input, Label } from "../CourseForm_Create.styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { editSeasonName } from "../../../../../store/actions/AdminActions";

const formSchema = yup.object().shape({
  seasonName: yup
    .string()
    .required("Campo requerido"),
});

type FormValues = {
  seasonName: string;
};

const SeasonEditModal = (props: IProps) => {
  const {
    courseID,
    seasonID,
    currentName,
    onClose,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  useEffect(() => {
    reset({ seasonName: currentName });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    await editSeasonName(courseID, seasonID, formData.seasonName);
    onClose();
  }

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>Editar {currentName}</Modal.Title>
      </Modal.Header>

      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <Modal.Body>
          <Label>Nombre</Label>
          <Input
            placeholder="Nombre del curso"
            type="text"
            className={`form-control ${errors.seasonName && 'is-invalid'}`}
            {...register("seasonName")}
          />
          <div className="invalid-feedback">
            {errors.seasonName?.message}
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* @ts-expect-error */}
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </Modal.Footer>
      </form>
    </Modal >
  )
}

export default SeasonEditModal;
