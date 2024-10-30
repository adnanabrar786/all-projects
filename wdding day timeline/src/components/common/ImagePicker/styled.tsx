import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';

export const DropZoneContainer = styled.div`
  // flex: 1;
  display: flex;
  // flex-direction: column;
  align-items: center;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const ImagePickerContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  padding: 0px;
`;

export const MediaContainer = styled(Container)`
  display: flex !important;
  flex-flow: row wrap;
`;

export const ClosedIcon = styled(AiFillCloseCircle)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: large;
  color: white;
  background-color: red;
  // padding: 0.1rem 0.2rem;
  border-radius: 100%;
`;
