import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme : Theme) => 
  createStyles({
    hello : {
      [theme.breakpoints.down('sm')] : {
        fontSize : 17
      },
      [theme.breakpoints.up('md')] : {
        fontSize : 20
      },
      lineHeight : 2
    },
    progress : {
      color : 'brown'
    },
    chatArea : {
      padding : '10px'
    },
    chatDispArea : {
      height : '500px',
      overflowY : 'scroll'
    },
    someOneIcon : {
      float: 'left',
      marginRight: '-50px',
      width: '40px'
    },
    someOneMessage : {
      width: '100%',
      margin: '20px 0',
      overflow: 'hidden'
    },
    someOneChatting : {
      width: '100%',
      textAlign : 'left'
    },
    someOneSays : {
      display: 'inline-block',
      position: 'relative',
      margin: '0 0 0 50px',
      padding: '10px',
      maxWidth: '250px',
      borderRadius: '12px',
      background: '#edf1ee',
      ['&:after'] : {
        content: '""',
        display: 'inline-block',
        position: 'absolute',
        top: '3px',
        left: '-19px',
        border: '8px solid transparent',
        borderRight: '18px solid #edf1ee',
        webkitTransform: 'rotate(35deg)',
        transform: 'rotate(35deg)'
      }
    },
    someOneSaysP : {
      margin: '0',
      padding: '0'
    },
    someOneInfo : {
      marginTop : '5px',
      marginLeft : '50px',
      fontSize : '10px'
      }
  });

export default styles;