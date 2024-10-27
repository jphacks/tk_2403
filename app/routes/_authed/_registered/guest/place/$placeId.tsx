import { createFileRoute, notFound } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { useState } from 'react';
import { css } from '../../../../../../styled-system/css';
import HeaderWithStar from '../../../../../components/guestPage/headerWithStar';
import ImagePreview from '../../../../../components/shared/ImagePreview';
import HostNavbar from '../../../../../components/shared/hostNavbar';
import NotInputInfoRow from '../../../../../components/shared/notInputInfoRow';
import ProfileBaseWithBtn from '../../../../../components/shared/profileBaseWithBtn';
import ProfileColumn from '../../../../../components/shared/profileColumn';
import Subtitle from '../../../../../components/subtitle';
import { getEvacuationPlaceFn } from '../../../../../server/evacuationPlace';
import { cancelRequestFn, createRequestFn } from '../../../../../server/request';
import { profileContainerStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/place/$placeId')({
	loader: async ({ params }) => {
		const place = await getEvacuationPlaceFn({ id: Number.parseInt(params.placeId) });
		if (place === undefined) {
			throw notFound();
		}
		return { place };
	},
	component: PlaceDetail,
});

function PlaceDetail() {
	const { place } = Route.useLoaderData();
	const createRequest = useServerFn(createRequestFn);
	const cancelRequest = useServerFn(cancelRequestFn);
	const [requestStatus, setRequestStatus] = useState(place.requestStatus);

	return (
		<div
			className={css({
				bg: 'bg',
			})}
		>
			<HeaderWithStar title={place.profile.name} />
			<div className={profileContainerStyle()}>
				<div
					className={css({
						py: '[30px]',
					})}
				>
					<ImagePreview houseImgList={place.pictureUrls} />
				</div>
				<ProfileBaseWithBtn
					text={place.address}
					requestStatus={requestStatus}
					onCreateRequest={async () => {
						await createRequest({ evacuationPlaceId: place.id });
						setRequestStatus('requesting');
					}}
					onCancelRequest={async () => {
						await cancelRequest({ evacuationPlaceId: place.id });
						setRequestStatus(null);
					}}
				>
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
								{place.description}
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
				</ProfileBaseWithBtn>
			</div>
			<HostNavbar />
		</div>
	);
}
