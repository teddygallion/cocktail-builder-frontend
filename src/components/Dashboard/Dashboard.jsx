import { useEffect, useContext, useState } from "react";
import UserCocktails from '../UserCocktails/UserCocktails';
import { UserContext } from "../../contexts/UserContext";
import { index } from "../../services/userService";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await index();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Hey, {user?.username}!</h1>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search cocktails or ingredients..."
            className={styles.searchInput}
          />
        </div>
      </header>

      <section className={styles.categorySection}>
        <h3>Category</h3>
        <div className={styles.buttonGroup}>
          <Link to="/cocktails/new" className={styles.dashboardButton}>
            Add Drink
          </Link>
          <Link to="/cocktails" className={styles.dashboardButton}>
            Random
          </Link>
          <Link to="/favorites" className={styles.dashboardButton}>
            Favorites
          </Link>
        </div>
      </section>
      <section className={styles.userCocktails}>
        <h3>Your Created Cocktails</h3>
        <UserCocktails />
      </section>
    
    </main>
  );
};

export default Dashboard;
