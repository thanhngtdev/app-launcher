import { IconButton } from '@mui/material';
import AvatarMui, { AvatarProps } from '@mui/material/Avatar';
import CommonIcons from 'components/CommonIcons';
import { useLayoutEffect, useState } from 'react';
import CommonStyles from '.';

interface Props extends AvatarProps {
  id?: string;
  isEdit?: boolean;
  onChangeImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Avatar(props: Props) {
  const { isEdit, onChangeImage, sx, id, ...restProps } = props;
  const [size, setSize] = useState({ width: 0, height: 0, borderRadius: '' });

  useLayoutEffect(() => {
    const avatarDOM = document.querySelector(`.avatar-${id}`);
    if (avatarDOM) {
      const { width, height } = avatarDOM.getBoundingClientRect();
      const { borderRadius } = window.getComputedStyle(avatarDOM);

      setSize({ width, height, borderRadius });
    }
  }, [id]);

  if (isEdit) {
    return (
      <CommonStyles.Box
        sx={{
          width: size.width,
          height: size.height,
          borderRadius: size.borderRadius,
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            cursor: 'pointer',
            '& .overlay': {
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <CommonStyles.Box
          className='overlay'
          sx={{
            transition: '.3s',
            width: '100%',
            height: '100%',
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.8)',
            transform: 'translateY(100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9,
          }}
        >
          <IconButton color='primary' aria-label='upload-picture' component='label'>
            <input hidden accept='image/*' type='file' onChange={onChangeImage} />
            <CommonIcons.EditIcon fontSize='small' />
          </IconButton>
        </CommonStyles.Box>
        <AvatarMui
          className={`avatar-${id || ''}`}
          sx={{
            ...sx,
          }}
          {...restProps}
        />
      </CommonStyles.Box>
    );
  }

  return <AvatarMui {...props} />;
}

export default Avatar;
