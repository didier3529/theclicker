import {useEffect, useState} from 'react';
import {db} from '../../firebase.ts';
import {RatingTableProps} from '../../types.ts';
export const RatingTable = ({ratingTableData}: RatingTableProps) => {
	const [userClickCount, setUserClickCount] = useState<{
		username: string;
		userClick: number
	}[]>(ratingTableData || []);

	useEffect(() => {
		const usersRef = db.ref('users/');
		usersRef.once('value', (snapshot) => {
			const userData = snapshot.val();
			const users = [];
			for (const userId in userData) {
				if (Object.hasOwnProperty.call(userData, userId)) {
					const username = userData[userId].displayName;
					const userClick = userData[userId].clickCount || 0;
					users.push({username, userClick});
				}
			}
			users.sort((a, b) => b.userClick - a.userClick);
			setUserClickCount(users);
		});
	}, [ratingTableData]);

	return (
		<>
			<p><b>Leaderboard</b></p>
			<TableWrapper>
				<table>
					<thead>
					<tr>
						<TableHeaderCell>Username</TableHeaderCell>
						<TableHeaderCell>Count</TableHeaderCell>
					</tr>
					</thead>
					<tbody>
					{userClickCount.map((user, index) => (
						<tr key={index}>
							<TableDataCell>{user.username}</TableDataCell>
							<TableDataCell>{user.userClick}</TableDataCell>
						</tr>
					))}
					</tbody>
				</table>
			</TableWrapper>
		</>
	);
};

import {TableDataCell, TableHeaderCell, TableWrapper} from './RatingTable.styles.ts';
