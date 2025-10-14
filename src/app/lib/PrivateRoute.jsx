/* eslint-disable react/display-name */
// lib/PrivateRoute.js
"use client"
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

const privateRoute = (WrappedComponent) => {
    return (props) => {
        const [user, loading, signOut] = useAuthState(auth);
        const Router = useRouter();

        useEffect(() => {
            const checkUser = async () => {
                if (!loading && !user) {
                    Router.replace('/login');
                }
            };
            checkUser();
        }, [user, loading, Router, signOut]);


        if (loading || !user) {
            return (
                <div className="flex justify-center items-center h-[100vh] w-full">
                    <CircularProgress className="text-black" />
                </div>
            );
        }

        if (user) {
            return <WrappedComponent {...props} user={user} />;
        }

        return null;
    };
};

export default privateRoute;
