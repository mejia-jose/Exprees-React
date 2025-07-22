import {  Typography } from '@mui/material';
import type { ITitleProps } from '../types/components/titles.type';

export default function Titles({ text, variant='h4', component='h1', color }: ITitleProps)
{
    return(
      <Typography mb={3} variant={variant} component={component}>
        {text}
      </Typography>
    );
}