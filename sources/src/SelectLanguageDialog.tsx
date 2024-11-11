import CheckRounded from '@mui/icons-material/CheckRounded';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemIcon,
  MenuItem,
  DialogActions,
  useTheme
} from '@mui/material';
import { languageCodes } from './consts';

export interface SelectLanguageDialogProps {
  open: boolean;
  language: string;
  onClose: () => void;
  onLanguageChange: (code: string) => void;
}

export default function SelectLanguageDialog(props: Readonly<SelectLanguageDialogProps>) {
  const { open, language, onClose, onLanguageChange } = props;
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        zIndex: theme.zIndex.modal + 1
      }}
    >
      <DialogTitle>Speech to Text Language</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
