import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState({
        email:'',
        fullName : {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <div>
            <UserDataContext.Provider value={[user, setUser]}>  {/* //!  for data providing to pages accurately and we can use the data anywhere... */}
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext