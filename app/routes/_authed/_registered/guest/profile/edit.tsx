import { createFileRoute } from '@tanstack/react-router';
import {} from '../../../../../../styled-system/css';
import ProfileEditorPage from '../../../../../components/shared/profileEditorPage';

export const Route = createFileRoute('/_authed/_registered/guest/profile/edit')({
	loader: ({ context }) => {
		return { profile: context.session.profile };
	},
	component: GuestEditProfile,
});

function GuestEditProfile() {
	const { profile } = Route.useLoaderData();

	return <ProfileEditorPage profile={profile} to="/guest/profile" />;
}
