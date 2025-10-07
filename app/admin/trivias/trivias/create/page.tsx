"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createTriviaApi } from '../../../../../components/api/trivias';
import ITrivia, { ITriviaResult } from '../../../../../interfaces/iTrivias';
import styles from './create.module.css';

const CreateTrivia = () => {
  const {
    container,
    inputGroup,
    inputGroupQuestion,
    inputGroupAnswers,
    inputGroupResult,
    button,
    buttonContainer,
  } = styles;

  // ...existing code...
  // (todo el cuerpo del componente CreateTrivia)

  // ...existing code...
};

export default CreateTrivia;
