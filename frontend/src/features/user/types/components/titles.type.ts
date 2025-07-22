import type { TypographyProps } from "@mui/material/Typography";

export type ITitleProps =
{
   text: string;
   variant?: TypographyProps['variant'];
   component?: TypographyProps['component'];
   color?: TypographyProps['color']
}