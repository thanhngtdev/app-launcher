import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { FastField, useFormikContext } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { AppIntegration } from 'interfaces/apps';
import { file2Base64 } from 'helpers';

interface Tab1Props {
  value: number;
}

const Tab1 = ({ value }: Tab1Props) => {
  //! State
  const { values, setFieldValue } = useFormikContext<AppIntegration>();

  //! Function

  //! Render
  return (
    <CommonStyles.TabPanel value={value} index={value}>
      <CommonStyles.Box
        sx={{
          '& > div': {
            mb: 3,
          },
        }}
      >
        <CommonStyles.Box sx={{ display: 'flex', gap: 5 }}>
          <CommonStyles.Avatar
            id='logo-icon'
            isEdit
            sx={{ width: 60, height: 60 }}
            src={file2Base64(values.icon)}
            onChangeImage={(e) => {
              const file = e?.target?.files?.[0];
              if (file) {
                setFieldValue('icon', file);
              }
            }}
          />
          <CommonStyles.Box sx={{ flexGrow: 1 }}>
            <FastField component={TextField} required name='name' label='Name' fullWidth />

            <CommonStyles.Box sx={{ display: 'flex', gap: 4, mb: 2, mt: 2 }}>
              <FastField
                component={TextField}
                required
                name='supportEmail'
                label='Support Email'
                fullWidth
              />
              <FastField
                component={TextField}
                required
                name='phone'
                label='Number Phone'
                fullWidth
              />
              <FastField
                component={TextField}
                required
                name='homepage'
                label='Homepage'
                fullWidth
              />
              <FastField
                component={TextField}
                required
                name='launchUri'
                label='Launch URI'
                fullWidth
              />
            </CommonStyles.Box>

            <CommonStyles.Box sx={{ display: 'flex', gap: 4 }}>
              <FastField
                component={TextField}
                required
                name='termsConditionsUri'
                label='Terms & Conditions URI'
                fullWidth
              />

              <FastField
                component={TextField}
                required
                name='privacyPolicyUri'
                label='Privacy & Policy URI'
                fullWidth
              />
              <FastField
                component={TextField}
                required
                name='loginRedirectUri'
                label='Login Redirect URI'
                fullWidth
              />
              <FastField
                component={TextField}
                required
                name='logoutRedirectUri'
                label='Logout Redirect URI'
                fullWidth
              />
            </CommonStyles.Box>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <FastField component={TextField} required name='scopes' label='Scope' fullWidth />
        <FastField component={TextField} required name='summary' label='Summary' fullWidth />
        <FastField
          component={TextField}
          required
          multiline
          name='description'
          label='Description'
          fullWidth
        />
        {/* <FastField component={SwitchField} name='isLive' label='Live' /> */}
      </CommonStyles.Box>
    </CommonStyles.TabPanel>
  );
};

export default React.memo(Tab1);
