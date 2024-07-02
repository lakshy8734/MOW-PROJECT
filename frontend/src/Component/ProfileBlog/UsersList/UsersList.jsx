import React, { useState } from "react";
import styles from "./UsersList.module.css";
import zen from '../../assets/Default.webp';

const usersData = [
    { id: 1, name: 'User One', lastActive: '1 day ago', friendsCount: 10 },
    { id: 2, name: 'User Two', lastActive: '2 days ago', friendsCount: 5 },
    { id: 3, name: 'User Three', lastActive: '3 days ago', friendsCount: 8 },
    { id: 4, name: 'User Four', lastActive: '4 days ago', friendsCount: 12 },
    { id: 5, name: 'User Five', lastActive: '5 days ago', friendsCount: 20 },
    { id: 6, name: 'User Six', lastActive: '6 days ago', friendsCount: 15 },
    { id: 7, name: 'User Seven', lastActive: '7 days ago', friendsCount: 18 },
    { id: 8, name: 'User Eight', lastActive: '8 days ago', friendsCount: 22 },
    { id: 9, name: 'User Nine', lastActive: '9 days ago', friendsCount: 7 },
    { id: 10, name: 'User Ten', lastActive: '10 days ago', friendsCount: 3 },
];

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    // Calculate the total number of pages
    const totalPages = Math.ceil(usersData.length / usersPerPage);

    // Get the users for the current page
    const currentUsers = usersData.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.contex}>
            <div className={styles.cards}>
                {currentUsers.map((user) => (
                    <div key={user.id} className={styles.card}>
                        <img src={zen} alt="Profile" className={styles.profileImg} />
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.lastActive}>{user.lastActive}</p>
                        <p className={styles.friends}>{user.friendsCount} Friends</p>
                        <button className={styles.addFriendBtn}>Add Friend</button>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    &larr;
                </button>
                <span>{currentPage} ... {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default UsersList;
