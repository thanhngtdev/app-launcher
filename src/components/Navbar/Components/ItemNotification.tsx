import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import React from 'react';

interface ItemData {
  avatar: string;
  title: string;
  code: string;
  time: string;
  read: boolean;
}

interface ItemNotificationProps {
  item: ItemData;
}

const sizeAva = 28;
const ItemNotification = (props: ItemNotificationProps) => {
  const { item } = props;
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', my: 1, px: 2 }}>
      <CommonStyles.Avatar src={item?.avatar} sx={{ width: sizeAva, height: sizeAva }} />
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 2,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <CommonStyles.Box maxWidth={250}>
          <CommonStyles.Typography sx={{ flexShrink: 1, fontWeight: '600', fontSize: '0.8rem' }}>
            {item.title}
          </CommonStyles.Typography>
          <CommonStyles.Typography
            sx={{ fontWeight: '400', fontSize: '0.6rem', color: theme.colors?.textGray }}
          >
            CASE: {item?.code}
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <CommonStyles.Typography sx={{ fontWeight: '400', fontSize: '0.8rem' }}>
            {item.time}
          </CommonStyles.Typography>
          {item?.read ? (
            <CommonStyles.Box
              sx={{ width: 6, height: 6, borderRadius: 6, backgroundColor: 'red', ml: 1 }}
            />
          ) : (
            <CommonStyles.Box
              sx={{ width: 6, height: 6, borderRadius: 6, backgroundColor: 'white', ml: 1 }}
            />
          )}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(ItemNotification);
