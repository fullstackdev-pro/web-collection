import React, {useEffect, useState} from 'react';
import UserReducer, {getusers, getUsersSearch, userdelete,saveusers,updateusers} from "../reducers/UserReducer";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap'
import {Link} from "react-router-dom"

function Users({getusers, UserReducer, getUsersSearch, userdelete,saveusers,updateusers}) {

    const [page, setPage] = useState(1);
    const [active, setActive] = useState(false);
    const [editId, setEditId] = useState(undefined);

    useEffect(() => {
        getUsers()
    }, [page,UserReducer.current])

    const pages = new Array(UserReducer.usersTotal).fill(null).map((v, i) => i)

    function prev() {
        setPage(prev => prev - 1)
    }

    function next() {
        setPage(prev => prev + 1)
    }

    const [search, setSearch] = useState('')

    function userSearch(e) {
        setPage(1)
        setSearch(e.target.value)
        getUsers()
    }

    function getUsers() {
        if (search === '') {
            getusers(page)
        } else {
            getUsersSearch(search, page)
        }
    }

    function UserDelete(id) {
        userdelete(id)
        getUsers()
    }

    const  {handleSubmit,setValue,register,resetField,formState:{errors}} = useForm()

    function editUser(id){
        toggle()
        setEditId(id)
         UserReducer.users.filter(item=>{
             if (item._id === id){
                 const {username,email} = item
                 setValue('username',username)
                 setValue('email',email)
                 setValue('password','')
             }
         })
    }

    function saveUser(data){
        if (editId === undefined) {
            saveusers(data)

        }
        else{
            updateusers({
                ...data,id:editId
            })

        }

        getUsers()
    }


    function toggle() {
        resetField('username')
        resetField('email')
        resetField('password')
        setActive(!active)
        setEditId(undefined)
    }

    useEffect(()=>{
        if(UserReducer.userToggle === true){
            setActive(false)
            setEditId(undefined)
        }
    },[UserReducer.current])

    return (
        <div className={'px-20 py-10 bg-blue-900'}>
            <h2 className={'text-center p-4 text-white text-4xl'}>Users</h2>
            <div className="overflow-x-auto relative dark:bg-gray-900  shadow-md sm:rounded-lg">
                <div className="pb-4 px-4 py-4 bg-white flex items-center justify-between dark:bg-gray-900 ">
                    <div>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input type="text" id="table-search" value={search} onChange={userSearch}
                                   className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search for users"/>
                        </div>
                    </div>
                    <button onClick={toggle}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-2 mb-2"
                    >Add User
                    </button>

                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Username
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        UserReducer.users.map(item =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.username}
                                </th>
                                <td className="py-4 px-6">
                                    {item.email}
                                </td>

                                <td className="py-4 px-6">
                                    <button onClick={()=>editUser(item._id)}
                                       className="font-medium mr-4 text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => UserDelete(item._id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
                <nav className="flex justify-center items-center pt-4  px-4 py-4" aria-label="Table navigation">

                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button disabled={page === 1 ? true : false} onClick={prev}
                                    className={`${page === 1 ? 'disabled:opacity-25' : ''} block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                        {pages.map(pageIndex =>
                            <li>
                                <button disabled={page === pageIndex + 1 ? true : false}
                                        onClick={() => setPage(pageIndex + 1)}
                                        className={`${page === pageIndex + 1 ? 'disabled:opacity-25' : ''} py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                    {pageIndex + 1}</button>
                            </li>
                        )}


                        <li>
                            <button onClick={next} disabled={page === UserReducer.usersTotal ? true : false}
                                    className={`${page === UserReducer.usersTotal ? 'disabled:opacity-25' : ''} block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {
                active ? <div id="users-modal" tabIndex="-1" aria-hidden="true"
                              className="backdrop-blur-xl overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div className="relative mt-10 left-1/3 p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                                 data-drawer-backdrop="true">
                                <button  type="button" onClick={toggle}
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="py-6 px-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                        {
                                            editId === undefined ? 'Add User' :'Edit User'
                                        }
                                    </h3>
                                    <form className="space-y-6" onSubmit={handleSubmit(saveUser)} >
                                        <div>
                                            <label htmlFor="username"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                                            <input type="text" id="username"
                                                {...register('username',{required:true})}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                  />
                                        </div>
                                        <div>
                                            <label htmlFor="email"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                            <input type="email" id="email"
                                                   {...register('email',{required:true})}

                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                   required/>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Password</label>
                                            <input type="text" id="password"                                                    {...register('email',{required:true})}
                                                   {...register('password',{required:editId ? false :true})}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                   />
                                        </div>
                                        <button type="submit"
                                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            {
                                                editId === undefined ? 'Save User' :'Update User'
                                            }
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
            }

        </div>

    );
}

export default connect(UserReducer, {getusers, getUsersSearch, userdelete,saveusers,updateusers})(Users);
