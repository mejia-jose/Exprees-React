import {  Typography, type TypographyProps } from '@mui/material';

export type ITitleProps =
{
   text: string;
   variant?: TypographyProps['variant'];
   component?: TypographyProps['component'];
   color?: TypographyProps['color']
}
export default function Titles({ text, variant='h4', component='h1', color }: ITitleProps)
{
    return(
      <Typography mb={3} variant={variant} component={component}>
        {text}
      </Typography>
    );
}