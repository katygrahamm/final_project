import React from 'react'; 
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeIcon from '@material-ui/icons/Home';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EcoIcon from '@material-ui/icons/Eco';
import { Tooltip } from '@material-ui/core';




export const mainListItems = (
  <div>
    <Tooltip title="Spaces">
      <Link href="/my_spaces" color="inherit">
        <ListItem button>
          <ListItemIcon>
              <DashboardIcon/>
            </ListItemIcon>
          <ListItemText primary="Spaces" />
        </ListItem>
      </Link>
    </Tooltip>
    <Tooltip title="Wish List">
      <Link href="/wishlist" color="inherit">
        <ListItem button>
          <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
          <ListItemText primary="Wish List" />
        </ListItem>
      </Link>
    </Tooltip>
      <Tooltip title="Schedule">
        <Link href="/schedule" color="inherit">
          <ListItem button >
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItem>
      </Link>
    </Tooltip>
    <Tooltip title="Plant Library">
      <Link href="/plant_library" color="inherit">
        <ListItem button>
          <ListItemIcon>
              <LocalFloristIcon/>
            </ListItemIcon>
          <ListItemText primary="Plant Library" />
        </ListItem>
      </Link>
    </Tooltip>
  </div>
);
