// src/api/adminApi.js

import api from "./axios";

/*
========================================
DASHBOARD
========================================
*/

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

/*
========================================
USERS
========================================
*/

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const getSingleUser = async (id) => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

export const updateUserRole = async (
  userId,
  role
) => {
  const res = await api.put(
    `/admin/users/${userId}/role`,
    { role }
  );

  return res.data;
};

export const deleteUser = async (
  userId
) => {
  const res = await api.delete(
    `/admin/users/${userId}`
  );

  return res.data;
};

/*
========================================
ITEMS
========================================
*/

export const getAllItemsAdmin =
  async () => {
    const res = await api.get(
      "/admin/items"
    );

    return res.data;
  };

export const getSingleItemAdmin =
  async (itemId) => {
    const res = await api.get(
      `/admin/items/${itemId}`
    );

    return res.data;
  };

export const deleteItemAdmin =
  async (itemId) => {
    const res = await api.delete(
      `/admin/items/${itemId}`
    );

    return res.data;
  };

export const markItemRecovered =
  async (itemId) => {
    const res = await api.put(
      `/admin/items/${itemId}/recovered`
    );

    return res.data;
  };

/*
========================================
MESSAGES
========================================
*/

export const getAllMessages =
  async () => {
    const res = await api.get(
      "/admin/messages"
    );

    return res.data;
  };

export const deleteMessage =
  async (messageId) => {
    const res = await api.delete(
      `/admin/messages/${messageId}`
    );

    return res.data;
  };

/*
========================================
SEARCH
========================================
*/

export const searchUsers =
  async (keyword) => {
    const res = await api.get(
      `/admin/users/search?keyword=${keyword}`
    );

    return res.data;
  };

export const searchItems =
  async (keyword) => {
    const res = await api.get(
      `/admin/items/search?keyword=${keyword}`
    );

    return res.data;
  };

/*
========================================
REPORTS
========================================
*/

export const getLostItems =
  async () => {
    const res = await api.get(
      "/admin/reports/lost"
    );

    return res.data;
  };

export const getFoundItems =
  async () => {
    const res = await api.get(
      "/admin/reports/found"
    );

    return res.data;
  };

/*
========================================
EXPORTS
========================================
*/

const adminApi = {
  getDashboardStats,

  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,

  getAllItemsAdmin,
  getSingleItemAdmin,
  deleteItemAdmin,
  markItemRecovered,

  getAllMessages,
  deleteMessage,

  searchUsers,
  searchItems,

  getLostItems,
  getFoundItems
};

export default adminApi;