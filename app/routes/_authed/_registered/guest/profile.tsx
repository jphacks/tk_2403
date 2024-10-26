import { createFileRoute } from '@tanstack/react-router';
import { css } from '../../../../../styled-system/css';
import ImagePreview from '../../../../components/shared/ImagePreview';
import Header from '../../../../components/shared/header';
import ProfileBase from '../../../../components/shared/profileBase';
import UserNavbar from '../../../../components/shared/userNavbar';
import Subtitle from '../../../../components/subtitle';
import { profileContainerStyle } from '../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/profile')({
	loader: ({ context }) => {
		return { profile: context.session.profile };
	},
	component: GuestProfile,
});

function GuestProfile() {
	const { profile } = Route.useLoaderData();

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minH: 'screen',
				bg: 'bg',
			})}
		>
			<Header title="プロフィール" to="/profile/edit" />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview houseImgList={profile.pictureUrls} />
				</div>
				<ProfileBase
					text={`${profile.name}・${profile.dateOfBirth.split('-')[0]}年生まれ${profile.gender !== 'other' ? `・${profile.gender === 'male' ? '男' : '女'}` : ''}`}
				>
					<div
						style={{
							flex: '1',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div
							className={css({
								px: '[15px]',
							})}
						>
							<div
								className={css({
									mb: '2',
								})}
							>
								<Subtitle text="自己紹介" />
							</div>
							<p
								className={css({
									flex: '1',
									color: 'text.muted',
									fontSize: 'sm',
								})}
							>
								{profile.biography}
							</p>
						</div>
					</div>
				</ProfileBase>
			</div>
			<UserNavbar />
		</div>
	);
}
