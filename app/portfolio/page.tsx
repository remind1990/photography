import React from 'react';
import Portfolio from '../pages/Portfolio/Portfolio';
import { fetchPhotos } from '@/lib/fetchPhotos';

type Props = {};

const page = async (props: Props) => {
  return <Portfolio />;
};

export default page;
