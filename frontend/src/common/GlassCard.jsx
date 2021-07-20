import { Box, BoxProps, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import color from "color";

const useStyles = (c, blur) =>
  makeStyles((theme) => ({
    glass: {
      backgroundColor: color(c).alpha(0.4).toString(),
      backgroundImage: `linear-gradient(to bottom right, ${color(c)
        .alpha(0.2)
        .toString()}, ${color(c).alpha(0).toString()})`,
      backdropFilter: `blur(${blur}px)`,
      boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
    },
    glassBorders: {
      borderLeft: `solid 1px ${color(c).alpha(0.3).toString()}`,
    },
    glassRounded: {
      borderRadius: theme.spacing(2),
    },
  }));

export function GlassCard(props) {
  const {
    color = "#ffffff",
    blur,
    noBorders,
    square,
    className,
    ...rest
  } = props;
  const classes = useStyles(color, blur)();

  return (
    <Box
      className={clsx(classes.glass, className, {
        [classes.glassBorders]: !noBorders,
        [classes.glassRounded]: !square,
      })}
      {...rest}
    />
  );
}