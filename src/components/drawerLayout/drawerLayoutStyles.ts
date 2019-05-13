import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const drawerWidth = 240;

const styles = (theme : Theme) => 
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      backgroundImage : 'url("/appBar.jpg")',
      boxShadow : 'none'
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title:{
      [theme.breakpoints.up('md')]: {
        fontSize : 30
      },
      [theme.breakpoints.down('sm')]: {
        fontSize : 20
      },
      margin : '0 auto',
      fontFamily : 'Montserrat,' + theme.typography.fontFamily
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      zIndex : 0,
      backgroundImage : 'url("/sideMenu.jpg")',
      overflowX : 'hidden'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit,
      backgroundColor : 'whiteSmoke',
      minHeight : '100vh',
      border : '1px solid black'
    },
    linkItem : {
      backgroundColor : 'whiteSmoke',
      opacity : 0.9,
      margin : '5px',
      padding : '5px',
      '&:hover' : {
        backgroundColor : 'silver'
      }
    },
    selected : {
      backgroundColor : 'lightgray'
    },
    link : {
      textDecoration : 'none'
    },
    linkText : {
      fontSize : 14,
      color : theme.palette.secondary.dark
    },
    contactField : {
      backgroundColor : 'RGBA(255,255,255,0.7)',
      margin : '5px auto',
      padding : '10px',
      textAlign : 'center',
      width : '60%'
    },
    contactButton : {
      padding : 0,
      marginRight : '5px',
      marginLeft : '5px'
    },
    contactImage : {
      width : '100%',
      height : '100%'
    }
  });

export default styles;