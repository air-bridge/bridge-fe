import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  ListItemButton,
  ListItemText,
  List,
  AppBar,
  Divider,
  Toolbar,
  IconButton,
  InputLabel,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import { SwapHoriz } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const roles = [
  {
    name: "User",
    id: "1",
  },
  {
    name: "Admin",
    id: "2",
  },
  {
    name: "Finance",
    id: "3",
  },
  {
    name: "Regulator",
    id: "4",
  },
  {
    name: "Staff",
    id: "5",
  },
];

const entitiesOptions = [
  {
    label: "January",
    value: "1",
  },
  {
    label: "February",
    value: "2",
  },
  {
    label: "March",
    value: "3",
  },
  {
    label: "April",
    value: "4",
  },
  {
    label: "May",
    value: "5",
  },
  {
    label: "June",
    value: "6",
  },
  {
    label: "July",
    value: "7",
  },
  {
    label: "August",
    value: "8",
  },
  {
    label: "September",
    value: "9",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  },
];
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const PublicHomepage = () => {
  const [open, setOpen] = useState(false);
  const [openFullDialog, setOpenFullDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenFullDialog = () => {
    setOpenFullDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenFullDialog(false);
  };

  return (
    <Stack gap={2}>
      <Box>
        <Typography variant="h1">UI Components</Typography>
        <Typography variant="h2">Typography - H2</Typography>
        <Typography variant="h3">Typography - H3</Typography>
        <Typography variant="h4">Typography - H4</Typography>
        <Typography variant="h5">Typography - H5</Typography>
        <Typography variant="subtitle1">Typography - subtitle 1</Typography>
        <Typography variant="subtitle2">Typography - subtitle 2</Typography>
        <Typography variant="body1">Typography - Body 1</Typography>
        <Typography variant="body2">Typography - Body 2</Typography>
        <Typography variant="caption">Typography - Caption</Typography>
      </Box>

      <Stack direction="row" gap={1}>
        <Button variant="contained" color="primary" size="large">
          Primary button
        </Button>
        <Button variant="contained" color="info" size="small">
          Info button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary button
        </Button>
        <Button variant="contained" color="error">
          Error button
        </Button>
        <Button variant="contained" color="warning">
          Warning button
        </Button>
      </Stack>

      <Stack direction="row" gap={1}>
        <Button variant="outlined" color="primary" size="large">
          Primary button
        </Button>
        <Button
          startIcon={<SwapHoriz />}
          variant="outlined"
          color="info"
          size="small"
        >
          Info button
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary button
        </Button>
        <Button variant="outlined" color="error">
          Error button
        </Button>
        <Button variant="outlined" color="warning">
          Warning button
        </Button>
      </Stack>

      <Stack direction="row" gap={1}>
        <Card>
          <CardContent>
            <Typography variant="h3">Card Title</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, at atque cum dolorum in laboriosam laborum magni
              mollitia placeat ullam.
            </Typography>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="secondary">
              Secondary button
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>

      <Stack direction="row" gap={1}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
        <Alert severity="info">This is an info Alert.</Alert>
        <Alert severity="warning">This is a warning Alert.</Alert>
        <Alert severity="error">This is an error Alert.</Alert>
      </Stack>

      <Stack direction="row" gap={1}>
        <Alert variant="filled" severity="success">
          This is a filled success Alert.
        </Alert>
        <Alert variant="filled" severity="info">
          This is a filled info Alert.
        </Alert>
        <Alert variant="filled" severity="warning">
          This is a filled warning Alert.
        </Alert>
        <Alert variant="filled" severity="error">
          This is a filled error Alert.
        </Alert>
      </Stack>

      <Stack direction="row" gap={1}>
        <Box>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                size="large"
              >
                Disagree
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                size="large"
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box>
          <Button variant="outlined" onClick={handleClickOpenFullDialog}>
            Open full-screen dialog
          </Button>
          <Dialog
            fullScreen
            open={openFullDialog}
            onClose={handleClose}
            slotProps={{
              transition: Transition,
            }}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <List>
              <ListItemButton>
                <ListItemText primary="Phone ringtone" secondary="Titania" />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItemButton>
            </List>
          </Dialog>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <InputLabel htmlFor="firstName">AutoComplete Input</InputLabel>
          <Autocomplete
            multiple={false}
            autoHighlight
            options={entitiesOptions}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? entitiesOptions.find((o) => o.value === option)?.label ||
                  option
                : option.label
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <TextField
            fullWidth
            name="firstName"
            placeholder="First name"
            error={true}
            helperText="Provide first name"
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <TextField fullWidth name="lastName" placeholder="Last name" />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField fullWidth name="email" placeholder="Email address" />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <InputLabel htmlFor="role">Role</InputLabel>
          <TextField select fullWidth name="roleId" placeholder="Role">
            {roles.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Stack>
  );
};
