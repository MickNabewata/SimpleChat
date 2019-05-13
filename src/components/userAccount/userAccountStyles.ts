import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme : Theme) => 
  createStyles({
    avater : {
      background : `
        repeating-radial-gradient(
          circle at -1000% 0%,
          rgba(116, 77, 48, 0.7),
          #573216 7.5%,
          rgba(116, 77, 48, 0.9) 10%
        ),
        repeating-radial-gradient(
          circle at -1000% 0%,
          #573216,
          #573216 0.1%,
          #744d30 0.4%,
          #744d30 0.5%
        );
      `
    },
    progress : {
      color : 'brown'
    }
  });

export default styles;