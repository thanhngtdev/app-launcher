import React from 'react';
import TooltipMui, { TooltipProps } from '@mui/material/Tooltip';

function Tooltip({ children, ...props }: TooltipProps) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <TooltipMui
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      enterDelay={200}
      placement='top'
      arrow
      {...props}
    >
      <span>{children}</span>
    </TooltipMui>
  );
}

export default React.memo(Tooltip);
