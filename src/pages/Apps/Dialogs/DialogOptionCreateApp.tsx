import DialogMui from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI } from 'interfaces/common';
import { Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useTheme } from '@mui/material';

interface Props extends DialogI<any> {
  onClickOption: (option: { label: string; value: number; icon: any; disabled?: boolean }) => void;
}

const listOption = [
  {
    label: 'Create an External Web Application',
    value: 0,
    icon: CommonIcons.DownloadingIcon,
  },
  {
    label: 'AgencyCloud Functionality',
    value: 1,
    icon: CommonIcons.DownloadingIcon,
    disabled: true,
  },
  {
    label: 'Data / Portal / Reporting Feed',
    value: 2,
    icon: CommonIcons.DownloadingIcon,
    disabled: true,
  },
  { label: 'Website Feed', value: 3, icon: CommonIcons.DownloadingIcon, disabled: true },
  { label: 'Webservice to Platform', value: 4, icon: CommonIcons.DownloadingIcon, disabled: true },
];

const DialogOptionCreateApp = (props: Props) => {
  const { isOpen, toggle, onSubmit, onClickOption } = props;
  const theme = useTheme();

  return (
    <Formik
      initialValues={{ username: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {() => {
        return (
          <DialogMui open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            <Form>
              <DialogTitle>What do you want to do today?</DialogTitle>
              <DialogContent>
                <CommonStyles.Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
                  <CommonIcons.SettingsAccessibilityIcon sx={{ fontSize: 120 }} />

                  <CommonStyles.Typography>
                    First tell us about kind of app or integration you are building to ensure we get
                    you authenticated correctly. By selecting an option, relevant documentation and
                    links will appear on the right hand side of the page before progressing
                  </CommonStyles.Typography>
                </CommonStyles.Box>

                <CommonStyles.Box sx={{ width: '100%' }}>
                  {listOption.map((el) => {
                    return (
                      <CommonStyles.Button
                        variant='text'
                        key={el.value}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          p: 2,
                          mb: 2,
                          boxShadow: 2,
                          borderRadius: 1,
                          transition: '.3s',
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          color: theme.colors?.black,
                        }}
                        disabled={el?.disabled}
                        onClick={() => onClickOption(el)}
                        fullWidth
                      >
                        <el.icon />
                        <CommonStyles.Typography>{el.label}</CommonStyles.Typography>
                      </CommonStyles.Button>
                    );
                  })}
                </CommonStyles.Box>
              </DialogContent>
            </Form>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogOptionCreateApp;
