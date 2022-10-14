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
import { BaseURl } from "../AxiosApi";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { BiWindowClose } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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
  const [editActive, setEditActive] = useState(null);

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
        const {photo, title, desc } = item;
        setValue("photo", photo);
        setValue("title", title);
        setValue("desc", desc);
        setValue("password", "");
      }
    });
    setActive(false)
    setEditActive(null)
    getItems()
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
    setActive(false)
    setEditActive(null)
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
    <div className="mx-8 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative border-[1px] rounded-md bg-neutral-300">
      {ItemReducer.items.map((item) => (
        <div
          key={item._id}
          className="w-full p-4 border-[1px] rounded-md bg-stone-50"
        >
          <div className="pt-4  px-4 flex justify-center">
            <img
              src={BaseURl + item.photo}
              alt={item.title}
              className="h-[18rem] w-[18rem] rounded-md"
            />
          </div>
          <div className="p-4 pt-2 pb-0 text-2xl text-bold">{item.title}</div>
          <p className="px-4 py-2">{item.desc}</p>
          <div className="flex justify-end py-1">
            <AiOutlineEdit
              className="mx-2 cursor-pointer"
              onClick={() => {
                setEditActive(item._id);
              }}
            />
            <AiOutlineDelete
              className="mx-2 cursor-pointer"
              onClick={() => {
                ItemDelete(item._id);
              }}
            />
          </div>
        </div>
      ))}

      <div
        className="fixed right-8 bottom-8 cursor-pointer p-4 bg-green-600 rounded-full "
        title="Create new item"
        onClick={() => {
          setActive(!active);
        }}
      >
        <HiOutlineDocumentAdd className="w-8 h-8" />
      </div>

      <form
        className={
          active
            ? "fixed left-[35%] top-[15%] bg-black text-white p-8 w-[60vh]"
            : "hidden"
        }
        onSubmit={handleSubmit(saveItem)}
      >
        <div className="text-right">
          <button
            onClick={() => {
              setActive(!active);
            }}
          >
            <BiWindowClose className="w-5 h-5" />
          </button>
        </div>
        <label htmlFor="photo" className="text-lg">
          Add your photo
        </label>
        <br />
        <input type="file" id="photo" className="my-2 w-full" /> <br />
        <label htmlFor="title" className="text-lg">
          Add title
        </label>
        <br />
        <input
          type="text"
          id="title"
          className="w-full py-2 my-2 overflow-y-auto text-black px-2 rounded-md"
        />{" "}
        <br />
        <label htmlFor="desc" className="text-lg">
          Add Description
        </label>
        <br />
        <textarea
          type="text"
          id="desc"
          className="w-full py-2 my-2 overflow-y-auto text-black px-2 rounded-md "
        />
        <div className="text-right">
          <button
            className="bg-white text-black rounded-sm px-8 py-1 mt-2 "
            type="submit"
          >
            Create Item
          </button>
        </div>
      </form>

      <form
        className={
          editActive
            ? "fixed left-[35%] top-[15%] bg-black text-white p-8 w-[60vh]"
            : "hidden"
        }
        onSubmit={handleSubmit(() => {editItem(editActive)})}
      >
        <div className="text-right">
          <button
            onClick={() => {
              setEditActive(null);
              setActive(false)
            }}
          >
            <BiWindowClose className="w-5 h-5" />
          </button>
        </div>
        <label htmlFor="photo" className="text-lg">
          Edit your photo
        </label>
        <br />
        <input type="file" id="photo" className="my-2 w-full" /> <br />
        <label htmlFor="title" className="text-lg">
          Edit title
        </label>
        <br />
        <input
          type="text"
          id="title"
          className="w-full py-2 my-2 overflow-y-auto text-black px-2 rounded-md"
        />{" "}
        <br />
        <label htmlFor="desc" className="text-lg">
          Edit Description
        </label>
        <br />
        <textarea
          type="text"
          id="desc"
          className="w-full py-2 my-2 overflow-y-auto text-black px-2 rounded-md "
        />
        <div className="text-right">
          <button
            className="bg-white text-black rounded-sm px-8 py-1 mt-2 "
            type="submit"
          >
            Edit Item
          </button>
        </div>
      </form>
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
