import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
// app.get('/users/:email/info', verifyJWTToken, async (req, res) => {
//     const email = req.params.email;
//     const query = { email };
//     const user = await usersCollection.findOne(query);
//     res.send(user);
//   });

// using this custom hook return the role and status(active/fraud) of user
const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: roleInfo = {}, isLoading: roleLoading } = useQuery({
    queryKey: ['role-info', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user.email}/info`);
      return { role: response.data.role, status: response.data.status };
    },
  });

  return { role: roleInfo.role, status: roleInfo.status, roleLoading };
};

export default useRole;
