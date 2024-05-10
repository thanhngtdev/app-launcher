import { useTheme } from '@mui/material';
import TypographyMui, { TypographyProps } from '@mui/material/Typography';

interface Props extends TypographyProps {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  isLink?: boolean;
}

const Typography = ({ sx, isLink, ...props }: Props) => {
  const theme = useTheme();

  return (
    <TypographyMui
      {...props}
      sx={{ color: isLink ? theme.palette.primary.main : undefined, ...sx }}
    >
      {props.children}
    </TypographyMui>
  );
};

export default Typography;
