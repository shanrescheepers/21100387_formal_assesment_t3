import * as React from 'react';
import './App.scss';
import Axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

function App() {

  // move na n constants file toe in die toekoms, dit is dalk beter
  const genders = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
    {
      value: 'Both',
      label: 'Both',
    },
  ];

  // all jou object names meer specific
  const [open, setOpen] = React.useState(false);
  const [learnmore, setLearnmore] = React.useState({
    open: false,
    profile: {}
  })
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [account, setAccount] = React.useState({
    username: '',
    first: '',
    last: '',
    occupation: '',
  })

  const [profile, setProfile] = React.useState({
    age: '',
    sex: 'Male',
    height: '',
    weight: '',
    bmi: '',
    eyeColor: '',
    incomePm: '',
    interestedIn: 'Male',
  })

  const [stindee, setStindee] = React.useState({
    ...account,
    profile: {
      ...profile
    }
  });

  const [profiles, setProfiles] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLearnmoreOpen = (user) => {
    setLearnmore({
      open: true,
      profile: user
    })
  }

  const handleLearnmoreClose = () => {
    setLearnmore({
      open: false,
      profile: {}
    })
  }

  const handleAccountChange = (event) => {
    const value = event.target.value;
    setAccount({
      ...account,
      [event.target.name]: value
    });

    setStindee({
      ...account,
      profile: {
        ...profile
      }
    })
  };

  const handleProfileChange = (event) => {
    const value = event.target.value;
    setProfile({
      ...profile,
      [event.target.name]: value
    });

    setStindee({
      ...account,
      profile: {
        ...profile
      }
    })
  };

  const handleSubmit = () => {

    const currentBMI = (profile.weight / profile.height / profile.height) * 10000
    stindee.profile.bmi = currentBMI.toFixed(1);

    Axios.post('http://localhost:5000/stinderee', stindee).then(() => {
      setOpenSnackbar(true)

      Axios.get('http://localhost:5000/stinderees').then((response) => {
        setProfiles(response.data)
      })
    }).catch(err => {
      alert(err)
    }).finally(() => {
      setOpen(false)
    });
  }

  React.useEffect(() => {
    Axios.get('http://localhost:5000/stinderees').then((response) => {
      setProfiles(response.data)
    })
  }, []);

  // move in components in
  return (
    <div className="App">
      <Box>
        <AppBar position="static">
          <Toolbar className='toolbar'>
            <Typography variant="h6" component="div" >
              STINDER
            </Typography>
            <span className='toolbar__spacer'></span>
            <Button variant="outlined" color="inherit" onClick={handleClickOpen}>ADD STINDEE</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='profile-grid'>
        {profiles.map((user, idx) => (
          <Card key={idx}>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {user?.username}
              </Typography>
              <Typography >
                {user?.first} {user?.last}
              </Typography>
              <Typography color="text.secondary">
                {user?.profile.sex}, {user?.profile.age}
              </Typography>
              <Typography variant="body2">
                {user?.occupation}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleLearnmoreOpen(user)}>Learn More</Button>
            </CardActions>
          </Card>
        ))}

      </div>
      <Dialog open={learnmore.open} onClose={handleLearnmoreClose}>
        <DialogTitle>{learnmore.profile.username}'s profile</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Height: {learnmore.profile.profile?.height} cm
          </Typography>
          <Typography variant="body2">
            Weight: {learnmore.profile.profile?.weight} kg
          </Typography>
          <Typography variant="body2">
            BMI: {learnmore.profile.profile?.bmi}
          </Typography>
          <Typography variant="body2">
            Eye Color: {learnmore.profile.profile?.eyeColor}
          </Typography>
          <Typography variant="body2">
            Income p/m: {learnmore.profile.profile?.incomePm}
          </Typography>
          <Typography variant="body2">
            Interested in: {learnmore.profile.profile?.interestedIn}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLearnmoreClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Stindee</DialogTitle>
        <DialogContent>
          <DialogTitle>Account Details</DialogTitle>
          <TextField
            margin="normal"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={account.username}
            onChange={handleAccountChange}
          />
          <TextField
            margin="normal"
            name="first"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={account.first}
            onChange={handleAccountChange}
          />
          <TextField
            margin="normal"
            name="last"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={account.last}
            onChange={handleAccountChange}
          />
          <TextField
            margin="normal"
            name="occupation"
            label="Occupation"
            type="text"
            fullWidth
            variant="outlined"
            value={account.occupation}
            onChange={handleAccountChange}
          />
          <DialogTitle>Profile Details</DialogTitle>
          <TextField
            margin="normal"
            name="age"
            label="Age"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.age}
            onChange={handleProfileChange}
          />
          <TextField
            name="sex"
            select
            label="Gender"
            margin="normal"
            fullWidth
            value={profile.sex}
            onChange={handleProfileChange}
          >
            {genders.filter(gender => gender.value !== "Both").map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            name="height"
            label="Height"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.height}
            onChange={handleProfileChange}
          />
          <TextField
            margin="normal"
            name="weight"
            label="Weight"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.weight}
            onChange={handleProfileChange}
          />
          <TextField
            margin="normal"
            name="eyeColor"
            label="Eye Color"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.eyeColor}
            onChange={handleProfileChange}
          />
          <TextField
            margin="normal"
            name="incomePm"
            label="Income p/m"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.incomePm}
            onChange={handleProfileChange}
          />
          <TextField
            select
            margin="normal"
            name="interestedIn"
            label="Interested In"
            type="text"
            fullWidth
            variant="outlined"
            value={profile.interestedIn}
            onChange={handleProfileChange}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Stindee Created!"
      />
    </div>
  );
}

export default App;
