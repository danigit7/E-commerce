import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-status`);
      toast.success('User status updated');
      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update user status'
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold">User Management</h1>
          <p className="text-charcoal-600 mt-2">Total Users: {users.length}</p>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-ivory">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200">
                {users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-ivory transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-ivory font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-600">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === 'admin'
                            ? 'bg-gold text-charcoal'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        {user.role !== 'admin' && (
                          <>
                            <button
                              onClick={() => handleToggleStatus(user._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title={user.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {user.isActive ? (
                                <FiToggleRight size={20} />
                              ) : (
                                <FiToggleLeft size={20} />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 text-charcoal-600">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
