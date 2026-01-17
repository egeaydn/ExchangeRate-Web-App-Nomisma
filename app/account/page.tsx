'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Save, Lock, User as UserIcon, AlertCircle, CheckCircle } from 'lucide-react';

export default function AccountPage() {
    const { user, userData, loading, refreshUserData } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/Auth');
        } else if (userData) {
            setName(userData.name || '');
            setSurname(userData.surname || '');
        }
    }, [user, loading, userData, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: null, message: '' });

        try {
            if (!user) throw new Error('No user found');
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                name,
                surname
            });
            await refreshUserData();
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: null, message: '' });

        if (newPassword !== confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match.' });
            setIsSaving(false);
            return;
        }

        if (newPassword.length < 6) {
            setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
            setIsSaving(false);
            return;
        }

        try {
            if (!user || !user.email) throw new Error('No user found');

            // Re-authenticate
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, newPassword);

            setStatus({ type: 'success', message: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setStatus({ type: 'error', message: 'Incorrect current password.' });
            } else {
                setStatus({ type: 'error', message: 'Failed to change password. Please try again.' });
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !userData) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <Navbar />

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 w-full max-w-4xl mx-auto px-4 py-12"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                    Account Settings
                </h1>

                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/20 text-green-200 border border-green-500/30' : 'bg-red-500/20 text-red-200 border border-red-500/30'}`}
                    >
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {status.message}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <UserIcon size={24} />
                            </div>
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Email</label>
                                <input
                                    type="text"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Surname</label>
                                    <input
                                        type="text"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                <Save size={18} />
                                Update Profile
                            </button>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-xl font-semibold">Security</h2>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                <Lock size={18} />
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </motion.main>
        </div>
    );
}
