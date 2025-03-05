import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProfilePage.module.css';
import { User } from '../types/user';

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('משתמש לא מחובר');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('שגיאה בטעינת נתוני משתמש');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>לא נמצאו נתונים</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img 
          src={user.profilePicture || 'https://placehold.co/150x150'} 
          alt={user.fullName} 
          className={styles.profilePicture}
        />
        <h2>{user.fullName}</h2>
        <p>{user.email}</p>
        {user.role && <p className={styles.role}>{user.role}</p>}
      </div>
    </div>
  );
}; 