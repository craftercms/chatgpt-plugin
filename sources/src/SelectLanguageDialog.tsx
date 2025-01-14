import CheckRounded from '@mui/icons-material/CheckRounded';
import { Dialog, ListItemIcon, MenuItem } from '@mui/material';
import { languageCodes } from './consts';
import DialogHeader from '@craftercms/studio-ui/components/DialogHeader';
import DialogBody from '@craftercms/studio-ui/components/DialogBody';
import SecondaryButton from '@craftercms/studio-ui/components/SecondaryButton';
import DialogFooter from '@craftercms/studio-ui/components/DialogFooter';

export interface SelectLanguageDialogProps {
  open: boolean;
  language: string;
  onClose: () => void;
  onLanguageChange: (code: string) => void;
}

export default function SelectLanguageDialog(props: Readonly<SelectLanguageDialogProps>) {
  const { open, language, onClose, onLanguageChange } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader title="Speech to Text Language" />
      <DialogBody>
        {languageCodes.map((lc) => (
          <MenuItem
            key={lc.code}
            onClick={() => {
              onLanguageChange(lc.code);
              onClose();
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {lc.label}
            {language === lc.code && (
              <ListItemIcon>
                <CheckRounded fontSize="small" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </DialogBody>
      <DialogFooter>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      </DialogFooter>
    </Dialog>
  );
}
