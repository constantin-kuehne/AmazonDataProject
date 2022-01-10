import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Dispatch, SetStateAction, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

interface Source {
  product_title: string;
  asin: string;
}

const getProductTitles = async (searchTitle: string) => {
  const res = await fetch(
    `http://localhost:3001/completion/title?s=${searchTitle}`
  );
  return res.json() as Promise<Source[] | []>;
};

const Search = () => {
  const classes = useStyles();

  let timer: NodeJS.Timeout;

  const [searchResults, setSearchResults] = useState<null | Source[] | []>(
    null
  );

  const onChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getProductTitles(value).then((data: Source[]) => setSearchResults(data));
    }, 600);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Product ID"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search " }}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
