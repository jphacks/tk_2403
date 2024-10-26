import { createFileRoute } from '@tanstack/react-router';
import { css } from '../../../../../styled-system/css';
import ImagePreview from '../../../../components/shared/ImagePreview';
import Header from '../../../../components/shared/header';
import ProfileBase from '../../../../components/shared/profileBase';
import UserNavbar from '../../../../components/shared/userNavbar';
import Subtitle from '../../../../components/subtitle';
import { profileContainerStyle } from '../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/profile')({
	component: Page9,
});

function Page9() {
	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minH: 'screen',
				bg: 'bg',
			})}
		>
			<Header title="釘崎家" />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview
						houseImgList={['https://picsum.photos/id/253/200/300', 'https://picsum.photos/id/299/200/300']}
					/>
				</div>
				<ProfileBase text="高井正人">
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
								こんばんは
							</p>
						</div>
					</div>
				</ProfileBase>
			</div>
			<UserNavbar />
		</div>
	);
}
