import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthToken } from '../components/features/Auth/SliceAuth'
import { fetchUserData, getUserData } from '../components/features/User/Slice'
import UserEditForm from '../components/features/User/EditForm'
import Account from '../components/features/Accounts/Accounts'

function Profile() {
    const dispatch = useDispatch()
    const [editToggle, setEditToggle] = useState(false)
    const user = useSelector(getUserData)
    const token = useSelector(getAuthToken)

    useEffect(() => {
        dispatch(fetchUserData(token))
    }, [dispatch, token])

    const handleClick = (e) => {
        e.preventDefault()
        setEditToggle(!editToggle)
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user.firstName} {user.lastName}
                </h1>
                {editToggle ? (
                    <UserEditForm
                        editToggle={editToggle}
                        setEditToggle={setEditToggle}
                    />
                ) : (
                    <button
                        className="edit-button"
                        onClick={(e) => handleClick(e)}
                    >
                        Edit Name
                    </button>
                )}
            </div>
            <Account />
        </main>
    )
}

export default Profile
