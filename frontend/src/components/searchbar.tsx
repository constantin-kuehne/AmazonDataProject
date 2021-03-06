import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { DocumentRequired } from "../types";
import { SearchOptions } from "../App";
import config from "../config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      padding: 0,
      margin: 0,
      marginLeft: 0,
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0.5, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: "8px",
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
      textAlign: "start",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    searchResultList: {
      overflowY: "scroll",
      maxHeight: "190px",
    },
    boxStyle: {
      width: "100%",
      maxWidth: 360,
      color: "inherit",
    },
  })
);

export type Source = Pick<
  DocumentRequired,
  "product_id" | "product_parent" | "product_title" | "product_category"
>;

const getProductTitles = async (searchString: string, search: string) => {
  const searchOption = search === "Product" ? "title" : "asin";
  const res = await fetch(
    `${config.url}/completion/${searchOption}?s=${searchString}&size=10`
  );
  return res.json() as Promise<Source[] | []>;
};

const Search = ({
  setSearchedProduct,
  search,
}: {
  setSearchedProduct: Dispatch<SetStateAction<null | Source>>;
  search: SearchOptions;
}) => {
  const classes = useStyles();

  let timer: NodeJS.Timeout;

  const [searchResults, setSearchResults] = useState<Source[] | []>([]);

  const onChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        getProductTitles(value, search).then((data: Source[]) =>
          setSearchResults(data)
        );
      },
      search === "Product" ? 100 : 600
    );
  };

  return (
    //Searchbar starts
    <div className={classes.search}>
      <div>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search " }}
          onChange={onChange}
        />
      </div>
      {searchResults.length >= 1 && (
        <Box classes={{ root: classes.boxStyle }}>
          <nav aria-label="main mailbox folders">
            <List
              classes={{
                root: classes.searchResultList,
              }}
            >
              {searchResults.map((ele, i) => (
                <ListItem
                  key={`${ele.product_id} - ${i}`}
                  onClick={() => setSearchedProduct(ele)}
                >
                  <ListItemButton key={`${ele.product_id} - ${i}`}>
                    <ListItemText
                      key={`${ele.product_id} - ${i}`}
                      primary={ele.product_title}
                      primaryTypographyProps={{
                        style: {
                          maxWidth: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      )}
    </div>
  );
};

export default Search;
