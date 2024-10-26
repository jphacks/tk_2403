import { createFileRoute, redirect } from '@tanstack/react-router';
import { css } from '../../../../../../styled-system/css';
import ImagePreview from '../../../../../components/shared/ImagePreview';
import Header from '../../../../../components/shared/header';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import NotInputInfoRow from '../../../../../components/shared/notInputInfoRow';
import ProfileBase from '../../../../../components/shared/profileBase';
import ProfileColumn from '../../../../../components/shared/profileColumn';
import Subtitle from '../../../../../components/subtitle';
import { getMyEvacuationPlaceFn } from '../../../../../server/evacuationPlace';
import { profileContainerStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/host/place/')({
	loader: async () => {
		const place = await getMyEvacuationPlaceFn();
		if (place === undefined) {
			throw redirect({ to: '/host/place/create' });
		}
		return { place };
	},
	component: MyPlace,
});

function MyPlace() {
	const { place } = Route.useLoaderData();

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minH: 'screen',
				bg: 'bg',
			})}
		>
			<Header title={place.profile.name} backToPage={true} to="/host/place/edit" />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview houseImgList={place.pictureUrls} />
				</div>
				<ProfileBase text={place.address}>
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
									mb: '3',
								})}
							>
								<Subtitle text="管理者" />
							</div>
							<ProfileColumn name={place.profile.name} src={place.profile.pictureUrls[0]!} />
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
									mb: '3',
								})}
							>
								<Subtitle text="紹介文" />
							</div>
							<p
								className={css({
									color: 'text.muted',
								})}
							>
								{place.description}
							</p>
						</div>

						<div
							className={css({
								py: '[30px]',
								px: '[15px]',
							})}
						>
							<div
								className={css({
									mb: '3',
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
								<NotInputInfoRow label="受け入れ可能人数" value={`${place.maxHeadcount}人`} />
								<NotInputInfoRow
									label="提供可能期間"
									value={`${place.availablePeriodStart} ~ ${place.availablePeriodEnd}`}
								/>
								<NotInputInfoRow label="ペットの受け入れ" value={place.petAllowed ? '可' : '否'} />
								<NotInputInfoRow label="バリアフリー" value={place.barrierFree ? '有' : '無'} />
							</div>
						</div>
					</div>
				</ProfileBase>
			</div>
			<HostNavbar />
		</div>
	);
}
