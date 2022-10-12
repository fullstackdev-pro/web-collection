import React, { useEffect, useState } from "react";
import ItemReducer, {
  getitems,
  getItemsSearch,
  itemdelete,
  saveitems,
  updateitems,
} from "../reducers/ItemReducer";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

function Items({
  getitems,
  ItemReducer,
  getItemsSearch,
  itemdelete,
  saveitems,
  updateitems,
}) {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(false);
  const [editId, setEditId] = useState(undefined);

  useEffect(() => {
    getItems();
  }, [page, ItemReducer.current]);

  const pages = new Array(ItemReducer.itemsTotal).fill(null).map((v, i) => i);

  function prev() {
    setPage((prev) => prev - 1);
  }

  function next() {
    setPage((prev) => prev + 1);
  }

  const [search, setSearch] = useState("");

  function itemSearch(e) {
    setPage(1);
    setSearch(e.target.value);
    getItems();
  }

  function getItems() {
    if (search === "") {
      getitems(page);
    } else {
      getItemsSearch(search, page);
    }
  }

  function ItemDelete(id) {
    itemdelete(id);
    getItems();
  }

  const {
    handleSubmit,
    setValue,
    register,
    resetField,
    formState: { errors },
  } = useForm();

  function editItem(id) {
    toggle();
    setEditId(id);
    ItemReducer.items.filter((item) => {
      if (item._id === id) {
        const { username, email } = item;
        setValue("username", username);
        setValue("email", email);
        setValue("password", "");
      }
    });
  }

  function saveItem(data) {
    if (editId === undefined) {
      saveitems(data);
    } else {
      updateitems({
        ...data,
        id: editId,
      });
    }

    getItems();
  }

  function toggle() {
    resetField("username");
    resetField("email");
    resetField("password");
    setActive(!active);
    setEditId(undefined);
  }

  useEffect(() => {
    if (ItemReducer.itemToggle === true) {
      setActive(false);
      setEditId(undefined);
    }
  }, [ItemReducer.current]);

  console.log(ItemReducer.items);

  return (
    <div>
      {ItemReducer.items.map((item, id) => (
        <div key={id}>
          {item.photo}
          {item.title}
          {item.desc}
        </div>
      ))}
    </div>
  );
}

export default connect(ItemReducer, {
  getitems,
  getItemsSearch,
  itemdelete,
  saveitems,
  updateitems,
})(Items);
