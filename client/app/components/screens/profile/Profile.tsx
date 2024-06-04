// components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {CreateService} from "@/services/profile/create.service";

import { IUser } from '@/shared/types/user.types';
import { IUserOrders } from '@/shared/types/order.types';

import styles from './Profile.module.css'

const UserProfile = () => {
  const [user, setUser] = useState<IUser|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState<IUserOrders|null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userOrders = await CreateService.getUserOrders();
        setOrders(userOrders);

        const user = await CreateService.getProfile();
        setUser(user);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      <div className={styles.profileInfo}>
        <p><strong>Full Name:</strong> {user?.full_name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role?.name}</p>
      </div>
      <h2 className={styles.header}>Orders</h2>
      {orders?.orders.length > 0 ? (
        <ul>
          {orders?.orders.map((order) => (
            <li key={order.id} className={styles.info}>
              Order ID: {order.id}, Status: {order.status}, Amount: {order.total_amount}
              <ul>
                {order?.products_details?.map((pdetails) => (
                  <li key={pdetails.id} className={styles.info}>
                    Count: {pdetails.count}, Price: {pdetails.unit_price}
                    <ul>
                      <li key={pdetails.product.id} className={styles.info}>
                        Title: {pdetails.product.title}, Description: {pdetails.product.description}
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserProfile;
