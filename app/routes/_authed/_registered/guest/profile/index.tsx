import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '../../../../../components/shared/profilePage';
import UserNavbar from '../../../../../components/shared/userNavbar';

export const Route = createFileRoute('/_authed/_registered/guest/profile/')({
	loader: ({ context }) => {
		return { profile: context.session.profile };
	},
	component: GuestProfile,
});

function GuestProfile() {
	const { profile } = Route.useLoaderData();

	return (
		<ProfilePage profile={profile} editPath="/guest/profile/edit">
			<UserNavbar />
		</ProfilePage>
	);
}
