import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import { Todo } from "../store/todoModel";

type TodoMenuProps = {
  todo: Todo,
  onEdit: () => void;
  onRemove: () => void;
};

const useStyles = makeStyles({
  more: {
    position: "absolute",
    top: "4px",
    right: "0px",
    color: "white",
  },
});

const TodoMenu = ({ todo, onEdit, onRemove }: TodoMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  return (
    <>
      <IconButton
        data-testid="todo-menu-trigger"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className={classes.more}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="todo-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        { !todo.done && <MenuItem data-testid="edit" onClick={onEdit}>Edit</MenuItem>}
        <MenuItem data-testid="remove" onClick={onRemove}>Remove</MenuItem>
      </Menu>
    </>
  );
};

export default TodoMenu;
