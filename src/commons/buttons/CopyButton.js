import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton, Tooltip } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
      <Tooltip title={copied ? 'Copié !' : 'Copier dans votre presse-papier'} placement="top">
        <IconButton>
          <FileCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyButton;
