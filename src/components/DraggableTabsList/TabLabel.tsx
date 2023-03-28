import * as React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';

const TabLabel = React.memo(
  ({
    label,
    isHideBorder,
    isClose,
    onCloseTab,
  }: {
    label: React.ReactNode;
    isHideBorder?: boolean;
    isActive?: boolean;
    isClose?: boolean;
    onCloseTab?: (event: React.MouseEvent<HTMLDivElement>) => void;
  }) => {
    const theme = useTheme();

    return (
      <CommonStyles.Box
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'center',
          borderRight: isHideBorder ? 0 : 1,
          pr: isHideBorder ? 0 : 2,
        }}
      >
        <CommonStyles.Typography variant='body2'>{label}</CommonStyles.Typography>

        {isClose && (
          <CommonStyles.Box
            onClick={onCloseTab}
            sx={{
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
              },
            }}
          >
            <CommonIcons.CloseIcon
              sx={{
                fontSize: 14,
                color: `${theme.colors?.grayLight} !important`,
              }}
            />
          </CommonStyles.Box>
        )}
      </CommonStyles.Box>
    );
  }
);

export default TabLabel;
