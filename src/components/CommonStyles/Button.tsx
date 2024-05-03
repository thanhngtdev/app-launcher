import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import CommonStyles from '.';

type TypeButton = IconButtonProps & LoadingButtonProps;
interface Props extends TypeButton {
  isIconButton?: boolean;
  component?: string;
}

const Button = ({ isIconButton, ...props }: Props) => {
  if (isIconButton) {
    return (
      <MuiIconButton {...props}>
        {props?.loading ? <CommonStyles.Loading /> : props.children}
      </MuiIconButton>
    );
  }

  return (
    <LoadingButton variant='contained' {...props}>
      {props.children}
    </LoadingButton>
  );
};

export default Button;
