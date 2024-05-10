import React, { useEffect } from 'react';
import CommonStyles from 'components/CommonStyles';
import { EventListenerI, useAuth } from 'providers/AuthenticationProvider';
import { useTabHandler } from 'providers/TabHandlerProvider';

interface LauncherProps {
  idApp?: string;
  launchUri?: string;
}

const Launcher = ({ idApp, launchUri }: LauncherProps) => {
  //! State
  const auth = useAuth();
  const { onCloseTab } = useTabHandler();

  useEffect(() => {
    auth.eventListener((e: EventListenerI) => {
      const { action, idApp } = e.data;
      if (action === 'logout') {
        onCloseTab(idApp || '');
      }
    });
  }, []);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Launcher'
      sx={{
        overflow: 'hidden',
        height: 'calc(100vh - 48px)',
        width: '100%',
        '& > iframe': { height: '100% ', width: '100%' },
      }}
    >
      <iframe
        src={`${launchUri}?embedded=true&token=${auth.accessToken}&id=${idApp}` || ''}
        // src={`http://localhost:3001?token=${auth.accessToken}&id=${idApp}` || ''}
        frameBorder={0}
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock'
        allow='accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-write;'
      />
    </CommonStyles.Box>
  );
};

export default React.memo(Launcher);
