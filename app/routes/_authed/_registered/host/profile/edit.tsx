import { createFileRoute } from '@tanstack/react-router';
import {} from '../../../../../../styled-system/css';
import ProfileEditorPage from '../../../../../components/shared/profileEditorPage';

export const Route = createFileRoute('/_authed/_registered/host/profile/edit')({
	loader: ({ context }) => {
		return { profile: context.session.profile };
	},
	component: HostEditProfile,
});

function HostEditProfile() {
	const { profile } = Route.useLoaderData();

	return <ProfileEditorPage profile={profile} to="/host/profile" />;
}
