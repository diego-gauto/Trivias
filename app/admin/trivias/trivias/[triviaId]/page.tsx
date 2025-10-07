"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTriviaApi, updateTriviaApi } from '../../../../../components/api/trivias';
import ITrivia, { ITriviaResult } from '../../../../../interfaces/iTrivias';
import styles from './update.module.css';

const EditableTrivia = () => {
  // ...existing code...
};

export default EditableTrivia;
