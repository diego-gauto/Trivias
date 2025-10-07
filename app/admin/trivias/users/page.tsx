"use client";
import { useEffect, useState } from 'react';
import UserTriviaList from '../../../../components/admin/Trivias/userTriviaList/userTriviaList';
import { getAllTriviasApi } from '../../../../components/api/trivias';
import { getAllUsersApi } from '../../../../components/api/usertrivia';

const UsersTrivias = () => {
	const [usersTrivia, setUsersTrivia] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getAllUsersApi();
			setUsersTrivia(users);
		};
		fetchUsers();
	}, []);

	return (
		<div className="admin-container">
			<h2>Lista de usuarios de trivias</h2>
			<UserTriviaList usersTrivia={usersTrivia} />
		</div>
	);
};

export default UsersTrivias;
