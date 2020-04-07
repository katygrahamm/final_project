import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
// import { appointments } from "./data";

const theme = createMuiTheme({ palette: { type: "light", primary: blue } });


const getBorder = theme => (`1px solid ${
    theme.palette.type === 'light'
      ? lighten(fade(theme.palette.divider, 1), 0.88)
      : darken(fade(theme.palette.divider, 1), 0.68)
  }`);
  
  const DayScaleCell = props => (
    <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
  );
  
  const styles = theme => ({
    cell: {
      color: '#78909C!important',
      position: 'relative',
      userSelect: 'none',
      verticalAlign: 'top',
      padding: 0,
      height: 140,
      borderLeft: getBorder(theme),
      '&:first-child': {
        borderLeft: 'none',
      },
      '&:last-child': {
        paddingRight: 0,
      },
      'tr:last-child &': {
        borderBottom: 'none',
      },
      '&:hover': {
        backgroundColor: 'white',
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        outline: 0,
      },
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      alignItems: 'center',
    },
    text: {
      padding: '0.5em',
      textAlign: 'center',
    },
    opacity: {
      opacity: '0.5',
    },
    appointment: {
      borderRadius: '10px',
      '&:hover': {
        opacity: 0.5,
      },
    },
    apptContent: {
      '&>div>div': {
        whiteSpace: 'normal !important',
        lineHeight: 1.2,
      },
    },
    flexibleSpace: {
      flex: 'none',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    tooltipContent: {
      padding: theme.spacing(3, 1),
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      boxSizing: 'border-box',
      width: '400px',
    },
    tooltipText: {
      ...theme.typography.body2,
      display: 'inline-block',
    },
    title: {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightBold,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    icon: {
      color: theme.palette.action.active,
      verticalAlign: 'middle',
    },
    circle: {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
      verticalAlign: 'super',
    },
    textCenter: {
      textAlign: 'center',
    },
    dateAndTitle: {
      lineHeight: 1.1,
    },
    titleContainer: {
      paddingBottom: theme.spacing(2),
    },
    container: {
      paddingBottom: theme.spacing(1.5),
    },
  });
  
  const CellBase = React.memo(({
    classes,
    startDate,
    formatDate,
    otherMonth,
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: 'numeric', month: 'long' }
      : { day: 'numeric' };
    return (
      <TableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
        })}
      >
        <div className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </div>
      </TableCell>
    );
  });
  
  const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);
  
  const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      className={classes.appointment}
    />
  ));
  
  const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
    <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
  ));
  
  const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <div className={classes.flexContainer}>
        <LocalFloristIcon fontSize="large" htmlColor="#696969" />
        <h3 variant="h5" className="watering-schedule" color="#696969">Watering Schedule</h3>
      </div>
    </Toolbar.FlexibleSpace>
  ));

class Schedule extends Component {
  constructor(props) {
      super(props)
    
      this.state= {
        todaysDate: new Date()
      }
  }

  componentDidMount() {
   let userId = localStorage.getItem('userid')
   this.props.fetchEvents(userId)
  }

  render() {
      console.log(this.props.events)
    if (this.props.events == undefined) {
        return(
        <div>
            Loading...
            </div>
        )
    } else {
      console.log(this.props.events)
    return (
        <MuiThemeProvider theme={theme}>
         <Paper>
        <Scheduler
          data={this.props.events}
        >
          <EditingState
          />

          <ViewState
            defaultCurrentDate={this.state.todaysDate}
          />

          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />

          <Toolbar
            flexibleSpaceComponent={FlexibleSpace}
          />
          <DateNavigator/>

          <EditRecurrenceMenu />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm />
          <DragDropProvider />
        </Scheduler>
        </Paper>
        </MuiThemeProvider>
      );
    }
  }
}

function mapStateToProps(state) {
    return ({
      events: state.events,
      user: state.user
    })
  }
  
  export default connect(
    mapStateToProps,
    actions
  )(Schedule);