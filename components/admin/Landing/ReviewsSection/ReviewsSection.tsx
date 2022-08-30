import React, { useState } from 'react'
import { saveReviewsData } from '../../../../store/actions/LandingActions';
import { divideArrayInChunks } from '../../../Home/Module5/helpers';
import {
  ColumnsContainer,
  ColumnsContainer2,
  EditButtons,
  EditInput,
  EditText,
  FolderInput,
  Inputs,
  ProfileData,
  SaveButton,
} from "../Landing.styled";
import { IReviewsSectionProps, Review } from './IReviewsSection';

const ReviewsSection = (props: IReviewsSectionProps) => {
  const { reviewsSectionData } = props;
  const [reviewsData, setReviewsData] = useState(reviewsSectionData)

  const updateState = (e: any, changedItemId: string, key: string) => {
    const newState = [...reviewsData]
    const changedItem: Review = newState.find(({ id }) => id === changedItemId)!
    // @ts-expect-error
    changedItem[key] = key === "file" ? e.target.files[0] : e.target.value
    setReviewsData(newState)
  }

  const onSave = async () => {
    const success = saveReviewsData(reviewsData)
    let alertText = "Cambios realizados correctamente"
    if (!success) {
      alertText = "Hubo un error"
    }
    alert(alertText)
  }

  const chunks = divideArrayInChunks(reviewsSectionData, 3);
  const getReviewElement = (review: any, num: number) => {
    return (
      <>
        <Inputs>
          <EditText>
            Reseñador {num}
          </EditText>
          <EditInput
            onChange={(e) => updateState(e, review.id, "title")}
            value={review.title}
            placeholder="Luke Skywalker"
          />
        </Inputs>
        <Inputs>
          <EditText>
            Evidencia Reseña {num}
          </EditText>
          <FolderInput
            onChange={(e) => updateState(e, review.id, "file")}
            type="file"
            placeholder="Seleccionar archivo"
          />
        </Inputs>
      </>
    )
  }
  const col1 = chunks[0].map((review: any, i: number) => {
    return getReviewElement(review, i + 1)
  });
  const col2 = chunks[1].map((review: any, i: number) => {
    return getReviewElement(review, i + 4)
  });
  const col3 = chunks[2].map((review: any, i: number) => {
    return getReviewElement(review, i + 7)
  });

  return (
    <ProfileData style={{ boxShadow: "none", background: "none" }}>
      <ColumnsContainer>
        <ColumnsContainer2>
          {col1}
        </ColumnsContainer2>
        <ColumnsContainer2>
          {col2}
        </ColumnsContainer2>
        <ColumnsContainer2>
          {col3}
        </ColumnsContainer2>
      </ColumnsContainer>
      <EditButtons>
        <SaveButton onClick={onSave}>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default ReviewsSection