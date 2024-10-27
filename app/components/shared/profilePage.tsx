import type { ReactNode } from 'react';
import { css } from '../../../styled-system/css';
import { profileContainerStyle } from '../../styles/layout';
import type { Profile } from '../../types/profile';
import Subtitle from '../subtitle';
import ImagePreview from './ImagePreview';
import Header from './header';
import ProfileBase from './profileBase';

type Props = {
	profile: Profile;
	editPath: string;
	children: ReactNode;
};

export function ProfilePage({ profile, editPath, children }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minH: 'screen',
				bg: 'bg',
			})}
		>
			<Header title="プロフィール" to={editPath} />
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
			{children}
		</div>
	);
}
