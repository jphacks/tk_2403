import { createFileRoute } from '@tanstack/react-router';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import { ProfilePage } from '../../../../../components/shared/profilePage';

export const Route = createFileRoute('/_authed/_registered/host/profile/')({
	loader: ({ context }) => {
		return { profile: context.session.profile };
	},
	component: HostProfile,
});

function HostProfile() {
	const { profile } = Route.useLoaderData();

	return (
		<ProfilePage profile={profile} editPath="/host/profile/edit">
			<HostNavbar />
		</ProfilePage>
	);
}
