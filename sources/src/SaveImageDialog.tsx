import React, { useEffect, useState } from 'react';
import { Dialog, TextField } from '@mui/material';
import { DialogBody, DialogFooter, DialogHeader } from '@craftercms/studio-ui/components';
import PathSelector from './PathSelector';
import SecondaryButton from '@craftercms/studio-ui/components/SecondaryButton';
import PrimaryButton from '@craftercms/studio-ui/components/PrimaryButton';
import { saveImage } from './util';

export interface SaveImageDialogProps {
  open: boolean;
  onClose?: () => void;
  url: string;
}

export default function SaveImageDialog(props: Readonly<SaveImageDialogProps>) {
  const { open, onClose, url } = props;

  const [name, setName] = useState('');
  const [path, setPath] = useState('/static-assets');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (url) {
      const baseUrl = url.split('?')[0];
      const defaultImageName = baseUrl.split('/').pop();
      setName(defaultImageName);
    }
  }, [url]);

  const handleSave = async () => {
    setProcessing(true);
    try {
      await saveImage({ path, name, url });
    } catch (error) {
      console.error('Failed to save image:', error);
    } finally {
      setProcessing(false);
      onClose?.();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader title="Save Image" />
      <DialogBody>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <PathSelector rootPath="/static-assets" value={path} onPathSelected={(path) => setPath(path)} />
      </DialogBody>
      <DialogFooter>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <PrimaryButton loading={processing} loadingPosition="start" onClick={handleSave}>
          Save
        </PrimaryButton>
      </DialogFooter>
    </Dialog>
  );
}
