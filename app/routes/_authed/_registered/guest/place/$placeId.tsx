import { createFileRoute } from '@tanstack/react-router';
import { css } from '../../../../../../styled-system/css';
import HeaderWithStar from '../../../../../components/guestPage/headerWithStar';
import ImagePreview from '../../../../../components/shared/ImagePreview';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import NotInputInfoRow from '../../../../../components/shared/notInputInfoRow';
import ProfileBaseWithBtn from '../../../../../components/shared/profileBaseWithBtn';
import ProfileColumn from '../../../../../components/shared/profileColumn';
import Subtitle from '../../../../../components/subtitle';
import { profileContainerStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/place/$placeId')({
	component: Page10,
});

function Page10() {
	return (
		<div
			className={css({
				bg: 'bg',
			})}
		>
			<HeaderWithStar title="釘崎家" />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview
						houseImgList={['https://picsum.photos/id/337/200/300', 'https://picsum.photos/id/237/200/300']}
					/>
				</div>
				<ProfileBaseWithBtn text="こんばんは">
					<div
						className={css({
							display: 'flex',
							flex: '1',
							flexDirection: 'column',
							justifyContent: 'space-between',
						})}
					>
						<div
							className={css({
								borderBottomWidth: '[2px]',
								borderColor: 'border',
								px: '[15px]',
								pb: '[30px]',
							})}
						>
							<div
								className={css({
									mb: '2',
								})}
							>
								<Subtitle text="管理者" />
							</div>
							<ProfileColumn name="田中太郎" src="https://picsum.photos/id/337/200/300" />
						</div>

						<div
							className={css({
								borderBottomWidth: '[2px]',
								borderColor: 'border',
								py: '[30px]',
								px: '[15px]',
							})}
						>
							<div
								className={css({
									mb: '2',
								})}
							>
								<Subtitle text="紹介文" />
							</div>
							<p
								className={css({
									color: 'text.muted',
								})}
							>
								あああああああああああああああああああああああああ ああああああああああ
							</p>
						</div>

						<div
							className={css({
								borderBottomWidth: '[2px]',
								borderColor: 'border',
								py: '[30px]',
								px: '[15px]',
							})}
						>
							<div
								className={css({
									mb: '2',
								})}
							>
								<Subtitle text="基本情報" />
							</div>
							<div
								className={css({
									borderTopWidth: '[1px]',
									borderColor: 'border',
								})}
							>
								<NotInputInfoRow label="家族構成" value="4人家族" />
								<NotInputInfoRow label="ペットの有無" value="無" />
								<NotInputInfoRow label="提供可能期間" value="2024/10 - 2024/12" />
								<NotInputInfoRow label="バリアフリー" value="有" />
							</div>
						</div>
					</div>
				</ProfileBaseWithBtn>
			</div>
			<HostNavbar />
		</div>
	);
}
