import React from 'react'
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
import { IReviewsSectionProps } from './IReviewsSection';

const ReviewsSection = (props: IReviewsSectionProps) => {
  const { reviewsSectionData } = props;
  const chunks = divideArrayInChunks(reviewsSectionData, 3);
  const getReviewElement = (review: any, num: number) => {
    return (
      <>
        <Inputs>
          <EditText>
            Reseñador {num}
          </EditText>
          <EditInput value={review.title} placeholder="Luke Skywalker" />
        </Inputs>
        <Inputs>
          <EditText>
            Evidencia Reseña {num}
          </EditText>
          <FolderInput type="file" placeholder="Seleccionar archivo" />
        </Inputs>
      </>
    )
  }
  const col1 = chunks[0].map((review: any, i: number) => {
    return getReviewElement(review, i + 1)
  });
  const col2 = chunks[0].map((review: any, i: number) => {
    return getReviewElement(review, i + 4)
  });
  const col3 = chunks[0].map((review: any, i: number) => {
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
        <SaveButton>
          Guardar
        </SaveButton>
      </EditButtons>
    </ProfileData>
  )
}

export default ReviewsSection